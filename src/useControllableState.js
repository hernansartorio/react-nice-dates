import { useState } from 'react'

export default function useControllableState(value, onChange, intitialValue) {
  const [state, setState] = useState(intitialValue)

  return onChange ? [value, onChange] : [state, setState]
}
