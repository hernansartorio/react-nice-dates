// import React from 'react'
// import { format } from 'date-fns'

import { isSelectable, mergeModifiers } from '../src/utils'
import { isToday } from 'date-fns'

describe('isSelectable', () => {
  it('should return `true` for a date that is within the range of `minimumDate` and `maximumDate`', () => {
    const testDate = new Date(2025, 10, 4)
    const minimumDate = new Date(2025, 10, 3)
    const maximumDate = new Date(2025, 10, 5)
    expect(isSelectable(testDate, { minimumDate, maximumDate })).toBe(true)
  })
  it('should return `true` for a date that is equal to `minimumDate` or `maximumDate`', () => {
    const minimumDate = new Date(2025, 10, 3)
    const maximumDate = new Date(2025, 10, 5)
    expect(isSelectable(minimumDate, { minimumDate, maximumDate })).toBe(true)
    expect(isSelectable(maximumDate, { minimumDate, maximumDate })).toBe(true)
  })
  it('should return `false` for a date that is before `minimumDate` or after `maximumDate`', () => {
    const beforeTestDate = new Date(2025, 10, 2)
    const afterTestDate = new Date(2025, 10, 6)
    const minimumDate = new Date(2025, 10, 3)
    const maximumDate = new Date(2025, 10, 5)

    expect(isSelectable(beforeTestDate, { minimumDate, maximumDate })).toBe(false)
    expect(isSelectable(afterTestDate, { minimumDate, maximumDate })).toBe(false)
  })
})
describe('mergeModfiers', () => {
  it('should return the original modifier object if `newModifiers` is not provided', () => {
    const today = new Date(2025, 10, 4)
    const mockBaseModifiers = { today: isToday(today) }
    expect(mergeModifiers(mockBaseModifiers)).toEqual(mockBaseModifiers)
  })

  it('should (in effect) merge a provided modifier into the `modifiers` object if the key is not already present', () => {
    const mockBaseModifiers = { today: (date) => false }
    const newModifier = { thursday: (date) => true }

    expect(mergeModifiers(mockBaseModifiers, newModifier)).toEqual({
      ...mockBaseModifiers,
      ...newModifier
    })
    expect(mergeModifiers(mockBaseModifiers, newModifier)).toEqual({
      ...newModifier,
      ...mockBaseModifiers
    })
  })

  it('should check both `baseModifier` and `newModifier` of the same name', () => {
    const mockBaseModifiers = { test: (num) => num > 1 }
    const newModifier = { test: (string) => typeof string === 'string' }
    const mergedModfiers = mergeModifiers(mockBaseModifiers, newModifier)
    const NOT_A_NUMBER_OVER_1_OR_A_STRING = true

    expect(mergedModfiers.test(10)).toBe(true)
    expect(mergedModfiers.test(-10)).toBe(false)
    expect(mergedModfiers.test('a string')).toBe(true)
    expect(mergedModfiers.test(NOT_A_NUMBER_OVER_1_OR_A_STRING)).toBe(false)
  })

  it('should prefer a `baseModifier` with the same name as a `newModifier`', () => {
    const mockBaseModifiers = { today: (date) => 'baseModifier' }
    const newModifier = { today: (date) => 'newModifier' }
    const mergedModfiers = mergeModifiers(mockBaseModifiers, newModifier)

    expect(mergedModfiers.today('which one?')).toBe('baseModifier')
  })

  it('should assign the `newModifier` if no `baseModifier` of the same name is provided', () => {
    const mockBaseModifiers = { today: (date) => 'baseModifier' }
    const newModifier = { tomorrow: (date) => 'newModifier' }
    const mergedModifiers = mergeModifiers(mockBaseModifiers, newModifier)
    expect(mergedModifiers.tomorrow).toEqual(newModifier.tomorrow)
  })
})
