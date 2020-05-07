import { setTime } from '../src/utils'

describe('setTime', () => {
  test('should return first date with the time of the second date', () => {
    const dateWithNoTime = new Date(2021, 2, 13)
    const dateWithTime = new Date(2020, 1, 24, 18, 30)

    expect(setTime(dateWithNoTime, dateWithTime)).toEqual(new Date(2021, 2, 13, 18, 30))
  })
})
