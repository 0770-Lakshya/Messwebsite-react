import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import WeeklyMenu from './pages/WeeklyMenu'
import Committee from './pages/Committee'
import Contact from './pages/Contact'
import Complaints from './pages/Complaints'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
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
  )
}