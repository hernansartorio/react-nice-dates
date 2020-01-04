import React from 'react'
import { bool, instanceOf, func, number, objectOf } from 'prop-types'
import { getDate, format, isToday } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import classNames from 'classnames'

const modifiersClassNames = {
  today: '-today',
  outside: '-outside',
  wide: '-wide',
  disabled: '-disabled',
  selected: '-selected',
  selectedStart: '-selected-start',
  selectedMiddle: '-selected-middle',
  selectedEnd: '-selected-end'
}

export default function CalendarDay({ date, height, modifiers, onSelect, onHover }) {
  const dayOfMonth = getDate(date)
  const dayClassNames = {}
  const finalModifiers = { today: isToday(date), ...modifiers }

  Object.keys(finalModifiers).forEach(name => {
    dayClassNames[modifiersClassNames[name]] = finalModifiers[name]
  })

  const handleSelect = event => {
    onSelect(date)
    event.preventDefault()
  }

  const handleMouseEnter = () => {
    onHover(date)
  }

  const handleMouseLeave = () => {
    onHover(null)
  }

  return (
    <span
      className={classNames('nice-dates-day', dayClassNames)}
      onClick={handleSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleSelect}
      style={{ height }}
    >
      {dayOfMonth === 1 && (
        <span className='nice-dates-day_month'>{format(date, 'MMMM', { locale }).substring(0, 3)}</span>
      )}
      <span className='nice-dates-day_date'>{dayOfMonth}</span>
    </span>
  )
}

CalendarDay.propTypes = {
  date: instanceOf(Date).isRequired,
  height: number.isRequired,
  modifiers: objectOf(bool).isRequired,
  onHover: func,
  onSelect: func
}

CalendarDay.defaultProps = {
  modifiers: {},
  onHover: () => {},
  onSelect: () => {}
}
