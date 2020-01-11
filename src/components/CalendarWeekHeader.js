import React from 'react'
import { object } from 'prop-types'
import { eachDayOfInterval, endOfWeek, startOfWeek, format } from 'date-fns'

export default function CalendarWeekHeader({ locale }) {
  const today = new Date()

  const weekDays = eachDayOfInterval({
    start: startOfWeek(today, { locale }),
    end: endOfWeek(today, { locale })
  }).map(date => format(date, 'eee', { locale }))

  return (
    <div className='nice-dates-week-header'>
      {weekDays.map(day => (
        <span key={day} className='nice-dates-week-header_day'>
          {day}
        </span>
      ))}
    </div>
  )
}

CalendarWeekHeader.propTypes = {
  locale: object.isRequired
}
