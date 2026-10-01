import { useEffect, useRef, useState } from 'react'
import useMenu, { useVegMenu } from '../lib/useMenu'
import { effectiveMenuWeekIndex } from '../lib/menu'
import { useVegMode } from '../lib/vegModeContext'
import VegToggle from '../components/VegToggle'
import { LoadingSkeleton, MenuError, WeeklyTable } from '../components/MenuBits'

export default function WeeklyMenu() {
  const { weeks, error, loading } = useMenu()
  const { weeks: vegWeeks, error: vegError, loading: vegLoading } = useVegMenu()
  const { vegMode } = useVegMode()
  const [active, setActive] = useState(effectiveMenuWeekIndex)
  // Only stop following the live week once the reader has picked a tab themselves.
  const pickedRef = useRef(false)

  // Today's Menu recomputes its week on every render, but this tab is state, so a
  // page left open across the 22:00 rollover or the Monday boundary would keep
  // showing the sheet that was current when it loaded. Re-sync until the reader
  // chooses otherwise, so both sections always open on the same week.
  useEffect(() => {
    const id = setInterval(() => {
      if (pickedRef.current) return
      setActive((prev) => {
        const live = effectiveMenuWeekIndex()
        return live === prev ? prev : live
      })
    }, 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const pickWeek = (index) => {
    pickedRef.current = true
    setActive(index)
  }

  const activeWeeks = vegMode ? vegWeeks : weeks
  const activeError = vegMode ? vegError : error
  const activeLoading = vegMode ? vegLoading : loading
  // The sheet can come back with fewer tabs than the rotation has weeks.
  const shown = activeWeeks && active < activeWeeks.length ? active : 0

  if (typeof window !== 'undefined') {
    console.log('WeeklyMenu: vegMode', vegMode, 'weeks', activeWeeks)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-5xl font-extrabold tracking-[0.1em]">Weekly Menu</h2>
        <p className="polaris-muted mt-1 text-sm">Official grid from the IIT Bhilai mess Google Sheet.</p>
      </div>

      <VegToggle />

      <MenuError error={activeError} />

      {activeLoading ? (
        <LoadingSkeleton />
      ) : activeWeeks && activeWeeks.length ? (
        <>
          <div className="flex justify-center gap-2">
            {activeWeeks.map((week, i) => {
              const isActive = shown === i
              return (
                <button
                  key={week.label}
                  onClick={() => pickWeek(i)}
                  className={`week-tab rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'week-active' : ''
                  }`}
                  style={
                    isActive
                      ? { background: 'var(--primary)', color: 'var(--primary-foreground)' }
                      : { background: 'var(--secondary)', color: 'var(--secondary-foreground)' }
                  }
                >
                  {week.label}
                </button>
              )
            })}
          </div>

          <div>
            <h3 className="font-display mb-4 text-xl font-extrabold">{activeWeeks[shown].label}</h3>
            {activeWeeks[shown].sections.map((section, i) => (
              <WeeklyTable key={section.name} section={section} index={i} />
            ))}
          </div>
        </>
      ) : (
        !activeError && <p className="polaris-muted text-sm">No menu published yet.</p>
      )}
    </div>
  )
}