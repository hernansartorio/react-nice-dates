import React, { useState } from 'react'
import { func, instanceOf, objectOf, string } from 'prop-types'
import { startOfMonth, isBefore, isAfter } from 'date-fns'
import mergeModifiers from './mergeModifiers'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import CalendarGrid from './CalendarGrid'

export default function Calendar({
  modifiers: receivedModifiers,
  modifiersClassNames,
  minimumDate,
  maximumDate,
  onHoverDate,
  onSelectDate
}) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))

  const handleCurrentMonthChange = month => {
    setCurrentMonth(month)
  }

  const modifiers = mergeModifiers(
    { disabled: date => isBefore(date, minimumDate) || isAfter(date, maximumDate) },
    receivedModifiers
  )

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
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        onChange={handleCurrentMonthChange}
        onHoverDate={onHoverDate}
        onSelectDate={onSelectDate}
      />
    </div>
  )
}

Calendar.propTypes = {
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onHoverDate: func,
  onSelectDate: func
}

Calendar.defaultProps = {
  modifiers: {}
}
