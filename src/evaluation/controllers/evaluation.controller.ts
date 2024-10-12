import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EvaluationRequest } from './evaluation.request';
import { calculateMath } from '../math/calculate-math';

@Controller()
export class EvaluationController {
  @Post('/evaluate')
  @HttpCode(200)
  async evaluate(@Body() evaluateRequest: EvaluationRequest) {
    const { expression } = evaluateRequest;

    const result = await calculateMath(expression);

    return {
      result,
    };
  }
}
