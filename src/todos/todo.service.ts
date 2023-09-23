import { HttpException, Injectable, HttpStatus, Inject } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoDto } from './dtos/craete-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { Tag } from './entity/tag.model';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODOS_REPOSITORY')
    private readonly todoRepository: typeof Todo,
    @Inject('TAGS_REPOSITORY')
    private readonly tagRepository: typeof Tag,
  ) {}

  async findAll() {
    try {
      const todoList = await this.todoRepository.findAll();
      return {
        status: {
          success: true,
          code: 200,
          message: 'Get All Data Successfuly',
        },
        data: todoList,
      };
    } catch (error) {
      throw new HttpException(
        'something want wrong!',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async findOne(id: number) {
    return await this.todoRepository.findOne({
      where: {
        id,
      },
      include: [Tag],
    });
  }

  async createTodo(createTodoDto: CreateTodoDto, createdBy: number) {
    createTodoDto.createdBy = createdBy;

    const [tag] = await this.tagRepository.findOrCreate({
      where: { tag_name: createTodoDto.tagName },
    });

    const newTodo = await this.todoRepository.build({
      title: createTodoDto.title,
      description: createTodoDto.description,
      isCompleted: createTodoDto.isCompleted,
      tagName: tag.tag_name,
    });

    newTodo.tag = tag;

    await newTodo.save();

    return {
      status: {
        success: true,
        code: 201,
        message: 'Create Data Successfuly',
      },
      data: newTodo,
    };
  }

  async updateTodo(
    id: number,
    updateTodoDto: UpdateTodoDto,
    updatedBy: number,
  ) {
    const todoUpdate = await this.findOne(id);

    if (todoUpdate === null) {
      throw new HttpException(
        `Todo with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(todoUpdate, updateTodoDto);

    await todoUpdate.save();

    updateTodoDto.updatedBy = updatedBy;
    await this.todoRepository.update(updateTodoDto, {
      where: { id },
      returning: true,
    });

    return await this.findOne(id);
  }

  async deleteTodo(id: number) {
    const todoDelete = await this.findOne(id);

    if (todoDelete === null) {
      throw new HttpException(
        `Todo with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.todoRepository.destroy({ where: { id } });
    await this.tagRepository.destroy({ where: { id } });

    return {
      status: {
        success: true,
        code: 200,
        message: 'Delete Data Successfuly',
      },
      data: 'Delete Data Successfuly',
    };
  }
}
