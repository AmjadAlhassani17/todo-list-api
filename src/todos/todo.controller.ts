import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Req,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/craete-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { CustomRequest } from 'src/auth/interface/custom-request.interface';

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
    @Req() req: CustomRequest,
  ) {
    const createdBy = req.user.id;
    return await this.todoService.createTodo(createTodoDto, createdBy);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  async updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: CustomRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const updatedBy = req.user.id;
    return await this.todoService.updateTodo(id, updateTodoDto, updatedBy);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.deleteTodo(id);
  }
}
