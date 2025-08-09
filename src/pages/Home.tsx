
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import About from './About'
import { useLocation } from 'react-router-dom'
import { ScrollArrow } from '../ui/ScrollArrow'

export default function Home() {
  const [hideHero, setHideHero] = useState(false)
  const prefersReduced = useReducedMotion()
  const location = useLocation()

  useEffect(() => {
    const update = () => setHideHero((window.scrollY || document.documentElement.scrollTop) > 80)
    update()
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])

  // If navigating directly to #about from another page, start with hero hidden and jump
  useEffect(() => {
    if (location.hash === '#about') {
      setHideHero(true)
      setTimeout(() => {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          const y = aboutSection.getBoundingClientRect().top + window.pageYOffset - 144 // 9rem (144px) offset
          window.scrollTo({ top: y, behavior: 'auto' })
        }
      }, 0)
    }
  }, [location.hash])

  const openSearch = () => {
    // @ts-ignore
    window.dispatchEvent(new CustomEvent('open-search'))
  }

  return (
      <>
        <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: (!hideHero || prefersReduced) ? 1 : 0, y: (!hideHero || prefersReduced) ? 0 : -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-2 -mt-32"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold">Project Portfolio</h1>
            <div className="text-xl md:text-2xl text-muted">Marcel Dabek</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: (!hideHero || prefersReduced) ? 1 : 0, y: (!hideHero || prefersReduced) ? 0 : -10 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-x-0 bottom-32 px-4"
          >
            <div className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden card rainbow-border">
              <div className="p-4 rounded-2xl border border-black/10">
                <div className="font-semibold mb-1">Search my projects & resume</div>
                <p className="text-sm text-muted mb-3">
                  Find the exact expertise you need. Press <b>/</b> key or click below.
                </p>
                <button onClick={openSearch} className="rounded-xl px-3 py-2 border border-black/20 hover:border-black/40 bg-white/70">
                  Open Search
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: (!hideHero || prefersReduced) ? 1 : 0, y: (!hideHero || prefersReduced) ? 0 : -10 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
          >
            <span className="text-gray-400 text-sm">scroll</span>
            <ScrollArrow />
          </motion.div>
        </section>

        <section id="about" className="scroll-mt-36 pt-6">
          <About />
        </section>
      </>
  )
}
