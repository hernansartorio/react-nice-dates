import React, { useState } from 'react'
import { func, objectOf } from 'prop-types'
import { startOfMonth } from 'date-fns'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import CalendarGrid from './CalendarGrid'

export default function Calendar({ modifiers, onHoverDate, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))

  const handleCurrentMonthChange = month => {
    setCurrentMonth(month)
  }

  return (
    <div>
      <CalendarNavigation currentMonth={currentMonth} onChange={setCurrentMonth} />
      <CalendarWeekHeader />
      <CalendarGrid
        currentMonth={currentMonth}
        modifiers={modifiers}
        onChange={handleCurrentMonthChange}
        onHoverDate={onHoverDate}
        onSelectDate={onSelectDate}
      />
    </div>
  )
}

Calendar.propTypes = {
  modifiers: objectOf(func),
  onHoverDate: func,
  onSelectDate: func
}

Calendar.defaultProps = {
  modifiers: {}
}
