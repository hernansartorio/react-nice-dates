import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { addDays, format, startOfMonth, set, startOfDay, subMonths } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import { START_DATE, END_DATE } from '../src/constants'
import DateRangePickerCalendar from '../src/DateRangePickerCalendar'

describe('DateRangePickerCalendar', () => {
  it('should render', () => {
    const { getAllByText } = render(
      <DateRangePickerCalendar
        locale={locale}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
        onFocusChange={() => {}}
      />
    )

    expect(getAllByText('1').length).toBeGreaterThan(0)
  })

  it('should call callbacks on date selection', () => {
    const handleStartDateChange = jest.fn()
    const handleEndDateChange = jest.fn()
    const handleFocusChange = jest.fn()

    const { getAllByText, rerender } = render(
      <DateRangePickerCalendar
        locale={locale}
        focus={START_DATE}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onFocusChange={handleFocusChange}
      />
    )

    fireEvent.click(getAllByText('1')[0])

    expect(handleStartDateChange).toHaveBeenCalledTimes(1)
    expect(handleEndDateChange).toHaveBeenCalledTimes(0)
    expect(handleFocusChange).toHaveBeenCalledWith(END_DATE)

    rerender(
      <DateRangePickerCalendar
        locale={locale}
        focus={END_DATE}
        startDate={startOfMonth(new Date())}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onFocusChange={handleFocusChange}
      />
    )

    fireEvent.click(getAllByText('2')[0])

    expect(handleStartDateChange).toHaveBeenCalledTimes(1)
    expect(handleEndDateChange).toHaveBeenCalledTimes(1)
    expect(handleFocusChange).toHaveBeenCalledWith(null)
  })

  it('should display selected date range', () => {
    const startDate = startOfMonth(new Date())
    const endDate = addDays(startDate, 2)

    const { container, getAllByText, rerender } = render(
      <DateRangePickerCalendar locale={locale} startDate={startDate} />
    )

    expect(getAllByText('1')[0].parentElement).toHaveClass('-selected')
    expect(container.querySelectorAll('.-selected').length).toBe(1)

    rerender(<DateRangePickerCalendar locale={locale} startDate={startDate} endDate={endDate} />)

    expect(getAllByText('1')[0].parentElement).toHaveClass('-selected -selected-start')
    expect(getAllByText('2')[0].parentElement).toHaveClass('-selected -selected-middle')
    expect(getAllByText('3')[0].parentElement).toHaveClass('-selected -selected-end')
    expect(container.querySelectorAll('.-selected').length).toBe(3)
  })

  it('should display pre-selected start date’s month on initial render', () => {
    const today = new Date()
    const pastDate = subMonths(today, 1)
    const monthName = format(pastDate, 'LLLL', { locale })

    const { getByText } = render(<DateRangePickerCalendar locale={locale} startDate={pastDate} endDate={today} />)

    expect(getByText(monthName, { exact: false })).toBeInTheDocument()
  })

  it('should display pre-selected end date’s month on initial render', () => {
    const pastDate = subMonths(new Date(), 1)
    const monthName = format(pastDate, 'LLLL', { locale })

    const { getByText } = render(<DateRangePickerCalendar locale={locale} endDate={pastDate} />)

    expect(getByText(monthName, { exact: false })).toBeInTheDocument()
  })

  it('should maintain the selected start date’s time when selecting a new date', () => {
    const handleStartDateChange = jest.fn()

    const { getByText } = render(
      <DateRangePickerCalendar
        locale={locale}
        focus={START_DATE}
        startDate={new Date(2020, 1, 24, 18, 30)}
        onStartDateChange={handleStartDateChange}
      />
    )

    fireEvent.click(getByText('25'))

    expect(handleStartDateChange).toHaveBeenCalledWith(new Date(2020, 1, 25, 18, 30))
  })

  it('should maintain the selected end date’s time when selecting a new date', () => {
    const handleEndDateChange = jest.fn()

    const { getByText } = render(
      <DateRangePickerCalendar
        locale={locale}
        focus={END_DATE}
        endDate={new Date(2020, 1, 24, 18, 30)}
        onEndDateChange={handleEndDateChange}
      />
    )

    fireEvent.click(getByText('25'))

    expect(handleEndDateChange).toHaveBeenCalledWith(new Date(2020, 1, 25, 18, 30))
  })

  it('should allow same day selection by default (when minimumLength is 0)', () => {
    const startDate = startOfDay(set(new Date(), { date: 13 }))

    const { getByText } = render(<DateRangePickerCalendar locale={locale} focus={END_DATE} startDate={startDate} />)

    expect(getByText('13').parentElement).not.toHaveClass('-disabled')
  })

  it('should disable dates before the start date when selecting an end date with no existing end date selected', () => {
    const startDate = startOfDay(set(new Date(), { date: 13 }))

    const { getByText } = render(<DateRangePickerCalendar locale={locale} focus={END_DATE} startDate={startDate} />)

    expect(getByText('11').parentElement).toHaveClass('-disabled')
    expect(getByText('12').parentElement).toHaveClass('-disabled')
    expect(getByText('13').parentElement).not.toHaveClass('-disabled')
  })

  it('should disable dates after the end date when selecting a start date with no existing start date selected', () => {
    const endDate = startOfDay(set(new Date(), { date: 13 }))

    const { getByText } = render(<DateRangePickerCalendar locale={locale} focus={START_DATE} endDate={endDate} />)

    expect(getByText('13').parentElement).not.toHaveClass('-disabled')
    expect(getByText('14').parentElement).toHaveClass('-disabled')
    expect(getByText('15').parentElement).toHaveClass('-disabled')
  })

  it('should disable in-between dates when minimumLength is set', () => {
    const startDate = startOfDay(set(new Date(), { date: 13 }))

    const { getByText } = render(
      <DateRangePickerCalendar locale={locale} focus={END_DATE} startDate={startDate} minimumLength={3} />
    )

    expect(getByText('13').parentElement).toHaveClass('-disabled')
    expect(getByText('14').parentElement).toHaveClass('-disabled')
    expect(getByText('15').parentElement).toHaveClass('-disabled')
    expect(getByText('16').parentElement).not.toHaveClass('-disabled')
  })

  it('should disable in-between dates when selecting start date and minimumLength is set', () => {
    const endDate = startOfDay(set(new Date(), { date: 13 }))

    const { getByText } = render(
      <DateRangePickerCalendar locale={locale} focus={START_DATE} endDate={endDate} minimumLength={3} />
    )

    expect(getByText('13').parentElement).toHaveClass('-disabled')
    expect(getByText('12').parentElement).toHaveClass('-disabled')
    expect(getByText('11').parentElement).toHaveClass('-disabled')
    expect(getByText('10').parentElement).not.toHaveClass('-disabled')
  })

  it('should disable later dates when maximumLength is set', () => {
    const startDate = startOfDay(set(new Date(), { date: 13 }))

    const { getByText } = render(
      <DateRangePickerCalendar locale={locale} focus={END_DATE} startDate={startDate} maximumLength={3} />
    )

    expect(getByText('13').parentElement).not.toHaveClass('-disabled')
    expect(getByText('14').parentElement).not.toHaveClass('-disabled')
    expect(getByText('15').parentElement).not.toHaveClass('-disabled')
    expect(getByText('16').parentElement).not.toHaveClass('-disabled')
    expect(getByText('17').parentElement).toHaveClass('-disabled')
  })

  it('should disable earlier dates when selecting start date and maximumLength is set', () => {
    const endDate = startOfDay(set(new Date(), { date: 13 }))

    const { getByText } = render(
      <DateRangePickerCalendar locale={locale} focus={START_DATE} endDate={endDate} maximumLength={3} />
    )

    expect(getByText('13').parentElement).not.toHaveClass('-disabled')
    expect(getByText('12').parentElement).not.toHaveClass('-disabled')
    expect(getByText('11').parentElement).not.toHaveClass('-disabled')
    expect(getByText('10').parentElement).not.toHaveClass('-disabled')
    expect(getByText('9').parentElement).toHaveClass('-disabled')
  })
})
