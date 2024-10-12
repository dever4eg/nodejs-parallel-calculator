import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EvaluationRequest } from './evaluation.request';
import { EvaluationService } from '../evaluation.service';

@Controller()
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post('/evaluate')
  @HttpCode(200)
  async evaluate(@Body() evaluateRequest: EvaluationRequest) {
    const { expression } = evaluateRequest;

    const result = await this.evaluationService.evaluate(expression);

    return {
      result,
    };
  }
}
