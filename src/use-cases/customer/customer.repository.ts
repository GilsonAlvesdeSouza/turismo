import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
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
  }: CustomerDto): Promise<CustomerDto> {
    const customer = await this.prisma.customer.create({
      data: {
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
      },
    });

    return customer;
  }

  async findAll(id_user?: number): Promise<CustomerDto[]> {
    if (id_user) {
      const customers = await this.prisma.customer.findMany({
        where: {
          id_user,
        },
      });

      return customers;
    }

    const customers = await this.prisma.customer.findMany({});

    return customers;
  }

  async findOne(id: number): Promise<CustomerDto> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    return customer;
  }

  async update(
    id: number,
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
      id_user,
    }: CustomerDto,
  ): Promise<CustomerDto> {
    const customer = await this.prisma.customer.update({
      where: { id },
      data: {
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
      },
    });

    return customer;
  }

  async remove(id: number): Promise<void> {
    await this.prisma.customer.delete({
      where: { id },
    });
  }

  async findByEmail(email: string, id?: number): Promise<CustomerDto> {
    if (id) {
      const customer = await this.prisma.customer.findFirst({
        where: {
          email,
          NOT: {
            id,
          },
        },
      });

      return customer;
    }

    const user = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByCpf(cpf: string, id?: number): Promise<CustomerDto> {
    if (id) {
      const customer = await this.prisma.customer.findFirst({
        where: {
          cpf,
          NOT: {
            id,
          },
        },
      });

      return customer;
    }

    const customer = await this.prisma.customer.findUnique({
      where: {
        cpf,
      },
    });

    return customer;
  }
}
