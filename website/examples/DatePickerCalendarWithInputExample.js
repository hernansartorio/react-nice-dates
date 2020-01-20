import React, { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar, useDateInput } from '../../src'
import Example from './Example'

const code = `
import React, { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar, useDateInput } from 'react-nice-dates'


export default function DatePickerCalendarWithInputExample() {
  const [date, setDate] = useState()

  const [props, updateValue] = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  const handleDateChange = newDate => {
    updateInputValue(newDate)
    setDate(newDate)
  }

  return (
    <div>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <input className='input' {...inputProps} />
      <DatePickerCalendar date={date} onDateChange={handleDateChange} locale={enGB} />
    </div>
  )
}

`

export default function DatePickerCalendarWithInputExample() {
  const [date, setDate] = useState()

  const [props, updateValue] = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  const handleDateChange = newDate => {
    updateValue(newDate)
    setDate(newDate)
  }

  return (
    <Example code={code}>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <input className='input' {...props} />
      <DatePickerCalendar date={date} onDateChange={handleDateChange} locale={enGB} />
    </Example>
  )
}
