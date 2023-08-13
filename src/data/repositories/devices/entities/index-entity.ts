export interface IndexEntity {
  Data: any[];
  Limit: number;
  Links: Map<string, Map<string, string>>,
  Offset: number,
  Total: number
}
