import React, { useState } from 'react'
import { func, instanceOf, objectOf, oneOf, string } from 'prop-types'
import { isSameDay, isAfter, isBefore } from 'date-fns'
import mergeModifiers from './mergeModifiers'
import Calendar from './Calendar'

export default function DateRangePickerCalendar({
  startDate,
  endDate,
  focus,
  onStartDateChange,
  onEndDateChange,
  onFocusChange,
  ...calendarProps
}) {
  const [hoveredDate, setHoveredDate] = useState()
  const displayedStartDate =
    focus === 'startDate' && endDate && hoveredDate && !isSameDay(hoveredDate, endDate) ? hoveredDate : startDate

  const displayedEndDate =
    focus === 'endDate' && startDate && hoveredDate && !isSameDay(hoveredDate, startDate) ? hoveredDate : endDate

  const isStartDate = date => isSameDay(date, displayedStartDate) && isBefore(date, displayedEndDate)
  const isMiddleDate = date => isAfter(date, displayedStartDate) && isBefore(date, displayedEndDate)
  const isEndDate = date => isSameDay(date, displayedEndDate) && isAfter(date, displayedStartDate)

  const modifiers = mergeModifiers(
    {
      selected: date =>
        isStartDate(date) ||
        isMiddleDate(date) ||
        isEndDate(date) ||
        isSameDay(date, displayedStartDate) ||
        isSameDay(date, displayedEndDate),
      selectedStart: isStartDate,
      selectedMiddle: isMiddleDate,
      selectedEnd: isEndDate,
      disabled: date => (focus === 'startDate' && isEndDate(date)) || (focus === 'endDate' && isStartDate(date))
    },
    calendarProps.modifiers
  )

  const handleSelectDate = date => {
    if (focus === 'startDate') {
      if (endDate && !isAfter(endDate, date)) {
        onEndDateChange(null)
      }

      onStartDateChange(date)
      onFocusChange('endDate')
    } else if (focus === 'endDate') {
      const invalidStartDate = startDate && !isBefore(startDate, date)

      if (invalidStartDate) {
        onStartDateChange(null)
      }

      onEndDateChange(date)
      onFocusChange(invalidStartDate ? 'startDate' : null)
    }
  }

  const handleHoverDate = date => {
    setHoveredDate(date)
  }

  return (
    <Calendar {...calendarProps} modifiers={modifiers} onSelectDate={handleSelectDate} onHoverDate={handleHoverDate} />
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
