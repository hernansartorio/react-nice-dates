import React, { useRef, useState } from 'react'
import { func, instanceOf, object, objectOf, string } from 'prop-types'
import { isAfter, isBefore } from 'date-fns'
import useDateInput from './useDateInput'
import useOutsideClickHandler from './useOutsideClickHandler'
import useDetectTouch from './useDetectTouch'
import DateRangePickerCalendar from './DateRangePickerCalendar'
import Popover from './Popover'

export default function DateRangePicker({
  children,
  startDate,
  endDate,
  format,
  locale,
  maximumDate,
  minimumDate,
  modifiers,
  modifiersClassNames,
  onStartDateChange,
  onEndDateChange
}) {
  const [month, setMonth] = useState(new Date())
  const [focus, setFocus] = useState()
  const isTouch = useDetectTouch()
  const startDateInputRef = useRef()
  const endDateInputRef = useRef()

  const containerRef = useOutsideClickHandler(() => {
    setFocus(null)
  })

  const [startDateInputProps, updateStartDateInputValue] = useDateInput({
    date: startDate,
    format,
    locale,
    onDateChange: date => {
      onStartDateChange(date)
      date && setMonth(date)
    },
    validate: date => (!endDate || isBefore(date, endDate)) && !isBefore(date, minimumDate)
  })

  const [endDateInputProps, updateEndDateInputValue] = useDateInput({
    date: endDate,
    format,
    locale,
    onDateChange: date => {
      onEndDateChange(date)
      date && setMonth(date)
    },
    validate: date => (!startDate || isAfter(date, startDate)) && !isAfter(date, maximumDate)
  })

  const handleStartDateChange = date => {
    onStartDateChange(date)
    updateStartDateInputValue(date)
  }

  const handleEndDateChange = date => {
    onEndDateChange(date)
    updateEndDateInputValue(date)
  }

  return (
    <div className='nice-dates' ref={containerRef}>
      {children({
        startDateInputProps: {
          ...startDateInputProps,
          onFocus: () => {
            setFocus('startDate')

            if (isTouch) {
              startDateInputRef.current.blur()
            }
          },
          ref: startDateInputRef,
          readOnly: isTouch
        },
        endDateInputProps: {
          ...endDateInputProps,
          onFocus: () => {
            setFocus('endDate')

            if (isTouch) {
              endDateInputRef.current.blur()
            }
          },
          ref: endDateInputRef,
          readOnly: isTouch
        },
        focus
      })}

      <Popover open={!!focus}>
        <DateRangePickerCalendar
          month={month}
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          onMonthChange={setMonth}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onFocusChange={setFocus}
        />
      </Popover>
    </div>
  )
}

DateRangePicker.propTypes = {
  startDate: instanceOf(Date),
  endDate: instanceOf(Date),
  children: func,
  locale: object,
  format: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  onStartDateChange: func,
  onEndDateChange: func
}
