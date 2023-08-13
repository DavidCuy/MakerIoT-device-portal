export interface IndexEntity<T> {
  Data: T[],
  Limit: number,
  Links: Map<string, Map<string, string>>,
  Offset: number,
  Total: number
}
