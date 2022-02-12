export function pure<T = object>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}
