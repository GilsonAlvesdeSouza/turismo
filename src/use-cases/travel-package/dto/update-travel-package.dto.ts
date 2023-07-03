import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelPackageDto } from './create-travel-package.dto';

export class UpdateTravelPackageDto extends PartialType(
  CreateTravelPackageDto,
) {}
