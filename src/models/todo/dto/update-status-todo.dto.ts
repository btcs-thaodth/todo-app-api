import { IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStatusTodoDto {
  @ApiPropertyOptional({ description: 'status todo: todo, doing, done' })
  @IsString()
  status: string;
}
