import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";

// Default placeholder image. Swap this with your own asset in /public.
// Updated after removal of old logo/image assets.
const PLACEHOLDER = "/headshot2.jpg"; // generic existing asset used as placeholder

const L = {
  // Slightly wider than the rest of the site for detail pages
  container: "mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8",
  h1: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight",
  lead: "text-base sm:text-lg text-zinc-600 dark:text-zinc-400",
  pill: "rounded-full px-2.5 py-1 text-xs",
};

const GALLERY_PROJECTS: Record<
  string,
  { images: string[]; wrapperClass?: string; imageClass?: string }
> = {
  accumulator: {
    images: [
      "/accumulator1.jpg",
      "/accumulator2.png",
      "/accumulator3.png",
      "/accumulator6.png",
      "/accumulator7.png",
      "/accumulator8.png",
    ],
    wrapperClass: "max-w-[500px]",
  },
  powertrain: {
    images: [
      "/powertrain1.JPG",
      "/powertrain2.JPG",
      "/powertrain3.png",
      "/powertrain4.png",
      "/powertrain5.png",
    ],
    wrapperClass: "max-w-[500px]",
  },
  "engineering-intern": {
    images: ["/iwt4.png", "/iwt3.png", "/iwt2.png", "/iwt1.png"],
    wrapperClass: "max-w-[700px]",
  },
  "solidworks-workshops": {
    images: ["/workshop2.jpg", "/workshop3.png"],
    wrapperClass: "max-w-[700px]",
  },
};

function MediaBlock({
  heading,
  image,
  flip,
  imageClass,
}: { heading: string; image?: string; flip?: boolean; imageClass?: string }) {
  // If heading is empty, just show the image without text
  if (!heading) {
    return (
      <section className="py-6">
        <div className="flex justify-center">
          <div className="relative max-w-[700px] w-full">
            <Image
              src={image || PLACEHOLDER}
              alt=""
              width={700}
              height={500}
              className={`w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover ${imageClass || ""}`}
            />
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-10 md:py-14">
      <div className={`grid items-center gap-8 md:gap-12 lg:gap-16 md:grid-cols-2 ${flip ? "md:[&>div:first-child]:order-2" : ""}`}>
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{heading}</h3>
        </div>
        <div className="relative">
          <Image
            src={image || PLACEHOLDER}
            alt={heading}
            width={800}
            height={600}
            className={`w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover ${imageClass || ""}`}
          />
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  // Generate pages for all projects that have a slug, excluding electrical-structures and project-manager-website
  const excludedSlugs = ["electrical-structures", "project-manager-website"];
  return (DATA.projects as unknown as Array<any>) // DATA is readonly, cast via unknown to iterate
    .filter((p) => p.slug && !excludedSlugs.includes(p.slug))
    .map((p) => ({ slug: p.slug }));
}

function findProjectBySlug(slug: string) {
  const list = DATA.projects as unknown as Array<any>;
  return list.find((p) => p.slug === slug);
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = findProjectBySlug(params.slug);

  // Fallback demo-like content derived from project data
  const title = project?.title ?? "Project";
  const timeframe = project?.dates ?? "";
  const tech = (project?.technologies as string[] | undefined) ?? [];
  const galleryConfig =
    project?.slug && GALLERY_PROJECTS[project.slug]
      ? GALLERY_PROJECTS[project.slug]
      : undefined;
  const isGalleryProject = Boolean(galleryConfig);
  // For solidworks-workshops, use workshop1.jpg as hero even though it's not in gallery
  const heroImage = isGalleryProject
    ? project?.slug === "solidworks-workshops"
      ? "/workshop1.jpg"
      : galleryConfig?.images[0] ?? PLACEHOLDER
    : project?.image || PLACEHOLDER;
  const heroVideo = (project as any)?.video as string | undefined;

  let sections: Array<{ heading: string; image?: string; imageClass?: string }> = [];
  if (!isGalleryProject) {
    sections = [
      {
        heading: "Overview",
        image: heroImage,
      },
      {
        heading: "Design & Approach",
        image: PLACEHOLDER,
      },
      {
        heading: "Manufacturing & Assembly",
        image: PLACEHOLDER,
      },
    ];
  }

  // PCB project: replace repeated/placeholder images with pcb2 & pcb3 and drop extra placeholder section
  // Remove headings for PCB - just show images
  if (!isGalleryProject && project?.slug === "pcb-design") {
    sections = [
      {
        heading: "",
        image: "/pcb2.png",
      },
      {
        heading: "",
        image: "/pcb3.png",
      },
    ];
  }

  const galleryWrapperBase = "flex flex-col items-center gap-6 mx-auto w-full";
  const galleryMaxWidthClass = galleryConfig?.wrapperClass ?? "max-w-[720px]";
  const galleryImageClass = galleryConfig?.imageClass ?? "w-full h-auto object-contain";
  const galleryImages = galleryConfig?.images ?? [];

  return (
    <main className="relative">
      {/* Hero */}
      <header className={`${L.container} pt-16 pb-10 md:pt-20 md:pb-14`}>
        <nav className="text-sm text-zinc-500">
          <Link href="/projects" className="hover:underline">Projects</Link> /
          <span className="ml-1 text-zinc-800 dark:text-zinc-200">{title}</span>
        </nav>
        <div className="mt-4 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className={L.h1}>{title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {timeframe && (
                <Badge className={L.pill} variant="secondary">{timeframe}</Badge>
              )}
              {tech.slice(0, 6).map((t) => (
                <Badge key={t} className={L.pill} variant="outline">{t}</Badge>
              ))}
            </div>
          </div>
          <div className="relative">
            {heroVideo ? (
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover"
              />
            ) : (
              <Image
                src={heroImage}
                alt="Project hero"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover"
              />
            )}
          </div>
        </div>
      </header>

      <Separator className="my-4" />

      {/* Content */}
      <div className={`${L.container} py-6 md:py-10`}>
        {isGalleryProject ? (
          <section className={`${galleryWrapperBase} ${galleryMaxWidthClass}`}>
            {galleryImages.map((src, idx) => (
              <div
                key={src}
                className="w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 bg-background"
              >
                <Image
                  src={src}
                  alt={`${title} photo ${idx + 1}`}
                  width={800}
                  height={600}
                  loading="lazy"
                  className={galleryImageClass}
                />
              </div>
            ))}
          </section>
        ) : (
          sections.map((s, i) => (
            <MediaBlock key={s.heading + i} heading={s.heading} image={s.image} imageClass={s.imageClass} flip={i % 2 === 1} />
          ))
        )}

        {/* Tech stack pills */}
        {tech.length > 0 && (
          <section className="py-6">
            <h4 className="text-sm font-medium tracking-wide text-zinc-500">Stack & Responsibilities</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {tech.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link href="/projects">← Back to projects</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
