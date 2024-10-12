import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { ExpressionValidationService } from './validation/expression-validation.service';
import { calculateMath } from './math/calculate-math';

@Injectable()
export class EvaluationService {
  constructor(private readonly validation: ExpressionValidationService) {}

  async evaluate(expression: string): Promise<number> {
    const { isValid, error } = this.validation.validate(expression);

    if (!isValid) {
      throw new UnprocessableEntityException(error);
    }

    return calculateMath(expression);
  }
}
