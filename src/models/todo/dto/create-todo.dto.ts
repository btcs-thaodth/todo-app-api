import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiPropertyOptional({ description: 'title todo' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @ApiPropertyOptional({ description: 'content todo' })
  @MinLength(1)
  @MaxLength(500)
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: 'status todo: todo, doing, done' })
  @IsString()
  status: string;
}
