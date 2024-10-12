const NUMBER_DIGITS = new Set([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
]);

const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0);

export const calculateMath = (expression: string): number => {
  const calculateMathRecursive = (
    stack: number[],
    i: number,
  ): [number, number] => {
    // add $ to the end of the expression to handle the last number
    expression = expression + '$';

    let num = 0;
    let sign: string = '+';

    while (i < expression.length) {
      const char = expression[i];

      if (char === ' ') {
        i++;
        continue;
      }

      if (NUMBER_DIGITS.has(char)) {
        num = 10 * num + parseInt(char);
        i++;
      } else if (char === '(') {
        [num, i] = calculateMathRecursive([], i + 1);
      } else {
        if (sign === '+') stack.push(num);
        if (sign === '-') stack.push(-num);
        if (sign === '*') stack.push(stack.pop() * num);
        if (sign === '/') stack.push(stack.pop() / num);

        num = 0;
        i++;

        if (char === ')') {
          return [sum(stack), i];
        }

        sign = char;
      }
    }

    return [sum(stack), i];
  };

  return calculateMathRecursive([], 0)[0];
};
