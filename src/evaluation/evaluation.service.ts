import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  SubExpressionRange,
  SubExpressionRangeResult,
} from './interfaces/expression.interface';
import { ExpressionSplitStrategyFactory } from './expression-split/expression-split-strategy.factory';
import { ExpressionValidationService } from './validation/expression-validation.service';
import { CalculateMathAsyncService } from './workers/calculate-math-async.service';
import { calculateMath } from './math/calculate-math';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly validation: ExpressionValidationService,
    private readonly splitStrategyFactory: ExpressionSplitStrategyFactory,
    private readonly calculateMathAsyncService: CalculateMathAsyncService,
  ) {}

  async evaluate(expression: string): Promise<number> {
    const { isValid, error } = this.validation.validate(expression);

    if (!isValid) {
      throw new UnprocessableEntityException(error);
    }

    const subExpressionRanges = this.split(expression);

    const subExpressionRangeResults = await this.runInParallel(
      subExpressionRanges,
    );

    const mainExpression = this.substituteCalculatedParts(
      expression,
      subExpressionRangeResults,
    );

    return calculateMath(mainExpression);
  }

  split(expression: string): SubExpressionRange[] {
    const strategy = this.splitStrategyFactory.getSplitStrategy();

    return strategy.split(expression);
  }

  substituteCalculatedParts(
    expression: string,
    results: SubExpressionRangeResult[],
  ): string {
    let mainExpr = '';

    let leftPointer = 0;

    results.sort((a, b) => a.start - b.start);

    for (const part of results) {
      mainExpr += expression.substring(leftPointer, part.start);
      mainExpr += part.result;
      leftPointer = part.end + 1;
    }

    if (leftPointer < expression.length) {
      mainExpr += expression.substring(leftPointer);
    }

    return mainExpr;
  }

  async runInParallel(
    subExpressionRanges: SubExpressionRange[],
  ): Promise<SubExpressionRangeResult[]> {
    const maxParallel = 4;
    const queue = [...subExpressionRanges];
    const results: SubExpressionRangeResult[] = [];

    let running = 0;

    const process = async (subExprRange: SubExpressionRange) => {
      const result = await this.calculateMathAsyncService.calculateMathAsync(
        subExprRange.expression,
      );

      return {
        ...subExprRange,
        result,
      };
    };

    const runNext = async () => {
      if (queue.length > 0 && running < maxParallel) {
        const subExprRange = queue.shift();
        running++;
        const result = await process(subExprRange);
        running--;
        results.push(result);
        await runNext();
      }
    };

    const initialPromises = [];
    for (let i = 0; i < maxParallel && queue.length > 0; i++) {
      initialPromises.push(runNext());
    }

    await Promise.all(initialPromises);

    return results;
  }
}
