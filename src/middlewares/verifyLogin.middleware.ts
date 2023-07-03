import {
  HttpStatus,
  NestMiddleware,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { LoginDto } from '../use-cases/auth/dto/login.dto';

export class VerifyLoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const loginDto = plainToClass(LoginDto, req.body);

    const errors = await validate(loginDto);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) =>
        Object.values(error.constraints),
      );
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: errorMessages[0][0],
      });
    }

    next();
  }
}
