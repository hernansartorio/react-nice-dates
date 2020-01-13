import React from 'react'
import { instanceOf, func, object, objectOf, string } from 'prop-types'
import { isSameDay } from 'date-fns'
import { mergeModifiers } from './utils'
import Calendar from './Calendar'

export default function DatePickerCalendar({ date: selectedDate, onDateChange, ...calendarProps }) {
  const isSelected = date => isSameDay(date, selectedDate)
  const modifiers = mergeModifiers({ selected: isSelected, disabled: isSelected }, calendarProps.modifiers)
  return <Calendar {...calendarProps} onSelectDate={onDateChange} modifiers={modifiers} />
}

DatePickerCalendar.propTypes = {
  date: instanceOf(Date),
  modifiers: objectOf(func),
  locale: object.isRequired,
  modifiersClassNames: objectOf(string),
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onDateChange: func
}
