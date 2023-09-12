import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dtos/craete-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private readonly todoRepository: typeof Todo,
  ) {}

  async findAll() {
    return await this.todoRepository.findAll();
  }

  async findOne(id: number) {
    return await this.todoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.create({
      title: createTodoDto.title,
      description: createTodoDto.description,
      isCompleted: createTodoDto.isCompleted,
    });
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    const todoUpdate = await this.findOne(id);

    if (todoUpdate === null) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return await this.todoRepository.update(updateTodoDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteTodo(id: number) {
    const todoDelete = await this.findOne(id);

    if (todoDelete === null) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return await this.todoRepository.destroy({ where: { id } });
  }
}
