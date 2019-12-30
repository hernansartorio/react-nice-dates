import React, { useState } from 'react'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import CalendarGrid from './CalendarGrid'

import { startOfMonth } from 'date-fns'

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))

  const handleCurrentMonthChange = month => {
    setCurrentMonth(month)
  }

  return (
    <div>
      <CalendarNavigation currentMonth={currentMonth} onChange={setCurrentMonth} />
      <CalendarWeekHeader />
      <CalendarGrid currentMonth={currentMonth} onChange={handleCurrentMonthChange} />
    </div>
  )
}
