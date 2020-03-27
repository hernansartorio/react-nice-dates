import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { format } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import Calendar from '../src/Calendar'

describe('Calendar', () => {
  it('should render', () => {
    const { getAllByText, getByText } = render(
      <Calendar locale={locale} />
    )

    const today = new Date()
    const dayShortName = format(today, 'eee', { locale })
    const monthName = format(today, 'MMMM', { locale })
    const monthShortName = format(today, 'MMM', { locale })

    expect(getByText(dayShortName)).toBeInTheDocument()
    expect(getByText(monthName)).toBeInTheDocument()
    expect(getByText(monthShortName)).toBeInTheDocument()
    expect(getAllByText('1').length).toBeGreaterThan(0)
  })

  it('should render the weekday dynamically', () => {
    const { getByText } = render(
      <Calendar locale={locale} weekdayFormat='EEEEEE' />
    )

    const today = new Date()
    const dayShortName = format(today, 'EEEEEE', { locale })

    expect(getByText(dayShortName)).toBeInTheDocument()
  })
})
