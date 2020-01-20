import React from 'react'
import { instanceOf, func, object, objectOf, string } from 'prop-types'
import { isSameDay } from 'date-fns'
import { mergeModifiers } from './utils'
import Calendar from './Calendar'

export default function DatePickerCalendar({
  locale,
  date: selectedDate,
  month,
  onDateChange,
  onMonthChange,
  minimumDate,
  maximumDate,
  modifiers: receivedModifiers,
  modifiersClassNames
}) {
  const isSelected = date => isSameDay(date, selectedDate)
  const modifiers = mergeModifiers({ selected: isSelected, disabled: isSelected }, receivedModifiers)

  return (
    <Calendar
      locale={locale}
      month={month}
      onMonthChange={onMonthChange}
      onDayClick={onDateChange}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
    />
  )
}

DatePickerCalendar.propTypes = {
  locale: object.isRequired,
  date: instanceOf(Date),
  month: instanceOf(Date),
  onDateChange: func,
  onMonthChange: func,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string)
}
