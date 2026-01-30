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
      "/accumulator8.png",
      "/accumulator3.png",
      "/accumulator6.png",
      "/accumulator7.png",
    ],
    wrapperClass: "max-w-[500px]",
  },
  powertrain: {
    images: [
      "/powertrain2.JPG",
      "/powertrain9.png",
      "/powertrain1.JPG",
      "/powertrain3.png",
    ],
    wrapperClass: "max-w-[500px]",
  },
  "engineering-intern": {
    images: ["/iwt4.png", "/iwt3.png", "/iwt1.png", "/iwt2.png"],
    wrapperClass: "max-w-[700px]",
  },
  "solidworks-workshops": {
    images: ["/workshop2.jpg", "/workshop3.png"],
    wrapperClass: "max-w-[700px]",
  },
};

function MediaBlock({
  heading,
  body,
  image,
  secondaryImage,
  flip,
  imageClass,
}: {
  heading: string;
  body?: string[];
  image?: string;
  secondaryImage?: string;
  flip?: boolean;
  imageClass?: string;
}) {
  // If heading and body are empty, just show the image without text
  if (!heading && (!body || body.length === 0)) {
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
          {body && body.length > 0 && (
            <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          {secondaryImage ? (
            <div className="grid gap-4 sm:grid-cols-2 items-center">
              <div className="w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 bg-background">
                <Image
                  src={image || PLACEHOLDER}
                  alt={heading}
                  width={700}
                  height={500}
                  className="w-full h-[260px] sm:h-[300px] object-contain"
                />
              </div>
              <div className="w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 bg-background">
                <Image
                  src={secondaryImage}
                  alt={heading}
                  width={700}
                  height={500}
                  className="w-full h-[260px] sm:h-[300px] object-contain"
                />
              </div>
            </div>
          ) : (
            <Image
              src={image || PLACEHOLDER}
              alt={heading}
              width={800}
              height={600}
              className={`w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover ${imageClass || ""}`}
            />
          )}
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

  let sections: Array<{
    heading: string;
    body?: string[];
    image?: string;
    secondaryImage?: string;
    imageClass?: string;
  }> = [];
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
  const isPowertrainDetail = project?.slug === "powertrain";
  const isAccumulatorDetail = project?.slug === "accumulator";
  const isEngineeringInternDetail = project?.slug === "engineering-intern";
  const powertrainParagraphs: Array<string | string[]> = [
    "I lead the mechanical design of the first EV powertrain on the formula team which secured us a 1st place trophy in efficiency and 14th place finish overall. The goal of the powertrain was to make it as durable as possible and maximize its performance by reducing its size and mass. The key constraints were packaging and geometry: the differential location is driven by axle angle limits to the rear spindles, the motor has to fit inside the frame envelope. I connected them with a chain drive which needs shielding to protect against unexpected chain failure.",
    "Based on the motor’s 220 Nm peak torque which is equivalent at the drive sprocket it to roughly 8kN newtons in chain tension, and 10 kN which side loads the mounts right next to the chain. I iterated through designs using Ansys static structural aiming for a factor of safety of 2 and used modal analysis to identify modes below frequencies that could be produced by the motor that were eliminated by adding more attachment points to the rear of the car increasing mode frequencies.",
    "I selected a 520 chain and designed around an 11-tooth drive sprocket and 40-tooth driven sprocket (40/11 ≈ 3.64:1) as the baseline ratio, found using autocross point-mass simulations to balance acceleration and efficiency.",
    [
      "A worry of the powertrain is tolerance stack up. Instead of relying on perfect machining, I made the assembly somewhat adjustable: on the drive side shaft I use a C-clip as an axial hard stop, push the drive sprocket against that stop, then shim the sprocket outward until its plane lines up with the driven sprocket after that I put a spacer on the other side of the sprocket that will keep it in place.",
      "All that work lead to the 14th overall finish and the first place trophy.",
    ],
  ];
  const accumulatorParagraphs: Array<string | string[]> = [
    "I am the owner of the high-voltage battery that supplies power to the electric motor. After the powertrain work, I led the accumulator design, making last year’s pack and now building a second iteration within a fixed chassis envelope and Formula SAE rules. Rules compliance was the most critical concern, so safety, simplicity, and serviceability were prioritized.",
    "The capacity and thermal performance were developed for the 30-minute endurance challenge. I ran simulations using last year’s data to compare P45B cells, JP40s (their low internal resistance reduces heating), and P50Bs, which were ultimately selected after a Tesla sponsorship. I verified the new cells would not overheat without active cooling, and this iteration dropped 40 cells from last year to cut 5-10 lbs.",
    "The pack uses 440 cells divided into five segments (about 462 V, 8.32 kWh). I selected the cell format and configuration to maximize voltage for our components while reducing resistance, and I designed the cell structure and sheet-metal enclosure to meet the 40 g load cases called out by the rulebook. U-shaped mounts were added, and their geometry was checked against the competition standardized document.",
    "The enclosure is fully sealed, electrically insulated around the segments, and includes a service area that keeps high- and low-voltage interfaces accessible and rules-compliant. Cells are secured between polycarbonate sheets with epoxy, insulated with Nomex 410 and Kapton, and individually fused with a five-layer clad 95 A fuse. I integrated voltage and temperature logging through a custom PCB footprint, and used off-the-shelf high-voltage connectors and pins picked out by the electrical team, and ensured the casing is manufacturable in-house. We built and installed the pack in a two-week window, and it ran reliably through the testing season.",
  ];
  const engineeringInternParagraphs: Array<string | string[]> = [
    "Distributors receive palletized tank halves and are the ones who join them at their warehouses. I designed a snap-fit assembly cone that ships with each EDGE-600 tank and makes that join fast, repeatable and safe. The cone indexes the parts, guides alignment, and keeps hands clear while the halves are brought together. The goal was simple—reduce struggle, prevent mis-alignment, and make assembly reliable for anyone at the distributor site.",
    "I ran a design–simulate–test loop in SolidWorks Simulation and iterated through roughly twenty-six geometry changes. Each iteration was 3D-printed first to check fit and handling. I measured installation and pull-off forces with a shop scale and set practical targets: 30 lb total to seat the part/remove it, about 10 lb per clip.",
    "Plastic clips failed to hold that consistently, so I moved to bolt-on metal U-nut clips while keeping the body polypropylene for manufacturability as 400 of these would be made annually. The final tool clips on positively, resists accidental removal, and installs with a firm, repeatable push. The body is a DFM’d injection-molded polypropylene part; retention is provided by bolts driven through the opposite side of standard U-nuts so they act as metal clip latches.",
    "I planned a simple, reconfigurable cap-assembly line so production could be brought in-house and the same stations could be reused for future parts. I laid out stations and fixtures around an eight-cavity shot plan, balanced tasks to match the shot rate, and sized throughput to about 400,000 caps per year. We referenced an internal cost-sensitivity table to set reasonable ranges; the case pointed to a low six-figure capital spend (about $80k–$150k) with roughly $50k/year margin improvement if implemented. I also drafted an 80/20 plus vacuum-cup end-of-arm tool so parts could be handled without marking.",
  ];

  if (isPowertrainDetail) {
    sections = galleryImages.map((src, idx) => ({
      heading: idx === 0 ? "EV Powertrain" : "",
      body: powertrainParagraphs[idx]
        ? Array.isArray(powertrainParagraphs[idx])
          ? powertrainParagraphs[idx]
          : [powertrainParagraphs[idx]]
        : [],
      image: src,
      imageClass: galleryImageClass,
    }));
  }
  if (isAccumulatorDetail) {
    const lastIdx = galleryImages.length - 1;
    sections = galleryImages.flatMap((src, idx) => {
      if (idx === lastIdx) return [];
      return [
        {
          heading: idx === 0 ? "EV Accumulator - UConn FSAE" : "",
          body: accumulatorParagraphs[idx]
            ? Array.isArray(accumulatorParagraphs[idx])
              ? accumulatorParagraphs[idx]
              : [accumulatorParagraphs[idx]]
            : [],
          image: src,
          secondaryImage: idx === 1 ? galleryImages[lastIdx] : undefined,
          imageClass:
            src === "/accumulator3.png"
              ? `${galleryImageClass} max-w-[360px] mx-auto`
              : galleryImageClass,
        },
      ];
    });
  }
  if (isEngineeringInternDetail) {
    sections = galleryImages.map((src, idx) => ({
      heading: idx === 0 ? "Snap-Fit Assembly – Infiltrator Water Technologies" : "",
      body: engineeringInternParagraphs[idx]
        ? Array.isArray(engineeringInternParagraphs[idx])
          ? engineeringInternParagraphs[idx]
          : [engineeringInternParagraphs[idx]]
        : [],
      image: src,
      imageClass:
        src === "/iwt1.png"
          ? `${galleryImageClass} max-w-[360px] mx-auto`
          : galleryImageClass,
    }));
  }

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
        {isGalleryProject && !isPowertrainDetail && !isAccumulatorDetail && !isEngineeringInternDetail ? (
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
            <MediaBlock
              key={`${s.heading}-${i}`}
              heading={s.heading}
              body={s.body}
              image={s.image}
              secondaryImage={s.secondaryImage}
              imageClass={s.imageClass}
              flip={i % 2 === 1}
            />
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
