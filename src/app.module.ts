import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './use-cases/auth/auth.module';
import { CustomersModule } from './use-cases/customer/customer.module';
import { ScheduleModule } from './use-cases/schedule/schedule.module';
import { TravelPackageModule } from './use-cases/travel-package/travel-package.module';
import { UserModule } from './use-cases/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CustomersModule,
    UserModule,
    CustomersModule,
    TravelPackageModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
