import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../database/prisma.service';
import { Utils } from '../../utils/utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const emailInUse = await this.findByEmail(data.email);

    if (emailInUse) {
      throw new ConflictException('Email already exists');
    }

    data.password = hashSync(String(data.password), 10);

    data.name = Utils.capitalizeWords(data.name);

    return await this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        deletedAt: null,
      },
    });
  }

  async findAllTrashedUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      where: {
        deletedAt: {
          not: null,
        },
      },
    });
  }

  async findById(id: number) {
    if (isNaN(id) || id < 1) {
      throw new BadRequestException('Invalid id');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateUser(id: number, data: UpdateUserDto) {
    await this.findById(id);

    if (data.email) {
      const emailInUse = await this.findByEmail(data.email, id);

      if (emailInUse) throw new ConflictException('Email already exists');
    }

    data.name = Utils.capitalizeWords(data.name);

    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async softDelete(id: number) {
    await this.findById(id);

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async hardDelete(id: number) {
    await this.findById(id);

    return await this.prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async restoreUser(id: number) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findByEmail(email: string, id?: number) {
    if (id) {
      return await this.prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id,
          },
        },
      });
    }

    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
