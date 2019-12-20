import React from 'react'
import { bool, instanceOf } from 'prop-types'
import { enGB as locale } from 'date-fns/locale'
import classNames from 'classnames'

import { getDate, format } from 'date-fns'

export default function CalendarDay({ date, isOdd, isToday, isSelected, isStart, isEnd, isDisabled }) {
  const dayOfMonth = getDate(date)

  const dateClass = classNames('nice-dates-day', {
    '-odd': isOdd,
    '-today': isToday,
    '-selected': isSelected,
    '-start': isStart,
    '-end': isEnd,
    '-disabled': isDisabled
  })

  return (
    <span className={dateClass}>
      {dayOfMonth === 1 && (
        <span className='nice-dates-day_month'>{format(date, 'MMMM', { locale }).substring(0, 3)}</span>
      )}
      <span className='nice-dates-day_date'>{dayOfMonth}</span>
    </span>
  )
}

CalendarDay.propTypes = {
  date: instanceOf(Date),
  isOdd: bool,
  isToday: bool,
  isSelected: bool,
  isStart: bool,
  isEnd: bool,
  isDisabled: bool
}
