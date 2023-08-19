type Iterable<T> = {
  length: number
  [v: number]: T
}

export function randomElement<T>(array: Iterable<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}
