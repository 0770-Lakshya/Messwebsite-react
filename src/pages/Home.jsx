import { useEffect, useState } from 'react'
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
{/*image container for home page images*/}
const GALLERY_IMAGES = [
  'images/ShreeSai.jpg',
  'images/ShreeSai.jpg',
  'images/ShreeSai.jpg',
]

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
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % GALLERY_IMAGES.length)
    }, 3200)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % GALLERY_IMAGES.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)

  const shownAnnouncements = announcements
  const shownNotices = notices
  const [announcementIndex, setAnnouncementIndex] = useState(0)

  useEffect(() => {
    if (!shownAnnouncements.length) return
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % shownAnnouncements.length)
    }, 4200)

    return () => clearInterval(timer)
  }, [shownAnnouncements.length])

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

    <div className="mt-6 flex w-full justify-start pl-0 md:pl-2">
      <span
        className="pill inline-flex items-center bg-white/10 px-5 py-2 text-lg font-bold tracking-[0.12em] text-[#f5f1ff] shadow-md backdrop-blur-sm"
        style={{ fontSize: '1.5rem' }}
      >
        📸 Gallery
      </span>
    </div>

    {/*image section */}
    <div className="relative mx-auto mt-4 w-full max-w-6xl overflow-hidden rounded-[2rem] py-4">
      <div className="hidden overflow-hidden md:block">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {GALLERY_IMAGES.map((src, index) => {
            const prevIndex = (index - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
            const nextIndex = (index + 1) % GALLERY_IMAGES.length

            return (
              <div key={`${src}-${index}`} className="min-w-full flex-shrink-0 px-2">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-[220px] w-[24%] overflow-hidden rounded-[1.5rem] shadow-2xl opacity-80">
                    <img
                      src={GALLERY_IMAGES[prevIndex]}
                      alt={`Mess gallery ${prevIndex + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="h-[340px] w-[52%] overflow-hidden rounded-[1.5rem] shadow-2xl">
                    <img
                      src={src}
                      alt={`Mess gallery ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="h-[220px] w-[24%] overflow-hidden rounded-[1.5rem] shadow-2xl opacity-80">
                    <img
                      src={GALLERY_IMAGES[nextIndex]}
                      alt={`Mess gallery ${nextIndex + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="md:hidden">
        <div className="overflow-hidden rounded-[1.5rem] shadow-2xl px-2">
          <img
            src={GALLERY_IMAGES[activeSlide]}
            alt={`Mess gallery ${activeSlide + 1}`}
            className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[360px] lg:h-[440px]"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white shadow-lg transition hover:bg-black/80"
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white shadow-lg transition hover:bg-black/80"
        aria-label="Next image"
      >
        →
      </button>

      <div className="mt-5 flex justify-center gap-2">
        {GALLERY_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Show image ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeSlide === index ? 'w-8 bg-primary' : 'w-2.5 bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Announcements */}
      {shownAnnouncements.length > 0 && (
        <section className="mb-8 text-center sm:mb-10">
          <div className="mb-4 flex justify-center px-4 sm:mb-6">
            <span className="pill" style={{fontSize:'1.15rem'}}>📣 Announcements</span>
          </div>

          <div className="mx-auto max-w-5xl px-2 sm:px-4">
            <div className="relative overflow-hidden rounded-[1.2rem] sm:rounded-[1.5rem]">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${announcementIndex * 100}%)` }}
              >
                {shownAnnouncements.map((ann, i) => (
                  <div key={i} className="min-w-full flex-shrink-0 px-1 sm:px-1.5">
                    <div
                      className="polaris-card polaris-card-hover mx-auto flex min-h-[150px] w-full max-w-[760px] items-center justify-center gap-2 p-3 text-center sm:min-h-[180px] sm:gap-4 sm:p-5 md:min-h-[220px] md:gap-5 md:p-7"
                      style={{ background: 'linear-gradient(135deg, #f5f1ff 0%, #ede7ff 38%, #faf7ff 100%)' }}
                    >
                      <div className="shrink-0 font-display text-xl font-bold leading-none sm:text-2xl md:text-[2.5rem]">
                        {ANN_EMOJI[ann.kind] || '📢'}
                      </div>

                      <div className="min-w-0 flex-1 text-center">
                        <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
                          <h3 className="max-w-full break-words font-display text-base font-bold leading-tight sm:text-lg md:text-[2rem]">{ann.title}</h3>
                          <span
                            className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[.15em] sm:text-[10px]"
                            style={{ background: ann.color + '22', color: ann.color }}
                          >
                            {ann.kind}
                          </span>
                        </div>
                        <p className="polaris-muted text-sm leading-relaxed sm:text-base md:text-base">{ann.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2 sm:mt-5">
              {shownAnnouncements.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setAnnouncementIndex(index)}
                  aria-label={`Show announcement ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    announcementIndex === index ? 'w-8 bg-primary' : 'w-2.5 bg-[#d9d2f4]'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}


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
    </div>
  )
}