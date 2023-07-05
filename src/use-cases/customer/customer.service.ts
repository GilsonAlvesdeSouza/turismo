import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UserService } from '../user/user.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Utils } from '../../utils/utils';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userServices: UserService,
  ) {}

  async create(data: CreateCustomerDto) {
    const emailExist = await this.findByEmail(data.email);

    if (emailExist) {
      throw new ConflictException('Email already exists');
    }

    const cpfExist = await this.findByCpf(data.cpf);

    if (cpfExist) {
      throw new ConflictException('CPF/CNPJ already exists');
    }

    capitalizeFields(data);

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

    // data.name = Utils.capitalizeWords(data.name);
    capitalizeFields(data);

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

function capitalizeFields(data: UpdateCustomerDto) {
  data.name = Utils.capitalizeWords(data.name);
  data.city = Utils.capitalizeWords(data.city);
  data.street = Utils.capitalizeWords(data.street);
  data.neighborhood = Utils.capitalizeWords(data.neighborhood);
  data.adrees_line = Utils.capitalizeWords(data.adrees_line);
}
