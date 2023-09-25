import { HttpException, Injectable, HttpStatus, Inject } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoDto } from './dtos/craete-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { Tag } from './entity/tag.model';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { UserEntity } from 'src/auth/entity/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODOS_REPOSITORY')
    private readonly todoRepository: typeof Todo,
    @Inject('TAGS_REPOSITORY')
    private readonly tagRepository: typeof Tag,
  ) {}

  async findAll(page: number) {
    try {
      const todosPerPage = 10;
      const offset = (page - 1) * todosPerPage;
      const todoList = await this.todoRepository.findAll({
        limit: todosPerPage,
        offset,
      });
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

  async findOneTag(id: number) {
    return await this.tagRepository.findOne({
      where: {
        id,
      },
      include: [Tag],
    });
  }

  async findUserTodo(userId: number, page: number) {
    try {
      const todosPerPage = 10;
      const offset = (page - 1) * todosPerPage;
      const todoList = await this.todoRepository.findAll({
        where: { userId },
        limit: todosPerPage,
        offset,
      });
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

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async createTodo(
    createTodoDto: CreateTodoDto,
    userId: number,
    file: Express.Multer.File,
  ) {
    let imageUrl = null;
    imageUrl = await this.uploadImage(file);

    const newTag = await this.tagRepository.build({
      tag_name: createTodoDto.tagName,
    });

    await newTag.save();

    const newTodo = await this.todoRepository.build({
      title: createTodoDto.title,
      description: createTodoDto.description,
      isCompleted: createTodoDto.isCompleted,
      tagName: newTag.tag_name,
      avatar: imageUrl['secure_url'],
      userId: userId,
    });

    newTodo.tag = newTag;

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
    currentUser: UserEntity,
    id: number,
    updateTodoDto: UpdateTodoDto,
  ) {
    const todoUpdate = await this.findOne(id);

    if (todoUpdate === null) {
      throw new HttpException(
        `Todo with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (currentUser.id !== id) {
      throw new HttpException(
        'You are not authorized to update this account.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (updateTodoDto.tagName) {
      const tag = await this.tagRepository.findOne({
        where: { id },
      });

      await tag.update({ tag_name: updateTodoDto.tagName });

      await this.tagRepository.update(tag, {
        where: { id },
        returning: true,
      });
    }

    Object.assign(todoUpdate, updateTodoDto);

    await todoUpdate.save();

    await this.todoRepository.update(updateTodoDto, {
      where: { id },
      returning: true,
    });

    return await this.findOne(id);
  }

  async deleteTodo(currentUser: UserEntity, id: number) {
    const todoDelete = await this.findOne(id);

    if (todoDelete === null) {
      throw new HttpException(
        `Todo with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (currentUser.id !== id) {
      throw new HttpException(
        'You are not authorized to update this account.',
        HttpStatus.UNAUTHORIZED,
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
