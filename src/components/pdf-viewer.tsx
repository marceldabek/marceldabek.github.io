"use client";

interface PdfViewerProps {
  src: string;
}

export default function PdfViewer({ src }: PdfViewerProps) {
  return (
    <div>
      <div className="rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-zinc-900">
        <object
          data={src + "#toolbar=0"}
          type="application/pdf"
          className="w-full h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)]"
        >
          <p className="p-4 text-center text-sm">
            Your browser can&apos;t display the PDF.
            <a
              href={src}
              target="_blank"
              rel="noopener"
              className="underline ml-1"
            >
              Open or download it instead.
            </a>
          </p>
        </object>
      </div>
      <div className="mt-2 flex justify-center gap-4 text-xs text-muted-foreground">
        <a href={src} target="_blank" rel="noopener" className="hover:underline">
          Open in new tab
        </a>
        <a href={src} download className="hover:underline">
          Download
        </a>
        <button onClick={() => window.print()} className="hover:underline">
          Print
        </button>
      </div>
    </div>
  );
}
