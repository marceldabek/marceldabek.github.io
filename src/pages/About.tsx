
import { useEffect, useState } from 'react'
import SearchInline from '../ui/SearchInline'
import ProjectCard from '../ui/ProjectCard'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function About() {
  const [items, setItems] = useState<any[]>([])
  const location = useLocation()

  useEffect(() => {
    // Fetch projects
    fetch('/search-index.json').then(r=>r.json()).then(d => {
      const projects = d.filter((x:any)=>x.type==='project').slice(0,4)
      setItems(projects)
    })

    // Only scroll if we're navigating directly to /about
    if (location.pathname === '/about') {
      // Add a small delay to ensure the content is rendered
      setTimeout(() => {
        const aboutSection = document.querySelector('section:last-of-type')
        if (aboutSection) {
          const rect = aboutSection.getBoundingClientRect()
          const absoluteBottom = window.pageYOffset + rect.bottom + 200 // Added extra padding
          window.scrollTo({ 
            top: absoluteBottom,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [location.pathname])

  return (
    <motion.section
      className="pt-8 md:pt-16 mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-5 gap-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: false }}
      transition={{ duration: 0.4 }}
    >
      <div className="md:col-span-2 md:flex md:flex-col md:justify-center">
        <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-black/5 border border-black/10">
          <img src="/assets/headshot.jpg" alt="Headshot" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-semibold mt-4">About me</h2>
        <p className="text-muted mt-2">
          I’m a Mechanical Engineering student at UConn and the EV Powertrain Lead on UConn Formula SAE.
          I like turning rough concepts into manufacturable hardware—especially injection-molded parts,
          composite structures, and reliable EV powertrains. My goal with this portfolio is to put the
          recruiter first and showcase my talents. 
        </p>
        <div className="mt-6">
          <SearchInline />
        </div>
      </div>
      <div className="md:col-span-3">
        <h3 className="text-xl font-semibold">Projects</h3>
        <p className="text-muted mb-3 text-sm">A few highlighted projects are below—explore the full grid on the Projects page.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </motion.section>
  )
}
