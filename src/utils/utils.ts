export function pp(obj?: any | null): string {
  if (!obj) return "null";
  return JSON.stringify(obj, null, 2);
}
