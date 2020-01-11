import React, { useState, useRef } from 'react'
import { func, instanceOf, object, objectOf, string } from 'prop-types'
import useDateInput from './useDateInput'
import useDetectTouch from './useDetectTouch'
import useOutsideClickHandler from './useOutsideClickHandler'
import DatePickerCalendar from './DatePickerCalendar'
import Popover from './Popover'
import { isBefore, isAfter } from 'date-fns'

export default function DatePicker({
  children,
  date,
  format,
  locale,
  minimumDate,
  maximumDate,
  modifiers,
  modifiersClassNames,
  onDateChange
}) {
  const [month, setMonth] = useState(new Date())
  const [focused, setFocused] = useState(false)
  const isTouch = useDetectTouch()
  const inputRef = useRef()

  const containerRef = useOutsideClickHandler(() => {
    setFocused(false)
  })

  const [inputProps, updateInputValue] = useDateInput({
    date,
    format,
    locale,
    onDateChange: date => {
      onDateChange(date)
      date && setMonth(date)
    },
    validate: date => !isBefore(date, minimumDate) && !isAfter(date, maximumDate)
  })

  const handleDateChange = date => {
    onDateChange(date)
    updateInputValue(date)
    setFocused(false)
  }

  return (
    <div className='nice-dates' ref={containerRef}>
      {children({
        inputProps: {
          ...inputProps,
          ref: inputRef,
          onFocus: () => {
            setFocused(true)

            if (isTouch) {
              inputRef.current.blur()
            }
          },
          readOnly: isTouch
        },
        focused
      })}

      <Popover open={focused}>
        <DatePickerCalendar
          month={month}
          onMonthChange={setMonth}
          date={date}
          locale={locale}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          onDateChange={handleDateChange}
        />
      </Popover>
    </div>
  )
}

DatePicker.propTypes = {
  date: instanceOf(Date),
  format: string,
  children: func,
  locale: object.isRequired,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onDateChange: func
}
