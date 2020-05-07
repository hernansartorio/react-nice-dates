import React, { useState } from 'react'
import { func, instanceOf, object, objectOf, oneOf, string } from 'prop-types'
import { isSameDay, isAfter, isBefore, startOfMonth, startOfDay } from 'date-fns'
import { isSelectable, mergeModifiers, setTime } from './utils'
import { START_DATE, END_DATE } from './constants'
import useControllableState from './useControllableState'
import Calendar from './Calendar'

export default function DateRangePickerCalendar({
  locale,
  startDate,
  endDate,
  focus,
  month: receivedMonth,
  onStartDateChange,
  onEndDateChange,
  onFocusChange,
  onMonthChange,
  minimumDate,
  maximumDate,
  modifiers: receivedModifiers,
  modifiersClassNames,
  weekdayFormat
}) {
  const [hoveredDate, setHoveredDate] = useState()
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, startOfMonth(startDate || endDate || new Date()))

  const displayedStartDate =
    focus === START_DATE && !startDate && endDate && hoveredDate && !isSameDay(hoveredDate, endDate)
      ? hoveredDate
      : startOfDay(startDate)

  const displayedEndDate =
    focus === END_DATE && !endDate && startDate && hoveredDate && !isSameDay(hoveredDate, startDate)
      ? hoveredDate
      : startOfDay(endDate)

  const isStartDate = date => isSameDay(date, displayedStartDate) && isBefore(date, displayedEndDate)
  const isMiddleDate = date => isAfter(date, displayedStartDate) && isBefore(date, displayedEndDate)
  const isEndDate = date => isSameDay(date, displayedEndDate) && isAfter(date, displayedStartDate)

  const modifiers = mergeModifiers(
    {
      selected: date =>
        isSelectable(date, { minimumDate, maximumDate }) &&
        (isStartDate(date) ||
          isMiddleDate(date) ||
          isEndDate(date) ||
          isSameDay(date, startDate) ||
          isSameDay(date, endDate)
        ),
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

      onStartDateChange(startDate ? setTime(date, startDate) : date)
      onFocusChange(END_DATE)
    } else if (focus === END_DATE) {
      const invalidStartDate = startDate && !isBefore(startDate, date)

      if (invalidStartDate) {
        onStartDateChange(null)
      }

      onEndDateChange(endDate ? setTime(date, endDate) : date)
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
      onMonthChange={setMonth}
      onDayHover={handleHoverDate}
      onDayClick={handleSelectDate}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      weekdayFormat={weekdayFormat}
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
  modifiersClassNames: objectOf(string),
  weekdayFormat: string
}

DateRangePickerCalendar.defaultProps = {
  onStartDateChange: () => {},
  onEndDateChange: () => {},
  onFocusChange: () => {}
}
