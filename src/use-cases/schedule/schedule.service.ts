import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateScheduleDto) {
    return await this.prisma.schedule.create({ data });
  }

  async findAll() {
    return await this.prisma.schedule.findMany({
      select: {
        id: true,
        paid: true,
        typeOfPayment: true,
        Customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        Package: {
          select: {
            id: true,
            name: true,
            description: true,
            startDate: true,
            endDate: true,
            price: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdAt: true,
      },
    });
  }

  async findById(id: number) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      select: {
        id: true,
        paid: true,
        price: true,
        installments: true,
        typeOfPayment: true,
        valueOfInstallments: true,
        Customer: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            phone: true,
            zip_code: true,
            street: true,
            neighborhood: true,
            city: true,
            state: true,
            adrees_line: true,
            status: true,
          },
        },
        Package: {
          select: {
            id: true,
            name: true,
            description: true,
            startDate: true,
            endDate: true,
            price: true,
            status: true,
            numberOfPeople: true,
            numberOfDays: true,
            numberOfNights: true,
            destinationCity: true,
            destinationState: true,
            includedItems: true,
            images: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Ticket: {
          select: {
            id: true,
            paid: true,
            dueDate: true,
            value: true,
            User: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

  async update(id: number, data: UpdateScheduleDto) {
    await this.findById(id);

    return await this.prisma.schedule.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findById(id);

    await this.prisma.schedule.delete({ where: { id } });
  }
}
