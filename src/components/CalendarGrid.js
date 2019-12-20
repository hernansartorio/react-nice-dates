import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { instanceOf, number } from 'prop-types'
import { enGB as locale } from 'date-fns/locale'
import CalendarDay from './CalendarDay'

import {
  addWeeks,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getMonth,
  startOfMonth,
  format,
  startOfWeek,
  isSameDay,
  isAfter,
  isBefore
} from 'date-fns'

const today = new Date()
const PAST = 'past'
const FUTURE = 'future'

const rowsBetweenDates = (startDate, endDate) =>
  Math.ceil(differenceInCalendarDays(endOfWeek(endDate, { locale }), startOfWeek(startDate, { locale })) / 7)
const rowsInMonth = date => rowsBetweenDates(startOfMonth(date), endOfMonth(date))
const getGridStartDate = date => startOfWeek(startOfMonth(date), { locale })
const getGridEndDate = date => endOfWeek(addWeeks(endOfMonth(date), 6 - rowsInMonth(date)), { locale })

export default function CalendarGrid({ currentDate, transitionDuration }) {
  const [position, setPosition] = useState(0)
  const [transition, setTransition] = useState(true)
  const [direction, setDirection] = useState(FUTURE)
  const [gridStartDate, setGridStartDate] = useState(getGridStartDate(currentDate))
  const [gridEndDate, setGridEndDate] = useState(getGridEndDate(currentDate))
  const mounted = useRef()
  const timeout = useRef()
  const previousDateRef = useRef()
  const previousDate = previousDateRef.current

  useEffect(() => {
    previousDateRef.current = currentDate
  })

  useLayoutEffect(() => {
    if (mounted.current) {
      const cellHeight = document.getElementById('grid-container').firstChild.offsetHeight
      clearTimeout(timeout.current)
      setTransition(true)

      if (isAfter(currentDate, previousDate)) {
        const currentDatePosition = (rowsBetweenDates(gridStartDate, currentDate) - 1) * cellHeight
        setDirection(FUTURE)
        setPosition(-currentDatePosition)
        setGridEndDate(getGridEndDate(currentDate))
      } else if (isBefore(currentDate, previousDate)) {
        const gridHeight = document.getElementById('grid').offsetHeight
        const currentDatePosition = rowsBetweenDates(currentDate, gridEndDate) * cellHeight - gridHeight
        setDirection(PAST)
        setPosition(currentDatePosition)
        setGridStartDate(getGridStartDate(currentDate))
      }
    }
  }, [currentDate]) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (mounted.current) {
      if (position < 0) {
        timeout.current = setTimeout(() => {
          setPosition(0)
          setGridStartDate(getGridStartDate(currentDate))
          setTransition(false)
        }, transitionDuration)
      } else if (position > 0) {
        timeout.current = setTimeout(() => {
          setPosition(0)
          setGridEndDate(getGridEndDate(currentDate))
          setTransition(false)
        }, transitionDuration)
      }
    } else {
      mounted.current = true
    }
  }, [position]) // eslint-disable-line react-hooks/exhaustive-deps

  const dates = eachDayOfInterval({
    start: gridStartDate,
    end: gridEndDate
  }).map(date => {
    return (
      <CalendarDay
        key={format(date, 'yyyy-MM-dd', { locale })}
        date={date}
        isOdd={getMonth(date) % 2 !== getMonth(currentDate) % 2}
        isToday={isSameDay(date, today)}
      />
    )
  })

  return (
    <div className='nice-dates-grid' id='grid'>
      <div
        className='nice-dates-grid_container'
        id='grid-container'
        style={{
          transform: `translate3d(0, ${position}px, 0)`,
          transitionDuration: `${transition ? transitionDuration : 0}ms`,
          top: direction === FUTURE ? 0 : 'auto',
          bottom: direction === PAST ? 0 : 'auto'
        }}
      >
        {dates}
      </div>
    </div>
  )
}

CalendarGrid.propTypes = {
  currentDate: instanceOf(Date).isRequired,
  transitionDuration: number.isRequired
}

CalendarGrid.defaultProps = {
  transitionDuration: 500
}
