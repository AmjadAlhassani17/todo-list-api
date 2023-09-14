import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dots/register-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dots/login-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Res() res: Response,
    @Body() registerDto: RegisterUserDto,
  ) {
    try {
      const userDate = await this.authService.registerUser(registerDto);
      return res.status(201).json({
        status: {
          success: true,
          code: 201,
          message: 'User Register Successfuly',
        },
        data: userDate,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('login')
  async loginUser(@Res() res: Response, @Body() loginUserDto: LoginUserDto) {
    try {
      const userDate = await this.authService.loginUser(loginUserDto);
      return res.status(200).json({
        status: {
          success: true,
          code: 200,
          message: 'User Login Successfuly',
        },
        data: userDate,
      });
    } catch (error) {
      throw new HttpException(
        'Invalid Email or Password!',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
