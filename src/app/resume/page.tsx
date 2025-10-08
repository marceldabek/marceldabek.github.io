import React from "react";
import BlurFade from "@/components/magicui/blur-fade";

export const metadata = {
  title: "Resume",
  description: "Resume for Marcel Dabek",
};

// Updated to latest resume file uploaded 9-28.
// File stored at /public/resume/DABEK resume 9-28.pdf (spaces URL-encoded below)
// Cleaner alias suggestion: copy or rename to /public/resume/dabek-resume-latest.pdf for a stable link.
const PDF_PATH = "/resume/dabek-resume-latest.pdf";

export default function ResumePage() {
  return (
    <main className="w-full max-w-4xl mx-auto space-y-8">
      <BlurFade delay={0}>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-center -mt-4">Resume</h1>
      </BlurFade>
      <BlurFade delay={0.1}>
        <div className="rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-zinc-900">
          <object
            data={PDF_PATH + '#toolbar=0'}
            type="application/pdf"
            className="w-full h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)]"
          >
            <p className="p-4 text-center text-sm">Your browser can't display the PDF.
              <a href={PDF_PATH} target="_blank" rel="noopener" className="underline ml-1">Open or download it instead.</a>
            </p>
          </object>
        </div>
        <div className="flex justify-center gap-4 text-xs text-muted-foreground">
          <a href={PDF_PATH} target="_blank" rel="noopener" className="hover:underline">Open in new tab</a>
          <a href={PDF_PATH} download className="hover:underline">Download</a>
          <button onClick={() => window.print()} className="hover:underline">Print</button>
        </div>
      </BlurFade>
    </main>
  );
}
