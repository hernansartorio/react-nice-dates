import React, { useState } from 'react'
import { func, instanceOf, object, objectOf, oneOf, string } from 'prop-types'
import { isSameDay, isAfter, isBefore } from 'date-fns'
import { mergeModifiers } from './utils'
import { START_DATE, END_DATE } from './constants'
import Calendar from './Calendar'

export default function DateRangePickerCalendar({
  locale,
  startDate,
  endDate,
  focus,
  month,
  onStartDateChange,
  onEndDateChange,
  onFocusChange,
  onMonthChange,
  minimumDate,
  maximumDate,
  modifiers: receivedModifiers,
  modifiersClassNames
}) {
  const [hoveredDate, setHoveredDate] = useState()
  const displayedStartDate =
    focus === START_DATE && endDate && hoveredDate && !isSameDay(hoveredDate, endDate) ? hoveredDate : startDate

  const displayedEndDate =
    focus === END_DATE && startDate && hoveredDate && !isSameDay(hoveredDate, startDate) ? hoveredDate : endDate

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
      disabled: date => (focus === START_DATE && isEndDate(date)) || (focus === END_DATE && isStartDate(date))
    },
    receivedModifiers
  )

  const handleSelectDate = date => {
    if (focus === START_DATE) {
      if (endDate && !isAfter(endDate, date)) {
        onEndDateChange(null)
      }

      onStartDateChange(date)
      onFocusChange(END_DATE)
    } else if (focus === END_DATE) {
      const invalidStartDate = startDate && !isBefore(startDate, date)

      if (invalidStartDate) {
        onStartDateChange(null)
      }

      onEndDateChange(date)
      onFocusChange(invalidStartDate ? START_DATE : null)
    }
  }

  const handleHoverDate = date => {
    setHoveredDate(date)
  }

  return (
    <Calendar
      locale={locale}
      month={month}
      onMonthChange={onMonthChange}
      onHoverDate={handleHoverDate}
      onSelectDate={handleSelectDate}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
    />
  )
}

DateRangePickerCalendar.propTypes = {
  locale: object.isRequired,
  startDate: instanceOf(Date),
  endDate: instanceOf(Date),
  focus: oneOf([START_DATE, END_DATE]),
  month: instanceOf(Date),
  onStartDateChange: func.isRequired,
  onEndDateChange: func.isRequired,
  onFocusChange: func.isRequired,
  onMonthChange: func,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string)
}

DateRangePickerCalendar.defaultProps = {
  onStartDateChange: () => {},
  onEndDateChange: () => {},
  onFocusChange: () => {}
}
