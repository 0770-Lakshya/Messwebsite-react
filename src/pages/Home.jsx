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
  'images/art.jpg',
  'images/entrance.jpg',
  'images/messphoto/galav.png',
  'images/messphoto/Galav1.png',
  'images/ShreeSai.jpg',
  'images/messphoto/shree_sai.png',
  'images/messphoto/notice.jpg',
  'images/messphoto/krishna_kripa.png',
  'images/messphoto/helth.png',
  'images/messphoto/amul.png',
]

const HERO_IMAGE = 'images/messphoto/mess_enterance.png'

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
  const [noticeIndex, setNoticeIndex] = useState(0)

  useEffect(() => {
    if (GALLERY_IMAGES.length <= 1) return

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
    if (!shownAnnouncements.length || shownAnnouncements.length <= 1) return

    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % shownAnnouncements.length)
    }, 4200)

    return () => clearInterval(timer)
  }, [shownAnnouncements.length])

  useEffect(() => {
    if (!shownNotices.length || shownNotices.length <= 1) return

    const timer = setInterval(() => {
      setNoticeIndex((prev) => (prev + 1) % shownNotices.length)
    }, 4200)

    return () => clearInterval(timer)
  }, [shownNotices.length])

  return (
    <div className="relative">
      <style>{`
        @keyframes heroTitleIn {
          0% {
            opacity: 0;
            transform: translate3d(0, 22px, -30px) rotateX(18deg) rotateY(-16deg);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg);
            filter: blur(0);
          }
        }

        @keyframes heroFloatIn {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateX(18deg) rotateY(-14deg) translateY(24px);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0);
          }
        }

        .hero-title-animate {
          animation: heroTitleIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-style: preserve-3d;
          text-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
        }

        .hero-copy-3d {
          animation: heroFloatIn 1s cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-style: preserve-3d;
          perspective: 1200px;
        }

        .hero-button-3d {
          transform: translateZ(0);
          transition: transform 220ms ease, box-shadow 220ms ease, filter 220ms ease;
          transform-style: preserve-3d;
        }

        .hero-button-3d:hover {
          transform: translateY(-4px) rotateX(10deg) rotateY(-8deg);
          box-shadow: 0 18px 30px -18px rgba(242, 199, 141, 0.85);
          filter: brightness(1.04);
        }
      `}</style>

      <section className="relative mb-14 overflow-hidden rounded-b-[2rem] border border-[#d8c7a9]/30 shadow-[0_24px_80px_-32px_rgba(11,13,18,0.8)]">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,14,18,0.84),rgba(16,14,18,0.58),rgba(16,14,18,0.22))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.20),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(239,193,113,0.18),_transparent_25%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-20 md:py-28">
          <div className="hero-copy-3d max-w-xl text-left text-white">
            <div className="mb-5 inline-flex items-center rounded-full border border-[#f0d6a5]/40 bg-[#1a1c22]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f9efe0] backdrop-blur-sm">
              IIT Bhilai Dining Portal
            </div>

            <h1 className="hero-title-animate hero-font text-[2.2rem] leading-[0.95] tracking-wide sm:text-5xl md:text-7xl">
              PAKADAR<span className="gradient-text">PANALAYA</span>
            </h1>

            <p className="mt-5 max-w-lg text-base text-white/90 sm:text-lg md:text-xl">
              The official dining portal of IIT Bhilai — live menu, weekly schedule, leadership messages and your student mess committee, all in one place.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="hero-button-3d rounded-full bg-[#f2c78d] px-5 py-3 text-sm font-bold text-[#201a2b] shadow-[0_10px_24px_-14px_rgba(242,199,141,0.9)] sm:px-6"
              >
                Explore Menu
              </Link>
              <Link
                to="/committee"
                className="hero-button-3d rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm sm:px-6"
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery pill navigation */}
      <div className="mt-6 flex w-full justify-start pl-0 md:pl-2">
        <span
          className="pill inline-flex items-center bg-white/10 px-5 py-2 text-lg font-bold tracking-[0.12em] text-[#f5f1ff] shadow-md backdrop-blur-sm"
          style={{ fontSize: '1.5rem' }}
        >
          📸 Gallery
        </span>
      </div>

      {/* Gallery section - below the main content */}
      <section className="mb-14 md:mb-20 text-center">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-[2rem] py-4">
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
                        <div className="h-[220px] w-[24%] overflow-hidden rounded-[1.5rem] bg-white shadow-2xl opacity-80">
                          <img
                            src={GALLERY_IMAGES[prevIndex]}
                            alt={`Mess gallery ${prevIndex + 1}`}
                            className="h-full w-full object-contain p-1 object-center"
                          />
                        </div>

                        <div className="h-[340px] w-[52%] overflow-hidden rounded-[1.5rem] bg-white shadow-2xl">
                          <img
                            src={src}
                            alt={`Mess gallery ${index + 1}`}
                            className="h-full w-full object-contain p-1 object-center"
                          />
                        </div>

                        <div className="h-[220px] w-[24%] overflow-hidden rounded-[1.5rem] bg-white shadow-2xl opacity-80">
                          <img
                            src={GALLERY_IMAGES[nextIndex]}
                            alt={`Mess gallery ${nextIndex + 1}`}
                            className="h-full w-full object-contain p-1 object-center"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="md:hidden">
              <div className="overflow-hidden rounded-[1.5rem] bg-white px-2 shadow-2xl">
                <img
                  src={GALLERY_IMAGES[activeSlide]}
                  alt={`Mess gallery ${activeSlide + 1}`}
                  className="h-[400px] w-full rounded-[1.5rem] object-contain p-1 sm:h-[400px] lg:h-[480px]"
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
            <span className="pill inline-flex items-center gap-2 text-lg font-bold" style={{ fontSize: '1.15rem', background: 'linear-gradient(90deg, #7c3aed, #a855f7)' , color: '#fff', boxShadow: '0 0 24px rgba(168, 85, 247, .6)' }}>
              📣 Announcements
            </span>
          </div>

          <div className="mx-auto max-w-5xl px-2 sm:px-4">
            <div
              className="relative overflow-hidden rounded-[2rem] p-[3px]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899, #f59e0b, #7c3aed)', backgroundSize: '300% 300%', animation: 'gradientShift 6s ease infinite' }}
            >
              <div className="relative overflow-hidden rounded-[2rem] py-2" style={{ background: '#150f2e' }}>
              <div
                className="flex w-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${announcementIndex * 100}%)` }}
              >
                {shownAnnouncements.map((ann, i) => (
                  <div key={i} className="w-full shrink-0 px-1 sm:px-2">
                    <div
                      className="mx-auto flex h-full flex-col items-center justify-center p-5 text-center sm:p-6 md:p-7"
                      style={{ background: 'linear-gradient(135deg, #241743 0%, #150f2e 100%)' }}
                    >
                      <div className="mb-3 flex w-full flex-wrap items-center justify-center gap-2">
                        <span className="shrink-0 font-display text-3xl font-bold leading-none sm:text-4xl">
                          {ANN_EMOJI[ann.kind] || '📢'}
                        </span>
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[.15em] sm:text-[10px]"
                          style={{ background: ann.color + '33', color: ann.color }}
                        >
                          {ann.kind}
                        </span>
                      </div>
                      <h3 className="w-full min-w-0 break-words font-display text-base font-bold leading-tight text-[#f5f1ff] sm:text-lg md:text-2xl">{ann.title}</h3>
                      <p className="mt-2 w-full min-w-0 break-words text-sm font-medium leading-relaxed text-[#ff7b7b] sm:text-base md:text-base">{ann.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2 sm:mt-5">
              {shownAnnouncements.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setAnnouncementIndex(index)}
                  aria-label={`Show announcement ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${announcementIndex === index ? 'w-8 bg-primary' : 'w-2.5 bg-[#d9d2f4]'}`}
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

      {shownNotices.length > 0 && (
        <section className="mb-12 text-center">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-4 flex justify-center">
              <span className="pill" style={{ fontSize: '1.15rem' }}>📌 Notices</span>
            </div>

            <div
              className="rounded-[2rem] border border-[#d7c7ab] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_22px_-14px_rgba(81,63,35,0.2)] sm:p-6"
              style={{
                background:
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.32), transparent 24%), radial-gradient(circle at 70% 35%, rgba(110,88,54,0.08), transparent 26%), linear-gradient(135deg, rgba(239,228,205,0.96) 0%, rgba(225,212,186,0.94) 100%)',
              }}
            >
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${noticeIndex * 100}%)` }}
                >
                  {shownNotices.map((notice, index) => (
                    <div key={`${notice.title}-${index}`} className="w-full shrink-0 px-1 sm:px-2">
                      <div
                        className="mx-auto flex h-full flex-col items-center justify-center p-5 text-center sm:p-6 md:p-7"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,252,246,0.88) 0%, rgba(239,229,208,0.9) 100%)',
                          border: '1px solid rgba(130, 99, 52, 0.18)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 10px 25px -18px rgba(91,70,38,0.28)',
                        }}
                      >
                        <div className="mb-3 flex w-full flex-wrap items-center justify-center gap-2">
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[.15em] sm:text-[10px]"
                            style={{ background: notice.color ? `${notice.color}22` : 'rgba(81,63,35,0.12)', color: notice.color || '#514023' }}
                          >
                            {notice.category || 'Notice'}
                          </span>
                          {notice.date && (
                            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#514023]/70">{notice.date}</span>
                          )}
                        </div>
                        <h3 className="w-full min-w-0 break-words font-display text-base font-bold leading-tight text-[#3a2f1e] sm:text-lg md:text-2xl">
                          {notice.title}
                        </h3>
                        {notice.text && (
                          <p className="mt-2 w-full min-w-0 break-words text-sm leading-relaxed text-[#5a4a30] sm:text-base md:text-base">{notice.text}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {shownNotices.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {shownNotices.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setNoticeIndex(index)}
                      aria-label={`Show notice ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${noticeIndex === index ? 'w-8 bg-[#45347D]' : 'w-2.5 bg-white/70'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Leadership */}
      <section className="mb-14 text-center">
        <h2 className="font-display mb-2 text-3xl font-extrabold">Meet the Team Behind Mess</h2>
        <p className="polaris-muted mb-8 text-sm">Official dignities who run the mess</p>
        <div className="space-y-6">
          {[
            { people: LEADERSHIP.slice(0, 1), size: 'w-36 h-36 sm:w-40 sm:h-40', textSize: 'text-5xl', cols: 'sm:grid-cols-1 xl:grid-cols-1', label: null },
            { people: LEADERSHIP.slice(1, 3), size: 'w-28 h-28 sm:w-32 sm:h-32', textSize: 'text-4xl', cols: 'sm:grid-cols-2 xl:grid-cols-2', label: 'Dean & Faculty In-Charge' },
            { people: LEADERSHIP.slice(3, 4), size: 'w-24 h-24 sm:w-28 sm:h-28', textSize: 'text-3xl', cols: 'sm:grid-cols-1 xl:grid-cols-1', label: 'Associate Faculty' },
            { people: LEADERSHIP.slice(4, 5), size: 'w-24 h-24 sm:w-28 sm:h-28', textSize: 'text-3xl', cols: 'sm:grid-cols-1 xl:grid-cols-1', label: 'Mess Coordinator' },
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
                  <div className="flex justify-center">
                    <div className={`grid max-w-4xl gap-5 justify-items-center ${tier.people.length === 1 ? 'w-full max-w-xs grid-cols-1' : `w-full grid-cols-1 ${tier.cols}`}`}>
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