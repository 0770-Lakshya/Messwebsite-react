import { useEffect, useState } from 'react'

// Paste your shared Google Sheet URL here (format: xlsx export, two tabs:
// "Announcements" and "Notices"). See the comments at the bottom.
const CONTENT_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1CxJpqsuMlrPB2Lp1A9xQtj3zlR2fxRs1HGCoZ7dF8Xg/export?format=xlsx'

const CONTENT_CACHE_KEY = 'mess_content_v3'
const CONTENT_HASH_KEY = 'mess_content_file_hash_v3'
const CONTENT_CHECK_KEY = 'mess_content_last_check_v3'
const CONTENT_CHECK_INTERVAL = 1 * 60 * 1000

function now() {
  return Date.now()
}

function cached() {
  try {
    const data = localStorage.getItem(CONTENT_CACHE_KEY)
    const hash = localStorage.getItem(CONTENT_HASH_KEY)
    const check = localStorage.getItem(CONTENT_CHECK_KEY)
    if (data === null || hash === null || check === null) return null
    return [JSON.parse(data), hash, Number(check)]
  } catch {
    return null
  }
}

function setCache(data, hash) {
  try {
    localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CONTENT_HASH_KEY, hash)
    localStorage.setItem(CONTENT_CHECK_KEY, String(now()))
  } catch {
    // storage full or unavailable — degrade gracefully
  }
}

async function sha256(buffer) {
  try {
    const digest = await crypto.subtle.digest('SHA-256', buffer)
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    return null
  }
}

function clean(value) {
  if (value === null || value === undefined) return ''
  return String(value).replace(/\n/g, ' ').replace(/"/g, '').trim()
}

export async function parseContentWorkbook(buffer) {
  const XLSX = await import('xlsx')
  const wb = XLSX.read(buffer, { type: 'array' })
  const announcements = []
  const notices = []

  const sheetToRows = (name) => {
    const ws = wb.Sheets[name]
    return ws ? XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }) : []
  }

  const annRows = sheetToRows('Announcements')
  for (const row of annRows) {
    if (!row || row.length < 2) continue
    const title = clean(row[1])
    if (!title) continue
    announcements.push({
      kind: clean(row[0]) || 'general',
      title,
      message: clean(row[2]),
      color: clean(row[3]) || '',
    })
  }

  const notRows = sheetToRows('Notices')
  for (const row of notRows) {
    if (!row || row.length < 2) continue
    const title = clean(row[1])
    if (!title) continue
    notices.push({
      category: clean(row[0]) || 'General',
      title,
      date: clean(row[2]) || 'General',
      text: clean(row[3]),
      color: clean(row[4]) || '',
    })
  }

  return { announcements, notices }
}

export async function fetchContent() {
  const cache = cached()
  const lastCheck = cache ? cache[2] : 0

  if (cache && now() - lastCheck < CONTENT_CHECK_INTERVAL) {
    return { announcements: cache[0].announcements, notices: cache[0].notices, error: null }
  }

  try {
    const res = await fetch(CONTENT_SHEET_URL, { cache: 'no-store' })
    if (!res.ok) throw new Error('Could not download the content sheet (HTTP ' + res.status + ')')
    const buffer = await res.arrayBuffer()
    const hash = await sha256(buffer)

    if (cache && hash && hash === cache[1]) {
      localStorage.setItem(CONTENT_CHECK_KEY, String(now()))
      return { announcements: cache[0].announcements, notices: cache[0].notices, error: null }
    }

    const data = await parseContentWorkbook(buffer)
    if (hash) setCache(data, hash)
    else localStorage.setItem(CONTENT_CHECK_KEY, String(now()))
    return { ...data, error: null }
  } catch {
    if (cache) {
      localStorage.setItem(CONTENT_CHECK_KEY, String(now()))
      return {
        announcements: cache[0].announcements,
        notices: cache[0].notices,
        error: 'Could not refresh the content — showing the last saved copy.',
      }
    }
    return {
      announcements: [],
      notices: [],
      error: 'Could not download the content sheet. Check your connection and that the Google Sheet is public.',
    }
  }
}

export function useContent() {
  const [state, setState] = useState({ announcements: [], notices: [], error: null, loading: true })

  useEffect(() => {
    let cancelled = false
    fetchContent().then(({ announcements, notices, error }) => {
      if (cancelled) return
      setState({ announcements, notices, error, loading: false })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
