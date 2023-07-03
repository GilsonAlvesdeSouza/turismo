import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { capitalizeWords } from '../../utils/capitalizeWords';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser({ name, email, password }: CreateUserDto) {
    const emailInUse = await this.userRepository.findByEmail(email);

    if (emailInUse) {
      throw new ConflictException('Email already exists');
    }

    const encryptedPassword = hashSync(String(password), 10);

    const capitalizedNome = capitalizeWords(name);

    const user = await this.userRepository.create({
      name: capitalizedNome,
      email,
      password: encryptedPassword,
    });

    return user;
  }

  findAllUsers() {
    const users = this.userRepository.findAll();
    return users;
  }

  findAllTrashedUsers() {
    const users = this.userRepository.findAllTrashed();
    return users;
  }

  async findOneUser(id: number) {
    if (isNaN(id) || id < 1) {
      throw new BadRequestException('Invalid id');
    }
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: number, { name, email }: UpdateUserDto) {
    await this.findOneUser(id);

    const emailInUse = await this.userRepository.findByEmail(email, id);

    if (emailInUse) throw new ConflictException('Email already exists');

    const capitalizedNome = capitalizeWords(name);

    const user = await this.userRepository.update(id, {
      name: capitalizedNome,
      email,
    });

    return user;
  }

  async softDeleteUser(id: number) {
    await this.findOneUser(id);

    const user = await this.userRepository.softDelete(id);

    return user;
  }

  async hardDeleteUser(id: number) {
    await this.findOneUser(id);

    const user = await this.userRepository.hardDelete(id);

    return user;
  }

  async restoreUser(id: number) {
    await this.findOneUser(id);

    const user = await this.userRepository.restore(id);

    return user;
  }
}
