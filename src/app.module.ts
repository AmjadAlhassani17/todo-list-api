import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: sequelizeConfig,
      inject: [ConfigService],
    }),
    TodoModule,
  ],
})
export class AppModule {}
