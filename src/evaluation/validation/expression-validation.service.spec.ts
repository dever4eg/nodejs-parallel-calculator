import { ExpressionValidationService } from './expression-validation.service';
import { ValidationErrorsMessages } from './validation-errors';

describe('ExpressionValidationService', () => {
  let service: ExpressionValidationService;

  beforeEach(async () => {
    service = new ExpressionValidationService();
  });

  it('should be valid expression', () => {
    const expression = '(1-1)*2+3*(1-3+4)+10/2';
    const { isValid } = service.validate(expression);

    expect(isValid).toBe(true);
  });

  it('should return an unexpected character error', () => {
    const expression = '$((1-1)*2+3*(1-3+4)+10/2';
    const { isValid, error } = service.validate(expression);

    expect(isValid).toBe(false);
    expect(error.message).toBe(ValidationErrorsMessages.UNEXPECTED_CHARACTER);
    expect(error.index).toBe(0);
  });

  it('should return a wrong parentheses error', () => {
    const expression = '((1-1)*2+3*(1-3+4)+10/2';
    const { isValid, error } = service.validate(expression);

    expect(isValid).toBe(false);
    expect(error.message).toBe(ValidationErrorsMessages.WRONG_PARENTHESES);
  });

  it('should return a math operator after an opening parentheses error', () => {
    const expression = '(-1-3+4)+10/2';
    const { isValid, error } = service.validate(expression);

    expect(isValid).toBe(false);
    expect(error.message).toBe(
      ValidationErrorsMessages.MATH_OPERATOR_AFTER_PARENTHESES,
    );
    expect(error.index).toBe(0);
  });

  it('should return a two math operator in a row error', () => {
    const expression = '(1-3++4)+10/2';
    const { isValid, error } = service.validate(expression);

    expect(isValid).toBe(false);
    expect(error.message).toBe(ValidationErrorsMessages.CONSECUTIVE_OPERATORS);
    expect(error.index).toBe(5);
  });

  it('should return a leading zero digital number error', () => {
    const expression = '(1-3+4)+01+3';
    const { isValid, error } = service.validate(expression);

    expect(isValid).toBe(false);
    expect(error.message).toBe(ValidationErrorsMessages.LEADING_ZERO);
    expect(error.index).toBe(8);
  });

  it('should return a missing operands error', () => {
    const expression = '1-';
    const { isValid, error } = service.validate(expression);

    expect(isValid).toBe(false);
    expect(error.message).toBe(ValidationErrorsMessages.MISSING_OPERANDS);
    expect(error.index).toBe(1);
  });
});
