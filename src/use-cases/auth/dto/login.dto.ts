import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsEmail(undefined)
  @IsNotEmpty()
  email: string;

  @Length(5, 20)
  @IsNotEmpty()
  password: string;
}
