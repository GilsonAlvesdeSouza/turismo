import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ValidationExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err?.response?.message && Array.isArray(err.response.message)) {
          const errorMessage = err.response.message[0];

          const statusCode = HttpStatus.UNPROCESSABLE_ENTITY;

          return throwError(() => {
            return {
              statusCode,
              message: errorMessage,
            };
          });
        }

        return throwError(() => err);
      }),
    );
  }
}
