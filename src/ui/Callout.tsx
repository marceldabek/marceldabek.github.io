type Kind = 'note' | 'success' | 'warn'
const styles: Record<Kind, string> = {
  note:    'border-blue-200 bg-blue-50',
  success: 'border-green-200 bg-green-50',
  warn:    'border-amber-200 bg-amber-50',
}
export default function Callout({ kind='note', children }:{kind?:Kind; children:React.ReactNode}) {
  return <div className={`border rounded-xl px-3 py-2 text-sm ${styles[kind]}`}>{children}</div>
}
