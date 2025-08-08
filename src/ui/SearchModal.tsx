
import { useEffect, useState } from 'react'
import MiniSearch from 'minisearch'
import { Link } from 'react-router-dom'

type Doc = { id: string, title: string, slug: string, tags: string[], text: string }

export default function SearchModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [mini, setMini] = useState<MiniSearch<Doc> | null>(null)

  useEffect(() => {
    if (!open) return
    fetch('/search-index.json')
      .then(r => r.json())
      .then((d: Doc[]) => {
        const ms = new MiniSearch<Doc>({
          fields: ['title', 'tags', 'text'],
          storeFields: ['title', 'slug', 'tags', 'text'],
          searchOptions: { fuzzy: 0.2, prefix: true }
        })
        ms.addAll(d)
        setMini(ms)
      })
  }, [open])

  useEffect(() => {
    if (!mini) return
    if (!query) { setResults([]); return }
    const res = mini.search(query).slice(0, 10)
    setResults(res)
  }, [query, mini])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-24" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-soft border border-black/10" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-white/10">
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search projects and resume..."
            className="w-full bg-transparent outline-none text-lg placeholder:text-muted"
          />
          <div className="text-xs text-muted mt-1">Press Esc to close</div>
        </div>
        <div className="p-4 max-h-[60vh] overflow-auto">
          {results.length === 0 && query && <div className="text-muted">No results.</div>}
          <ul className="space-y-3">
            {results.map((doc: any) => {
              const snippet = makeSnippet(doc.text, query)
              return (
                <li key={doc.id} className="border border-black/10 rounded-xl p-3 hover:bg-black/5">
                  <Link to={doc.slug} onClick={onClose}>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-sm text-muted" dangerouslySetInnerHTML={{__html: snippet}} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function makeSnippet(text: string, q: string) {
  const terms = q.trim().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return ''
  let idx = -1
  for (const t of terms) {
    const i = text.toLowerCase().indexOf(t.toLowerCase())
    if (i >= 0 && (idx === -1 || i < idx)) idx = i
  }
  const start = Math.max(0, idx - 60)
  const end = Math.min(text.length, start + 160)
  let snippet = text.slice(start, end)
  for (const t of terms) {
    const re = new RegExp(`(${escapeRegExp(t)})`, 'ig')
    snippet = snippet.replace(re, '<b>$1</b>')
  }
  return (start>0?'...':'') + snippet + (end<text.length?'...':'')
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
