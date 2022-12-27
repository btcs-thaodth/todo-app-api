import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_PROVIDER_TOKEN } from 'configs/utils/constants';
import { Pool } from 'pg';
import AppResponse from 'src/common/models/AppResponse';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@Inject(DATABASE_PROVIDER_TOKEN) private conn: Pool) {}

  async create({ title, content, status }: CreateTodoDto) {
    try {
      const response = await this.conn.query(
        `
      INSERT INTO 
      todos("title", "content", "status") 
      VALUES ($1, $2, $3)
      RETURNING *
      `,
        [title, content, status],
      );
      return {
        err: null,
        data: response.rows[0],
      };
    } catch (error) {
      return {
        err: AppResponse.internalServerError([error.message]),
        data: null,
      };
    }
  }

  async findAll() {
    try {
      const queryTodo = await this.conn.query(
        `
        SELECT id, title, content, status, created_at
        FROM todos
        WHERE remove = $1
      `,
        [false],
      );
      return {
        err: null,
        data: queryTodo.rows,
      };
    } catch (error) {
      return {
        err: error.message,
        data: null,
      };
    }
  }

  async changeStatus(id: number, status: string) {
    try {
      const updateTodo = await this.conn.query(
        `
        UPDATE todos
        SET status = $1
        WHERE id = $2
        RETURNING *
      `,
        [status, id],
      );
      return {
        err: null,
        data: updateTodo.rows[0],
      };
    } catch (error) {
      return {
        err: AppResponse.internalServerError([error.message]),
        data: null,
      };
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.conn.query(
        `
        SELECT *
        FROM todos
        WHERE id = $1
        `,
        [id],
      );
      const updateTodo = await this.conn.query(
        `
        UPDATE todos
        SET title = $1, content = $2, status = $3
        WHERE id = $4
        RETURNING *
      `,
        [
          updateTodoDto?.title || todo.rows[0].title,
          updateTodoDto?.content || todo.rows[0].content,
          updateTodoDto?.status || todo.rows[0].status,
          id,
        ],
      );
      return {
        err: null,
        data: updateTodo.rows[0],
      };
    } catch (error) {
      return {
        err: AppResponse.internalServerError([error.message]),
        data: null,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.conn.query(
        `
        UPDATE todos
        SET remove = $1
        WHERE id = $2
        RETURNING *
      `,
        [true, id],
      );
      return {
        err: null,
      };
    } catch (error) {
      return {
        err: AppResponse.internalServerError([error.message]),
        data: null,
      };
    }
  }
}
