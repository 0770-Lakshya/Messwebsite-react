import { DAYS, SECTIONS } from '../data/siteData'

const GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/19orUPC3WDjW31AUQeZbcB6n-6g8f02HtL7MhMF0Qpq8/export?format=xlsx'

const SHEETS = [
  ['1&3 Week', 'Week 1 & 3'],
  ['2&4', 'Week 2 & 4'],
]

// Same caching strategy as the Django version:
// - re-render from cache between probes (20 min), no network at all
// - at each probe, refetch the file and hash it; re-parse only if changed
const MENU_CACHE_KEY = 'mess_menu_weeks_v2'
const MENU_HASH_KEY = 'mess_menu_file_hash_v2'
const MENU_CHECK_KEY = 'mess_menu_last_check_v2'
const MENU_CHECK_INTERVAL = 20 * 60 * 1000
const MENU_CACHE_TTL = 24 * 60 * 60 * 1000

function now() {
  return Date.now()
}

function cached(...keys) {
  try {
    const values = keys.map((k) => localStorage.getItem(k))
    return values.every((v) => v !== null) ? values.map((v, i) => (keys[i] === MENU_CACHE_KEY ? JSON.parse(v) : v)) : null
  } catch {
    return null
  }
}

function setCache(data, hash) {
  try {
    localStorage.setItem(MENU_CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(MENU_HASH_KEY, hash)
    localStorage.setItem(MENU_CHECK_KEY, String(now()))
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

async function downloadSheet() {
  const res = await fetch(GOOGLE_SHEET_URL, { cache: 'no-store' })
  if (!res.ok) throw new Error('Could not download the menu sheet (HTTP ' + res.status + ')')
  return res.arrayBuffer()
}

export async function parseMenuWorkbook(buffer) {
  const XLSX = await import('xlsx')
  const wb = XLSX.read(buffer, { type: 'array' })
  const weeks = []

  for (const [sheetName, label] of SHEETS) {
    const ws = wb.Sheets[sheetName]
    if (!ws) continue
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null })
    const sections = []
    let current = null

    for (const row of rows) {
      const raw = row && row[0]
      if (raw === null || raw === undefined || raw === '') continue
      const label0 = String(raw).trim()
      if (SECTIONS.includes(label0)) {
        current = { name: label0, rows: [] }
        sections.push(current)
        continue
      }
      if (label0 === 'Meal / Category' || current === null) continue
      const items = []
      for (let day = 1; day <= 7; day += 1) {
        const val = row[day]
        items.push(val !== null && val !== undefined ? String(val).replace(/\n/g, ' ').replace(/"/g, '').trim() : '')
      }
      current.rows.push({ category: label0, items })
    }

    weeks.push({ label, sections })
  }

  return weeks
}

export async function fetchMenu() {
  const cache = cached(MENU_CACHE_KEY, MENU_HASH_KEY, MENU_CHECK_KEY)
  const lastCheck = cache ? Number(cache[2]) : 0

  if (cache && now() - lastCheck < MENU_CHECK_INTERVAL) {
    return { weeks: cache[0], error: null }
  }

  try {
    const buffer = await downloadSheet()
    const hash = await sha256(buffer)

    if (cache && hash && hash === cache[1]) {
      localStorage.setItem(MENU_CHECK_KEY, String(now()))
      return { weeks: cache[0], error: null }
    }

    const weeks = await parseMenuWorkbook(buffer)
    let error = null
    if (!weeks.length || weeks.every((w) => !w.sections.length)) {
      error = 'Could not read the menu sheet. Make sure it matches the expected format and is public.'
      weeks.splice(0, weeks.length)
      if (!weeks.length) return { weeks: null, error }
    }
    if (hash) setCache(weeks, hash)
    else localStorage.setItem(MENU_CHECK_KEY, String(now()))
    return { weeks, error }
  } catch {
    if (cache) {
      localStorage.setItem(MENU_CHECK_KEY, String(now()))
      return { weeks: cache[0], error: 'Could not refresh the menu — showing the last saved copy.' }
    }
    return {
      weeks: null,
      error: 'Could not download the menu. Check your internet connection and that the Google Sheet link is public.',
    }
  }
}

export function dayView(week, dayIndex) {
  return week.sections.map((section) => ({
    name: section.name,
    rows: section.rows.map((r) => ({ category: r.category, item: r.items[dayIndex] })),
  }))
}

export function todayName() {
  const date = new Date()
  const names = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return names[date.getDay()]
}

export function todayIndex() {
  const name = todayName()
  return DAYS.indexOf(name) >= 0 ? DAYS.indexOf(name) : 0
}