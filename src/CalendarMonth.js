import React from 'react'
import { bool, instanceOf, func, number, object, objectOf, string } from 'prop-types'
import { getMonth, format, getYear } from 'date-fns'
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

const isSameMonth = (date, actualDate) => {
  return (getMonth(date) === getMonth(actualDate) && getYear(date) === getYear(actualDate))
}

export default function CalendarMonth({
  date,
  height,
  locale,
  modifiers: receivedModifiers,
  modifiersClassNames: receivedModifiersClassNames,
  onClick,
  onHover,
  showGrid,
  actualDate
}) {
  const monthClassNames = {}
  const modifiers = { today: isSameMonth(date, actualDate), ...receivedModifiers }
  const modifiersClassNames = { ...defaultModifiersClassNames, ...receivedModifiersClassNames }

  Object.keys(modifiers).forEach(name => {
    monthClassNames[modifiersClassNames[name]] = modifiers[name]
  })

  const handleClick = event => {
    onClick(date)
    showGrid()
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
      className={classNames('nice-dates-month', monthClassNames)}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleClick}
      style={{ height }}
    >
      <span>{format(date, 'LLLL', { locale })}</span>
    </span>
  )
}

CalendarMonth.propTypes = {
  date: instanceOf(Date).isRequired,
  height: number.isRequired,
  locale: object.isRequired,
  modifiers: objectOf(bool),
  modifiersClassNames: objectOf(string),
  onHover: func,
  onClick: func,
  showGrid: func,
  actualDate: instanceOf(Date)
}

CalendarMonth.defaultProps = {
  modifiers: {},
  onHover: () => { },
  onClick: () => { }
}
