import { useEffect, useState } from 'react'
import { format, parse, isValid } from 'date-fns'
import { isSelectable } from './utils'

export default function useDateInput({
  date: selectedDate,
  format: receivedFormatString,
  locale,
  minimumDate,
  maximumDate,
  onDateChange,
  validate
}) {
  const formatString = receivedFormatString || locale.formatLong.date({ width: 'short' })

  const formatDate = date => format(date, formatString, { locale })
  const parseDate = dateString => parse(dateString, formatString, selectedDate || new Date())
  const isValidAndSelectable = date =>
    isValid(date) && isSelectable(date, { minimumDate, maximumDate }) && (!validate || validate(date))

  const [value, setValue] = useState(isValidAndSelectable(selectedDate) ? formatDate(selectedDate) : '')
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    setFocused(true)
  }

  const handleChange = event => {
    const newValue = event.target.value
    const parsedDate = parseDate(newValue)
    setValue(newValue)

    if (isValidAndSelectable(parsedDate)) {
      onDateChange(parsedDate)
    }
  }

  const handleBlur = () => {
    if (value) {
      const parsedDate = parseDate(value)

      if (isValidAndSelectable(parsedDate)) {
        setValue(formatDate(parsedDate))
      } else if (isValidAndSelectable(selectedDate)) {
        setValue(formatDate(selectedDate))
      } else {
        setValue('')
      }
    } else if (selectedDate) {
      onDateChange(null)
    }

    setFocused(false)
  }

  useEffect(() => {
    if (!focused) {
      setValue(isValidAndSelectable(selectedDate) ? formatDate(selectedDate) : '')
    }
  }, [selectedDate]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    onFocus: handleFocus,
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder: formatString.toUpperCase(),
    type: 'text',
    value
  }
}
