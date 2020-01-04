import React, { useState } from 'react'
import { render } from 'react-dom'
import DatePickerCalendar from './components/DatePickerCalendar'
import DateRangePickerCalendar from './components/DateRangePickerCalendar'
import './styles.scss'
import './nice-dates.scss'

function App() {
  const [date, setDate] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [focus, setFocus] = useState('startDate')

  return (
    <div className='container'>
      <DatePickerCalendar date={date} onChange={setDate} />

      <DateRangePickerCalendar
        startDate={startDate}
        endDate={endDate}
        focus={focus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFocusChange={setFocus}
      />
    </div>
  )
}

render(<App />, document.getElementById('root'))
