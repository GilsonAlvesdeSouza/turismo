import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { capitalizeWords } from '../../utils/capitalizeWords';
import { CustomerRepository } from './customer.repository';
import { CustomerDto } from './dto/customer.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly userServices: UserService,
  ) {}

  async createCustomer({
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
  }: CustomerDto) {
    const emailExist = await this.customerRepository.findByEmail(email);

    if (emailExist) {
      throw new ConflictException('Email already exists');
    }

    const cpfCnpjExist = await this.customerRepository.findByCpf(cpf);

    if (cpfCnpjExist) {
      throw new ConflictException('CPF/CNPJ already exists');
    }

    const capitalizedName = capitalizeWords(name);

    const customer = await this.customerRepository.create({
      name: capitalizedName,
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

    return customer;
  }

  async findAllCustomers(id_user: number) {
    const customers = await this.customerRepository.findAll(id_user);

    return customers;
  }

  async findOneCustomer(id: number) {
    const customer = await this.customerRepository.findOne(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async updateCustomer(
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
  ) {
    await this.findOneCustomer(id);

    await this.userServices.findById(id_user);

    const emailExist = await this.customerRepository.findByEmail(email, id);

    if (emailExist) {
      throw new ConflictException('Email already exists');
    }

    const cpfCnpjExist = await this.customerRepository.findByCpf(cpf, id);

    if (cpfCnpjExist) {
      throw new ConflictException('CPF/CNPJ already exists');
    }

    const customerUpdated = await this.customerRepository.update(id, {
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

    return customerUpdated;
  }

  async removeCustomer(id: number) {
    await this.findOneCustomer(id);

    await this.customerRepository.remove(id);
  }
}
