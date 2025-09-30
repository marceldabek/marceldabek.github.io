import React from "react";
import BlurFade from "@/components/magicui/blur-fade";

export const metadata = {
  title: "Gallery",
  description: "A simple gallery of photos",
};

export default function GalleryPage() {
  // Simple masonry-like CSS using columns; no rounded corners, tight spacing
  const images = [
    // Project-adjacent but not used as previews
    "/powertrain1.JPG",
    "/powertrain3.png",
    "/pedalplate.png",
    "/CFCLDN.png",
    "/deskextension.png",
    // General photos/logos
    "/me1.jpeg",
    "/me2.jpg",
  // Removed deleted logo/image assets (atomic.png, nvidia.png, mitremedia.png, waterloo.png, buildspace.png)
  // If you want logos again later, add the new files into /public and reference them here.
  ];
  return (
    <main className="w-full max-w-5xl mx-auto">
      <header className="mb-6 text-center space-y-2">
        <BlurFade delay={0}>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Gallery</h1>
        </BlurFade>
        <BlurFade delay={0.1}>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-2">
            A collection of images from projects. Hover interactions can be added later.
          </p>
        </BlurFade>
      </header>
      <section>
  <div className="[column-count:1] sm:[column-count:2] md:[column-count:3] lg:[column-count:3] gap-4 [column-gap:1rem]">
          {images.map((src, idx) => (
            <BlurFade key={src} delay={0.15 + idx * 0.05} className="mb-4 break-inside-avoid block">
              <img
                src={src}
                alt="Gallery item"
                className="w-full h-auto object-cover rounded-sm shadow-sm"
                loading="lazy"
              />
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
}
