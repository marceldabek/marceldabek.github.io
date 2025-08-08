
import { Link, useRouteError } from 'react-router-dom'
export default function NotFound() {
  const err:any = useRouteError()
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-2">Oops</h1>
      <pre className="text-sm text-muted whitespace-pre-wrap">{JSON.stringify(err, null, 2)}</pre>
      <Link className="underline" to="/">Go home</Link>
    </div>
  )
}
