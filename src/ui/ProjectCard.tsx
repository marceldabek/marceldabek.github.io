
import { Link } from 'react-router-dom'

export default function ProjectCard({ p }: { p: any }) {
  return (
    <Link to={p.slug} className="block border border-black/10 rounded-2xl overflow-hidden hover:translate-y-[-2px] transition-transform hover:bg-black/5">
      <div className="aspect-video bg-black/20">
        <img src={p.images?.[0] || '/assets/placeholder.png'} alt={p.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <div className="text-sm text-muted">{p.year} · {p.tags?.join(' • ')}</div>
        <div className="font-semibold">{p.title}</div>
        <div className="text-sm text-muted">{p.summary}</div>
      </div>
    </Link>
  )
}
