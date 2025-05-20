import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiLogsInterceptor } from './interceptors/logs.interceptor';
import { ErrorHandler } from './interceptors/ErrorHandler';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorHandler());
  app.useGlobalInterceptors(new ApiLogsInterceptor());  //global interceptor for all api requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
