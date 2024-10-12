import { Module } from '@nestjs/common';
import { EvaluationController } from './controllers/evaluation.controller';
import { EvaluationService } from './evaluation.service';
import { ExpressionValidationService } from './validation/expression-validation.service';
import { CalculateMathAsyncService } from './workers/calculate-math-async.service';
import { ExpressionSplitStrategyFactory } from './expression-split/expression-split-strategy.factory';

@Module({
  imports: [],
  controllers: [EvaluationController],
  providers: [
    EvaluationService,
    ExpressionValidationService,
    ExpressionSplitStrategyFactory,
    CalculateMathAsyncService,
  ],
})
export class EvaluationModule {}
