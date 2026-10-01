import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation, matchPath } from 'react-router-dom'
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
import PageLoader from './components/PageLoader'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function AppRoutes() {
  const location = useLocation()
  const [isRouteLoading, setIsRouteLoading] = useState(false)

  useEffect(() => {
    setIsRouteLoading(true)

    const timer = window.setTimeout(() => {
      setIsRouteLoading(false)
    }, 350)

    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  return (
    <>
      {isRouteLoading && <PageLoader />}
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
    </>
  )
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <VegModeProvider>
        <HashRouter>
          <ScrollToTop />
          <AppRoutes />
        </HashRouter>
      </VegModeProvider>
    </GoogleOAuthProvider>
  )
}