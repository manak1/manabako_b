import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['https://manabako.vercel.app', 'https://manabako-cms.vercel.app']
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
