import { useState } from 'react'
import { DAYS } from '../data/siteData'

export function MenuError({ error }) {
  if (!error) return null
  return (
    <div className="polaris-card mb-6 p-6 text-left" style={{ borderColor: 'rgba(212,24,61,.4)' }}>
      <p className="polaris-muted text-sm">{error}</p>
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div className="h-10 w-56 animate-pulse rounded-full bg-[#45347D]/10" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="polaris-card p-6">
          <div className="mb-4 h-5 w-40 animate-pulse rounded-full bg-[#45347D]/10" />
          <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="h-4 animate-pulse rounded-full bg-[#45347D]/5" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SectionCard({ name, index = 0, children }) {
  const tone = index % 2 === 0 ? 'card-appetite-yellow' : 'card-appetite-green'
  const toneText = index % 2 === 0 ? 'text-hunger-yellow' : 'text-hunger-green'
  return (
    <div className={`polaris-card mb-4 p-6 text-left polaris-card-hover ${tone}`}>
      <h3 className={`font-display mb-4 flex items-center justify-center gap-2 font-bold ${toneText}`}>{name}</h3>
      {children}
    </div>
  )
}

export function SectionRows({ rows }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col items-start gap-2">
          <span className="polaris-muted min-w-[5.5rem] flex-none pt-0.5 text-xs font-semibold">{row.category}</span>
          <span className="font-bold text-lg font-display tracking-[0.05em]">{row.item || '—'}</span>
        </div>
      ))}
    </div>
  )
}

export function WeeklyTable({ section, index = 0 }) {
  const tone = index % 2 === 0 ? 'card-appetite-yellow' : 'card-appetite-green'
  const toneText = index % 2 === 0 ? 'text-hunger-yellow' : 'text-hunger-green'
  return (
    <div className={`polaris-card mb-4 overflow-x-auto ${tone}`}>
      <div className={`font-display px-4 py-2 text-xs font-bold ${toneText}`}>{section.name}</div>
      <table className="polaris-table w-full min-w-[640px] text-sm">
        <thead>
          <tr>
            <th
              className="sticky left-0 z-10 px-4 py-2 text-left font-semibold"
              style={{ background: 'var(--background)', boxShadow: '4px 0 6px -4px rgba(15,17,21,.12)' }}
            >
              Item
            </th>
            {DAYS.map((day) => (
              <th key={day} className="px-4 py-2 text-left font-semibold">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, i) => (
            <tr key={i}>
              <td
                className="sticky left-0 z-10 px-4 py-2 font-semibold"
                style={{ background: 'var(--background)', boxShadow: '4px 0 6px -4px rgba(15,17,21,.12)' }}
              >
                {row.category}
              </td>
              {row.items.map((item, j) => (
                <td key={j} className="px-4 py-2 font-bold font-display max-w-[200px] overflow-hidden text-truncate">
                  {item || '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}