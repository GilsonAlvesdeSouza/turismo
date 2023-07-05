import { TypeOfPayment } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsBoolean()
  @IsOptional()
  paid: boolean;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  installments: number;

  @IsEnum(TypeOfPayment, {
    message:
      'typeOfPayment must be "CREDIT_CARD, DEBIT_CARD, CASH, PIX, TICKET"',
  })
  @IsNotEmpty()
  typeOfPayment: TypeOfPayment;

  @Min(1)
  @IsNumber()
  @IsOptional()
  valueOfInstallments: number;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  idCustomer: number;

  @Min(1)
  @IsNumber()
  @IsOptional()
  idUser: number;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsNotEmpty()
  idPackage: number;
}
