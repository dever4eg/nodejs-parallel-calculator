import { calculateMath } from './calculate-math';

describe('CalculateMath', () => {
  it('should calculate math expression with parenthesis', () => {
    const expression = '(1-1 )*2+3*( 1-3+4)+10/2';

    const result = calculateMath(expression);

    expect(result).toBe(11);
  });
});
