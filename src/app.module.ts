import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todo.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    SequelizeModule.forRoot(sequelizeConfig),
    TodoModule,
  ],
})
export class AppModule {}
