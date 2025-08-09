import { MDXProvider } from '@mdx-js/react'


import Callout from './Callout'
import { Badge } from './Badge'
import { Figure } from './Figure'
import { SpecTable } from './SpecTable'

const components = {
  h1: (p:any) => <h1 className="mt-0 mb-4 text-3xl md:text-4xl font-bold">{p.children}</h1>,
  h2: (p:any) => <h2 className="mt-10 mb-3 text-2xl font-semibold">{p.children}</h2>,
  a:  (p:any) => <a {...p} className="text-accent underline hover:no-underline" />,
  img:(p:any) => <img {...p} className="rounded-xl shadow mb-4" loading="lazy" />,
  Callout,
  Badge,
  Figure,
  SpecTable,
}

export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider components={components}>
      <article className="prose lg:prose-lg max-w-none">{children}</article>
    </MDXProvider>
  )
}
