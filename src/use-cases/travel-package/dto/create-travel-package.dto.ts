import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTravelPackageDto {
  id: number;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  numberOfPeople: number;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  numberOfDays: number;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  numberOfNights: number;

  @IsNotEmpty()
  @IsString()
  destinationCity: string;

  @MaxLength(2)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  destinationState: string;

  @IsString({ each: true })
  @IsOptional()
  includedItems: string[];

  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  idUser: number;
}
