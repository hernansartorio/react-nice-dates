import React, { useCallback, useState } from 'react'
import { bool, func, instanceOf, object, objectOf, string } from 'prop-types'
import { startOfMonth } from 'date-fns'
import { isSelectable, mergeModifiers } from './utils'
import useControllableState from './useControllableState'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import CalendarGrid from './CalendarGrid'
import Popover from './Popover'
import MonthPicker from './MonthPicker'

export default function Calendar({
  locale,
  month: receivedMonth,
  modifiers: receivedModifiers,
  modifiersClassNames,
  minimumDate,
  maximumDate,
  onMonthChange,
  onDayHover,
  onDayClick,
  weekdayFormat,
  touchDragEnabled,
  monthModifiers,
  monthModifiersClassNames
}) {
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, startOfMonth(new Date()))
  const [show, setShow] = useState(true)

  const modifiers = mergeModifiers(
    { disabled: date => !isSelectable(date, { minimumDate, maximumDate }) },
    receivedModifiers
  )

  const handleToggle = useCallback(() => setShow(state => !state), [])

  return (
    <div>
      <CalendarNavigation
        locale={locale}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        month={month}
        onMonthChange={setMonth}
        showMonthPicker={handleToggle}
        show={show}
      />

      <Popover open={!show}>
        <MonthPicker
          locale={locale}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          modifiers={monthModifiers}
          modifiersClassNames={monthModifiersClassNames}
          actualDate={month}
          onClick={onMonthChange}
          touchDragEnabled={touchDragEnabled}
          onDayHover={onDayHover}
          showGrid={handleToggle}
        />
      </Popover>

      <CalendarWeekHeader locale={locale} weekdayFormat={weekdayFormat} />
      <CalendarGrid
        locale={locale}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        month={month}
        onMonthChange={setMonth}
        onDayHover={onDayHover}
        onDayClick={onDayClick}
        touchDragEnabled={touchDragEnabled}
      />
    </div>
  )
}

Calendar.propTypes = {
  locale: object.isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  month: instanceOf(Date),
  onMonthChange: func,
  onDayHover: func,
  onDayClick: func,
  weekdayFormat: string,
  touchDragEnabled: bool,
  monthModifiers: objectOf(func),
  monthModifiersClassNames: objectOf(string)
}
