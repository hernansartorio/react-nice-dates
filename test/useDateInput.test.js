import { renderHook } from '@testing-library/react-hooks'
import { enGB } from 'date-fns/locale'
import useDateInput from '../src/useDateInput'

describe('useDateInput', () => {
  test('should return input props', () => {
    const { result } = renderHook(() => useDateInput({
      locale: enGB,
      onDateChange: () => {}
    }))

    expect(result.current).toMatchObject({
      onFocus: expect.any(Function),
      onChange: expect.any(Function),
      onBlur: expect.any(Function),
      placeholder: enGB.formatLong.date({ width: 'short' }).toUpperCase(),
      type: 'text',
      value: ''
    })
  })
})
