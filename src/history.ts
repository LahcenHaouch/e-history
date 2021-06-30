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

const mergetHistories = (
  firstHistory: History<number>,
  secondHistory: History<number>
): History<Number> | undefined => {
  //

  const result = {
    defaultValue: firstHistory.defaultValue + secondHistory.defaultValue,
  }

  return undefined
}

export const add = (histories: History<number>[]): History<number> => {
  return histories.reduce(
    (previousValue, currentValue) => ({
      defaultValue: previousValue.defaultValue + currentValue.defaultValue,
      steps: [...previousValue.steps, ...currentValue.steps],
    }),
    {
      defaultValue: 0,
      steps: [],
    }
  )
}
