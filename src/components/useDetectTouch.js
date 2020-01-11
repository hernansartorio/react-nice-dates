import { useEffect, useState } from 'react'

export default function useDetectTouch() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const handleTouch = () => {
      setIsTouch(true)
      removeListener()
    }

    const removeListener = () => {
      document.removeEventListener('touchstart', handleTouch)
    }

    document.addEventListener('touchstart', handleTouch)
    return removeListener
  }, [])

  return isTouch
}
