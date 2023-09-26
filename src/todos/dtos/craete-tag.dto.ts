import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  todo_id: number;
}
