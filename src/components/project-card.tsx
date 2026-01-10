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

type LinkItem = { title?: string; type?: string; icon: React.ReactNode; href: string };

interface Props {
  title: string;
  href?: string;
  dates?: string;
  tags?: ReadonlyArray<string>;
  link?: string;
  image?: string;
  video?: string;
  links?: ReadonlyArray<LinkItem>;
  className?: string;
  slug?: string; // add optional slug from DATA
  objectPosition?: string; // optional CSS object-position for media crop
}
 

export function ProjectCard({
  title,
  href,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  slug,
  objectPosition,
}: Props) {
  const internalHref = slug ? `/projects/${slug}` : href || "#";
  const isClickable = Boolean(slug);
  
  const mediaContent = (
    <>
      {video && (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}
      {image && (
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="h-40 w-full overflow-hidden object-cover object-top"
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}
      {!video && !image && (
        <div className="h-40 w-full bg-muted/40 flex items-center justify-center text-muted-foreground text-xs">
          Preview coming soon
        </div>
      )}
    </>
  );

  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      {isClickable ? (
        <Link href={internalHref} className={cn("block cursor-pointer", className)}>
          {mediaContent}
        </Link>
      ) : (
        <div className={cn("block", className)}>
          {mediaContent}
        </div>
      )}
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">
            {isClickable ? (
              <Link
                href={internalHref}
                className="group/link inline-flex items-start underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:underline transition-colors"
              >
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover/link:bg-[length:100%_2px] motion-safe:transition-[background-size] duration-300">
                  {title}
                </span>
              </Link>
            ) : (
              <span className="inline-flex items-start">
                {title}
              </span>
            )}
          </CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
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
