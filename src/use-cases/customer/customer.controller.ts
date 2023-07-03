import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Delete,
  UseGuards,
  UseInterceptors,
  Put,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidationExceptionInterceptor } from '../../interceptors/validationExceptionInterceptor';
import { Request } from 'express';

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseInterceptors(ValidationExceptionInterceptor)
  async create(
    @Body()
    {
      name,
      email,
      cpf,
      phone,
      zip_code,
      street,
      neighborhood,
      city,
      state,
      adrees_line,
      status,
    }: CustomerDto,
    @Req() req: Request,
  ) {
    const id_user = req.user['id'] as number;

    return await this.customerService.createCustomer({
      name,
      email,
      cpf,
      phone,
      zip_code,
      street,
      neighborhood,
      city,
      state,
      adrees_line,
      status,
      id_user,
    });
  }

  @Get()
  async findAll(@Query('id_user') id_user: number) {
    return await this.customerService.findAllCustomers(+id_user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.customerService.findOneCustomer(+id);
  }

  @Put(':id')
  @UseInterceptors(ValidationExceptionInterceptor)
  async update(@Param('id') id: string, @Body() customerDto: CustomerDto) {
    return await this.customerService.updateCustomer(+id, customerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.customerService.removeCustomer(+id);
  }
}