import React, { useState } from 'react'
import { func, instanceOf, objectOf, string } from 'prop-types'
import { startOfMonth, isBefore, isAfter } from 'date-fns'
import mergeModifiers from './mergeModifiers'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import CalendarGrid from './CalendarGrid'

export default function Calendar({
  month: receivedMonth,
  onMonthChange,
  modifiers: receivedModifiers,
  modifiersClassNames,
  minimumDate,
  maximumDate,
  onHoverDate,
  onSelectDate
}) {
  const [localStateMonth, setLocalStateMonth] = useState(startOfMonth(new Date()))
  const month = receivedMonth ? startOfMonth(receivedMonth) : localStateMonth
  const handleMonthChange = onMonthChange || setLocalStateMonth

  const modifiers = mergeModifiers(
    { disabled: date => isBefore(date, minimumDate) || isAfter(date, maximumDate) },
    receivedModifiers
  )

  return (
    <div>
      <CalendarNavigation
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        month={month}
        onMonthChange={handleMonthChange}
      />

      <CalendarWeekHeader />

      <CalendarGrid
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        month={month}
        onMonthChange={handleMonthChange}
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
  month: instanceOf(Date),
  onMonthChange: func,
  onHoverDate: func,
  onSelectDate: func
}

Calendar.defaultProps = {
  modifiers: {}
}
