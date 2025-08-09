import { useEffect, useState } from 'react'

export default function ToC() {
  const [items, setItems] = useState<{id:string; text:string}[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.prose h2, .prose h3')) as HTMLElement[]
    const data = els.filter(e => e.id).map(e => ({ id: e.id, text: e.textContent || '' }))
    setItems(data)

    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).map(e => e.target as HTMLElement)
        if (visible[0]?.id) setActive(visible[0].id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 1] }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  if (!items.length) return null

  return (
    <nav className="hidden lg:block sticky top-24">
      <div className="text-xs uppercase tracking-wide text-muted mb-2">On this page</div>
      <ul className="space-y-1 text-sm">
        {items.map(it => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={`hover:underline ${active === it.id ? 'font-semibold' : ''}`}>{it.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
