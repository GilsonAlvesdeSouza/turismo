import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationExceptionInterceptor } from 'src/interceptors/validationExceptionInterceptor';
import { ParseBoolOptionalPipe } from 'src/pipes/parseBoolOptionalPipe';
import { ParseIntOptionalPipe } from 'src/pipes/parseIntOptionalPipe';
import { CreateTravelPackageDto } from './dto/create-travel-package.dto';
import { UpdateTravelPackageDto } from './dto/update-travel-package.dto';
import { TravelPackageService } from './travel-package.service';

@UseGuards(AuthGuard('jwt'))
@Controller('travel-package')
export class TravelPackageController {
  constructor(private readonly travelPackageService: TravelPackageService) {}

  @UseInterceptors(ValidationExceptionInterceptor)
  @Post()
  create(@Body() createTravelPackageDto: CreateTravelPackageDto) {
    return this.travelPackageService.create(createTravelPackageDto);
  }

  @Get()
  async findAll(
    @Query('status', ParseBoolOptionalPipe) status?: boolean,
    @Query('pageNumber', ParseIntOptionalPipe) pageNumber?: number,
    @Query('pageSize', ParseIntOptionalPipe) pageSize?: number,
  ) {
    const travelPackage = await this.travelPackageService.findAll(
      status,
      pageNumber,
      pageSize,
    );

    if (travelPackage['travelPackage'].length < 1) {
      return { message: 'no more travel packages to display', statusCode: 200 };
    }

    return travelPackage;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.travelPackageService.findOne(id);
  }

  @UseInterceptors(ValidationExceptionInterceptor)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id,
    @Body() updateTravelPackageDto: UpdateTravelPackageDto,
  ) {
    return this.travelPackageService.update(id, updateTravelPackageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    return this.travelPackageService.remove(id);
  }
}
