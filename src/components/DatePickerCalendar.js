import React from 'react'
import { instanceOf, func, objectOf, string } from 'prop-types'
import { isSameDay } from 'date-fns'
import mergeModifiers from './mergeModifiers'
import Calendar from './Calendar'

export default function DatePickerCalendar({ date: selectedDate, onDateChange, ...calendarProps }) {
  const isSelected = date => isSameDay(date, selectedDate)
  const modifiers = mergeModifiers({ selected: isSelected, disabled: isSelected }, calendarProps.modifiers)
  return <Calendar {...calendarProps} onSelectDate={onDateChange} modifiers={modifiers} />
}

DatePickerCalendar.propTypes = {
  date: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onDateChange: func
}

DatePickerCalendar.defaultProps = {
  modifiers: {}
}
