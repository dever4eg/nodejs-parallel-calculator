import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EvaluationRequest } from './evaluation.request';

@Controller()
export class EvaluationController {
  @Post('/evaluate')
  @HttpCode(200)
  async evaluate(@Body() evaluateRequest: EvaluationRequest) {
    const { expression } = evaluateRequest;

    const result = await eval(expression);

    return {
      result,
    };
  }
}
