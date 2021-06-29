import { add, History } from './history'

test('add 1 history with no steps', () => {
  const history: History<number> = {
    defaultValue: 2,
    steps: [],
  }

  expect(add([history])).toEqual(history)
})

test('add 1 history with steps', () => {
  const history: History<number> = {
    defaultValue: 2,
    steps: [{ date: '2010-01-01', value: 11 }],
  }

  expect(add([history])).toEqual(history)
})

test('add defaultValues', () => {
  expect(
    add([
      {
        defaultValue: 2,
        steps: [],
      },
      {
        defaultValue: 3,
        steps: [],
      },
    ])
  ).toEqual({
    defaultValue: 5,
    steps: [],
  })
})

test('add steps same date', () => {
  expect(
    add([
      {
        defaultValue: 2,
        steps: [{ date: '2010-01-01', value: 11 }],
      },
      {
        defaultValue: 3,
        steps: [{ date: '2010-01-01', value: 22 }],
      },
    ])
  ).toEqual({
    defaultValue: 5,
    steps: [{ date: '2010-01-01', value: 33 }],
  })
})

test('add solo step', () => {
  const a: History<number> = {
    defaultValue: 2,
    steps: [{ date: '2010-01-01', value: 11 }],
  }
  const b: History<number> = {
    defaultValue: 3,
    steps: [],
  }
  const result: History<number> = {
    defaultValue: 5,
    steps: [{ date: '2010-01-01', value: 14 }],
  }

  // Permutation should work
  expect(add([a, b])).toEqual(result)
  expect(add([b, a])).toEqual(result)
})

test('add multiple steps same date', () => {
  expect(
    add([
      {
        defaultValue: 2,
        steps: [{ date: '2010-01-01', value: 11 }],
      },
      {
        defaultValue: 3,
        steps: [{ date: '2020-01-01', value: 22 }],
      },
    ])
  ).toEqual({
    defaultValue: 5,
    steps: [
      { date: '2010-01-01', value: 14 },
      { date: '2020-01-01', value: 33 },
    ],
  })
})

test('add 3 histories', () => {
  expect(
    add([
      {
        defaultValue: 2,
        steps: [{ date: '2010-01-01', value: 11 }],
      },
      {
        defaultValue: 3,
        steps: [{ date: '2020-01-01', value: 22 }],
      },
      {
        defaultValue: 4,
        steps: [{ date: '2030-01-01', value: 33 }],
      },
    ])
  ).toEqual({
    defaultValue: 9,
    steps: [
      { date: '2010-01-01', value: 18 },
      { date: '2020-01-01', value: 37 },
      { date: '2030-01-01', value: 66 },
    ],
  })
})

test('add 3 large histories', () => {
  const a: History<number> = {
    defaultValue: 1,
    steps: [
      { date: '2010-01-01', value: 2 },
      { date: '2012-01-01', value: 3 },
      { date: '2023-01-01', value: 4 },
      { date: '2025-01-01', value: 5 },
      { date: '2027-01-01', value: 6 },
      { date: '2028-01-01', value: 7 },
      { date: '2029-01-01', value: 8 },
    ],
  }
  const b: History<number> = {
    defaultValue: 10,
    steps: [
      { date: '2020-01-01', value: 20 },
      { date: '2024-01-01', value: 30 },
      { date: '2027-01-01', value: 40 },
    ],
  }
  const c: History<number> = {
    defaultValue: 100,
    steps: [
      { date: '2020-01-01', value: 200 },
      { date: '2023-01-01', value: 300 },
      { date: '2026-01-01', value: 400 },
      { date: '2027-01-01', value: 500 },
    ],
  }
  const result: History<number> = {
    defaultValue: 111,
    steps: [
      { date: '2010-01-01', value: 112 },
      { date: '2012-01-01', value: 113 },
      { date: '2020-01-01', value: 223 },
      { date: '2023-01-01', value: 324 },
      { date: '2024-01-01', value: 334 },
      { date: '2025-01-01', value: 335 },
      { date: '2026-01-01', value: 435 },
      { date: '2027-01-01', value: 546 },
      { date: '2028-01-01', value: 547 },
      { date: '2029-01-01', value: 548 },
    ],
  }

  expect(add([a, b, c])).toEqual(result)
  expect(add([a, c, b])).toEqual(result)
  expect(add([b, a, c])).toEqual(result)
  expect(add([b, c, a])).toEqual(result)
  expect(add([c, a, b])).toEqual(result)
  expect(add([c, b, a])).toEqual(result)
})
