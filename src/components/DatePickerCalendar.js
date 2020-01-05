import React from 'react'
import { instanceOf, func } from 'prop-types'
import { isSameDay } from 'date-fns'
import Calendar from './Calendar'

export default function DatePickerCalendar({ date: selectedDate, minimumDate, maximumDate, onChange }) {
  const isSelected = date => isSameDay(date, selectedDate)

  const modifiers = {
    selected: isSelected,
    disabled: isSelected
  }

  return <Calendar minimumDate={minimumDate} maximumDate={maximumDate} modifiers={modifiers} onSelectDate={onChange} />
}

DatePickerCalendar.propTypes = {
  date: instanceOf(Date),
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onChange: func
}
