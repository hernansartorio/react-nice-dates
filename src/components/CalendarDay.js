import React from 'react'
import { bool, instanceOf, number } from 'prop-types'
import { enGB as locale } from 'date-fns/locale'
import classNames from 'classnames'

import { getDate, format } from 'date-fns'

export default function CalendarDay({
  date,
  height,
  isWide,
  isOutside,
  isToday,
  isSelected,
  isStart,
  isEnd,
  isDisabled
}) {
  const dayOfMonth = getDate(date)

  const dateClass = classNames('nice-dates-day', {
    '-wide': isWide,
    '-outside': isOutside,
    '-today': isToday,
    '-selected': isSelected,
    '-start': isStart,
    '-end': isEnd,
    '-disabled': isDisabled
  })

  return (
    <span className={dateClass} style={{ height }}>
      {dayOfMonth === 1 && (
        <span className='nice-dates-day_month'>{format(date, 'MMMM', { locale }).substring(0, 3)}</span>
      )}
      <span className='nice-dates-day_date'>{dayOfMonth}</span>
    </span>
  )
}

CalendarDay.propTypes = {
  date: instanceOf(Date).isRequired,
  height: number.isRequired,
  isWide: bool,
  isOutside: bool,
  isToday: bool,
  isSelected: bool,
  isStart: bool,
  isEnd: bool,
  isDisabled: bool
}
