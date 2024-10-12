import { IsString } from 'class-validator';

export class EvaluationRequest {
  @IsString()
  expression: string;
}
