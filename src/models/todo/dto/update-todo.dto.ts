import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiPropertyOptional({ description: 'title todo' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @ApiPropertyOptional({ description: 'content todo' })
  @IsOptional()
  @MinLength(1)
  @MaxLength(500)
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: 'status todo: todo, doing, done' })
  @IsOptional()
  @IsString()
  status: string;
}
