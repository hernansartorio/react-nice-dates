import React, { useState } from 'react'
import { bool, func, instanceOf, number, object, objectOf, oneOf, string } from 'prop-types'
import { differenceInDays, isSameDay, isAfter, isBefore, startOfMonth, startOfDay } from 'date-fns'
import { isRangeLengthValid, isSelectable, mergeModifiers, setTime } from './utils'
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
  minimumLength,
  maximumLength,
  modifiers: receivedModifiers,
  modifiersClassNames,
  weekdayFormat,
  touchDragEnabled
}) {
  const [hoveredDate, setHoveredDate] = useState()
  const [month, setMonth] = useControllableState(
    receivedMonth,
    onMonthChange,
    startOfMonth(startDate || endDate || new Date())
  )

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
          isSameDay(date, endDate)),
      selectedStart: isStartDate,
      selectedMiddle: isMiddleDate,
      selectedEnd: isEndDate,
      disabled: date =>
        (focus === START_DATE &&
          endDate &&
          ((differenceInDays(startOfDay(endDate), date) < minimumLength && !startDate) ||
            (!startDate && maximumLength && differenceInDays(startOfDay(endDate), date) > maximumLength))) ||
        (focus === END_DATE &&
          startDate &&
          ((differenceInDays(date, startOfDay(startDate)) < minimumLength && !endDate) ||
            (!endDate && maximumLength && differenceInDays(date, startOfDay(startDate)) > maximumLength)))
    },
    receivedModifiers
  )

  const handleSelectDate = date => {
    if (focus === START_DATE) {
      const invalidEndDate =
        endDate && !isRangeLengthValid({ startDate: date, endDate }, { minimumLength, maximumLength })

      if (invalidEndDate) {
        onEndDateChange(null)
        onStartDateChange(startDate ? setTime(date, startDate) : date)
        onFocusChange(END_DATE)
      } else {
        onStartDateChange(startDate ? setTime(date, startDate) : date)
        onFocusChange(END_DATE)
      }
    } else if (focus === END_DATE) {
      const invalidStartDate =
        startDate && !isRangeLengthValid({ startDate, endDate: date }, { minimumLength, maximumLength })

      if (invalidStartDate) {
         onEndDateChange(null)
         onStartDateChange(startDate ? setTime(date, startDate) : date)
         onFocusChange(END_DATE)
      } else {
        onEndDateChange(endDate ? setTime(date, endDate) : date)
        onFocusChange(invalidStartDate || !startDate ? START_DATE : null)
      }

    }
  }

  return (
    <Calendar
      locale={locale}
      month={month}
      onMonthChange={setMonth}
      onDayHover={setHoveredDate}
      onDayClick={handleSelectDate}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      weekdayFormat={weekdayFormat}
      touchDragEnabled={touchDragEnabled}
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
  minimumLength: number,
  maximumLength: number,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
}

DateRangePickerCalendar.defaultProps = {
  onStartDateChange: () => {},
  onEndDateChange: () => {},
  onFocusChange: () => {},
  minimumLength: 0,
  maximumLength: null
}
