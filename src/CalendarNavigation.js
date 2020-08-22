import React from 'react'
import { func, instanceOf, object } from 'prop-types'
import classNames from 'classnames'
import { addMonths, getYear, startOfMonth, subMonths, format, isSameMonth } from 'date-fns'

export default function CalendarNavigation({ locale, month, minimumDate, maximumDate, onMonthChange }) {
  const handlePrevious = event => {
    onMonthChange(startOfMonth(subMonths(month, 1)))
    event.preventDefault()
  }

  const handleNext = event => {
    onMonthChange(startOfMonth(addMonths(month, 1)))
    event.preventDefault()
  }

  return (
    <div className='nice-dates-navigation'>
      <a
        className={classNames('nice-dates-navigation_previous', {
          '-disabled': isSameMonth(month, minimumDate)
        })}
        onClick={handlePrevious}
        onTouchEnd={handlePrevious}
      />

      <span className='nice-dates-navigation_current'>
        {format(month, getYear(month) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy', { locale })}
      </span>

      <a
        className={classNames('nice-dates-navigation_next', {
          '-disabled': isSameMonth(month, maximumDate)
        })}
        onClick={handleNext}
        onTouchEnd={handleNext}
      />
    </div>
  )
}

CalendarNavigation.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onMonthChange: func.isRequired
}
