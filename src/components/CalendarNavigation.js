import React from 'react'
import { func, instanceOf } from 'prop-types'
import { enGB as locale } from 'date-fns/locale'

import { addMonths, getYear, startOfMonth, subMonths, format } from 'date-fns'

const today = new Date()

export default function CalendarNavigation({ currentDate, onChange }) {
  const handlePrevious = event => {
    onChange(startOfMonth(subMonths(currentDate, 1)))
    event.preventDefault()
  }

  const handleNext = event => {
    onChange(startOfMonth(addMonths(currentDate, 1)))
    event.preventDefault()
  }

  return (
    <div className='nice-dates-navigation'>
      <a className='nice-dates-navigation_previous' onClick={handlePrevious} />

      <span className='nice-dates-navigation_current'>
        {format(currentDate, getYear(currentDate) === getYear(today) ? 'MMMM' : 'MMMM yyyy', { locale })}
      </span>

      <a className='nice-dates-navigation_next' onClick={handleNext} />
    </div>
  )
}

CalendarNavigation.propTypes = {
  currentDate: instanceOf(Date),
  onChange: func
}
