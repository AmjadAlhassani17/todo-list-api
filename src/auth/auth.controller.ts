import {
  Controller,
  Post,
  Body,
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
import { LoginUserDto } from './dots/login-user.dto';
import { UpdateUserDto } from './dots/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CustomRequest } from './interface/custom-request.interface';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterUserDto) {
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.loginUser(loginUserDto);
  }

  @Put('updateUser/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
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

    return await this.authService.updateUser(id, updateUserDto);
  }

  @Delete('deleteUser/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(
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

    return await this.authService.deleteUser(id);
  }
}
