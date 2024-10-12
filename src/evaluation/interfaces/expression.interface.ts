export interface SubExpressionRange {
  start: number;
  end: number;
  expression: string;
}

export interface SubExpressionRangeResult extends SubExpressionRange {
  result: number;
}
