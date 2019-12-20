import React from 'react'
import { render } from 'react-dom'
import Calendar from './components/Calendar'
import './styles.scss'
import './nice-dates.scss'

function App() {
  return (
    <div className='container'>
      <Calendar />
    </div>
  )
}

render(<App />, document.getElementById('root'))
