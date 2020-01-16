import { useRef, useEffect } from 'react'

export default function useOutsideClickHandler(callback) {
  const ref = useRef()

  useEffect(() => {
    const handleOutsideClick = event => {
      if (!ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [callback])

  return ref
}
