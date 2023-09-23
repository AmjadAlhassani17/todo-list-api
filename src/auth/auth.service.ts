import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RegisterUserDto } from './dots/register-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dots/login-user.dto';
import { UpdateUserDto } from './dots/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { ProfileEntity } from './entity/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof UserEntity,
    @Inject('PROFILE_REPOSITORY')
    private readonly profileRepository: typeof ProfileEntity,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      include: [ProfileEntity],
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      include: [ProfileEntity],
    });
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const checkEmail = await this.findOne(registerUserDto.email);

    if (checkEmail !== null) {
      throw new HttpException(
        `User with email ${registerUserDto.email} is found!`,
        HttpStatus.FOUND,
      );
    }

    const salt = await bcrypt.genSalt(10);
    registerUserDto.password = await bcrypt.hash(
      registerUserDto.password,
      salt,
    );

    const createUserDto = this.userRepository.build({
      email: registerUserDto.email,
      password: registerUserDto.password,
      role: registerUserDto.role,
    });

    await createUserDto.save();

    const createProfileDto = this.profileRepository.build({
      first_name: registerUserDto.first_name,
      last_name: registerUserDto.last_name,
      id: createUserDto.id,
    });

    await createProfileDto.save();

    const jwtPayload = {
      id: createUserDto.id,
      email: registerUserDto.email,
      role: registerUserDto.role,
    };
    const token = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '1d',
      algorithm: 'HS512',
    });

    const userData = {
      ...createUserDto['dataValues'],
      ...createProfileDto['dataValues'],
      token,
    };

    return {
      status: {
        success: true,
        code: 201,
        message: 'User Register Successfuly',
      },
      data: userData,
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const checkEmail = await this.findOne(loginUserDto.email);

    if (checkEmail === null) {
      throw new HttpException(
        `User with email ${loginUserDto.email} is not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const user = checkEmail['dataValues'];

    const isPasswordCorrect = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        `Invalid Email or Password`,
        HttpStatus.FORBIDDEN,
      );
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '1d',
      algorithm: 'HS512',
    });

    const UserData = {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      first_name: user.profile.first_name,
      last_name: user.profile.last_name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    const userData = { ...UserData, token };

    return {
      status: {
        success: true,
        code: 200,
        message: 'User Login Successfuly',
      },
      data: userData,
    };
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new HttpException(`Invalid token`, HttpStatus.UNAUTHORIZED);
    }
  }

  async updateUser(
    currentUser: UserEntity,
    userId: number,
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.findOneById(userId);

    if (user === null) {
      throw new HttpException(
        `User with email ${updateUserDto.email} is not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (currentUser.role !== 'admin' && currentUser.id !== userId) {
      throw new HttpException(
        'You are not authorized to update this account.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    Object.assign(user, updateUserDto);

    await user.save();

    return {
      status: {
        success: true,
        code: 200,
        message: 'Update User Successfuly',
      },
      data: await this.findOneById(userId),
    };
  }

  async deleteUser(currentUser: UserEntity, userId: number) {
    const user = await this.findOneById(userId);

    if (user === null) {
      throw new HttpException(
        `User with id ${userId} is not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (currentUser.role !== 'admin' && currentUser.id !== userId) {
      throw new HttpException(
        'You are not authorized to delete this account.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.userRepository.destroy({ where: { id: userId } });
    await this.profileRepository.destroy({ where: { id: userId } });

    return {
      status: {
        success: true,
        code: 200,
        message: 'User deleted Successfuly',
      },
    };
  }
}
