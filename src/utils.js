import { isAfter, isBefore, startOfDay, set } from 'date-fns'

export const isSelectable = (date, { minimumDate, maximumDate }) =>
  !isBefore(date, startOfDay(minimumDate)) && !isAfter(date, maximumDate)

export const mergeModifiers = (baseModifiers, newModifiers) => {
  const modifiers = { ...baseModifiers }

  if (!newModifiers) {
    return baseModifiers
  }

  Object.keys(newModifiers).forEach(name => {
    modifiers[name] = baseModifiers[name]
      ? date => baseModifiers[name](date) || newModifiers[name](date)
      : newModifiers[name]
  })

  return modifiers
}

export const setTime = (date, dateWithTime) =>
  set(date, { hours: dateWithTime.getHours(), minutes: dateWithTime.getMinutes(), seconds: dateWithTime.getSeconds() })
