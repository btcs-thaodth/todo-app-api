/* eslint class-methods-use-this: off */
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  create() {
    return 'This action adds a new group';
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
