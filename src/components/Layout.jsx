import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-[#0f1115] transition-colors duration-300">
      <Navbar />
      <main className="w-full min-h-screen px-4 pt-28">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-xs text-[#6b6e76]">
        IIT Bhilai Mess Committee • Pakadarpanalaya Portal
      </footer>
    </div>
  )
}