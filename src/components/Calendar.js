import React, { useState } from 'react'
import { func, instanceOf, objectOf } from 'prop-types'
import { startOfMonth, isBefore, isAfter } from 'date-fns'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import CalendarGrid from './CalendarGrid'

export default function Calendar({ modifiers, minimumDate, maximumDate, onHoverDate, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))

  const handleCurrentMonthChange = month => {
    setCurrentMonth(month)
  }

  const isDisabled = date => isBefore(date, minimumDate) || isAfter(date, maximumDate)

  return (
    <div>
      <CalendarNavigation
        currentMonth={currentMonth}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={setCurrentMonth}
      />

      <CalendarWeekHeader />

      <CalendarGrid
        currentMonth={currentMonth}
        modifiers={{
          ...modifiers,
          disabled: date => modifiers.disabled(date) || isDisabled(date)
        }}
        onChange={handleCurrentMonthChange}
        onHoverDate={onHoverDate}
        onSelectDate={onSelectDate}
      />
    </div>
  )
}

Calendar.propTypes = {
  modifiers: objectOf(func),
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onHoverDate: func,
  onSelectDate: func
}

Calendar.defaultProps = {
  modifiers: {}
}
