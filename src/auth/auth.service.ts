import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthEntity } from './auth.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterUserDto } from './dots/register-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dots/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthEntity)
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

  async registerUser(registerUserDto: RegisterUserDto) {
    const checkEmail = await this.findOne(registerUserDto.email);

    if (checkEmail !== null) {
      throw new HttpException(
        `User with email ${registerUserDto.email} is found!`,
        HttpStatus.NOT_FOUND,
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
      email: registerUserDto.email,
      role: 'user',
    };
    const token = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '1d',
      algorithm: 'HS512',
    });

    return { ...createUserDto['dataValues'], token };
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
      email: user.email,
      role: user.role,
    };
    const jwtToken = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '1d',
      algorithm: 'HS512',
    });

    return { ...user, jwtToken };
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new HttpException(`Invalid token`, HttpStatus.UNAUTHORIZED);
    }
  }
}
