export interface ValidationResult {
  isValid: boolean;
  error?: {
    message: string;
    index?: number;
  };
}
