import { useEffect, useState } from 'react'
import { fetchMenu, fetchVegMenu } from './menu'

function useMenuState(fetcher) {
  const [state, setState] = useState({ weeks: null, error: null, loading: true })

  useEffect(() => {
    let cancelled = false
    fetcher().then(({ weeks, error }) => {
      if (cancelled) return
      setState({ weeks, error, loading: false })
    })
    return () => {
      cancelled = true
    }
  }, [fetcher])

  return state
}

export function useMenu() {
  const state = useMenuState(fetchMenu)
  // debug: log menu weeks for non-veg
  if (typeof window !== 'undefined') {
    console.log('useMenu: weeks', state.weeks)
  }
  return state
}

export function useVegMenu() {
  return useMenuState(fetchVegMenu)
}

export default useMenu
