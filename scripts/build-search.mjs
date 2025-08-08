
import fg from 'fast-glob'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import removeMd from 'remove-markdown'

const mdxFiles = await fg('content/projects/*.mdx', { dot: false })
const docs = []

for (const fp of mdxFiles) {
  const raw = fs.readFileSync(fp, 'utf8')
  const parsed = matter(raw)
  const slug = '/projects/' + path.basename(fp, path.extname(fp))
  const text = removeMd(parsed.content).replace(/\s+/g, ' ').trim()
  docs.push({
    id: slug,
    type: 'project',
    title: parsed.data.title || path.basename(fp),
    slug,
    tags: parsed.data.tags || [],
    year: parsed.data.year || '',
    images: parsed.data.images || [],
    summary: parsed.data.summary || '',
    text
  })
}

const resume = JSON.parse(fs.readFileSync('content/resume.json', 'utf8'))
for (const [i, exp] of (resume.experience || []).entries()) {
  const text = [exp.title, exp.company, ...(exp.bullets || [])].join(' ')
  docs.push({
    id: `/resume#exp-${i}`,
    type: 'resume',
    title: `${exp.title} — ${exp.company}`.trim(),
    slug: '/resume',
    tags: ['resume', exp.company, exp.title].filter(Boolean),
    text
  })
}

fs.mkdirSync('public', { recursive: true })
fs.writeFileSync('public/search-index.json', JSON.stringify(docs, null, 2))
console.log(`Wrote ${docs.length} docs to public/search-index.json`)
