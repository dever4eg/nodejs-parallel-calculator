import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { EvaluationModule } from './evaluation/evaluation.module';

async function bootstrap() {
  const app = await NestFactory.create(EvaluationModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
