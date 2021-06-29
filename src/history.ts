export interface HistoryStep<T> {
  date: string
  value: T
}

export interface History<T> {
  steps: HistoryStep<T>[]
  defaultValue: T
}

export const valueAt = <T>(history: History<T>, date: string): T => {
  const { steps, defaultValue } = history

  if (!steps.length || date < steps[0].date) {
    return defaultValue
  }

  for (let i = 0; i < steps.length; i++) {
    const { date: currentStepDate, value } = steps[i]

    if (currentStepDate === date || i === steps.length - 1) {
      return value
    }

    const { date: nextStepDate } = steps[i + 1]

    if (currentStepDate < date && nextStepDate > date) {
      return value
    }
  }

  return defaultValue
}

export const add = (histories: History<number>[]): History<number> => {
  // @ts-ignore
  return // TODO
}
