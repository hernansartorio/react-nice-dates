import React from 'react'
import { instanceOf, func, number } from 'prop-types'
import { eachDayOfInterval, format, isSameMonth, isToday } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import useGrid from './useGrid'
import CalendarDay from './CalendarDay'

export default function CalendarGrid({ currentMonth, onChange, transitionDuration }) {
  const grid = useGrid({ currentMonth, onChange, transitionDuration })
  const { startDate, endDate, cellHeight, containerElementRef, offset, origin, transition, wideRatio } = grid

  return (
    <div className='nice-dates-grid' style={{ height: cellHeight * 6 }}>
      <div
        className='nice-dates-grid_container'
        ref={containerElementRef}
        style={{
          bottom: origin === 'bottom' ? 0 : 'auto',
          top: origin === 'top' ? 0 : 'auto',
          transform: `translate3d(0, ${offset}px, 0)`,
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
              height={cellHeight}
              isOutside={!isSameMonth(date, currentMonth)}
              isToday={isToday(date)}
              isWide={wideRatio}
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
