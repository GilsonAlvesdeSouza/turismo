import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './use-cases/auth/auth.module';
import { CustomersModule } from './use-cases/customer/customer.module';
import { UserModule } from './use-cases/user/user.module';
import { TravelPackageModule } from './use-cases/travel-package/travel-package.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CustomersModule,
    UserModule,
    CustomersModule,
    TravelPackageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
