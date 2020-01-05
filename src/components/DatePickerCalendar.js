import React from 'react'
import { instanceOf, func, objectOf, string } from 'prop-types'
import { isSameDay } from 'date-fns'
import mergeModifiers from './mergeModifiers'
import Calendar from './Calendar'

export default function DatePickerCalendar({
  date: selectedDate,
  minimumDate,
  maximumDate,
  modifiers: receivedModifiers,
  modifiersClassNames,
  onChange
}) {
  const isSelected = date => isSameDay(date, selectedDate)
  const modifiers = mergeModifiers({ selected: isSelected, disabled: isSelected }, receivedModifiers)

  return (
    <Calendar
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      onSelectDate={onChange}
    />
  )
}

DatePickerCalendar.propTypes = {
  date: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onChange: func
}

DatePickerCalendar.defaultProps = {
  modifiers: {}
}
