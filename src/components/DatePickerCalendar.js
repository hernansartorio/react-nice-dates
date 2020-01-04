import React from 'react'
import { instanceOf, func } from 'prop-types'
import { isSameDay } from 'date-fns'
import Calendar from './Calendar'

export default function DatePickerCalendar({ date: selectedDate, onChange }) {
  const isSelected = date => isSameDay(date, selectedDate)

  const modifiers = {
    selected: isSelected,
    disabled: isSelected
  }

  return <Calendar modifiers={modifiers} onSelectDate={onChange} />
}

DatePickerCalendar.propTypes = {
  date: instanceOf(Date),
  onChange: func
}
