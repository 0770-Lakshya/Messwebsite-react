import { useEffect, useState } from 'react'

// Live poll results for a static site.
//
// How it works: Google Forms writes every vote into a responses spreadsheet.
// That sheet also records voters' emails, so it must stay PRIVATE. Instead, a
// second spreadsheet pulls in just the totals and is the only thing made public:
//
//   1. In the form: Responses -> Link to Sheets. Keep that sheet private.
//   2. Create a new, separate Google Sheet ("Poll Results"). For each question,
//      type the question as a heading in column A (leave B empty), and in the
//      cell below it paste (swap B for the question's column letter):
//        =IFERROR(QUERY(IMPORTRANGE("<responses sheet URL>", "Form Responses 1!B2:B"),
//               "select Col1, count(Col1) where Col1 is not null
//                group by Col1 label count(Col1) ''", 0), "")
//      Leave one more empty row than the question has options before the next
//      heading, so the totals have room. Click "Allow access" when the #REF!
//      prompt appears. Never import whole rows or the email/name/ID columns:
//      everything in this sheet is public.
//   3. Share "Poll Results" as "Anyone with the link can view" and paste its
//      link into POLL.resultsSheetUrl in siteData.js.
//
// The site downloads that public sheet as .xlsx - the same way it reads the menu
// - and draws one set of bars per heading. Google refreshes IMPORTRANGE on its
// own schedule, so new votes can take a while (up to ~30 min) to show.

const REFRESH_MS = 2 * 60 * 1000

// Accept any share / edit / export link and turn it into the xlsx export URL.
function exportUrl(sheetUrl) {
  const match = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/.exec(sheetUrl || '')
  return match ? `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=xlsx` : null
}

async function fetchResults(url) {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  const XLSX = await import('xlsx')
  const wb = XLSX.read(await res.arrayBuffer(), { type: 'array' })
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, blankrows: false })

  // A row with text in A and nothing in B is a question heading; the
  // [option, number] rows under it are that question's totals. Rows before
  // any heading form one untitled question, so a single-question sheet with
  // no heading still works.
  const sections = []
  let current = null
  for (const [a, b] of rows) {
    const label = String(a ?? '').trim()
    if (!label) continue
    if (b === undefined || b === null || b === '') {
      current = { question: label, results: [] }
      sections.push(current)
    } else if (Number.isFinite(Number(b))) {
      if (!current) {
        current = { question: null, results: [] }
        sections.push(current)
      }
      current.results.push({ option: label, votes: Number(b) })
    }
  }
  for (const s of sections) s.results.sort((x, y) => y.votes - x.votes)
  return sections
}

export default function usePollResults(sheetUrl) {
  const url = exportUrl(sheetUrl)
  const [state, setState] = useState({ sections: null, error: null, loading: Boolean(url) })

  useEffect(() => {
    if (!url) return undefined
    let cancelled = false

    const load = () =>
      fetchResults(url)
        .then((sections) => !cancelled && setState({ sections, error: null, loading: false }))
        .catch(() => {
          if (cancelled) return
          // Keep the last good numbers on screen if a refresh fails.
          setState((prev) => ({
            sections: prev.sections,
            error: 'Could not load the latest results. Make sure the results sheet is shared publicly.',
            loading: false,
          }))
        })

    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [url])

  return url ? state : { sections: null, error: null, loading: false }
}
