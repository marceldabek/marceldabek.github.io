
import { useEffect, useState } from 'react'
import MiniSearch from 'minisearch'
import { Link } from 'react-router-dom'

type Doc = { id: string, title: string, slug: string, tags: string[], text: string, type: string }

export default function SearchInline() {
  const [query, setQuery] = useState('')
  const [res, setRes] = useState<any[]>([])
  const [mini, setMini] = useState<MiniSearch<Doc> | null>(null)

  useEffect(() => {
    fetch('/search-index.json').then(r=>r.json()).then((d:Doc[]) => {
      const ms = new MiniSearch<Doc>({
        fields: ['title','tags','text'],
        storeFields: ['title','slug','tags','text','type'],
        searchOptions: { fuzzy: 0.2, prefix: true }
      })
      ms.addAll(d)
      setMini(ms)
    })
  }, [])

  useEffect(() => {
    if (!mini) return
    if (!query) { setRes([]); return }
    setRes(mini.search(query).slice(0,5))
  }, [query, mini])

  return (
    <div>
      <input
        value={query}
        onChange={e=>setQuery(e.target.value)}
        placeholder="Search (also press / )"
        className="w-full bg-transparent border border-white/20 rounded-xl px-3 py-2 placeholder:text-muted"
      />
      {res.length > 0 && (
        <ul className="mt-2 border border-white/10 rounded-xl divide-y divide-white/10">
          {res.map((r:any) => (
            <li key={r.id} className="p-2 hover:bg-white/5">
              <Link to={r.slug}><b>{r.title}</b> <span className="text-muted text-xs">({r.type})</span></Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
