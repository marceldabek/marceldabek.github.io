export function Gallery({ images = [] as string[] }) {
  if (!images.length) return null
  return (
    <div className="grid sm:grid-cols-2 gap-3 my-4">
      {images.map((src) => (
        <img key={src} src={src} className="rounded-xl shadow" loading="lazy" />
      ))}
    </div>
  )
}
