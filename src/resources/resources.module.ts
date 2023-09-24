import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import {
  resourceProviders,
  userResourceProviders,
  CloudinaryProvider,
} from './resources.provider';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ResourcesController],
  providers: [
    ResourcesService,
    ...userResourceProviders,
    ...resourceProviders,
    CloudinaryProvider,
  ],
})
export class ResourcesModule {}
