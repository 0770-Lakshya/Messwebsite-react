// Paste spreadsheet cells here, or put a public Google Sheet URL here.
export const POLL_SHEET_DATA = 'https://docs.google.com/spreadsheets/d/1LRBW3w75O1n9u3Hfa9kibVz0h4kqoz2JBGQr3RTybjk/edit?usp=sharing'

// Spreadsheet columns to show, in bar-chart order.
export const POLL_COLUMNS = ['K','L','M','N','O','F','G','H','I']

// Group poll columns under the headings shown on the home page.
export const POLL_GROUPS = {
  Veg: ['K','L','M','N','O'],
  'Non Veg': ['F','G','H','I'],
}

// Set the question shown for each column. Add more entries for more poll columns.
export const POLL_QUESTIONS = {
    F: 'Do you agree with shifting chicken biryani to lunchtime?',
    G: 'Quality of Chicken biryani',
    H: 'Do you agree with adding kadu in upcoming mess menu?',
    I: 'Do you agree with adding Leafy vegetables in upcoming mess menu?',
    K: 'Do you agree with shifting veg biryani to lunchtime?',
    L: 'Quality of Veg Biryani:',
    M: 'Do you agree with adding Kaddu in upcoming veg mess menu? ',
    N: 'Do you agree with adding Mushroom in upcoming mess menu?',
    O: 'Do you agree with adding leafy vegetables in upcoming mess menu?',
}

// Replace this with the Google Form link used for new responses.
export const POLL_FORM_URL = 'https://forms.gle/a2TMBDLJ3KLYCunp9'

const normalise = (value) => String(value ?? '').trim().toLowerCase()
const positiveResponses = new Set(['yes', '1', 'i agree', 'like'])
const negativeResponses = new Set(['no', '0', 'i disagree', 'dislike'])

const splitRow = (row) => {
  if (row.includes('\t')) return row.split('\t')
  if (row.includes(',')) return row.split(',')
  return row.split('|')
}

const columnNumber = (column) => {
  let number = 0
  for (const character of String(column).toUpperCase()) {
    number = number * 26 + character.charCodeAt(0) - 64
  }
  return number - 1
}

export function parsePollSheet(sheetData) {
  const rows = String(sheetData || '')
    .split(/\r?\n/)
    .map((row) => splitRow(row).map((cell) => cell.trim()))
    .filter((row) => row.some(Boolean))

  if (rows.length < 2) return []

  const customLabelRow = rows[0]
  const formHeaderRow = rows[1]
  const hasFormHeaderRow = POLL_COLUMNS.some((column) => {
    const value = normalise(formHeaderRow[columnNumber(column)])
    return value && !positiveResponses.has(value) && !negativeResponses.has(value)
  })
  const responseRows = rows.slice(hasFormHeaderRow ? 2 : 1)

  return POLL_COLUMNS.map((column) => {
    const columnIndex = columnNumber(column)
    const heading = POLL_QUESTIONS[column] || customLabelRow[columnIndex] || (hasFormHeaderRow ? formHeaderRow[columnIndex] : '') || column
    const responses = responseRows.map((row) => normalise(row[columnIndex]))
    const yesCount = responses.filter((response) => positiveResponses.has(response)).length
    const noCount = responses.filter((response) => negativeResponses.has(response)).length
    const total = yesCount + noCount

    return { column, heading, yesCount, noCount, total }
  }).filter((poll) => poll.total > 0 || poll.heading)
}

export async function loadPollSheet(source) {
  if (!String(source || '').trim()) return []

  if (!/^https?:\/\//i.test(source)) return parsePollSheet(source)

  const gidMatch = source.match(/[?&#]gid=(\d+)/)
  const sheetIdMatch = source.match(/spreadsheets\/d\/([^/]+)/)
  const exportUrl = source.includes('/edit')
    ? gidMatch && sheetIdMatch
      ? `https://docs.google.com/spreadsheets/d/${sheetIdMatch[1]}/gviz/tq?tqx=out:csv&gid=${gidMatch[1]}`
      : source.replace(/\/edit(?:\?[^#]*)?(?:#.*)?$/, '/export?format=xlsx')
    : source
  const response = await fetch(exportUrl, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Could not download poll sheet (HTTP ${response.status})`)

  const XLSX = await import('xlsx')
  const body = gidMatch ? await response.text() : await response.arrayBuffer()
  if (gidMatch && body.trimStart().startsWith('<')) {
    throw new Error('The Google Sheet is not publicly readable. Set General access to Anyone with the link.')
  }
  const workbook = gidMatch ? XLSX.read(body, { type: 'string' }) : XLSX.read(body, { type: 'array' })
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' })
  return parsePollSheet(rows.map((row) => row.join('\t')).join('\n'))
}