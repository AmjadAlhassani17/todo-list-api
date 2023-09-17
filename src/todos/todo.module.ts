import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DatabaseModule } from 'src/database/database.module';
import { todosProviders } from './todo.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TodoController],
  providers: [TodoService, ...todosProviders],
})
export class TodoModule {}
