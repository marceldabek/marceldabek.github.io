import React from "react";

export const metadata = {
  title: "Resume",
  description: "Resume for Marcel Dabek",
};

const PDF_PATH = "/resume/Dabek%20Resume%209.22.2025.pdf";

export default function ResumePage() {
  return (
    <main className="w-full max-w-4xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-center -mt-4">Resume</h1>
      <div className="rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-zinc-900">
        <iframe
          src={PDF_PATH}
          className="w-full h-[85vh]"
          title="Resume PDF"
        />
      </div>
    </main>
  );
}
