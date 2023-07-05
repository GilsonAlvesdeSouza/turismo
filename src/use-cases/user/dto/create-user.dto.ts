import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
  id?: number;

  @IsNotEmpty()
  name: string;

  @MaxLength(120)
  @IsEmail(undefined)
  @IsNotEmpty()
  email: string;

  @Length(5, 20)
  @IsNotEmpty()
  password: string;
}
