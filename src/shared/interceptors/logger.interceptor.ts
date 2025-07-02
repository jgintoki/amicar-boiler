import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DefaultLogger } from '../helpers/sign-logger.helper';
import { getTimeDuration } from '../helpers/get-time-duration.helper';

const getRequestData = (data: unknown): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (data && data['body'] && Object.keys(data['body']).length > 0) {
    result.body = data['body'] as Record<string, unknown>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (data && data['query'] && Object.keys(data['query']).length > 0) {
    result.query = data['query'] as Record<string, unknown>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (data && data['params'] && Object.keys(data['params']).length > 0) {
    result.params = data['params'] as Record<string, unknown>;
  }

  return result;
};

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new DefaultLogger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const id = Math.random().toString(30).substring(2, 15);
    const initDate = new Date();
    this.logger.init({
      message: `[${id}] Request - Url: ${request.url}, ${request.method}, date: ${initDate.toISOString()}`,
      objects: getRequestData(request),
    });

    return next.handle().pipe(
      tap((data: Record<string, unknown>) => {
        const { toSeconds, endDate } = getTimeDuration(initDate);

        this.logger.end({
          message: `[${id}] Response - Url: ${request.url}, Date: ${endDate.toISOString()}, Duration: ${toSeconds}s`,
          objects: data,
        });
      }),

      catchError((error) => {
        const { toSeconds, endDate } = getTimeDuration(initDate);

        const castedError = error as Error;

        this.logger.error({
          message: `[${id}] Response - Url: ${request.url}, Date: ${endDate.toISOString()}, Duration: ${toSeconds}s, Error:${castedError.message}`,
          trace: castedError?.stack,
        });

        throw error;
      }),
    );
  }
}
