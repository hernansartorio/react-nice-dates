import React from 'react'
import { instanceOf, func, number, objectOf, string } from 'prop-types'
import { eachDayOfInterval, format, isSameMonth } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import classNames from 'classnames'
import useGrid from './useGrid'
import CalendarDay from './CalendarDay'

const computeModifiers = (modifiers, date) => {
  const computedModifiers = {}

  Object.keys(modifiers).map(key => {
    computedModifiers[key] = modifiers[key](date)
  })

  return computedModifiers
}

export default function CalendarGrid({
  month,
  modifiers,
  modifiersClassNames,
  onMonthChange,
  onHoverDate,
  onSelectDate,
  transitionDuration
}) {
  const grid = useGrid({ currentMonth: month, onMonthChange, transitionDuration })
  const { startDate, endDate, cellHeight, containerElementRef, isWide, offset, origin, transition } = grid

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  }).map(date => {
    return (
      <CalendarDay
        date={date}
        height={cellHeight}
        key={format(date, 'yyyy-MM-dd', { locale })}
        modifiers={{
          ...computeModifiers(modifiers, date),
          outside: !isSameMonth(date, month),
          wide: isWide
        }}
        modifiersClassNames={modifiersClassNames}
        onHover={onHoverDate}
        onSelect={onSelectDate}
      />
    )
  })

  return (
    <div className='nice-dates-grid' style={{ height: cellHeight * 6 }}>
      <div
        className={classNames('nice-dates-grid_container', {
          '-moving': offset,
          '-origin-bottom': origin === 'bottom',
          '-origin-top': origin === 'top',
          '-transition': transition
        })}
        ref={containerElementRef}
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          transitionDuration: `${transitionDuration}ms`
        }}
      >
        {days}
      </div>
    </div>
  )
}

CalendarGrid.propTypes = {
  month: instanceOf(Date).isRequired,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  onMonthChange: func.isRequired,
  onHoverDate: func,
  onSelectDate: func,
  transitionDuration: number.isRequired
}

CalendarGrid.defaultProps = {
  modifiers: {},
  transitionDuration: 500
}
