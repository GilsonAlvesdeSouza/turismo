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
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ValidationExceptionInterceptor } from 'src/interceptors/validationException.interceptor';
import { ParseBoolOptionalPipe } from 'src/pipes/parseBoolOptional.pipe';
import { ParseIntOptionalPipe } from 'src/pipes/parseIntOptional.pipe';
import { CreateTravelPackageDto } from './dto/create-travel-package.dto';
import { UpdateTravelPackageDto } from './dto/update-travel-package.dto';
import { TravelPackageService } from './travel-package.service';

@UseGuards(AuthGuard('jwt'))
@Controller('travel-package')
export class TravelPackageController {
  constructor(private readonly travelPackageService: TravelPackageService) {}

  @UseInterceptors(ValidationExceptionInterceptor)
  @Post()
  create(@Body() data: CreateTravelPackageDto, @Req() req: Request) {
    const idUser = req.user['id'] as number;
    data.idUser = idUser;

    return this.travelPackageService.create(data);
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
    return this.travelPackageService.findById(id);
  }

  @UseInterceptors(ValidationExceptionInterceptor)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdateTravelPackageDto,
    @Req() req: Request,
  ) {
    const idUser = req.user['id'] as number;
    data.idUser = idUser;

    return this.travelPackageService.update(id, data);
  }

  @Get(':id/calculate-earnings')
  async calculateEarnings(@Param('id', ParseIntPipe) id) {
    return await this.travelPackageService.calculateEarnings(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    return this.travelPackageService.remove(id);
  }
}
