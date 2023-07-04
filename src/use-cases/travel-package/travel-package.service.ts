import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { calcPageServices } from 'src/utils/calcPageServices';
import { capitalizeWords } from 'src/utils/capitalizeWords';
import { CreateTravelPackageDto } from './dto/create-travel-package.dto';
import { UpdateTravelPackageDto } from './dto/update-travel-package.dto';

@Injectable()
export class TravelPackageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateTravelPackageDto) {
    data.name = capitalizeWords(data.name);
    data.destinationCity = capitalizeWords(data.destinationCity);
    data.destinationState = capitalizeWords(data.destinationState);
    this.stringToDate(data);

    return await this.prisma.travelPackage.create({
      data,
    });
  }

  async findAll(status: boolean, pageNumber: number, pageSize: number) {
    const countRecords = await this.prisma.travelPackage.count({
      where: {
        status,
      },
    });

    const { skip, take, pageCount, pageNumberReq } = calcPageServices(
      pageNumber,
      pageSize,
      countRecords,
    );

    const travelPackage = await this.prisma.travelPackage.findMany({
      where: {
        status: status ?? undefined,
      },
      select: {
        id: true,
        name: true,
        description: true,
        startDate: true,
        endDate: true,
        price: true,
        status: true,
        Schedule: {
          select: {
            id: true,
            paid: true,
            Customer: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
            User: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },

          skip,
          take,
        },
      },
    });

    return {
      pagination: {
        pageCount,
        currentPage: pageNumberReq,
        pageSize: take,
      },
      travelPackage,
    };
  }

  async findById(id: number) {
    const user = await this.prisma.travelPackage.findUnique({
      where: { id },
      include: {
        Schedule: {
          select: {
            id: true,
            paid: true,
            Customer: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
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

    if (!user) {
      throw new NotFoundException('Travel package not found');
    }

    return user;
  }

  async update(id: number, data: UpdateTravelPackageDto) {
    await this.findById(id);

    this.stringToDate(data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { includedItems, images, ...dataUpdate } = data;

    return await this.prisma.travelPackage.update({
      where: { id },
      data: {
        ...dataUpdate,
        includedItems: {
          set: data.includedItems ?? [],
        },
        images: {
          set: data.images ?? [],
        },
      },
    });
  }

  async remove(id: number) {
    await this.findById(id);

    return await this.prisma.travelPackage.delete({
      where: { id },
    });
  }

  async calculateEarnings(id: number) {
    const result = await this.prisma.travelPackage.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        price: true,
        Schedule: {
          select: {
            paid: true,
          },
        },
      },
    });

    const [{ price, Schedule }] = result;

    let earnings = 0;
    let totalPaidPackages = 0;
    Schedule.forEach((el) => {
      if (el.paid) {
        totalPaidPackages++;
        earnings += price;
      }
    });

    return { earnings, totalPaidPackages };
  }

  private stringToDate(data: UpdateTravelPackageDto) {
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);
  }
}
