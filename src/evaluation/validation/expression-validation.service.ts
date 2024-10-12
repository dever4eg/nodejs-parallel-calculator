import { Injectable } from '@nestjs/common';
import { ValidationResult } from './validation-result.interface';
import { ValidationErrorsMessages } from './validation-errors';

const MATH_OPERATORS = new Set(['+', '-', '*', '/']);
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
const PARENTHESES = new Set(['(', ')']);

@Injectable()
export class ExpressionValidationService {
  validate(expression: string): ValidationResult {
    let parenthesesCount = 0;

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      const prevChar = i > 0 ? expression[i - 1] : null;
      const nextChar = i < expression.length - 1 ? expression[i + 1] : null;

      if (char === ' ') {
        continue;
      }

      if (
        !MATH_OPERATORS.has(char) &&
        !NUMBER_DIGITS.has(char) &&
        !PARENTHESES.has(char)
      ) {
        return {
          isValid: false,
          error: {
            message: ValidationErrorsMessages.UNEXPECTED_CHARACTER,
            index: i,
          },
        };
      }

      if (parenthesesCount < 0) {
        return {
          isValid: false,
          error: {
            message: ValidationErrorsMessages.WRONG_PARENTHESES,
            index: i,
          },
        };
      }

      if (char === '(') {
        parenthesesCount++;

        if (MATH_OPERATORS.has(nextChar)) {
          return {
            isValid: false,
            error: {
              message: ValidationErrorsMessages.MATH_OPERATOR_AFTER_PARENTHESES,
              index: i,
            },
          };
        }
      }

      if (char === ')') {
        parenthesesCount--;
      }

      if (
        MATH_OPERATORS.has(char) &&
        prevChar &&
        MATH_OPERATORS.has(prevChar)
      ) {
        return {
          isValid: false,
          error: {
            message: ValidationErrorsMessages.CONSECUTIVE_OPERATORS,
            index: i,
          },
        };
      }

      if (
        char === '0' &&
        MATH_OPERATORS.has(prevChar) &&
        NUMBER_DIGITS.has(nextChar)
      ) {
        return {
          isValid: false,
          error: {
            message: ValidationErrorsMessages.LEADING_ZERO,
            index: i,
          },
        };
      }

      if (
        MATH_OPERATORS.has(char) &&
        (i === 0 || i === expression.length - 1)
      ) {
        return {
          isValid: false,
          error: {
            message: ValidationErrorsMessages.MISSING_OPERANDS,
            index: i,
          },
        };
      }
    }

    if (parenthesesCount !== 0) {
      return {
        isValid: false,
        error: {
          message: ValidationErrorsMessages.WRONG_PARENTHESES,
        },
      };
    }

    return { isValid: true };
  }
}
