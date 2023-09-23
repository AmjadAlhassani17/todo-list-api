import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak, choose a stronger password between 6 and 12 characters',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    `^${Object.values(['admin', 'user'])
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  role: string;
}
