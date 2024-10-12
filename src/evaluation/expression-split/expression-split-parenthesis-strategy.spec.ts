import { ExpressionSplitParenthesisStrategy } from './expression-split-parenthesis-strategy';

describe('ExpressionSplitParenthesisStrategy', () => {
  it('should split expression by parenthesis', () => {
    const expression = '(1-1)*2+3*(1-3+4)+10/2';
    const strategy = new ExpressionSplitParenthesisStrategy();

    const result = strategy.split(expression);

    expect(result).toEqual([
      { start: 0, end: 4, expression: '(1-1)' },
      { start: 10, end: 16, expression: '(1-3+4)' },
    ]);
  });
});
