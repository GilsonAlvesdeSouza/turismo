import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsEmail(undefined)
  @IsNotEmpty()
  email: string;

  @Length(5, 20)
  @IsNotEmpty()
  password: string;
}
