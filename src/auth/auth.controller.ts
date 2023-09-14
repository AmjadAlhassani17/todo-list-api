import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dots/register-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dots/login-user.dto';
import { UpdateUserDto } from './dots/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CustomRequest } from './interface/custom-request.interface';

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

  @Put('updateUser/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Res() res: Response,
    @Req() req: CustomRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.id;

    if (userId !== id) {
      throw new HttpException(
        'You are not authorized to update this account.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.authService.updateUser(id, updateUserDto);

    return res.status(200).json({
      status: {
        success: true,
        code: 200,
        message: 'Update User Successfuly',
      },
      data: await this.authService.findOneById(id),
    });
  }

  @Delete('deleteUser/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Res() res: Response,
    @Req() req: CustomRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user.id;

    if (userId !== id) {
      throw new HttpException(
        'You are not authorized to delete this account.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.authService.deleteUser(id);

    return res.status(200).json({
      status: {
        success: true,
        code: 200,
        message: 'User deleted Successfuly',
      },
    });
  }
}
