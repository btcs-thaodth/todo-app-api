import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import AppResponse from 'src/common/models/AppResponse';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateStatusTodoDto } from './dto/update-status-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const { err, data } = await this.todoService.create(createTodoDto);
    if (err) {
      throw err;
    }

    return AppResponse.ok(data);
  }

  @Get()
  async findAll() {
    const { err, data } = await this.todoService.findAll();
    if (err) {
      throw err;
    }

    return AppResponse.ok(data);
  }

  @Post('/change-status/:id')
  async changeStatus(
    @Param('id') id: number,
    @Body() updateStatus: UpdateStatusTodoDto,
  ) {
    const { err, data } = await this.todoService.changeStatus(
      +id,
      updateStatus.status,
    );
    if (err) {
      throw err;
    }

    return AppResponse.ok(data);
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const { err, data } = await this.todoService.update(+id, updateTodoDto);
    if (err) {
      throw err;
    }

    return AppResponse.ok(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { err } = await this.todoService.remove(+id);
    if (err) {
      throw err;
    }

    return AppResponse.ok();
  }
}
