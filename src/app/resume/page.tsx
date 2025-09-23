import React from "react";

export const metadata = {
  title: "Resume",
  description: "Resume for Marcel Dabek",
};

export default function ResumePage() {
  return (
    <main className="max-w-2xl mx-auto w-full">
      <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Resume</h1>
      <p className="text-muted-foreground mt-3">Add your embedded PDF or resume content here.</p>
    </main>
  );
}
