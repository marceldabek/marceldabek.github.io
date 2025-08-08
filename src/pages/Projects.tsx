
import { useEffect, useMemo, useState } from 'react'
import ProjectCard from '../ui/ProjectCard'

export default function Projects() {
  const [items, setItems] = useState<any[]>([])
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    fetch('/search-index.json').then(r=>r.json()).then(d => {
      setItems(d.filter((x:any)=>x.type==='project'))
    })
  }, [])

  const filtered = useMemo(() => {
    if (!filter) return items
    return items.filter(p => (p.tags || []).includes(filter))
  }, [items, filter])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <a id="fsae" className="block w-0 h-0" />
      <a id="injection-molding" className="block w-0 h-0" />
      <a id="composites" className="block w-0 h-0" />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="ml-auto text-sm text-muted">Filter:</div>
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="bg-transparent border border-black/30 rounded-xl px-2 py-1">
          <option value="">All</option>
          <option value="FSAE">FSAE</option>
          <option value="Injection Molding">Injection Molding</option>
          <option value="Composites">Composites</option>
          <option value="Battery">Battery</option>
          <option value="EV">EV</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>
    </section>
  )
}
