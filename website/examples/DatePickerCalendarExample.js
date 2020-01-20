import React, { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from '../../src'
import Example from './Example'

const code = `
import React, { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'

function DatePickerCalendarExample() {
  const [date, setDate] = useState()

  return (
    <div>
      <p>
        Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
      </p>

      <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
    </div>
  )
}
`

export default function DatePickerCalendarExample() {
  const [date, setDate] = useState()

  return (
    <Example code={code}>
      <p>Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>

      <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
    </Example>
  )
}
