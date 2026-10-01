import { useState } from 'react'
import { DAYS, MEAL_TIMINGS } from '../data/siteData'
import { dayView, effectiveMenuDayIndex, effectiveMenuWeekIndex } from '../lib/menu'
import useMenu, { useVegMenu } from '../lib/useMenu'
import { useVegMode } from '../lib/vegModeContext'
import VegToggle from '../components/VegToggle'
import { LoadingSkeleton, MenuError, SectionCard, SectionRows } from '../components/MenuBits'

export default function Menu() {
  const { weeks, error, loading } = useMenu()
  const { weeks: vegWeeks, error: vegError, loading: vegLoading } = useVegMenu()
  const { vegMode } = useVegMode()
  const [active, setActive] = useState(effectiveMenuDayIndex())
  const menuWeekIndex = effectiveMenuWeekIndex()

  const activeWeeks = vegMode ? vegWeeks : weeks
  const activeError = vegMode ? vegError : error
  const activeLoading = vegMode ? vegLoading : loading

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-5xl font-extrabold tracking-[0.1em]">Today&apos;s Menu</h2>
        <p className="polaris-muted mt-1 text-sm">Full day schedule from the official IIT Bhilai mess sheet.</p>
      </div>

      <div className="appetite-strip mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-2 rounded-xl px-6 py-4">
        {MEAL_TIMINGS.map((t) => (
          <span key={t.label} className={`text-sm font-semibold ${t.color}`}>
            {t.emoji} {t.label} {t.time}
          </span>
        ))}
      </div>

      <VegToggle />

      <MenuError error={activeError} />

      {activeLoading ? (
        <LoadingSkeleton />
      ) : activeWeeks && activeWeeks[menuWeekIndex] ? (
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
            {dayView(activeWeeks[menuWeekIndex], active).map((section, i) => (
              <SectionCard key={section.name} name={section.name} index={i}>
                <SectionRows rows={section.rows} />
              </SectionCard>
            ))}
          </div>
        </>
      ) : (
        !activeError && <p className="polaris-muted text-sm">No menu published yet.</p>
      )}
    </div>
  )
}