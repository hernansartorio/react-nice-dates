import React, { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from '../../src'
import Example from './Example'

const code = `
import React, { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

function DatePickerExample() {
  const [date, setDate] = useState()

  return (
    <DatePicker date={date} onDateChange={setDate} locale={enGB}>
      {({ inputProps, focused }) => (
        <input
          className={'input' + (focused ? ' -focused' : '')}
          {...inputProps}
        />
      )}
    </DatePicker>
  )
}
`

export default function DatePickerExample() {
  const [date, setDate] = useState()

  return (
    <Example code={code}>
      <DatePicker date={date} onDateChange={setDate} locale={enGB}>
        {({ inputProps, focused }) => <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />}
      </DatePicker>
    </Example>
  )
}
