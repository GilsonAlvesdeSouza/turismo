import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    name,
    email,
    password,
  }: CreateUserDto): Promise<Partial<CreateUserDto>> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  async findAll(): Promise<Partial<CreateUserDto>[]> {
    const users = await this.prisma.user.findMany({
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
    return users;
  }

  async findAllTrashed(): Promise<Partial<CreateUserDto>[]> {
    const users = await this.prisma.user.findMany({
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
    return users;
  }

  async findById(id: number): Promise<Partial<CreateUserDto> | null> {
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
    return user;
  }

  async update(
    id: number,
    { name, email }: UpdateUserDto,
  ): Promise<UpdateUserDto | null> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }

  async findByEmail(email: string, id?: number): Promise<CreateUserDto> {
    if (id) {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id,
          },
        },
      });

      return user;
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async softDelete(id: number) {
    const user = await this.prisma.user.update({
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

    return user;
  }

  async hardDelete(id: number) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  async restore(id: number) {
    const user = await this.prisma.user.update({
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

    return user;
  }
}
