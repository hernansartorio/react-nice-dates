import React from 'react'
import { instanceOf, func, number } from 'prop-types'
import { eachDayOfInterval, format, isSameMonth, isToday } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import useGrid from './useGrid'
import CalendarDay from './CalendarDay'

export default function CalendarGrid({ currentMonth, onChange, transitionDuration }) {
  const grid = useGrid({ currentMonth, onChange, transitionDuration })
  const { startDate, endDate, containerElementRef, offset, origin, transition } = grid

  return (
    <div className='nice-dates-grid'>
      <div
        className='nice-dates-grid_container'
        ref={containerElementRef}
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          top: origin === 'top' ? 0 : 'auto',
          bottom: origin === 'bottom' ? 0 : 'auto',
          transitionDuration: `${transitionDuration}ms`,
          transitionProperty: transition ? 'transform' : 'none'
        }}
      >
        {eachDayOfInterval({
          start: startDate,
          end: endDate
        }).map(date => {
          return (
            <CalendarDay
              key={format(date, 'yyyy-MM-dd', { locale })}
              date={date}
              isOutside={!isSameMonth(date, currentMonth)}
              isToday={isToday(date)}
            />
          )
        })}
      </div>
    </div>
  )
}

CalendarGrid.propTypes = {
  currentMonth: instanceOf(Date).isRequired,
  onChange: func.isRequired,
  transitionDuration: number.isRequired
}

CalendarGrid.defaultProps = {
  transitionDuration: 500
}
