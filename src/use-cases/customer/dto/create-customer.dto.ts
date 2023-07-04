import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateCustomerDto {
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

  @IsString()
  @IsOptional()
  zip_code: string;

  @IsString()
  @IsOptional()
  street: string;

  @IsString()
  @IsOptional()
  neighborhood: string;

  @IsString()
  @IsOptional()
  city: string;

  @MaxLength(2)
  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  adrees_line: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNumber()
  @IsOptional()
  id_user: number;
}
