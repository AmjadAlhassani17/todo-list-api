import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
  async updateTodo(
    @CurrentUser() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return await this.resourceService.createResource(file, user.id);
  }
}
