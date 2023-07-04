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
import { ValidationExceptionInterceptor } from '../../interceptors/validationExceptionInterceptor';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
@UseGuards(AuthGuard('jwt'))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseInterceptors(ValidationExceptionInterceptor)
  async create(
    @Body()
    data: CreateCustomerDto,
    @Req() req: Request,
  ) {
    const id_user = req.user['id'] as number;

    data.id_user = id_user;

    return await this.customerService.create(data);
  }

  @Get()
  async findAll(@Query('id_user', ParseIntPipe) id_user) {
    return await this.customerService.findAll(id_user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    return await this.customerService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(ValidationExceptionInterceptor)
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdateCustomerDto,
    @Req() req: Request,
  ) {
    const id_user = req.user['id'] as number;

    data.id_user = id_user;

    return await this.customerService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id) {
    return await this.customerService.remove(id);
  }
}
