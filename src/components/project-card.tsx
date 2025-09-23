import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

type LinkItem = { title?: string; type?: string; icon: React.ReactNode; href: string };

interface Props {
  title: string;
  href?: string;
  description?: string;
  dates?: string;
  tags?: ReadonlyArray<string>;
  link?: string;
  image?: string;
  video?: string;
  links?: ReadonlyArray<LinkItem>;
  className?: string;
  slug?: string; // add optional slug from DATA
  mutedDescription?: boolean; // control description color
}
 

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  slug,
  mutedDescription = true,
}: Props) {
  const internalHref = slug ? `/projects/${slug}` : href || "#";
  const descriptionClass = cn(
    "prose max-w-full text-pretty font-sans text-xs dark:prose-invert",
    mutedDescription ? "text-muted-foreground" : "text-foreground"
  );
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      <Link href={internalHref} className={cn("block cursor-pointer", className)}>
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
        {!video && !image && (
          <div className="h-40 w-full bg-muted/40 flex items-center justify-center text-muted-foreground text-xs">
            Preview coming soon
          </div>
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className={descriptionClass}>
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge className="px-1 py-0 text-[10px]" variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      {links && links.length > 0 && (
        <CardFooter className="gap-2 px-2 pb-2">
          {links?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 rounded-md bg-foreground text-background px-2 py-1.5 text-[11px] font-medium leading-none transition-colors hover:opacity-90"
            >
              {/* icon inherits currentColor (text) */}
              <span className="inline-flex items-center">{link.icon}</span>
              <span>{link.title ?? link.type}</span>
            </Link>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
