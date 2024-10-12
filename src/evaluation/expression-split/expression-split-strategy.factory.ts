import { ExpressionSplitStrategyInterface } from './expression-split-strategy.interface';
import { ExpressionSplitParenthesisStrategy } from './expression-split-parenthesis-strategy';

export class ExpressionSplitStrategyFactory {
  getSplitStrategy(): ExpressionSplitStrategyInterface {
    return new ExpressionSplitParenthesisStrategy();
  }
}
