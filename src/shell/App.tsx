
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SearchModal from '../ui/SearchModal'

export default function App() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Allow Home page to open the modal via custom event
  useEffect(() => {
    const handler = () => setOpen(true)
    // @ts-ignore
    window.addEventListener('open-search', handler)
    return () => {
      // @ts-ignore
      window.removeEventListener('open-search', handler)
    }
  }, [])

  const location = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-white/70 border-b border-black/10">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
          <NavLink to="/" className="font-semibold tracking-wide">Marcel Dabek — Project Portfolio</NavLink>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <NavLink to="/projects" className={({isActive}) => isActive ? 'underline' : ''}>Projects</NavLink>
            <NavLink to="/#about" className={({isActive}) => isActive ? 'underline' : ''}>About</NavLink>
            <NavLink to="/resume" className={({isActive}) => isActive ? 'underline' : ''}>Resume</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'underline' : ''}>Contact</NavLink>
            <button onClick={() => setOpen(true)} className="rounded-xl px-2 py-1 border border-white/15 hover:border-white/30">Search ( / )</button>
          </div>
        </nav>
      </header>
      <main className="pt-16">
        <Outlet />
      </main>
      <SearchModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
