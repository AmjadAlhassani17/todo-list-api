import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { AuthEntity } from './auth.entity';
import { RegisterUserDto } from './dots/register-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dots/login-user.dto';
import { UpdateUserDto } from './dots/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private readonly authRepository: typeof AuthEntity,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string) {
    return await this.authRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findOneById(id: number) {
    return await this.authRepository.findOne({
      where: {
        id,
      },
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

    const createUserDto = this.authRepository.build({
      ...registerUserDto,
      role: 'user',
    });

    await createUserDto.save();

    const jwtPayload = {
      id: createUserDto.id,
      email: registerUserDto.email,
      role: 'user',
    };
    const token = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '1d',
      algorithm: 'HS512',
    });

    const userData = { ...createUserDto['dataValues'], token };

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
    const jwtToken = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '1d',
      algorithm: 'HS512',
    });

    const userData = { ...user, jwtToken };

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

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.authRepository.findOne({ where: { id: userId } });

    if (user === null) {
      throw new HttpException(
        `User with email ${updateUserDto.email} is not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.authRepository.update(updateUserDto, {
      where: { id: userId },
      returning: true,
    });

    return {
      status: {
        success: true,
        code: 200,
        message: 'Update User Successfuly',
      },
      data: await this.findOneById(userId),
    };
  }

  async deleteUser(userId: number) {
    const user = await this.authRepository.findOne({ where: { id: userId } });

    if (user === null) {
      throw new HttpException(
        `User with id ${userId} is not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.authRepository.destroy({ where: { id: userId } });

    return {
      status: {
        success: true,
        code: 200,
        message: 'User deleted Successfuly',
      },
    };
  }
}
