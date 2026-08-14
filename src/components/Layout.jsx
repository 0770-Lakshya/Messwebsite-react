import { Link, Outlet } from 'react-router-dom'
import { CONTACT, MEAL_TIMINGS } from '../data/siteData'
import Navbar from './Navbar'

export default function Layout() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-[#0f1115] transition-colors duration-300">
      <Navbar />
      <main className="w-full min-h-screen px-4 pt-28">
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-white/10 bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.8fr_0.9fr]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white shadow-sm">
                  <img src="images/logo_IITBhilai.png" alt="IIT Bhilai Logo" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-display text-xl font-extrabold tracking-tight text-white">Pakadarpanalaya</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">IIT Bhilai Mess Portal</p>
                </div>
              </div>

              <p className="max-w-md text-sm leading-6 text-gray-300">
                The official student portal for mess updates, weekly menu schedules, complaint assistance, and everyday dining information at IIT Bhilai.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-white">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="https://www.iitbhilai.ac.in/" className="transition hover:text-white">IIT BHILAI</Link></li>
                <li><Link to="https://polaris.iitbhilai.ac.in/" className="transition hover:text-white">Polaris - IIT Bhilai</Link></li>
                <li><Link to="/" className="transition hover:text-white">Home</Link></li>
                <li><Link to="/menu" className="transition hover:text-white">Today's Menu</Link></li>
                <li><Link to="/menu/weekly" className="transition hover:text-white">Weekly Menu</Link></li>
                <li><Link to="/committee" className="transition hover:text-white">Council Members</Link></li>
                <li><Link to="/contact" className="transition hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-white">Contact Us</h3>
              <div className="space-y-3 text-sm leading-6 text-gray-300">
                <p>{CONTACT.address.join(' ')}</p>
                <a href={`mailto:${CONTACT.email}`} className="block transition hover:text-white">{CONTACT.email}</a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">
            <p>© {currentYear} IIT Bhilai Mess Committee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}