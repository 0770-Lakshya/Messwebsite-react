import { useEffect, useState } from 'react'
import { fetchMenu } from '../lib/menu'

export default function useMenu() {
  const [weeks, setWeeks] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchMenu().then(({ weeks: w, error: e }) => {
      if (cancelled) return
      setWeeks(w)
      setError(e)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { weeks, error, loading }
}