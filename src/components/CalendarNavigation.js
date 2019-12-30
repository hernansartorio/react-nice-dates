import React from 'react'
import { func, instanceOf } from 'prop-types'
import { enGB as locale } from 'date-fns/locale'

import { addMonths, getYear, startOfMonth, subMonths, format } from 'date-fns'

export default function CalendarNavigation({ currentMonth, onChange }) {
  const handlePrevious = event => {
    onChange(startOfMonth(subMonths(currentMonth, 1)))
    event.preventDefault()
  }

  const handleNext = event => {
    onChange(startOfMonth(addMonths(currentMonth, 1)))
    event.preventDefault()
  }

  return (
    <div className='nice-dates-navigation'>
      <a className='nice-dates-navigation_previous' onClick={handlePrevious} onTouchEnd={handlePrevious} />

      <span className='nice-dates-navigation_current'>
        {format(currentMonth, getYear(currentMonth) === getYear(new Date()) ? 'MMMM' : 'MMMM yyyy', { locale })}
      </span>

      <a className='nice-dates-navigation_next' onClick={handleNext} onTouchEnd={handleNext} />
    </div>
  )
}

CalendarNavigation.propTypes = {
  currentMonth: instanceOf(Date).isRequired,
  onChange: func.isRequired
}
