export function Figure({ src, caption }:{src:string; caption?:string}) {
  return (
    <figure className="my-3">
      <img src={src} className="rounded-xl shadow" loading="lazy" />
      {caption && <figcaption className="text-xs text-muted mt-1">{caption}</figcaption>}
    </figure>
  )
}
