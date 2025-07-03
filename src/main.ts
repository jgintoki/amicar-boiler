import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import helmet from '@fastify/helmet';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(helmet);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new LoggerInterceptor());

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port')!;
  await app.listen(port, () => {
    console.log(`Application is running on: ${port}`);
  });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
