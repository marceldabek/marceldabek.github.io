
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'

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

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      {frontmatter && (
        <div className="mb-6">
          <div className="text-sm text-muted">{frontmatter.year} · {frontmatter.tags?.join(' • ')}</div>
          <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
          <p className="text-muted">{frontmatter.summary}</p>
          <div className="grid grid-cols-2 gap-3 my-4">
            {(frontmatter.images || []).map((src:string, i:number) => (
              <img key={i} src={src} alt={frontmatter.title} className="rounded-xl border border-white/10" />
            ))}
          </div>
        </div>
      )}
      <MDXProvider>
        <Comp />
      </MDXProvider>
    </section>
  )
}
