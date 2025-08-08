
export default function Contact() {
  return (
    <section className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-muted mb-6">Prefer email or LinkedIn.</p>
      <div className="space-y-3">
        <a className="block border border-black/20 rounded-xl p-3 hover:bg-black/5" href="mailto:you@uconn.edu">Email me</a>
        <a className="block border border-black/20 rounded-xl p-3 hover:bg-black/5" href="https://www.linkedin.com/in/marceldabek/" target="_blank">LinkedIn</a>
        <a className="block border border-black/20 rounded-xl p-3 hover:bg-black/5" href="https://github.com/marceldabek" target="_blank">GitHub</a>
      </div>
    </section>
  )
}
