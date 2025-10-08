import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Default placeholder image. Swap this with your own asset in /public.
// Updated after removal of old logo/image assets.
const PLACEHOLDER = "/headshot2.jpg"; // generic existing asset used as placeholder

export type ProjectDetailProps = {
  title?: string;
  timeframe?: string;
  role?: string;
  tech?: string[];
  heroImage?: string;
  summary?: string;
  sections?: Array<{
    heading: string;
    body: string;
    image?: string;
    imageClass?: string;
  }>;
};

const L = {
  // Slightly wider than the rest of the site for detail pages
  container: "mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8",
  h1: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight",
  lead: "text-base sm:text-lg text-zinc-600 dark:text-zinc-400",
  pill: "rounded-full px-2.5 py-1 text-xs",
};

function MediaBlock({
  heading,
  body,
  image,
  flip,
  imageClass,
}: { heading: string; body: string; image?: string; flip?: boolean; imageClass?: string }) {
  return (
    <section className="py-10 md:py-14">
      <div className={`grid items-center gap-8 md:gap-12 lg:gap-16 md:grid-cols-2 ${flip ? "md:[&>div:first-child]:order-2" : ""}`}>
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold">{heading}</h3>
          <div className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children, ...props }) => {
                  if (!href) return <a {...props}>{children}</a>;
                  if (href.startsWith("/")) {
                    return (
                      <Link href={href} {...(props as any)}>
                        {children}
                      </Link>
                    );
                  }
                  if (href.startsWith("#")) {
                    return (
                      <a href={href} {...props}>
                        {children}
                      </a>
                    );
                  }
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                      {children}
                    </a>
                  );
                },
              }}
            >
              {body}
            </ReactMarkdown>
          </div>
        </div>
        <div className="relative">
          {/* NOTE: Replace with next/image when photos are available */}
          <img
            src={image || PLACEHOLDER}
            alt={heading}
            className={`w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover ${imageClass || ""}`}
          />
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  // Generate pages for all projects that have a slug
  return (DATA.projects as unknown as Array<any>) // DATA is readonly, cast via unknown to iterate
    .filter((p) => p.slug)
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
  const summary = project?.description ?? "Project details coming soon.";
  const heroImage = project?.image || PLACEHOLDER;
  const heroVideo = (project as any)?.video as string | undefined;

  let sections: Array<{ heading: string; body: string; image?: string; imageClass?: string }> = [
    {
      heading: "Overview",
      body: summary,
      image: heroImage,
    },
    {
      heading: "Design & Approach",
      body:
        "This section will cover your design rationale, trade-offs, and how you validated the approach. Add CAD, schematics, or diagrams here.",
      image: PLACEHOLDER,
    },
    {
      heading: "Manufacturing & Assembly",
      body:
        "Describe fabrication steps, tooling, tolerances, and any assembly challenges you solved. Photos and short clips work great here.",
      image: PLACEHOLDER,
    },
  ];

  // Extend with project-specific media using newly added photos.
  // For now, placeholder descriptive text accompanies each image.
  if (project?.slug === "accumulator") {
    // Replace accumulator sections with user-provided structured narrative (5 sections)
    // Keep the initial Overview section already present above.
    // Map images: 1->Design Scope, 2->System Architecture, 3->Cell Stack (half size), 4->Electronics & Enclosure, 5->Build/Test
    sections.push(
      {
        heading: "Design Scope",
        body: "I partnered with our electrical team to lock down criteria early. Two things drove every choice: the welded frame left tight space, and Formula SAE rules are strict. Success meant one thing—pass tech inspection and finish endurance safely.",
        image: "/accumulator2.png",
      },
      {
        heading: "System Architecture & Performance",
        body: "I began with simulations using past-competition data to size the system and predict thermal behavior. That led to cell types and a series/parallel layout that push voltage for our components while keeping resistance low—simple enough that we eliminated active cooling. The structure is built for up to 40 g load cases per the rulebook. The pack uses 440 cells in five segments, delivering 92 kW with 8.32 kWh of storage.",
        image: "/accumulator8.png", // updated per request (7 -> 8)
      },
      {
        heading: "Cell Stack & Protection",
        body: "Cells are epoxied between two ½-inch polycarbonate sheets, insulated with Nomex 410, and sealed with Kapton tape. Each cell is individually fused using laser-cut five-layer clad (nickel, copper, stainless) rated 95 A. I stripped the cell insulation to route from the top positive to the outer-edge negative, reducing the accumulator length by 2.5 inches. Busbars are spot-welded to the tops of the cells.",
        image: "/accumulator3.png",
        imageClass: "max-w-[50%] mx-auto",
      },
      {
        heading: "Polycarbonate Routing & Fixturing",
        body: "Used a custom polycarbonate router setup and fixturing strategy to achieve clean, stress-minimized edges on pack panels while holding ±0.010 in critical features. This reduced post-processing time and improved seal integrity.",
  image: "/polycarbrouter.webp", // corrected filename
      },
      {
        heading: "Electronics & Enclosure",
        body: "I integrated a custom PCB to log voltage and temperature, defined the board profile, and selected the connectors. I added thermal relief at the busbar so the voltage-sense solder joint doesn’t overheat nearby cells. Segments sit in a sheet-metal enclosure, fully insulated with Nomex 410 and linked with off-the-shelf connectors and pins. I also designed a dedicated service area tying the HV stack to low-voltage safety circuitry in line with Formula SAE standards.",
  image: "/segmentvoltagetap.webp", // corrected filename
      },
      {
        heading: "Build, Test & Iteration",
        body: "Manufacturing and chassis integration finished within a two-week window, and the accumulator ran reliably through the testing season. Later, I redesigned the pack to cut weight ~25%, reduce volume ~35%, improve serviceability, and add alumina plates to passively move heat from the cells to the case.",
  image: "/ct15ev.webp", // corrected filename
      }
    );
  } else if (project?.slug === "powertrain") {
    // Remove any placeholder sections first
    sections = sections.filter((s) => s.image !== PLACEHOLDER);
    // Replace with user-provided narrative (5 sections). Map available images sequentially.
    sections.push(
      {
        heading: "Design Goals & Benchmarking",
        body: "I set a simple target: build the most straightforward, rules-compliant powertrain that could get the car driving reliably, fast. I started by studying designs from 40+ teams and selecting the major components that fit that brief.",
        image: "/powertrain1.JPG",
        // Enlarged footprint (previously 60% / 400px). Allow taller render while keeping some restraint.
        imageClass: "max-w-[80%] mx-auto max-h-[560px] md:max-h-[520px] object-contain",
      },
      {
        heading: "Driveline Sizing & Early Work",
        body: "To size the gearing, I modeled the car as a point mass in MATLAB and hunted for the ratio that maximized acceleration. The result guided a rear sprocket assembly I built while ramping up on SolidWorks and ANSYS. The simulation predicted 1.05 g peak acceleration, and along the way I got hands-on with Static Structural setup, cycle life, and mesh convergence.",
        image: "/powertrain2.JPG",
        // Match enlarged sizing for consistency
        imageClass: "max-w-[80%] mx-auto max-h-[560px] md:max-h-[520px] object-contain",
      },
      {
        heading: "Structure & Topology Optimization",
        body: "I laid out free-body diagrams for the five major powertrain parts, created preliminary designs, and ran ANSYS Static Structural analyses. From there, I used topology optimization to cut weight by 35% and minimize compliance—iterating through three full redesigns to land a clean, manufacturable set.",
        image: "/powertrain3.png",
      },
      {
        heading: "Vibration Control & Motor Shaft Integration",
        body: "After digging into modal and harmonic response, I stiffened the assembly to raise the natural frequency above the motor’s operating range and avoid resonance-induced failure. I also designed the electric motor shaft to mate with an off-the-shelf Yamaha R6 sprocket, built the spline geometry in MITCalc (referencing Japanese automotive texts), and verified dimensions against a 3D scan of the R6. That work included snap-ring calcs, bearing fits, steel alloys, Rockwell hardness, and heat-treat process considerations.",
        image: "/powertrain4.png",
      },
      {
        heading: "Final Assembly, Manufacturing & Results",
        body: "I wrapped the powertrain with full drawings, BOM, manufacturing plans, and design presentations, then simplified the design when we shifted manufacturing in-house. All parts were built and assembled and the system was tested for six months with no failures.",
        image: "/powertrain5.png",
      }
    );
  }

  // PCB project: replace repeated/placeholder images with pcb2 & pcb3 and drop extra placeholder section
  if (project?.slug === "pcb-design") {
    if (sections[0]) sections[0].image = "/pcb2.png"; // Overview shows a different board image
    if (sections[1]) sections[1].image = "/pcb3.png"; // Design & Approach gets third board image
    // Remove any remaining sections beyond the first two (e.g., Manufacturing placeholder)
    sections = sections.slice(0, 2);
  }

  // Remove any placeholder (headshot) sections for these key projects so only real images + overview remain
  if (project?.slug === "accumulator" || project?.slug === "powertrain") {
    sections = sections.filter((s) => s.image !== PLACEHOLDER);
  }

  // Engineering Intern (Infiltrator Water Technologies) custom media using new IWT images
  if (project?.slug === "engineering-intern") {
    // Remove placeholder sections first
    sections = sections.filter((s) => s.image !== PLACEHOLDER);
    // Desired order: iwt4, iwt3, iwt2, iwt1
    if (sections[0]) sections[0].image = "/iwt4.png"; // Overview gets iwt4
    sections.push(
      {
        heading: "In-House Transition Setup",
        body: "Placeholder: Commentary on fixture validation, process documentation, and savings (~$50K/yr) from in-house production shift.",
        image: "/iwt3.png",
      },
      {
        heading: "Iterative Design Cycles",
        body: "Placeholder: Short note about rapidly iterating CAD + tooling adjustments across 26 design versions to meet DFM and performance targets.",
        image: "/iwt2.png",
      },
      {
        heading: "R&D Implementation",
        body: "Placeholder: Brief mention of installing, testing, and commissioning new R&D project hardware and instrumentation.",
        image: "/iwt1.png",
        imageClass: "max-w-[50%] mx-auto", // half-size presentation
      }
    );
  }

  // Solidworks Workshops project: ensure three workshop images are displayed
  if (project?.slug === "solidworks-workshops") {
    // Remove placeholder sections
    sections = sections.filter((s) => s.image !== PLACEHOLDER);
    if (sections[0]) sections[0].image = "/workshop1.jpg"; // Overview
    // Replace / append with the remaining two images
    sections.push(
      {
        heading: "Hands-On Session",
        body: "Placeholder: Brief overview of live modeling session teaching design intent & feature order.",
        image: "/workshop2.jpg",
      },
      {
        heading: "Advanced Topics",
        body: "Placeholder: Coverage of configurations, drawings prep, and FEA-ready geometry cleanup.",
        image: "/workshop3.png",
      }
    );
  }

  // Render summary as Markdown so inline links like [Formula SAE](https://www.sae.org/) become clickable
  const SummaryMarkdown = ({ text }: { text: string }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children, ...props }) => {
          if (!href) return <a {...props}>{children}</a>;
          if (href.startsWith("/")) {
            return (
              <Link href={href} {...(props as any)}>
                {children}
              </Link>
            );
          }
          if (href.startsWith("#")) {
            return (
              <a href={href} {...props}>
                {children}
              </a>
            );
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          );
        },
        p: ({ children }) => <p className={`mt-3 ${L.lead}`}>{children}</p>,
      }}
    >
      {text}
    </ReactMarkdown>
  );

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
            <SummaryMarkdown text={summary} />
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
              <img
                src={heroImage}
                alt="Project hero"
                className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover"
              />
            )}
          </div>
        </div>
      </header>

      <Separator className="my-4" />

      {/* Content */}
      <div className={`${L.container} py-6 md:py-10`}>
        {sections.map((s, i) => (
          <MediaBlock key={s.heading + i} heading={s.heading} body={s.body} image={s.image} imageClass={(s as any).imageClass} flip={i % 2 === 1} />
        ))}

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
