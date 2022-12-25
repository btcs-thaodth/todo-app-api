import { Inject, Injectable, Logger } from '@nestjs/common';
import { DATABASE_PROVIDER_TOKEN } from 'configs/utils/constants';
import { Pool } from 'pg';
import AppResponse from 'src/common/models/AppResponse';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@Inject(DATABASE_PROVIDER_TOKEN) private conn: Pool) {}

  async create(name: string) {
    const response = await this.conn.query(
      `
      INSERT INTO 
      users("name") 
      VALUES ($1)
      RETURNING *
      `,
      [name],
    );
    return response.rows[0];
  }

  async findAll() {
    const response = await this.conn.query(
      `
      SELECT * 
      FROM users
      `,
    );
    return response.rows;
  }

  findOne(id: number) {
    const response = this.conn.query(`SELECT * FROM users`);
    return response.rows;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  // eslint-disable-next-line class-methods-use-this
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
