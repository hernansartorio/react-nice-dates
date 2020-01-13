import { useState } from 'react'
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

  const [value, setValue] = useState(selectedDate ? formatDate(selectedDate) : '')

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
      } else {
        setValue(selectedDate ? formatDate(selectedDate) : '')
      }
    } else if (selectedDate) {
      onDateChange(null)
    }
  }

  const updateValue = date => {
    setValue(isValid(date) ? formatDate(date) : '')
  }

  return [
    {
      onBlur: handleBlur,
      onChange: handleChange,
      placeholder: formatString.toUpperCase(),
      type: 'text',
      value
    },
    updateValue
  ]
}
