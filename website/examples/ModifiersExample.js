import React, { useState } from 'react'
import { getDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from '../../src'
import Example from './Example'

const code = `
import React, { useState } from 'react'
import { getDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'

const modifiers = {
  disabled: date => getDay(date) === 6, // Disables Saturdays
  highlight: date => getDay(date) === 2 // Highlights Tuesdays
}

const modifiersClassNames = {
  highlight: '-highlight'
}

export default function ModifiersExample() {
  const [date, setDate] = useState()

  return (
    <DatePickerCalendar
      date={date}
      onDateChange={setDate}
      locale={enGB}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
    />
  )
}

// In your CSS:
// .nice-dates-day.-highlight { color: orange; }
`

const modifiers = {
  disabled: date => getDay(date) === 6,
  highlight: date => getDay(date) === 2
}

const modifiersClassNames = {
  highlight: '-highlight'
}

export default function ModifiersExample() {
  const [date, setDate] = useState()

  return (
    <Example code={code}>
      <DatePickerCalendar
        date={date}
        onDateChange={setDate}
        locale={enGB}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </Example>
  )
}
