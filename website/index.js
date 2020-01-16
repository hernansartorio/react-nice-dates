import React, { useState } from 'react'
import { render } from 'react-dom'
import { enGB as locale } from 'date-fns/locale'
import classNames from 'classnames'
import { START_DATE, END_DATE } from '../src/constants'
import DatePicker from '../src/DatePicker'
import DateRangePicker from '../src/DateRangePicker'

function App() {
  const [date, setDate] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  return (
    <div className='container'>
      <DatePicker date={date} onDateChange={setDate} locale={locale} minimumDate={new Date()}>
        {({ inputProps, focused }) => <input className={classNames({ '-active': focused })} {...inputProps} />}
      </DatePicker>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        locale={locale}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className='date-range'>
            <input className={classNames({ '-active': focus === START_DATE })} {...startDateInputProps} />
            <input className={classNames({ '-active': focus === END_DATE })} {...endDateInputProps} />
          </div>
        )}
      </DateRangePicker>
    </div>
  )
}

if (module.hot) {
  module.hot.accept()
}

render(<App />, document.getElementById('root'))
