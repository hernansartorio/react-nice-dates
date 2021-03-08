import { useRef, useEffect } from 'react'

export default function useOutsideClickHandler(callback) {
  const refA = useRef()
  const refB = useRef()
  const refC = useRef()

  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        (!refA.current || (refA.current.contains && !refA.current.contains(event.target))) &&
        (!refB.current || (refB.current.contains && !refB.current.contains(event.target))) &&
        (!refC.current || (refC.current.contains && !refC.current.contains(event.target)))
      ) {
        callback()
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [callback])

  return [refA, refB, refC]
}
