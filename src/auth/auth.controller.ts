import {
  Controller,
  Post,
  Body,
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
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthEntity } from './entity/auth.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { TokenVerificationMiddleware } from 'src/middlewares/token-verification.middleware';

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
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async updateUser(
    @CurrentUser() user: AuthEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.authService.updateUser(user, id, updateUserDto);
  }

  @Delete('deleteUser/:id')
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async deleteUser(
    @CurrentUser() user: AuthEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.authService.deleteUser(user, id);
  }
}
