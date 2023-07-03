import { IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CustomerDto {
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail(undefined)
  email: string;

  @Length(11, 14)
  cpf: string;

  @IsNotEmpty()
  phone: string;

  zip_code: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  adrees_line: string;

  status: boolean;

  @IsNumber()
  @IsNotEmpty()
  id_user: number;
}
