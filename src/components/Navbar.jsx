import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import LockIcon, { preloadLottie } from './LockIcon'

const NAV_ITEMS = [
  { to: '/', label: 'Home', image: '/home.svg', icon: '/homeicon.json' },
  { to: '/menu', label: 'Menu', image: '/foodmenuicon.svg', icon: '/menuicon.json' },
  { to: '/menu/weekly', label: 'Weekly Menu', emoji: '📊' },
  { to: '/committee', label: 'Council Members', image: '/council.svg', icon: '/councilicon.json' },
  { to: '/contact', label: 'Contact Us', image: '/contact.svg', icon: '/contacticon.json' },
]

function activeClasses({ isActive }) {
  return [
    'relative z-10 rounded-full px-3.5 py-2 text-[13.5px] lg:text-[14.5px] font-bold transition-all duration-300',
    isActive ? 'text-white' : 'text-[#0f1115]/70 hover:text-[#45347D]',
  ].join(' ')
}

function ActivePill({ isActive }) {
  if (!isActive) return null
  return (
    <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-[#45347D] to-[#5a479a] shadow-[0_6px_18px_-4px_rgba(69,52,125,0.55),inset_0_1px_0_rgba(255,255,255,0.15)]" />
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    NAV_ITEMS.forEach((item) => {
      if (item.icon) preloadLottie(item.icon)
    })
  }, [])

  const navItemProps = (item) => ({
    onMouseEnter: () => setHoveredItem(item.to),
    onMouseLeave: () => setHoveredItem(null),
  })

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 pt-5">
      <div className="relative w-full max-w-[1340px]">
        <div className="pointer-events-none absolute inset-x-10 -bottom-4 h-8 rounded-full bg-[#45347D]/20 blur-2xl" />

        <div
          className="relative rounded-full p-[1px] transition-all duration-500"
          style={{
            background:
              'linear-gradient(135deg, rgba(69, 52, 125, 0.35) 0%, rgba(255, 255, 255, 0.6) 40%, rgba(142, 125, 180, 0.35) 100%)',
          }}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-2 rounded-full bg-white/80 px-3 py-2 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),0_6px_22px_-8px_rgba(69,52,125,0.20),0_16px_44px_-10px_rgba(69,52,125,0.25)] backdrop-blur-2xl transition-all duration-300 sm:px-4 sm:py-3">
            {/* Brand */}
            <Link to="/" className="group flex-1 min-w-0 items-center gap-2 pl-1 pr-1 sm:gap-3">
              <span className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#45347d]/10 bg-white shadow-sm sm:h-14 sm:w-14">
                  <img
                    src="images/logo_IITBhilai.png"
                    alt="IIT Bhilai Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="h-6 border-l border-black/[0.15]" />
                <span className="flex min-w-0 flex-1 flex-col justify-center">
                    <span className="truncate text-[16px] leading-none font-bold tracking-tight text-[#0f1115] sm:text-[20px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                    Pakadarpanalaya
                  </span>
                  <span className="mt-1 hidden text-[10.5px] font-bold uppercase leading-none tracking-[0.06em] text-[#6b6e76] md:block">
                    IIT Bhilai • Campus Dining
                  </span>
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="relative hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => {
                const hovering = hoveredItem === item.to
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    className={activeClasses}
                    {...navItemProps(item)}
                  >
                    {({ isActive }) => (
                      <>
                        <ActivePill isActive={isActive} />
                        {item.icon ? (
                          <span className="relative -my-1 mr-1.5 inline-block h-[30px] w-[30px] overflow-hidden align-middle">
                            {item.image && (
                              <img
                                src={item.image}
                                alt=""
                                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-150"
                                style={{ opacity: hovering ? 0 : 1 }}
                              />
                            )}
                            <LockIcon
                              src={item.icon}
                              size={30}
                              playing={hovering}
                              className="absolute inset-0"
                            />
                          </span>
                        ) : (
                          <span className="mr-1.5 inline-block opacity-90">{item.emoji}</span>
                        )}
                        {item.label}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              {/* Complain CTA */}
              <div className="hidden lg:flex">
                <Link
                  to="/complaints"
                  className="group relative inline-flex items-center gap-2 rounded-full border border-black/[0.15] bg-transparent px-6 py-3 text-[13.5px] font-bold text-[#0f1115] transition-all duration-300 ease-in-out hover:gap-4 hover:border-[#45347D] hover:text-[#45347D] active:opacity-70 focus:outline-none"
                >
                  <span className="relative z-10 inline-flex items-center gap-2 transition-all duration-300 ease-in-out group-hover:gap-3">
                    <span>🙋</span> Complain
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Hamburger */}
              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((o) => !o)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#45347D]/15 bg-gradient-to-br from-white to-[#f5f2fa] text-[#45347D] shadow-[0_2px_8px_-2px_rgba(69,52,125,0.20)] transition-all duration-200 md:hidden"
              >
                {mobileOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="absolute left-0 right-0 top-full mt-3 rounded-2xl border border-black/[0.08] bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#45347D]/10 text-[#45347D]'
                        : 'text-[#0f1115] hover:bg-[#45347D]/10'
                    }`
                  }
                >
                  {item.emoji} {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/complaints"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-[#45347D] transition-all duration-200 hover:bg-[#45347D]/20"
              >
                🙋 Complain
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}