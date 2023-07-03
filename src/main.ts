import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT, () => {
    console.log(
      `Server is running on port ${process.env.APP_PORT}\n${process.env.APP_URL}:${process.env.APP_PORT}`,
    );
  });
}
bootstrap();
