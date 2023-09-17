import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;

  createdBy: number;
}
