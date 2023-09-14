import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Response } from 'express';
import { CreateTodoDto } from './dtos/craete-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Controller('api/v1/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const todoList = await this.todoService.findAll();
      return res.status(200).json({
        status: {
          success: true,
          code: 200,
          message: 'Get All Data Successfuly',
        },
        data: todoList,
      });
    } catch (error) {
      throw new HttpException(
        'something want wrong!',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const todoList = await this.todoService.findOne(id);
    if (todoList !== null) {
      return res.status(200).json({
        status: {
          success: true,
          code: 200,
          message: 'Get Data Successfuly',
        },
        data: todoList,
      });
    } else {
      throw new HttpException('Todo not found!', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createTodo(@Res() res: Response, @Body() createTodoDto: CreateTodoDto) {
    const todoList = await this.todoService.createTodo(createTodoDto);
    return res.status(201).json({
      status: {
        success: true,
        code: 201,
        message: 'Create Data Successfuly',
      },
      data: todoList,
    });
  }

  @Put(':id')
  async updateTodo(
    @Res() res: Response,
    @Body() updateTodoDto: UpdateTodoDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      await this.todoService.updateTodo(id, updateTodoDto);
      const todoUpdate = await this.todoService.findOne(id);
      return res.status(200).json({
        status: {
          success: true,
          code: 200,
          message: 'Update Data Successfuly',
        },
        data: todoUpdate,
      });
    } catch (error) {
      throw new HttpException('data not found!', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async deleteTodo(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      await this.todoService.deleteTodo(id);
      return res.status(200).json({
        status: {
          success: true,
          code: 200,
          message: 'Delete Data Successfuly',
        },
        data: 'Delete Data Successfuly',
      });
    } catch (error) {
      throw new HttpException('Todo not found!', HttpStatus.NOT_FOUND);
    }
  }
}
