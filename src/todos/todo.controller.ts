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
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/craete-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserEntity } from 'src/auth/entity/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenVerificationMiddleware } from 'src/middlewares/token-verification.middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTagDto } from './dtos/craete-tag.dto';

@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll(@Query('page') page: number) {
    return this.todoService.findAll(page);
  }

  @Get(':id')
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.findOne(id);
  }

  @Get('user/todo')
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async findUserTodo(
    @CurrentUser() user: UserEntity,
    @Query('page') page: number,
  ) {
    return await this.todoService.findUserTodo(user.id, page);
  }

  @Post()
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @UseInterceptors(FileInterceptor('file'))
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.todoService.createTodo(createTodoDto, user.id, file);
  }

  @Post('tag')
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.todoService.createTag(createTagDto);
  }

  @Put(':id')
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @CurrentUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.todoService.updateTodo(user, id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(TokenVerificationMiddleware, JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async deleteTodo(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.todoService.deleteTodo(user, id);
  }
}
