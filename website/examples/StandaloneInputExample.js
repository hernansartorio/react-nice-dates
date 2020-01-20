import React, { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useDateInput } from '../../src'
import Example from './Example'

const code = `
import React, { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useDateInput } from 'react-nice-dates'

export default function StandaloneInputExample() {
  const [date, setDate] = useState()

  const [props, updateValue] = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  const handleReset = () => {
    const today = new Date()
    updateValue(today)
    setDate(today)
  }

  return (
    <div>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <button onClick={handleReset}>Set today</button>
      <input className='input' {...props} />
    </div>
  )
}

`

export default function StandaloneInputExample() {
  const [date, setDate] = useState()

  const [props, updateValue] = useDateInput({
    date,
    format: 'yyyy-MM-dd',
    locale: enGB,
    onDateChange: setDate
  })

  const handleReset = () => {
    const today = new Date()
    updateValue(today)
    setDate(today)
  }

  return (
    <Example code={code}>
      <p>The selected date is {date && format(date, 'dd MMM yyyy', { locale: enGB })}</p>
      <p>
        <button onClick={handleReset}>Set today</button>
      </p>
      <input className='input' {...props} />
    </Example>
  )
}
