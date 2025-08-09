

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Prose from '../ui/Prose'
import { Gallery } from '../ui/Gallery'
import ToC from '../ui/ToC'


const mods = import.meta.glob('../../content/projects/*.mdx')

function findKey(slug: string) {
  return Object.keys(mods).find(k => k.endsWith(`/${slug}.mdx`))
}

export default function Project() {
  const { slug } = useParams()
  const [Comp, setComp] = useState<React.ComponentType | null>(null)
  const [frontmatter, setFrontmatter] = useState<any>(null)

  useEffect(() => {
    const key = findKey(slug!)
    if (!key) { setComp(() => () => <div className="p-6">Project not found.</div>); return }
    (async () => {
      const mod = await mods[key]() as { default: React.ComponentType, frontmatter?: any }
      setComp(() => mod.default)
      setFrontmatter(mod.frontmatter || null)
    })()
  }, [slug])

  if (!Comp) return <div className="p-6">Loading...</div>

  const meta = frontmatter;
  function estimateReadMinutes(text: string) {
    const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }
  const minutes = estimateReadMinutes(meta?.summary ?? '');
  const hasSidebar =
    (meta?.tags && meta.tags.length) ||
    meta?.summary ||
    (meta?.links && (meta.links.github || meta.links.demo || meta.links.pdf));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          {meta && (
            <>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{meta.title}</h1>
              <div className="text-sm text-muted mb-4">
                {meta.year}{meta.role ? ` • ${meta.role}` : ''}
                {meta.tech?.length ? ` • ${meta.tech.join(', ')}` : ''}{minutes ? ` • ${minutes} min read` : ''}
              </div>
              <Gallery images={meta.images} />
            </>
          )}
          <Prose>
            {Comp && <Comp />}
          </Prose>
        </div>
        <aside className="lg:col-span-4 space-y-4">
          {hasSidebar && (
            <div className="sticky top-24 rounded-2xl border border-black/10 bg-white/80 p-4 shadow">
              {meta.tags?.length ? (
                <div className="mb-3 flex flex-wrap gap-2">
                  {meta.tags.map((t: string) => (
                    <span key={t} className="px-2 py-1 rounded-full text-xs border border-black/15">{t}</span>
                  ))}
                </div>
              ) : null}
              {meta.summary && <p className="text-sm mb-3">{meta.summary}</p>}
              {meta.links?.github && <a className="block underline" href={meta.links.github} target="_blank">GitHub</a>}
              {meta.links?.demo &&   <a className="block underline" href={meta.links.demo}   target="_blank">Demo</a>}
              {meta.links?.pdf &&    <a className="block underline" href={meta.links.pdf}    target="_blank">PDF</a>}
            </div>
          )}
          <ToC />
        </aside>
      </div>
      {/* SVG scroll indicator at the bottom */}
      <a href="#about" className="absolute left-1/2 -translate-x-1/2 bottom-3 text-muted hover:text-text no-underline">
        <div className="text-xs tracking-wide mb-1 opacity-60">scroll</div>
        <svg width="52" height="20" viewBox="0 0 52 20" className="opacity-60">
          <path d="M2 2 L26 18 L50 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </a>
    </div>
  )
}
