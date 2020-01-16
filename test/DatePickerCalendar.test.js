import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { startOfMonth } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import DatePickerCalendar from '../src/DatePickerCalendar'

describe('DatePickerCalendar', () => {
  it('should render', () => {
    const { getAllByText } = render(<DatePickerCalendar locale={locale} />)

    expect(getAllByText('1').length).toBeGreaterThan(0)
  })

  it('should call onDateChange on date selection', () => {
    const handleDateChange = jest.fn()

    const { getAllByText } = render(<DatePickerCalendar locale={locale} onDateChange={handleDateChange} />)

    fireEvent.click(getAllByText('1')[0])

    expect(handleDateChange).toHaveBeenCalledTimes(1)
  })

  it('should display selected date', () => {
    const { getAllByText } = render(<DatePickerCalendar locale={locale} date={startOfMonth(new Date())} />)

    expect(getAllByText('1')[0].parentElement).toHaveClass('-selected')
  })
})
