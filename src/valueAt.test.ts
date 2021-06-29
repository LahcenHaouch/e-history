import { History, valueAt } from './history'

test('no steps', () => {
  expect(
    valueAt(
      {
        defaultValue: 0,
        steps: [],
      },
      '1900-01-01'
    )
  ).toEqual(0)

  expect(
    valueAt(
      {
        defaultValue: 7,
        steps: [],
      },
      '1900-01-01'
    )
  ).toEqual(7)
})

const history: History<number> = {
  defaultValue: 7,
  steps: [
    { date: '2010-01-01', value: 10 },
    { date: '2015-01-01', value: 20 },
    { date: '2020-01-01', value: 30 },
    { date: '2025-01-01', value: 40 },
  ],
}

test('at date', () => {
  expect(valueAt(history, '2010-01-01')).toEqual(10)
  expect(valueAt(history, '2015-01-01')).toEqual(20)
  expect(valueAt(history, '2020-01-01')).toEqual(30)
  expect(valueAt(history, '2025-01-01')).toEqual(40)
})

test('after last date', () => {
  expect(valueAt(history, '2050-01-01')).toEqual(40)
})

test('between dates', () => {
  expect(valueAt(history, '2012-01-01')).toEqual(10)
  expect(valueAt(history, '2018-01-01')).toEqual(20)
  expect(valueAt(history, '2024-01-01')).toEqual(30)
})

test('before first date', () => {
  expect(valueAt(history, '2001-01-01')).toEqual(7)
})

test('around date', () => {
  // Right before
  expect(valueAt(history, '2014-12-31')).toEqual(10)
  // At date
  expect(valueAt(history, '2015-01-01')).toEqual(20)
  // Right after
  expect(valueAt(history, '2015-01-02')).toEqual(20)
})
