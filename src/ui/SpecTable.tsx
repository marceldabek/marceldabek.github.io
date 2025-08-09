export function SpecTable({ rows }:{rows: Array<[string,string]>}) {
  return (
    <table className="w-full my-3 text-sm">
      <tbody>
        {rows.map(([k,v]) => (
          <tr key={k} className="border-b border-black/10">
            <td className="py-2 pr-3 font-medium text-muted">{k}</td>
            <td className="py-2">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
