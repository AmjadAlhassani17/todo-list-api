import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { method, url } = request;
    const now = Date.now();
    this.logger.log(context.getClass().name);

    return next.handle().pipe(
      tap(
        () => {
          this.logger.log(`Request: ${method} ${url} - ${Date.now() - now}ms`);
          this.logger.log(
            `Response: ${method} ${url} - ${Date.now() - now}ms - Status: ${
              response.statusCode
            }`,
          );
        },
        (error) =>
          this.logger.error(`something bad happened : ${error.message}`),
      ),
    );
  }
}
