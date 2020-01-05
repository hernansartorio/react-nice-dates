import React, { useState } from 'react'
import { func, instanceOf, objectOf, oneOf, string } from 'prop-types'
import { isSameDay, isAfter, isBefore } from 'date-fns'
import mergeModifiers from './mergeModifiers'
import Calendar from './Calendar'

export default function DateRangePickerCalendar({
  startDate,
  endDate,
  focus,
  minimumDate,
  maximumDate,
  modifiers: receivedModifiers,
  modifiersClassNames,
  onStartDateChange,
  onEndDateChange,
  onFocusChange
}) {
  const [hoveredEndDate, setHoveredEndDate] = useState()
  const displayedEndDate =
    focus === 'endDate' && hoveredEndDate && !isSameDay(hoveredEndDate, startDate) ? hoveredEndDate : endDate

  const isStartDate = date => isSameDay(date, startDate)
  const isMiddleDate = date => isAfter(date, startDate) && isBefore(date, displayedEndDate)
  const isEndDate = date => isSameDay(date, displayedEndDate)

  const modifiers = mergeModifiers(
    {
      selected: date => isStartDate(date) || isEndDate(date) || isMiddleDate(date),
      selectedStart: date => displayedEndDate && isStartDate(date),
      selectedMiddle: isMiddleDate,
      selectedEnd: date => startDate && isEndDate(date),
      disabled: date => focus === 'endDate' && (isBefore(date, startDate) || isStartDate(date))
    },
    receivedModifiers
  )

  const handleChange = date => {
    if (focus === 'startDate') {
      onStartDateChange(date)

      if (!isAfter(endDate, date)) {
        onEndDateChange(null)
      }

      onFocusChange('endDate')
    } else if (focus === 'endDate') {
      onEndDateChange(date)
      onFocusChange('startDate')
    }
  }

  return (
    <Calendar
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      onSelectDate={handleChange}
      onHoverDate={setHoveredEndDate}
    />
  )
}

DateRangePickerCalendar.propTypes = {
  startDate: instanceOf(Date),
  endDate: instanceOf(Date),
  focus: oneOf(['startDate', 'endDate']),
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  onStartDateChange: func,
  onEndDateChange: func,
  onFocusChange: func
}

DateRangePickerCalendar.defaultProps = {
  modifiers: {},
  onStartDateChange: () => {},
  onEndDateChange: () => {},
  onFocusChange: () => {}
}
