import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './database.config';
import { Todo } from 'src/todos/todo.entity';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([Todo]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
