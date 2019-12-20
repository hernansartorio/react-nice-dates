import React, { useState } from 'react'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import CalendarGrid from './CalendarGrid'

import { startOfMonth } from 'date-fns'

const today = new Date()

export default function Calendar() {
  const [currentMonthStartDate, setCurrentMonthStartDate] = useState(startOfMonth(today))

  return (
    <div>
      <CalendarNavigation currentDate={currentMonthStartDate} onChange={setCurrentMonthStartDate} />
      <CalendarWeekHeader />
      <CalendarGrid currentDate={currentMonthStartDate} />
    </div>
  )
}
