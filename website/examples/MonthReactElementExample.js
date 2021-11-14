import React, { useEffect, useState } from 'react'
import { format, setYear, subDays, addYears } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { DatePicker } from '../../src'
import Example from './Example'

const code = `
import React, { useEffect, useState } from 'react'
import { format, setYear, subDays, addYears } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

export default function LocalesExample() {
  const [date, setDate] = useState()

  return (
    <div>
    <p>Month format as React component:</p>

    <DatePicker date={date} onDateChange={setDate} locale={enUS} 
      minimumDate={subDays(new Date(), 7)}
      maximumDate={addYears(new Date(), 2)}
      monthFormat={({ currentMonth, onMonthChange, minimumDate, maximumDate }) => {
        const [selectedYear, setSelectedYear] = useState(format(currentMonth, 'y'));

        useEffect(() => {
          setSelectedYear(format(currentMonth, 'y'))
        }, [currentMonth])

        const handleInputBlur = () => {
          if (selectedYear.match(/^\d{4}$/)) {
            onMonthChange(setYear(currentMonth, selectedYear))
          } else {
            setSelectedYear(format(currentMonth, 'y'))
          }
        }

        const handleInputChange = evt => {
          if (evt.target.value.match(/^\d{4}$/)) {
            onMonthChange(setYear(currentMonth, evt.target.value))
          }
          setSelectedYear(evt.target.value)
        }

        return  (
          <>
            {format(currentMonth, 'MMMM')}
            {' '}
            <input 
              type='number'
              value={selectedYear} 
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              size={8}
            />

            <br />

            <sup>
              {minimumDate && \`min date: \${format(minimumDate, 'yyyy/MM/dd', {locale: enUS})}\`}
              {' '}
              {maximumDate && \`max date: \${format(maximumDate,  'yyyy/MM/dd', {locale: enUS})}\`}
            </sup>
          </>
          )
      }}
    >
      {({ inputProps, focused }) => (
        <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='' />
      )}
    </DatePicker>
    </div>
  )
}
`;

export default function MonthReactElementExample() {
  const [date, setDate] = useState()

  return (
    <Example code={code}>
      <p>Month format as React component:</p>

      <DatePicker date={date} onDateChange={setDate} locale={enUS} 
        minimumDate={subDays(new Date(), 7)}
        maximumDate={addYears(new Date(), 2)}
        monthFormat={({ currentMonth, onMonthChange, minimumDate, maximumDate }) => {
          const [selectedYear, setSelectedYear] = useState(format(currentMonth, 'y'));

          useEffect(() => {
            setSelectedYear(format(currentMonth, 'y'))
          }, [currentMonth])

          const handleInputBlur = () => {
            if (selectedYear.match(/^\d{4}$/)) {
              onMonthChange(setYear(currentMonth, selectedYear))
            } else {
              setSelectedYear(format(currentMonth, 'y'))
            }
          }

          const handleInputChange = evt => {
            if (evt.target.value.match(/^\d{4}$/)) {
              onMonthChange(setYear(currentMonth, evt.target.value))
            }
            setSelectedYear(evt.target.value)
          }

          return  (
            <>
              {format(currentMonth, 'MMMM')}
              {' '}
              <input 
                type='number'
                value={selectedYear} 
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                size={8}
              />

              <br />

              <sup>
                {minimumDate && `min date: ${format(minimumDate, 'yyyy/MM/dd', {locale: enUS})}`}
                {' '}
                {maximumDate && `max date: ${format(maximumDate,  'yyyy/MM/dd', {locale: enUS})}`}
              </sup>
            </>
            )
        }}
      >
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='' />
        )}
      </DatePicker>
    </Example>
  )
}
