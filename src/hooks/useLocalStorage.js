import { useState, useEffect } from 'react'

// Mirrors a piece of React state into localStorage so it survives
// hard refreshes. Reads lazily on first render, writes on every change.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.warn(`Could not read localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Could not write localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue]
}
