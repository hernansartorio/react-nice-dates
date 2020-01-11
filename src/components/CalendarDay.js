import React from 'react'
import { bool, instanceOf, func, number, object, objectOf, string } from 'prop-types'
import { getDate, format, isToday } from 'date-fns'
import classNames from 'classnames'

const defaultModifiersClassNames = {
  today: '-today',
  outside: '-outside',
  wide: '-wide',
  disabled: '-disabled',
  selected: '-selected',
  selectedStart: '-selected-start',
  selectedMiddle: '-selected-middle',
  selectedEnd: '-selected-end'
}

export default function CalendarDay({
  date,
  height,
  locale,
  modifiers: receivedModifiers,
  modifiersClassNames: receivedModifiersClassNames,
  onSelect,
  onHover
}) {
  const dayOfMonth = getDate(date)
  const dayClassNames = {}
  const modifiers = { today: isToday(date), ...receivedModifiers }
  const modifiersClassNames = { ...defaultModifiersClassNames, ...receivedModifiersClassNames }

  Object.keys(modifiers).forEach(name => {
    dayClassNames[modifiersClassNames[name]] = modifiers[name]
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
  locale: object.isRequired,
  modifiers: objectOf(bool).isRequired,
  modifiersClassNames: objectOf(string),
  onHover: func,
  onSelect: func
}

CalendarDay.defaultProps = {
  modifiers: {},
  onHover: () => {},
  onSelect: () => {}
}
