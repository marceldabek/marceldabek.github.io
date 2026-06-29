import Link from "next/link";
import React from "react";

/**
 * Lightweight inline renderer for the only two markdown features the site uses:
 * **bold** and [text](href) links. Avoids shipping react-markdown to the client.
 */
export function RichText({
  text,
  linkClassName,
}: {
  text: string;
  linkClassName?: string;
}) {
  const nodes: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {m[1]}
        </strong>
      );
    } else {
      nodes.push(
        <Link
          key={key++}
          href={m[3]}
          className={linkClassName ?? "underline underline-offset-2 hover:opacity-80"}
        >
          {m[2]}
        </Link>
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
