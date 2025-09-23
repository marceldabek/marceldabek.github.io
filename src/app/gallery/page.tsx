import React from "react";

export const metadata = {
  title: "Gallery",
  description: "A simple gallery of photos",
};

export default function GalleryPage() {
  // Simple masonry-like CSS using columns; no rounded corners, tight spacing
  return (
    <main className="w-full max-w-5xl mx-auto">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Gallery</h1>
        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-2">
          A collection of images from projects. Hover interactions can be added later.
        </p>
      </header>
      <section>
        <div className="[column-count:1] sm:[column-count:2] md:[column-count:3] lg:[column-count:4] gap-4 [column-gap:1rem]">
          {/* Drop images into public/gallery and link them here */}
          {/* Example slots using placeholder images */}
          {["/public/atomic.png","/public/buildspace.jpg","/public/headshot.jpg","/public/mitremedia.png","/public/nvidia.png","/public/waterloo.png"].map((src) => (
            <div key={src} className="mb-4 break-inside-avoid">
              <img src={src.replace("/public","")} alt="Gallery item" className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
