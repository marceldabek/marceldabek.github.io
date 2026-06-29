import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";
import PdfViewer from "@/components/pdf-viewer";
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
  "accumulator-ct16": {
    images: [
      "/accumulator1.jpg",
      "/accumulator8.png",
      "/accumulator3.png",
      "/accumulator6.png",
      "/accumulator7.png",
    ],
    wrapperClass: "max-w-[500px]",
  },
  "accumulator-ct17": {
    images: [
      "/accumulator-ct17-exploded.png",
      "/accumulator-ct17-cells.png",
      "/accumulator-ct17-module.png",
      "/accumulator-ct17-busbar.png",
      "/accumulator-ct17-weld1.png",
      "/accumulator-ct17-weld2.png",
      "/accumulator-ct17-thermal.png",
      "/accumulator-ct17-build.jpg",
    ],
    wrapperClass: "max-w-[760px]",
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
              loading="lazy"
              className={`w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover ${imageClass || ""}`}
            />
          </div>
        </div>
      </section>
    );
  }

  // If there is text but no image (e.g. the cover already shows it), render text only
  if (!image && !secondaryImage) {
    return (
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{heading}</h3>
          {body && body.length > 0 && (
            <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
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
                  loading="lazy"
                  className="w-full h-[260px] sm:h-[300px] object-contain"
                />
              </div>
              <div className="w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 bg-background">
                <Image
                  src={secondaryImage}
                  alt={heading}
                  width={700}
                  height={500}
                  loading="lazy"
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
              loading="lazy"
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

  const galleryWrapperBase = "flex flex-col items-center gap-6 mx-auto w-full";
  const galleryMaxWidthClass = galleryConfig?.wrapperClass ?? "max-w-[720px]";
  const galleryImageClass = galleryConfig?.imageClass ?? "w-full h-auto object-contain";
  const galleryImages = galleryConfig?.images ?? [];
  const isPowertrainDetail = project?.slug === "powertrain";
  const isAccumulatorCt16Detail = project?.slug === "accumulator-ct16";
  const isAccumulatorCt17Detail = project?.slug === "accumulator-ct17";
  const isEngineeringInternDetail = project?.slug === "engineering-intern";
  const isFlowMeterDetail = project?.slug === "pcb-design";
  const isWorkshopsDetail = project?.slug === "solidworks-workshops";
  const isFatigueRigDetail = project?.slug === "fatigue-test-rig";
  const isPwDetail = project?.slug === "pratt-whitney";
  const powertrainParagraphs: Array<string | string[]> = [
    "I lead the mechanical design of the first EV powertrain on the formula team which secured us a 1st place trophy in efficiency and 14th place finish overall. The goal of the powertrain was to make it as durable as possible and maximize its performance by reducing its size and mass. The key constraints were packaging and geometry: the differential location is driven by axle angle limits to the rear spindles, the motor has to fit inside the frame envelope. I connected them with a chain drive which needs shielding to protect against unexpected chain failure.",
    "Based on the motor’s 220 Nm peak torque which is equivalent at the drive sprocket it to roughly 8kN newtons in chain tension, and 10 kN which side loads the mounts right next to the chain. I iterated through designs using Ansys static structural aiming for a factor of safety of 2 and used modal analysis to identify modes below frequencies that could be produced by the motor that were eliminated by adding more attachment points to the rear of the car increasing mode frequencies.",
    "I selected a 520 chain and designed around an 11-tooth drive sprocket and 40-tooth driven sprocket (40/11 ≈ 3.64:1) as the baseline ratio, found using autocross point-mass simulations to balance acceleration and efficiency.",
    [
      "A worry of the powertrain is tolerance stack up. Instead of relying on perfect machining, I made the assembly somewhat adjustable: on the drive side shaft I use a C-clip as an axial hard stop, push the drive sprocket against that stop, then shim the sprocket outward until its plane lines up with the driven sprocket after that I put a spacer on the other side of the sprocket that will keep it in place.",
      "All that work lead to the 14th overall finish and the first place trophy.",
    ],
  ];
  const accumulatorCt16Paragraphs: Array<string | string[]> = [
    "CT-16 was UConn FSAE’s first-ever electric vehicle, and I was part of the team that designed and built its high-voltage accumulator. I contributed across the pack (architecture, packaging, and a lot of hands-on build) on a 440-cell, 462 V, 8.32 kWh pack that passed technical inspection on its first attempt.",
    "The pack uses 440 cells in a 110s4p configuration across five segments. We sized it large for our first EV to leave generous energy margin, then built and installed it in roughly a two-week window so the car could start its testing season.",
    "Cells are secured between polycarbonate sheets, insulated with Nomex 410 and Kapton, and individually fused. The sheet-metal enclosure was designed to the rulebook’s 40 g load cases, with an accessible service area for the high- and low-voltage interfaces.",
    [
      "Running and instrumenting this pack through the 2025 season is what set up the CT-17 redesign.",
      "The data and lessons from CT-16 directly drove the lighter, better-balanced second-generation pack I now lead end-to-end.",
    ],
  ];
  const accumulatorCt17Sections: Array<{
    heading: string;
    body: string[];
    image: string;
    secondaryImage?: string;
  }> = [
    {
      heading: "CT-17 Accumulator, UConn FSAE",
      body: [
        "I own the complete design of UConn FSAE’s second-generation high-voltage accumulator (CT-17). After contributing to the CT-16 pack as part of the team, I took CT-17 end-to-end (mechanical design, cell selection, and pack sizing) while working within a fixed chassis envelope and the Formula SAE EV rules. Rules-compliance, simplicity, and serviceability drove every decision.",
        "The pack is 100s4p: 400 cells across five segments, 415 V max, 8.33 kWh, and 105 lb. It runs Molicel P50B 21700 cells, an Orion BMS 2, a 6061-T6 aluminum enclosure, and a polycarbonate cell structure.",
      ],
      image: "",
    },
    {
      heading: "Sizing from real data",
      body: [
        "Rather than carry over last year’s oversized pack, I sized CT-17 to what the car actually uses. The 2025 endurance run drew only 3.275 kWh and finished at 57% state of charge (we used just 43% of the pack), so I cut 40 cells and about 10 lb while keeping ample margin.",
        "To choose the cell, I simulated three candidates over real 2025 endurance data: the Molicel P45B (last year’s cell), the Molicel P50B, and the Ampace JP40. The P50B won: +11% capacity, ~6 lb lighter than the P45B, a validated 21700 form factor, and a drop-in chemistry from the same supplier. I confirmed the pack stays well within thermal limits with no active cooling (simulated peak cell temperature of 33.9 °C).",
      ],
      image: "/accumulator-ct17-cells.png",
    },
    {
      heading: "Cells & segment architecture",
      body: [
        "I chose cylindrical 21700 cells over pouch cells: they contain single-cell failures, use off-the-shelf FSAE tooling, and give per-cell quality control that matches a second-year team’s build skill.",
        "The pack is five 20s4p modules of 80 cells each. Every module stores 5.976 MJ, just 0.4% under the 6 MJ rule cap, with cell voltage capped at 4.15 V for extra margin. I designed the polycarbonate cell-mounting structure and relocated a custom voltage-tap board for cleaner sensing and assembly.",
      ],
      image: "/accumulator-ct17-module.png",
    },
    {
      heading: "Current-sharing busbar study",
      body: [
        "On the bench I measured a worst-case current spread of 7.09 between the hardest- and easiest-working cell in a parallel group, because current crowds the cell tap nearest the busbar terminal. The hottest cell sets pack life, so this was a robustness problem first and an efficiency one second.",
        "I built four busbar candidates (flat baseline, single fold, triple-thickness (two folds), and a copper booster) and ran each at 30 A on the bench and in Ansys steady-state thermal-electric. The triple-fold won the tradeoff: it cut busbar voltage drop 33% (30 → 20 mV), pulled the current ratio from 7.09 to 2.34, and spread heat evenly across the group. Every joint was spot-welded with a K-Weld for repeatable, tightly-matched cell groups.",
      ],
      image: "/accumulator-ct17-busbar.png",
    },
    {
      heading: "Sealed enclosure & weld design",
      body: [
        "I detailed the sealed 6061-T6 aluminum enclosure and produced its full weld drawings. The case seals to the FSAE tilt and rain-test envelope, with a redesigned top-access service plate so the fuse board and modules can be reached without unstacking the pack, a direct fix for a day-one emergency module swap in 2025.",
        "Inside, a ~4 mm air gap and per-cell polycarbonate separators give a first-order defense against thermal-runaway propagation, with Nomex 410 and Kapton insulation between live parts. Mounts and geometry were checked against the rules’ 40 g load cases.",
      ],
      image: "/accumulator-ct17-weld1.png",
    },
    {
      heading: "",
      body: [],
      image: "/accumulator-ct17-weld2.png",
    },
    {
      heading: "Thermal path",
      body: [
        "For cooling, thermal-interface pads tie both faces of every module to the aluminum shell, turning the enclosure into the pack’s heat sink and removing roughly 160 W and eliminating the air gaps that drove 2025’s hot spots. Balancing and post-charge cooldown both got noticeably faster.",
      ],
      image: "/accumulator-ct17-thermal.png",
    },
    {
      heading: "Build result",
      body: [
        "I ran an Orion BMS 2 for a documented, supplier-supported rules-compliance path (a custom BMS is on the longer-term roadmap). The finished pack delivers 4× tighter cell matching, 3× more-even cell current, −10 lb of mass, and a simulated peak cell temperature of 38 °C, which is 23 °C under the FSAE limit. I led everything mechanical through build; wiring and soldering were handled by the electrical team.",
      ],
      image: "/accumulator-ct17-build.jpg",
    },
  ];
  const engineeringInternParagraphs: Array<string | string[]> = [
    "Distributors receive palletized tank halves and are the ones who join them at their warehouses. I designed a snap-fit assembly cone that ships with each EDGE-600 tank and makes that join fast, repeatable and safe. The cone indexes the parts, guides alignment, and keeps hands clear while the halves are brought together. The goal was simple: reduce struggle, prevent mis-alignment, and make assembly reliable for anyone at the distributor site.",
    "I ran a design–simulate–test loop in SolidWorks Simulation and iterated through roughly twenty-six geometry changes. Each iteration was 3D-printed first to check fit and handling. I measured installation and pull-off forces with a shop scale and set practical targets: 30 lb total to seat the part/remove it, about 10 lb per clip.",
    "Plastic clips failed to hold that consistently, so I moved to bolt-on metal U-nut clips while keeping the body polypropylene for manufacturability as 400 of these would be made annually. The final tool clips on positively, resists accidental removal, and installs with a firm, repeatable push. The body is a DFM’d injection-molded polypropylene part; retention is provided by bolts driven through the opposite side of standard U-nuts so they act as metal clip latches.",
    "I planned a simple, reconfigurable cap-assembly line so production could be brought in-house and the same stations could be reused for future parts. I laid out stations and fixtures around an eight-cavity shot plan, balanced tasks to match the shot rate, and sized throughput to about 400,000 caps per year. We referenced an internal cost-sensitivity table to set reasonable ranges; the case pointed to a low six-figure capital spend (about $80k–$150k) with roughly $50k/year margin improvement if implemented. I also drafted an 80/20 plus vacuum-cup end-of-arm tool so parts could be handled without marking.",
  ];

  const flowMeterSections: Array<{ heading: string; body: string[]; image: string }> = [
    {
      heading: "Flow Meter: A DIY Build",
      body: [
        "My dad runs a floor-prep company, and mixing self-leveler needs a precise amount of water in every batch. A handheld tool that dispenses a set volume of water and then shuts off exists commercially, but it was surprisingly expensive, so I set out to build my own.",
        "I worked on it as a side project to help out at the shop, designing the PCB myself to drive a pump and meter out the water by volume.",
      ],
      image: "",
    },
    {
      heading: "",
      body: [],
      image: "/pcb2.png",
    },
    {
      heading: "My first PCB",
      body: [
        "This was my first time taking a board from idea to schematic to layout entirely on my own. It was a genuinely fun exercise, and a great way to learn just how much goes into turning a simple idea into a working circuit.",
      ],
      image: "/pcb3.png",
    },
  ];
  const pwSections: Array<{ heading: string; body: string[]; image: string }> = [
    {
      heading: "Composite fan blade R&D",
      body: [
        "I do R&D on the automated composites machine at CCAT's Advanced Composites Technology Center (the cell shown in the cover), which Pratt & Whitney is developing for its composite fan blade.",
      ],
      image: "/pw-fan-blade.jpg",
    },
    {
      heading: "F135 metal rotors",
      body: [
        "Separately, I support the F135 program, the engine that powers the F-35, through manufacturing efforts, analyzing test data on metal rotors flagged for defects.",
      ],
      image: "/pw-f135-engine.jpg",
    },
    {
      heading: "",
      body: [],
      image: "/pw-f35.jpg",
    },
  ];
  const workshopsSections: Array<{ heading: string; body: string[]; image: string }> = [
    {
      heading: "SolidWorks Workshops & Recruiting",
      body: [
        "I led recruiting and CAD education for UConn Formula SAE. My recruiting push brought in 600 sign-ups (the largest in the team’s history) that filled the shop with new members.",
        "To turn that interest into skill, I ran hands-on classroom workshops where students learned SolidWorks from the ground up, with TAs walking the room to help one-on-one.",
      ],
      image: "",
    },
    {
      heading: "~100 students a day",
      body: [
        "Across four sessions of two classrooms at a time, roughly 100 students a day were introduced to Formula SAE and the design work behind the car, learning CAD while getting a first look at how the team actually builds.",
      ],
      image: "/workshop2.jpg",
    },
    {
      heading: "",
      body: [],
      image: "/workshop3.png",
    },
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
  if (isAccumulatorCt16Detail) {
    const lastIdx = galleryImages.length - 1;
    sections = galleryImages.flatMap((src, idx) => {
      if (idx === lastIdx) return [];
      return [
        {
          heading: idx === 0 ? "CT-16 Accumulator, UConn FSAE" : "",
          body: accumulatorCt16Paragraphs[idx]
            ? Array.isArray(accumulatorCt16Paragraphs[idx])
              ? accumulatorCt16Paragraphs[idx]
              : [accumulatorCt16Paragraphs[idx]]
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
  if (isAccumulatorCt17Detail) {
    sections = accumulatorCt17Sections.map((s) => ({
      heading: s.heading,
      body: s.body,
      image: s.image,
      secondaryImage: s.secondaryImage,
      imageClass: galleryImageClass,
    }));
  }
  if (isFlowMeterDetail) {
    sections = flowMeterSections;
  }
  if (isWorkshopsDetail) {
    sections = workshopsSections;
  }
  if (isPwDetail) {
    sections = pwSections;
  }
  if (isFatigueRigDetail) {
    // Hero shows the render; the narrative + spec sheet render in a dedicated block below.
    sections = [];
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
                priority
                className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover"
              />
            )}
          </div>
        </div>
      </header>

      <Separator className="my-4" />

      {/* Content */}
      <div className={`${L.container} py-6 md:py-10`}>
        {isGalleryProject && !isPowertrainDetail && !isAccumulatorCt16Detail && !isAccumulatorCt17Detail && !isEngineeringInternDetail && !isWorkshopsDetail ? (
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

        {/* CT-17 results: full-width so the official table stays legible */}
        {isAccumulatorCt17Detail && (
          <section className="mt-4 border-t border-black/5 dark:border-white/10 py-10 md:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Did it work? 2026 Michigan results
              </h3>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                <p>
                  The whole point of resizing the pack was to trade last year&apos;s
                  huge energy margin for endurance pace, and the 2026 Formula SAE
                  Michigan preliminary results show it worked.
                </p>
                <p>
                  UConn jumped from 14th to 5th overall, with the total score
                  climbing from 507 to 757 points. The endurance score rose from
                  152.9 to 202.2 on a faster, harder-driven pace, while efficiency
                  came down from a 1st-place 100 to 66.1, the deliberate trade the
                  pack was built for. With a pack that held up, the car also
                  finished acceleration and skid pad, two events it could not even
                  start in 2025.
                </p>
              </div>
            </div>
            <div className="mt-8 mx-auto max-w-[1000px] overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 bg-background">
              <Image
                src="/accumulator-ct17-results.png"
                alt="2026 Formula SAE Electric preliminary overall results, UConn in 5th place"
                width={1500}
                height={435}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-3 text-center text-xs text-zinc-500">
              2026 Formula SAE Electric (Michigan) preliminary overall results.
            </p>
          </section>
        )}

        {/* Fatigue rig: full spec sheet shown like the resume page */}
        {isFatigueRigDetail && (
          <section className="py-6 md:py-10">
            <PdfViewer src="/fatigue-rig-spec.pdf" />
          </section>
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
