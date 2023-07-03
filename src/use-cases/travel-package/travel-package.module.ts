import { Module } from '@nestjs/common';
import { TravelPackageService } from './travel-package.service';
import { TravelPackageController } from './travel-package.controller';

import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TravelPackageController],
  providers: [TravelPackageService],
})
export class TravelPackageModule {}
