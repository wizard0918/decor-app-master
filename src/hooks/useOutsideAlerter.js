import { useEffect } from 'react'

const useOutsideAlerter = (ref, closeMenu, active = true) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeMenu()
    }
  }

  useEffect(() => {
    if (active) document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
}

export default useOutsideAlerter
