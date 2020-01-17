import React, { useState, useRef } from 'react'
import { func, instanceOf, object, objectOf, string } from 'prop-types'
import useDateInput from './useDateInput'
import useDetectTouch from './useDetectTouch'
import useOutsideClickHandler from './useOutsideClickHandler'
import DatePickerCalendar from './DatePickerCalendar'
import Popover from './Popover'

export default function DatePicker({
  children,
  locale,
  date,
  onDateChange,
  format,
  minimumDate,
  maximumDate,
  modifiers,
  modifiersClassNames
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
    minimumDate,
    maximumDate,
    onDateChange: date => {
      onDateChange(date)
      date && setMonth(date)
    }
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
          locale={locale}
          date={date}
          month={month}
          onDateChange={handleDateChange}
          onMonthChange={setMonth}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </Popover>
    </div>
  )
}

DatePicker.propTypes = {
  children: func.isRequired,
  locale: object.isRequired,
  date: instanceOf(Date),
  onDateChange: func,
  format: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string)
}

DatePicker.defaultProps = {
  onDateChange: () => {}
}
