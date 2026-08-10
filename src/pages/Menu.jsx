import { useState } from 'react'
import { DAYS } from '../data/siteData'
import { dayView, todayIndex } from '../lib/menu'
import useMenu from '../lib/useMenu'
import { LoadingSkeleton, MenuError, SectionCard, SectionRows } from '../components/MenuBits'

export default function Menu() {
  const { weeks, error, loading } = useMenu()
  const [active, setActive] = useState(todayIndex())

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-3xl font-extrabold">Today&apos;s Menu</h2>
        <p className="polaris-muted mt-1 text-sm">Full day schedule from the official IIT Bhilai mess sheet.</p>
      </div>

      <MenuError error={error} />

      {loading ? (
        <LoadingSkeleton />
      ) : weeks && weeks[0] ? (
        <>
          <div className="flex flex-wrap justify-center gap-2">
            {DAYS.map((name, i) => {
              const isActive = active === i
              return (
                <button
                  key={name}
                  onClick={() => setActive(i)}
                  className={`day-tab rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'day-active' : ''
                  }`}
                  style={
                    isActive
                      ? { background: 'var(--primary)', color: 'var(--primary-foreground)' }
                      : { background: 'var(--secondary)', color: 'var(--secondary-foreground)' }
                  }
                >
                  {name}
                </button>
              )
            })}
          </div>

          <div>
            {dayView(weeks[0], active).map((section, i) => (
              <SectionCard key={section.name} name={section.name} index={i}>
                <SectionRows rows={section.rows} />
              </SectionCard>
            ))}
          </div>
        </>
      ) : (
        !error && <p className="polaris-muted text-sm">No menu published yet.</p>
      )}
    </div>
  )
}