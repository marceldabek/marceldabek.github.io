import React from "react";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";

export const metadata = {
  title: "Gallery",
  description: "A simple gallery of photos",
};

export default function GalleryPage() {
  // Simple masonry-like CSS using columns; no rounded corners, tight spacing
  interface GalleryImage { src: string; caption?: string }
  const images: GalleryImage[] = [
    // Project-adjacent but not used as previews
  { src: "/powertrain1.JPG", caption: "Nearly full assembly completed within only 24 hours of receiving all parts." },
    { src: "/powertrain3.png", caption: "Fully custom reverse engineered motor shaft using an R6 motorcycle spline." },
    { src: "/pedalplate.png", caption: "Pedal mount designed with Fusion 360 generative design." },
    { src: "/deskextension.png", caption: "3D printed desk extension that wirelessly charges my phone and Apple Watch." },
    { src: "/me1.jpeg", caption: "Electrical Structures assembly." },
  { src: "/newmemberday.webp", caption: "Our shop full of new members—result of recruiting campaigns I led." },
  { src: "/SAE New Members Day-20.jpg", caption: "Introducing EV Powertrain to new members." },
  { src: "/SAE New Members Day-31.jpg", caption: "Showing off a few Powertrain components of the FSAE car to new members." },
    { src: "/Pitt-Shootout-097.jpg", caption: "CT-16EV (left) & CT-16IC (right) after the Pittsburgh Shootout event." },
  { src: "/steeringjig.webp", caption: "Fixture I designed to hold the steering in the correct place before welding." },
    { src: "/CFCLDN.png", caption: "3D printed Chelsea FC standing decoration. Up the Blues!" },
  { src: "/me2.jpg", caption: "A photo of me sitting in the CT-16EV in front of UConn's Basketball Arena." },
  ];
  return (
    <main className="w-full max-w-5xl mx-auto">
      <header className="mb-6 text-center space-y-2">
        <BlurFade delay={0}>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Gallery</h1>
        </BlurFade>
        <BlurFade delay={0.1}>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-2">
            A collection of images from projects.
          </p>
        </BlurFade>
      </header>
      <section>
  <div className="[column-count:1] sm:[column-count:2] md:[column-count:3] lg:[column-count:3] gap-4 [column-gap:1rem]">
          {images.map((img, idx) => (
            <BlurFade key={img.src} delay={0.15 + idx * 0.05} className="mb-4 break-inside-avoid block group relative overflow-hidden rounded-sm">
              <Image
                src={img.src}
                alt={img.caption || "Gallery item"}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition duration-300 ease-in-out group-hover:blur-sm group-hover:scale-[1.02]"
                loading="lazy"
              />
              {img.caption && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 text-white text-sm font-medium">
                  <span>{img.caption}</span>
                </div>
              )}
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
}
