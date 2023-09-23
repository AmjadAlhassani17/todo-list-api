import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todo.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Sequelize } from 'sequelize-typescript';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    DatabaseModule,
    TodoModule,
    AuthModule,
  ],
  providers: [
    {
      provide: 'SequelizeInstance',
      useFactory: (sequelize: Sequelize) => sequelize,
      inject: ['SEQUELIZE'],
    },
  ],
})
export class AppModule {}
