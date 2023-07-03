import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './use-cases/auth/auth.module';
import { CustomersModule } from './use-cases/customer/customer.module';
import { UserModule } from './use-cases/user/user.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    AuthModule,
    CustomersModule,
    UserModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}