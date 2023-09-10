import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/craete-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    return await this.todoRepository.query(
      `SELECT * FROM Todo WHERE id = ${id};`,
    );
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    const creatTodo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(creatTodo);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    const todoUpdate = await this.findOne(id);

    if (todoUpdate.length === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return await this.todoRepository.update(id, updateTodoDto);
  }

  async deleteTodo(id: number) {
    const todoDelete = await this.findOne(id);

    if (todoDelete.length === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return await this.todoRepository.remove(todoDelete);
  }
}
