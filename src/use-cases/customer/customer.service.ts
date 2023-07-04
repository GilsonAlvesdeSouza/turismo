import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from '../user/user.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CapitalizeWordsFields } from 'src/decorators/capitalizeWords.decorator';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userServices: UserService,
  ) {}

  @CapitalizeWordsFields(['name'])
  async create(data: CreateCustomerDto) {
    const emailExist = await this.findByEmail(data.email);

    if (emailExist) {
      throw new ConflictException('Email already exists');
    }

    const cpfCnpjExist = await this.findByCpf(data.cpf);

    if (cpfCnpjExist) {
      throw new ConflictException('CPF/CNPJ already exists');
    }

    return await this.prisma.customer.create({ data });
  }

  async findAll(idUser: number) {
    if (idUser) {
      const customers = await this.prisma.customer.findMany({
        where: {
          idUser,
        },
      });

      return customers;
    }

    const customers = await this.prisma.customer.findMany({});

    return customers;
  }

  async findById(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  @CapitalizeWordsFields(['name'])
  async update(id: number, data: UpdateCustomerDto) {
    await this.findById(id);

    await this.userServices.findById(data.idUser);

    if (data.email) {
      const emailExist = await this.findByEmail(data.email, id);

      if (emailExist) {
        throw new ConflictException('Email already exists');
      }
    }

    if (data.cpf) {
      const cpfExist = await this.findByCpf(data.cpf, id);

      if (cpfExist) {
        throw new ConflictException('CPF already exists');
      }
    }

    return await this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findById(id);
    await this.prisma.customer.delete({
      where: { id },
    });
  }

  async findByEmail(email: string, id?: number) {
    if (id) {
      return await this.prisma.customer.findFirst({
        where: {
          email,
          NOT: {
            id,
          },
        },
      });
    }

    return await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });
  }

  async findByCpf(cpf: string, id?: number): Promise<CreateCustomerDto> {
    if (id) {
      return await this.prisma.customer.findFirst({
        where: {
          cpf,
          NOT: {
            id,
          },
        },
      });
    }

    return await this.prisma.customer.findUnique({
      where: {
        cpf,
      },
    });
  }
}
