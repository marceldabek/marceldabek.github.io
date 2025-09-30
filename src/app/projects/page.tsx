import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";

export const metadata = {
  title: "Projects",
  description: "Projects by Marcel Dabek",
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  return (
    // Added negative top margin to slightly pull the page title upward (reducing excess space from global body padding)
    <main className="flex flex-col min-h-[100dvh] space-y-10 pb-8 max-w-2xl mx-auto w-full -mt-8 sm:-mt-8">
      <section>
        <div className="space-y-4 text-center">
          <BlurFade delay={0}>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Projects</h1>
          </BlurFade>
          <BlurFade delay={0.1}>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A consolidated view of my projects. This mirrors the selection shown on the home page.
            </p>
          </BlurFade>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
          {DATA.projects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 2 + id * 0.05}
            >
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                slug={"slug" in project ? (project as any).slug : undefined}
                // description muted by default
                image={project.image}
                video={"video" in project ? (project as any).video : undefined}
                links={project.links}
                objectPosition={
                  "slug" in project
                    ? (project as any).slug === "pcb-design"
                      ? "center 70%" // crop more of the top; bring subject higher in frame
                      : (project as any).slug === "solidworks-workshops"
                      ? "center 85%" // keep as-is: reveal bottom of photo
                      : (project as any).slug === "powertrain"
                      ? "center 60%" // slight downward focus to reveal more of the bottom
                      : undefined
                    : undefined
                }
              />
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
}
