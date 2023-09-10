import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './craete-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
