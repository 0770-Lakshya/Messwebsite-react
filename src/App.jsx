import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import WeeklyMenu from './pages/WeeklyMenu'
import Committee from './pages/Committee'
import Contact from './pages/Contact'
import Complaints from './pages/Complaints'
import VegModeProvider from './lib/VegMode'
import { GOOGLE_CLIENT_ID } from './data/siteData'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <VegModeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/weekly" element={<WeeklyMenu />} />
              <Route path="/committee" element={<Committee />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </VegModeProvider>
    </GoogleOAuthProvider>
  )
}