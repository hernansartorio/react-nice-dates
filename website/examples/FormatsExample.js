import React, { useState } from 'react'
import { enUS } from 'date-fns/locale'
import { DatePicker } from '../../src'
import Example from './Example'

const code = `
import React, { useState } from 'react'
import { enUS } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

export default function LocalesExample() {
  const [date, setDate] = useState()

  return (
    <div>
      <p>Month format:</p>

      <DatePicker date={date} onDateChange={setDate} locale={enUS} monthFormat='GGGG yyyy, MMMM'>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='GGGG yyyy, MMMM' />
        )}
      </DatePicker>

      <p>Weekday format:</p>

      <DatePicker date={date} onDateChange={setDate} locale={enUS} weekdayFormat="eeee">
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='eeee' />
        )}
      </DatePicker>
    </div>
  )
}
`;

export default function FormatsExample() {
  const [date, setDate] = useState()

  return (
    <Example code={code}>
      <p>Month format:</p>

      <DatePicker date={date} onDateChange={setDate} locale={enUS} monthFormat='GGGG yyyy, MMMM'>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='GGGG yyyy, MMMM' />
        )}
      </DatePicker>

      <br />

      <p>Weekday format:</p>

      <DatePicker date={date} onDateChange={setDate} locale={enUS} weekdayFormat="eeee">
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='eeee' />
        )}
      </DatePicker>
    </Example>
  )
}
