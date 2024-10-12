import { Module } from '@nestjs/common';
import { EvaluationController } from './controllers/evaluation.controller';

@Module({
  imports: [],
  controllers: [EvaluationController],
  providers: [],
})
export class EvaluationModule {}
