import { ExpressionSplitStrategyInterface } from './expression-split-strategy.interface';
import { SubExpressionRange } from '../interfaces/expression.interface';

export class ExpressionSplitParenthesisStrategy
  implements ExpressionSplitStrategyInterface
{
  split(expression: string): SubExpressionRange[] {
    const subExpressions: SubExpressionRange[] = [];

    let parenthesisCounter = 0;
    let start = 0;

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      const isOpenParenthesis = char === '(';
      const isCloseParenthesis = char === ')';

      if (isOpenParenthesis && parenthesisCounter === 0) {
        start = i;
      }

      if (isOpenParenthesis) {
        parenthesisCounter++;
      }

      if (isCloseParenthesis) {
        parenthesisCounter--;
      }

      if (isCloseParenthesis && parenthesisCounter === 0) {
        subExpressions.push({
          start,
          end: i,
          expression: expression.substring(start, i + 1),
        });
      }
    }

    return subExpressions;
  }
}
