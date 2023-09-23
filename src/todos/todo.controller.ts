import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/craete-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @CurrentUser() user: AuthEntity,
  ) {
    return await this.todoService.createTodo(createTodoDto, user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  async updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @CurrentUser() user: AuthEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.todoService.updateTodo(id, updateTodoDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.deleteTodo(id);
  }
}
