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
  return useMenuState(fetchMenu)
}

export function useVegMenu() {
  return useMenuState(fetchVegMenu)
}

export default useMenu
