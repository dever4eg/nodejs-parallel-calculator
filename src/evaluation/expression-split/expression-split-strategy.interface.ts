import { SubExpressionRange } from '../interfaces/expression.interface';

export interface ExpressionSplitStrategyInterface {
  split(expression: string): SubExpressionRange[];
}
