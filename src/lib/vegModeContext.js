import { createContext, useContext } from 'react'

export const VegModeContext = createContext({
  vegMode: false,
  setVegMode: () => {},
  toggleVegMode: () => {},
})

export function useVegMode() {
  return useContext(VegModeContext)
}
