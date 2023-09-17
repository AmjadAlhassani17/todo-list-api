import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;

  updatedBy: number;
}
