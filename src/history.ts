export interface HistoryStep<T> {
  date: string
  value: T
}

export interface History<T> {
  steps: HistoryStep<T>[]
  defaultValue: T
}

export const valueAt = <T>(history: History<T>, date: string): T => {
  // @ts-ignore
  return // TODO
}

export const add = (histories: History<number>[]): History<number> => {
  // @ts-ignore
  return // TODO
}
