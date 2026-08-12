import { Link } from 'react-router-dom'
import { LEADERSHIP, MEAL_TIMINGS } from '../data/siteData'
import { currentMealSection, dayView, effectiveMenuDayIndex, effectiveMenuDayName, getMealStatus } from '../lib/menu'
import useMenu, { useVegMenu } from '../lib/useMenu'
import { useContent } from '../lib/useContent'
import { useVegMode } from '../lib/vegModeContext'
import Avatar from '../components/Avatar'
import VegToggle from '../components/VegToggle'
import { LoadingSkeleton, MenuError, SectionCard, SectionRows, WeeklyTable } from '../components/MenuBits'

const ANN_EMOJI = { special: '🎉', timing: '🕒', meal: '🍛', general: '📢' }

export default function Home() {
  const { weeks, error, loading } = useMenu()
  const { weeks: vegWeeks, error: vegError, loading: vegLoading } = useVegMenu()
  const { announcements, notices } = useContent()
  const { vegMode } = useVegMode()
  const menuDayIndex = effectiveMenuDayIndex()
  const mealStatus = getMealStatus()
  const activeWeeks = vegMode ? vegWeeks : weeks
  const activeError = vegMode ? vegError : error
  const activeLoading = vegMode ? vegLoading : loading
  const todaySections = activeWeeks && activeWeeks[0] ? dayView(activeWeeks[0], menuDayIndex) : []
  const filteredSections = todaySections.filter((section) => section.name === mealStatus.section)
  const todaySectionsToShow = filteredSections.length ? filteredSections : todaySections
  const menuDayName = effectiveMenuDayName()
  const week = activeWeeks && activeWeeks[0]

  const shownAnnouncements = announcements
  const shownNotices = notices


  return (
    <div>
      <section className="relative mb-14 overflow-hidden rounded-b-[2rem] text-center">
  {/* 50% opacity background image */}
  <img
    // src="/images/notice_bg.png"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 h-full w-full object-cover opacity-50"
    onError={(e) => (e.currentTarget.style.display = 'none')}
  />

  {/* Content on top */}
  <div className="relative z-10 mx-auto max-w-4xl space-y-5 px-4 py-16 md:py-24">
    <h1 className="hero-font text-5xl leading-none md:text-7xl">
      PAKADAR<span className="gradient-text">PANALAYA</span>
    </h1>
    <p className="polaris-muted mx-auto max-w-xl text-lg">
      The official dining portal of IIT Bhilai — live menu, weekly schedule, leadership messages and your student
      mess committee, all in one place.
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      <Link to="/menu" className="btn-primary">
        Today&apos;s Menu
      </Link>
      <Link to="/menu/weekly" className="btn-ghost">
        Weekly Menu .XLS
      </Link>
    </div>
  </div>
</section>

      {/* Appetite strip */}
      <div className="appetite-strip mx-auto mb-14 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-2 rounded-xl px-6 py-4">
        {MEAL_TIMINGS.map((t) => (
          <span key={t.label} className={`text-sm font-semibold ${t.color}`}>
            {t.emoji} {t.label} {t.time}
          </span>
        ))}
      </div>

      {/* Announcements */}
      {shownAnnouncements.length > 0 && (
        <section className="mb-10">
          <div className="mb-6 text-center">
            <span className="pill">📣 Announcements</span>
          </div>
          <div className="mx-auto max-w-4xl space-y-4 text-left">
            {shownAnnouncements.map((ann, i) => (
              <div key={i} className="polaris-card polaris-card-hover flex items-start gap-4 p-5">
                <div className="font-display text-2xl font-bold leading-none md:text-[2.5rem]">
                  {ANN_EMOJI[ann.kind] || '📢'}
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-2xl font-bold leading-none md:text-[2.5rem]">{ann.title}</h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.15em]"
                      style={{ background: ann.color + '22', color: ann.color }}
                    >
                      {ann.kind}
                    </span>
                  </div>
                  <p className="polaris-muted text-sm leading-relaxed">{ann.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notice Board */}
      <section
        className="mb-14"
        style={{
          backgroundImage: "url('/images/notice_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
        }}
      >
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-extrabold">📢 Notice Board</h2>
          <p className="polaris-muted mt-1 text-sm">Important instructions and updates for all students</p>
        </div>
        <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2 xl:grid-cols-3">
          {shownNotices.map((notice, i) => (
            <div key={i} className="polaris-card polaris-card-hover p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="nav-icon" style={{ background: notice.color + '22' }}>
                  📌
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-[.15em]"
                  style={{ color: notice.color }}
                >
                  {notice.category}
                </span>
              </div>
              <h3 className="font-display mb-1 font-bold" style={{ fontSize: '1.5rem', lineHeight: '1.5rem' }}>
                {notice.title}
              </h3>
              <p className="polaris-muted text-sm leading-relaxed">{notice.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Menu */}
      <section className="mb-14 text-center">
        <div className="mb-6">
          <span className="pill-yellow mb-3 inline-block">{vegMode ? '🥗 Pure Veg' : '🍽️ Fresh & Served'}</span>
          <h2 className="font-display text-3xl font-extrabold">Live Menu — {menuDayName}</h2>
          <p className="polaris-muted mt-2 text-sm">
            {mealStatus.type === 'current' ? 'Current' : 'Upcoming'} {mealStatus.label} — {mealStatus.display}
          </p>
        </div>

        <VegToggle className="mb-6" />

        {activeLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <MenuError error={activeError} />
            {todaySectionsToShow.map((section, i) => (
              <SectionCard key={section.name} name={section.name} index={i}>
                <SectionRows rows={section.rows} />
              </SectionCard>
            ))}
            {!activeLoading && !activeError && todaySectionsToShow.length === 0 && (
              <p className="polaris-muted text-sm">The menu for today has not been published yet.</p>
            )}
          </>
        )}
      </section>

      {/* Leadership */}
      <section className="mb-14 text-center">
        <h2 className="font-display mb-2 text-3xl font-extrabold">Meet the Team Behind Mess</h2>
        <p className="polaris-muted mb-8 text-sm">Official dignities who run the mess</p>
        <div className="space-y-6">
          {[
            { people: LEADERSHIP.slice(0, 1), size: 'w-36 h-36 sm:w-40 sm:h-40', textSize: 'text-5xl', cols: 'xl:grid-cols-1', label: null },
            { people: LEADERSHIP.slice(1, 3), size: 'w-28 h-28 sm:w-32 sm:h-32', textSize: 'text-4xl', cols: 'sm:grid-cols-2 xl:grid-cols-2', label: 'Dean & Faculty In-Charge' },
            { people: LEADERSHIP.slice(3, 4), size: 'w-24 h-24 sm:w-28 sm:h-28', textSize: 'text-3xl', cols: 'xl:grid-cols-1', label: 'Associate Faculty' },
            { people: LEADERSHIP.slice(4, 5), size: 'w-24 h-24 sm:w-28 sm:h-28', textSize: 'text-3xl', cols: 'xl:grid-cols-1', label: 'Mess Coordinator' },
          ].map(
            (tier, ti) => (
              <div key={ti} className="space-y-3">
                {ti > 0 && tier.label && (
                  <div className="flex flex-col items-center gap-1 text-sm font-bold text-[#45347D]">
                    <span>
                      {ti === 1 ? '🎓' : ti === 2 ? '👥' : '🛠️'} {tier.label}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                )}
                {tier.people.length > 0 && (
                  <div className={`mx-auto grid max-w-4xl grid-cols-1 items-start justify-items-center gap-5 ${tier.cols}`}>
                    {tier.people.map((person, i) => (
                      <div key={person.name} className="polaris-card polaris-card-hover flex w-full max-w-xs flex-col items-center p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          <Avatar photo={person.photo} name={person.name} size={tier.size} textSize={tier.textSize} index={ti * 2 + i} />
                        </div>
                        <h3 className="font-display font-bold">{person.name}</h3>
                        <p className="polaris-muted mb-3 text-xs">{person.role}</p>
                        {person.quote && <p className="serif polaris-muted text-sm italic leading-relaxed">{person.quote}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </section>

      {/* Weekly at a glance */}
      {week && (
        <section className="text-center">
          <h2 className="font-display mb-2 text-3xl font-extrabold">{week.label} at a Glance</h2>
          <p className="polaris-muted mb-8 text-sm">The complete weekly schedule across all four meal blocks</p>
          {week.sections.map((section, i) => (
            <WeeklyTable key={section.name} section={section} index={i} />
          ))}
        </section>
      )}
    </div>
  )
}