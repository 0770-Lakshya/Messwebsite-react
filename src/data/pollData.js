// Public link to the poll TOTALS sheet - never the form's responses sheet.
// The responses sheet holds everyone's name, ID and email, and whatever link
// is here gets downloaded by every visitor's browser, so keep that one
// Restricted. The totals sheet has one row per question:
//   column letter | agree count | disagree count      e.g.  F | 60 | 99
// (letters are the question's column in the responses sheet). You can also
// paste those cells here as text instead of a link.
export const POLL_SHEET_DATA = 'https://docs.google.com/spreadsheets/d/10rJihh_DPF3tP3F3xhTnaxzp47yjzz2ri7vH5kwh66w/edit?usp=sharing'

// Spreadsheet columns to show, in bar-chart order.
export const POLL_COLUMNS = ['K','L','M','N','O','T','U','V','F','G','H','I','Q','R','S']

// Group poll columns under the headings shown on the home page.
export const POLL_GROUPS = {
  Veg: ['K','L','M','N','O','T','U','V'],
  'Non Veg': ['F','G','H','I','Q','R','S'],
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
    Q: 'Do you like khichdi?',
    R: 'Do you like sevtamater?',
    S: 'Do you like arbi?',
    T: 'Do you like Khichdi?',
    U: 'Do you like Sevtamater?',
    V: 'Do you like Arbi?',
}

// Replace this with the Google Form link used for new responses.
export const POLL_FORM_URL = 'https://forms.gle/a2TMBDLJ3KLYCunp9'

const splitRow = (row) => {
  if (row.includes('\t')) return row.split('\t')
  if (row.includes(',')) return row.split(',')
  return row.split('|')
}

// Reads the totals sheet: one [column, agree, disagree] row per question.
// Rows for columns not in POLL_COLUMNS (headings, suggestions) are ignored.
export function parsePollSheet(sheetData) {
  const totals = new Map()
  for (const line of String(sheetData || '').split(/\r?\n/)) {
    const [column = '', yes, no] = splitRow(line).map((cell) => cell.trim())
    const key = column.toUpperCase()
    if (!POLL_COLUMNS.includes(key)) continue
    totals.set(key, { yesCount: Number(yes) || 0, noCount: Number(no) || 0 })
  }

  return POLL_COLUMNS.filter((column) => totals.has(column)).map((column) => {
    const { yesCount, noCount } = totals.get(column)
    return { column, heading: POLL_QUESTIONS[column] || column, yesCount, noCount, total: yesCount + noCount }
  })
}

export async function loadPollSheet(source) {
  if (!String(source || '').trim()) return []

  if (!/^https?:\/\//i.test(source)) return parsePollSheet(source)

  const sheetIdMatch = source.match(/spreadsheets\/d\/([^/]+)/)
  if (!sheetIdMatch) throw new Error('POLL_SHEET_DATA is not a Google Sheet link.')
  const gidMatch = source.match(/[?&#]gid=(\d+)/)
  const exportUrl =
    `https://docs.google.com/spreadsheets/d/${sheetIdMatch[1]}/export?format=xlsx` + (gidMatch ? `&gid=${gidMatch[1]}` : '')
  const response = await fetch(exportUrl, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Could not download poll results (HTTP ${response.status})`)

  const XLSX = await import('xlsx')
  const workbook = XLSX.read(await response.arrayBuffer(), { type: 'array' })
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' })
  return parsePollSheet(rows.map((row) => row.join('\t')).join('\n'))
}
