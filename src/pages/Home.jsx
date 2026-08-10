import { Link } from 'react-router-dom'
import { ANNOUNCEMENTS, LEADERSHIP, MEAL_TIMINGS, NOTICES } from '../data/siteData'
import { dayView, todayIndex, todayName } from '../lib/menu'
import useMenu from '../lib/useMenu'
import Avatar from '../components/Avatar'
import { LoadingSkeleton, MenuError, SectionCard, SectionRows, WeeklyTable } from '../components/MenuBits'

const ANN_EMOJI = { special: '🎉', timing: '🕒', meal: '🍛', general: '📢' }

export default function Home() {
  const { weeks, error, loading } = useMenu()
  const today = todayName()
  const dayIndex = todayIndex()
  const todaySections = weeks && weeks[0] ? dayView(weeks[0], dayIndex) : []
  const week = weeks && weeks[0]

  return (
    <div>
      {/* Hero */}
      <section className="mb-14 text-center">
        <div className="mx-auto max-w-3xl space-y-5">
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
        <div className="polaris-card polaris-card-hover mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden">
          <img
            src="/images/pakadarpanalaya.jpg"
            alt="Pakadarpanalaya Mess, IIT Bhilai"
            className="hero-image h-full w-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling.style.display = 'flex'
            }}
          />
          <div
            className="hidden h-full w-full items-center justify-center text-6xl"
            style={{ display: 'none', background: 'linear-gradient(135deg, rgba(69,52,125,.9), rgba(142,125,180,.7))' }}
          >
            🍽️
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
      {ANNOUNCEMENTS.length > 0 && (
        <section className="mb-10">
          <div className="mb-6 text-center">
            <span className="pill">📣 Announcements</span>
          </div>
          <div className="mx-auto max-w-4xl space-y-4 text-left">
            {ANNOUNCEMENTS.map((ann, i) => (
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
          {NOTICES.map((notice, i) => (
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
          <span className="pill-yellow mb-3 inline-block">🍽️ Fresh &amp; Served</span>
          <h2 className="font-display text-3xl font-extrabold">Today&apos;s Live Menu — {today}</h2>
          <p className="polaris-muted mt-1 text-sm">Fresh from the official mess sheet</p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <MenuError error={error} />
            {todaySections.map((section, i) => (
              <SectionCard key={section.name} name={section.name} index={i}>
                <SectionRows rows={section.rows} />
              </SectionCard>
            ))}
            {!loading && !error && todaySections.length === 0 && (
              <p className="polaris-muted text-sm">The menu for today has not been published yet.</p>
            )}
          </>
        )}
      </section>

      {/* Leadership */}
      <section className="mb-14 text-center">
        <h2 className="font-display mb-2 text-3xl font-extrabold">Meet the Team Behind Mess</h2>
        <p className="polaris-muted mb-8 text-sm">Official dignities who run the mess</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {LEADERSHIP.map((person, i) => (
            <div key={person.name} className="polaris-card polaris-card-hover flex flex-col items-center p-6 text-center">
              <div className="mb-4">
                <Avatar photo={person.photo} name={person.name} size="w-28 h-28 sm:w-32 sm:h-32" textSize="text-4xl" index={i} />
              </div>
              <h3 className="font-display font-bold">{person.name}</h3>
              <p className="polaris-muted mb-3 text-xs">{person.role}</p>
              {person.quote && <p className="serif polaris-muted text-sm italic leading-relaxed">{person.quote}</p>}
            </div>
          ))}
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