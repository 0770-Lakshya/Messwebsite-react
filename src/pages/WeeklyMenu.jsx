import { useState } from 'react'
import useMenu, { useVegMenu } from '../lib/useMenu'
import { useVegMode } from '../lib/vegModeContext'
import VegToggle from '../components/VegToggle'
import { LoadingSkeleton, MenuError, WeeklyTable } from '../components/MenuBits'

export default function WeeklyMenu() {
  const { weeks, error, loading } = useMenu()
  const { weeks: vegWeeks, error: vegError, loading: vegLoading } = useVegMenu()
  const { vegMode } = useVegMode()
  const [active, setActive] = useState(0)

  const activeWeeks = vegMode ? vegWeeks : weeks
  const activeError = vegMode ? vegError : error
  const activeLoading = vegMode ? vegLoading : loading

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-3xl font-extrabold">Weekly Menu</h2>
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
              const isActive = active === i
              return (
                <button
                  key={week.label}
                  onClick={() => setActive(i)}
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
            <h3 className="font-display mb-4 text-lg font-bold">{activeWeeks[active].label}</h3>
            {activeWeeks[active].sections.map((section, i) => (
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