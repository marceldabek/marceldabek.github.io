
import resume from '../../content/resume.json'

export default function Resume() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Resume</h1>

      <details open className="mb-4 border border-black/10 rounded-xl p-4">
        <summary className="cursor-pointer font-semibold">Experience</summary>
        <div className="mt-3 space-y-4">
          {resume.experience.map((e:any, idx:number) => (
            <div key={idx} className="border border-black/10 rounded-xl p-3">
              <div className="text-sm text-muted">{e.dates} {e.location ? '· ' + e.location : ''}</div>
              <div className="font-semibold">{e.title} {e.company ? '— ' + e.company : ''}</div>
              <ul className="list-disc list-inside text-muted text-sm mt-2">
                {(e.bullets || []).map((b:string, j:number) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </details>

      <details open className="mb-4 border border-black/10 rounded-xl p-4">
        <summary className="cursor-pointer font-semibold">Education</summary>
        <div className="mt-3 space-y-3">
          {resume.education.map((ed:any, idx:number) => (
            <div key={idx} className="border border-black/10 rounded-xl p-3">
              <div className="font-semibold">{ed.school} — {ed.degree}</div>
              <div className="text-sm text-muted">{ed.dates} {ed.location ? '· ' + ed.location : ''}</div>
              <ul className="list-disc list-inside text-muted text-sm mt-2">
                {(ed.details || []).map((d:string, j:number) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </details>

      <details open className="mb-4 border border-black/10 rounded-xl p-4">
        <summary className="cursor-pointer font-semibold">Skills</summary>
        <div className="mt-3 grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold">Software</div>
            <ul className="list-disc list-inside text-muted">
              {resume.skills.software.map((s:string, i:number)=><li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-semibold">Programming</div>
            <ul className="list-disc list-inside text-muted">
              {resume.skills.programming.map((s:string, i:number)=><li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-semibold">Languages</div>
            <ul className="list-disc list-inside text-muted">
              {resume.skills.languages.map((s:string, i:number)=><li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </details>
    </section>
  )
}
