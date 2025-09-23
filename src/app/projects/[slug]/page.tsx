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
const PLACEHOLDER = "/atomic.png"; // using an existing public asset until photos are provided

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
}: { heading: string; body: string; image?: string; flip?: boolean }) {
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
            className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5 object-cover"
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

  const sections = [
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
          <MediaBlock key={s.heading + i} heading={s.heading} body={s.body} image={s.image} flip={i % 2 === 1} />
        ))}

        {/* Tech stack pills */}
        {tech.length > 0 && (
          <section className="py-6">
            <h4 className="text-sm font-medium tracking-wide text-zinc-500">Stack & Responsibilities</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {tech.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
              ))}
              <Badge variant="outline" className="rounded-full">DFMEA</Badge>
              <Badge variant="outline" className="rounded-full">Design Reviews</Badge>
              <Badge variant="outline" className="rounded-full">Testing</Badge>
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
