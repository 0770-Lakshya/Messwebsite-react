import { useEffect, useMemo, useState } from 'react'
import { VegModeContext } from './vegModeContext'

const STORAGE_KEY = 'mess_veg_mode'

function readInitial() {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function VegModeProvider({ children }) {
  const [vegMode, setVegMode] = useState(readInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, vegMode ? '1' : '0')
    } catch {
      // ignore storage failures
    }
  }, [vegMode])

  const value = useMemo(
    () => ({
      vegMode,
      setVegMode,
      toggleVegMode: () => setVegMode((v) => !v),
    }),
    [vegMode],
  )

  return <VegModeContext.Provider value={value}>{children}</VegModeContext.Provider>
}
