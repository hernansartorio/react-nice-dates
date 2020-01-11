import { useState } from 'react'
import { format, parse, isValid } from 'date-fns'

export default function useDateInput({
  date: selectedDate,
  format: receivedFormatString,
  locale,
  onDateChange,
  validate
}) {
  const formatString = receivedFormatString || locale.formatLong.date({ width: 'short' })

  const formatDate = date => format(date, formatString, { locale })
  const parseDate = dateString => parse(dateString, formatString, selectedDate || new Date())
  const isSelectable = date => isValid(date) && (!validate || validate(date))

  const [value, setValue] = useState(selectedDate ? formatDate(selectedDate) : '')

  const handleChange = event => {
    const newValue = event.target.value
    const parsedDate = parseDate(newValue)
    setValue(newValue)

    if (isSelectable(parsedDate)) {
      onDateChange(parsedDate)
    }
  }

  const handleBlur = () => {
    if (value) {
      const parsedDate = parseDate(value)

      if (isSelectable(parsedDate)) {
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
      value
    },
    updateValue
  ]
}
