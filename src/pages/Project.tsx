

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Prose from '../ui/Prose'
import { Gallery } from '../ui/Gallery'

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
      // @ts-ignore
      const mod = await mods[key]()
      setComp(() => mod.default)
      setFrontmatter(mod.frontmatter || null)
    })()
  }, [slug])

  if (!Comp) return <div className="p-6">Loading...</div>

  const meta = frontmatter;
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* main column */}
        <div className="lg:col-span-8">
          {meta && (
            <>
              <h1 className="text-4xl font-extrabold mb-2">{meta.title}</h1>
              <div className="text-sm text-muted mb-6">
                {meta.year} {meta.role ? `• ${meta.role}` : ''}{meta.tech?.length ? ` • ${meta.tech.join(', ')}` : ''}
              </div>
              <Gallery images={meta.images} />
            </>
          )}
          <Prose>
            {Comp && <Comp />}
          </Prose>
        </div>
        {/* sticky sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-black/10 bg-white/80 p-4 shadow">
            {meta?.tags?.length ? (
              <div className="mb-3 flex flex-wrap gap-2">
                {meta.tags.map((t: string) => (
                  <span key={t} className="px-2 py-1 rounded-full text-xs border border-black/15">{t}</span>
                ))}
              </div>
            ) : null}
            {meta?.summary && <p className="text-sm mb-3">{meta.summary}</p>}
            {meta?.links?.github && <a className="block underline" href={meta.links.github} target="_blank">GitHub</a>}
            {meta?.links?.demo && <a className="block underline" href={meta.links.demo} target="_blank">Demo</a>}
            {meta?.links?.pdf && <a className="block underline" href={meta.links.pdf} target="_blank">PDF</a>}
          </div>
        </aside>
      </div>
    </div>
  )
}
