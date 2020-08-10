import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { format, startOfMonth, subMonths } from 'date-fns'
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

  it('should display pre-selected date’s month on initial render', () => {
    const pastDate = subMonths(new Date(), 1)
    const monthName = format(pastDate, 'LLLL', { locale })

    const { getByText } = render(<DatePickerCalendar locale={locale} date={pastDate} />)

    expect(getByText(monthName, { exact: false })).toBeInTheDocument()
  })

  it('should maintain the selected date’s time when selecting a new date', () => {
    const handleDateChange = jest.fn()
    const date = new Date(2020, 1, 24, 18, 30)

    const { getByText } = render(<DatePickerCalendar locale={locale} date={date} onDateChange={handleDateChange} />)

    fireEvent.click(getByText('25'))

    expect(handleDateChange).toHaveBeenCalledWith(new Date(2020, 1, 25, 18, 30))
  })
})
