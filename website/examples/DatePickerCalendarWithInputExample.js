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
import 'react-nice-dates/build/style.css'

export default function DatePickerCalendarWithInputExample() {
  const [date, setDate] = useState()

  const inputProps = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  return (
    <div>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <input className='input' {...inputProps} />
      <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
    </div>
  )
}

`

export default function DatePickerCalendarWithInputExample() {
  const [date, setDate] = useState()

  const inputProps = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  return (
    <Example code={code}>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <input className='input' {...inputProps} />
      <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
    </Example>
  )
}
