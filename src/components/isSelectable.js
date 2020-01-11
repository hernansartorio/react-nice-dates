import { isAfter, isBefore, startOfDay } from 'date-fns'

export default function isSelectable(date, { minimumDate, maximumDate }) {
  return !isBefore(date, startOfDay(minimumDate)) && !isAfter(date, maximumDate)
}
