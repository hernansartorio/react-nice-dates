import React, { useState } from 'react'
import { render } from 'react-dom'
import { enGB as locale } from 'date-fns/locale'
import classNames from 'classnames'
import DatePicker from './components/DatePicker'
import DateRangePicker from './components/DateRangePicker'
import './styles.scss'
import './nice-dates.scss'

function App() {
  const [date, setDate] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  return (
    <div className='container'>
      <DatePicker date={date} onDateChange={setDate} locale={locale} minimumDate={new Date()}>
        {({ inputProps, focused }) => (
          <input className={classNames({ '-active': focused })} type='text' {...inputProps} />
        )}
      </DatePicker>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        locale={locale}
        minimumDate={new Date(2020, 0, 10)}
        maximumDate={new Date(2020, 0, 25)}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className='date-range'>
            <input className={classNames({ '-active': focus === 'startDate' })} type='text' {...startDateInputProps} />
            <input className={classNames({ '-active': focus === 'endDate' })} type='text' {...endDateInputProps} />
          </div>
        )}
      </DateRangePicker>
    </div>
  )
}

render(<App />, document.getElementById('root'))
