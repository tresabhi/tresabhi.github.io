export function makeDate(time?: string) {
  if (time === undefined) return new Date();
  return new Date(time);
}
