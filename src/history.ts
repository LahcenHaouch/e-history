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

const mergeHistories = (
  firstHistory: History<number>,
  secondHistory: History<number>,
  index: number,
  histories: Array<History<number>>
): History<number> => {
  let biggerHistory: History<number>, smallerHistory: History<number>

  const previousHistoryDefaultValue = histories[index]?.defaultValue

  const firstIsBigger = previousHistoryDefaultValue
    ? previousHistoryDefaultValue > secondHistory.defaultValue
    : firstHistory.defaultValue > secondHistory.defaultValue

  if (firstIsBigger) {
    biggerHistory = firstHistory
    smallerHistory = secondHistory
  } else {
    biggerHistory = secondHistory
    smallerHistory = firstHistory
  }

  const result: History<number> = {
    defaultValue: biggerHistory.defaultValue + smallerHistory.defaultValue,
    steps: smallerHistory.steps.map(({ date, value }) => {
      const biggerHistorySameStepValue = biggerHistory.steps.find(
        (step) => step.date === date
      )?.value

      const filteredSmallerStepValues = biggerHistory.steps
        .filter((step) => step.date < date)
        .map((step) => step.value)

      const biggerHistorySmallerStepValue = filteredSmallerStepValues.length
        ? Math.max(...filteredSmallerStepValues)
        : biggerHistory.defaultValue

      return {
        value:
          value +
          (biggerHistorySameStepValue
            ? biggerHistorySameStepValue
            : biggerHistorySmallerStepValue
            ? biggerHistorySmallerStepValue
            : biggerHistory.defaultValue),
        date,
      }
    }),
  }

  result.steps.push(
    ...biggerHistory.steps
      .filter(
        (step) =>
          !smallerHistory.steps.some(
            (resultStep) => resultStep.date === step.date
          )
      )
      .map(({ date, value }) => {
        const filteredSmallerSteps = smallerHistory.steps
          .filter((step) => step.date < date)
          .map((step) => step.value)

        return {
          value:
            value +
            (filteredSmallerSteps.length
              ? Math.max(...filteredSmallerSteps)
              : 0),
          date,
        }
      })
  )

  result.steps.sort((stepOne, stepTwo) =>
    stepOne.date > stepTwo.date ? 1 : -1
  )

  return result
}

export const add = (histories: History<number>[]): History<number> => {
  const addHistories = [...histories].sort(
    (firstHistory, secondHistory) =>
      firstHistory.defaultValue - secondHistory.defaultValue
  )

  const result = addHistories.reduce(
    (previousValue, currentValue, index) =>
      mergeHistories(previousValue, currentValue, index - 1, addHistories),
    {
      defaultValue: 0,
      steps: [],
    }
  )

  result.steps.sort((stepOne, stepTwo) =>
    stepOne.date > stepTwo.date ? 1 : -1
  )

  return result
}
