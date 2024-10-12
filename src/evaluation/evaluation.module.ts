import { Module } from '@nestjs/common';
import { EvaluationController } from './controllers/evaluation.controller';
import { EvaluationService } from './evaluation.service';
import { ExpressionValidationService } from './validation/expression-validation.service';

@Module({
  imports: [],
  controllers: [EvaluationController],
  providers: [EvaluationService, ExpressionValidationService],
})
export class EvaluationModule {}
