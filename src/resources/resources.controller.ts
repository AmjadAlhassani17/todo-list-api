import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/guards/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from 'src/auth/entity/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenVerificationMiddleware } from 'src/middlewares/token-verification.middleware';

@Controller('/resources')
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) {}

  @Post()
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @UseInterceptors(FileInterceptor('file'))
  async createResource(
    @CurrentUser() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.resourceService.createResource(file, user.id);
  }

  @Get()
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async getAllResource(@CurrentUser() user: UserEntity) {
    return await this.resourceService.findAllResource(user.id);
  }
}
