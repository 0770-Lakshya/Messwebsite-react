import { DAYS, SECTIONS } from '../data/siteData'

const GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/19orUPC3WDjW31AUQeZbcB6n-6g8f02HtL7MhMF0Qpq8/export?format=xlsx'

const VEG_GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1TGfLxe9dPgsOY8idcMwjIx_FPUFc9PDiNyJ3vZ1XKwA/export?format=xlsx'

const SHEETS = [
  ['1&3 Week', 'Week 1 & 3'],
  ['2&4 Week', 'Week 2 & 4'],
]

// Same caching strategy as the Django version:
// - re-render from cache between probes (20 min), no network at all
// - at each probe, refetch the file and hash it; re-parse only if changed
const MENU_CACHE_KEY='mess_menu_weeks_v2'
const MENU_HASH_KEY='mess_menu_file_hash_v2'
const MENU_CHECK_KEY='mess_menu_last_check_v2'
const VEG_MENU_CACHE_KEY='mess_menu_veg_weeks_v2'
const VEG_MENU_HASH_KEY='mess_menu_veg_file_hash_v2'
const VEG_MENU_CHECK_KEY='mess_menu_veg_last_check_v2'
const MENU_CHECK_INTERVAL=20*60*1000
const MENU_CACHE_TTL=24*60*60*1000

function now() {
  return Date.now()
}

function cached(weekCacheKey, hashKey, checkKey) {
  try {
    const weekData = localStorage.getItem(weekCacheKey)
    const hash = localStorage.getItem(hashKey)
    const check = localStorage.getItem(checkKey)
    if (weekData === null || hash === null || check === null) return null
    return [JSON.parse(weekData), hash, check]
  } catch {
    return null
  }
}

function setCache(weekCacheKey, hashKey, checkKey, data, hash) {
  try {
    localStorage.setItem(weekCacheKey, JSON.stringify(data))
    localStorage.setItem(hashKey, hash)
    localStorage.setItem(checkKey, String(now()))
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

async function downloadSheet(url) {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Could not download the menu sheet (HTTP ' + res.status + ')')
  return res.arrayBuffer()
}

export async function parseMenuWorkbook(buffer) {
  const XLSX = await import('xlsx')
  const wb = XLSX.read(buffer, { type: 'array' })
  const weeks = []

  // Provide tolerant lookup for sheet names: accept small variations in spacing,
  // ampersand usage, punctuation and case. This helps when sheet tab names differ
  // slightly between the veg and non-veg spreadsheets.
  const actualSheetNames = wb.SheetNames || []
  function norm(name) {
    return String(name || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]/g, '')
  }

  for (const [sheetName, label] of SHEETS) {
    const nameList = Array.isArray(sheetName) ? sheetName : [sheetName]
    let ws = null
    let matchedName = null
    for (const candidate of nameList) {
      const nc = norm(candidate)
      matchedName = actualSheetNames.find((n) => norm(n) === nc)
      if (matchedName) {
        ws = wb.Sheets[matchedName]
        break
      }
    }
    // If worksheet not found, still push an empty week so the UI shows the tab label
    if (!ws) {
      weeks.push({ label, sections: [] })
      continue
    }
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

async function fetchMenuFrom({
  url,
  weekCacheKey,
  hashKey,
  checkKey,
  fallbackError,
  notFoundError,
}) {
  const cache = cached(weekCacheKey, hashKey, checkKey)
  const lastCheck = cache ? Number(cache[2]) : 0

  if (cache && now() - lastCheck < MENU_CHECK_INTERVAL) {
    return { weeks: cache[0], error: null }
  }

  try {
    const buffer = await downloadSheet(url)
    const hash = await sha256(buffer)

    if (cache && hash && hash === cache[1]) {
      localStorage.setItem(checkKey, String(now()))
      return { weeks: cache[0], error: null }
    }

    const weeks = await parseMenuWorkbook(buffer)
    let error = null
    // If no sheets were found at all, report notFoundError.
    // But if sheets exist and are empty, still return them so the UI can show week tabs.
    if (!weeks.length) {
      error = notFoundError
      return { weeks: null, error }
    }
    if (hash) setCache(weekCacheKey, hashKey, checkKey, weeks, hash)
    else localStorage.setItem(checkKey, String(now()))
    return { weeks, error }
  } catch {
    if (cache) {
      localStorage.setItem(checkKey, String(now()))
      return { weeks: cache[0], error: fallbackError }
    }
    return {
      weeks: null,
      error: 'Could not download the menu. Check your internet connection and that the Google Sheet link is public.',
    }
  }
}

export function fetchMenu() {
  return fetchMenuFrom({
    url: GOOGLE_SHEET_URL,
    weekCacheKey: MENU_CACHE_KEY,
    hashKey: MENU_HASH_KEY,
    checkKey: MENU_CHECK_KEY,
    fallbackError: 'Could not refresh the menu — showing the last saved copy.',
    notFoundError: 'Could not read the menu sheet. Make sure it matches the expected format and is public.',
  })
}

export function fetchVegMenu() {
  return fetchMenuFrom({
    url: VEG_GOOGLE_SHEET_URL,
    weekCacheKey: VEG_MENU_CACHE_KEY,
    hashKey: VEG_MENU_HASH_KEY,
    checkKey: VEG_MENU_CHECK_KEY,
    fallbackError: 'Could not refresh the veg menu — showing the last saved copy.',
    notFoundError: 'Could not read the veg menu sheet. Make sure it matches the expected format and is public.',
  })
}

const MEAL_SCHEDULE = [
  { section: 'BREAKFAST', label: 'Breakfast', start: 8 * 60, end: 10 * 60, display: '8:00 AM - 10:00 AM' },
  { section: 'LUNCH', label: 'Lunch', start: 12 * 60 + 30, end: 14 * 60 + 30, display: '12:30 PM - 2:30 PM' },
  { section: 'DINNER', label: 'Dinner', start: 20 * 60, end: 22 * 60, display: '8:00 PM - 10:00 PM' },
]

function toMinutes(date) {
  return date.getHours() * 60 + date.getMinutes()
}

function nameFromDate(date) {
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

export function getMealStatus(date = new Date()) {
  const minutes = toMinutes(date)
  const current = MEAL_SCHEDULE.find((meal) => minutes >= meal.start && minutes < meal.end)
  if (current) {
    return { type: 'current', ...current }
  }

  const next = MEAL_SCHEDULE.find((meal) => minutes < meal.start)
  if (next) {
    return { type: 'upcoming', ...next, nextDay: false }
  }

  return { type: 'upcoming', ...MEAL_SCHEDULE[0], nextDay: true }
}

export function currentMealSection(date = new Date()) {
  return getMealStatus(date).section
}

export function effectiveMenuWeekIndex(date = new Date()) {
  const mondayOffset = (date.getDay() + DAYS.length - 1) % DAYS.length
  const weekStart = new Date(date.getFullYear(), date.getMonth(), date.getDate() - mondayOffset)
  const monthDays = new Map()

  for (let dayOffset = 0; dayOffset < DAYS.length; dayOffset += 1) {
    const day = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + dayOffset)
    const monthKey = `${day.getFullYear()}-${day.getMonth()}`
    const month = monthDays.get(monthKey) || { count: 0, date: day }
    month.count += 1
    monthDays.set(monthKey, month)
  }

  const majorityMonth = [...monthDays.values()].sort((a, b) => b.count - a.count)[0].date
  const firstMonday = new Date(majorityMonth.getFullYear(), majorityMonth.getMonth(), 1)
  const firstMondayOffset = (DAYS.length - firstMonday.getDay() + 1) % DAYS.length
  firstMonday.setDate(firstMonday.getDate() + firstMondayOffset)
  const weekOfMonth = Math.max(1, Math.floor((majorityMonth.getDate() - firstMonday.getDate()) / 7) + 1)
  return (weekOfMonth + 1) % 2
}

export function effectiveMenuDayIndex(date = new Date()) {
  const name = nameFromDate(date)
  const dayIndex = DAYS.indexOf(name) >= 0 ? DAYS.indexOf(name) : 0
  const minutes = toMinutes(date)
  if (minutes >= 22 * 60) {
    return (dayIndex + 1) % DAYS.length
  }
  return dayIndex
}

export function effectiveMenuDayName(date = new Date()) {
  return DAYS[effectiveMenuDayIndex(date)]
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