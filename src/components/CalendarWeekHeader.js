import React from 'react'
import { enGB as locale } from 'date-fns/locale'

import { eachDayOfInterval, endOfWeek, startOfWeek, format } from 'date-fns'

const today = new Date()

const weekDays = eachDayOfInterval({
  start: startOfWeek(today, { locale }),
  end: endOfWeek(today, { locale })
}).map(date => format(date, 'eee', { locale }))

export default function WeekHeader() {
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
