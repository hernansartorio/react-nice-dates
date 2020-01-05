import React from 'react'
import { func, instanceOf } from 'prop-types'
import classNames from 'classnames'
import { enGB as locale } from 'date-fns/locale'

import { addMonths, getYear, startOfMonth, subMonths, format, isSameMonth } from 'date-fns'

export default function CalendarNavigation({ currentMonth, minimumDate, maximumDate, onChange }) {
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
      <a
        className={classNames('nice-dates-navigation_previous', {
          '-disabled': isSameMonth(currentMonth, minimumDate)
        })}
        onClick={handlePrevious}
        onTouchEnd={handlePrevious}
      />

      <span className='nice-dates-navigation_current'>
        {format(currentMonth, getYear(currentMonth) === getYear(new Date()) ? 'MMMM' : 'MMMM yyyy', { locale })}
      </span>

      <a
        className={classNames('nice-dates-navigation_next', {
          '-disabled': isSameMonth(currentMonth, maximumDate)
        })}
        onClick={handleNext}
        onTouchEnd={handleNext}
      />
    </div>
  )
}

CalendarNavigation.propTypes = {
  currentMonth: instanceOf(Date).isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onChange: func.isRequired
}
