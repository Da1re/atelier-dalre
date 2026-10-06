import { FeaturedCarousel } from "@/components/sections/section-work/featured-carousel";
import { ProjectMark } from "@/components/shared/project-mark";
import { TapeTitle } from "@/components/shared/tape-title";
import { PROJECTS } from "@/models/project-data";
import Link from "next/link";

export function SectionWork() {
  return (
    <section>
      <div className="flex justify-between items-end mb-10 md:mb-15 border-t border-foreground/25 pt-10">
        <TapeTitle>Work</TapeTitle>
        <Link
          href="/work"
          className="text-sm font-semibold text-primary hover:opacity-60 transition-opacity pb-2.5"
        >
          모두 보기 →
        </Link>
      </div>

      <FeaturedCarousel />

      <div className="mt-14 md:mt-20">
        <h3 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-6">
          All Projects
        </h3>
        <ul className="border-t border-foreground/10">
          {PROJECTS.map((project, i) => (
            <li key={project.slug} className="border-b border-foreground/10">
              <Link
                href={`/work/${project.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_auto_1fr_auto] items-center gap-3.5 md:gap-5 py-4 md:py-5 px-2 rounded-lg hover:bg-foreground/3 transition-colors cursor-pointer"
              >
                <span className="hidden sm:block w-6.5 text-xs text-foreground/55 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ProjectMark starred={project.starred} />
                <h4 className="min-w-0 text-base md:text-lg font-normal text-foreground tracking-[-0.5px] transition-transform group-hover:translate-x-1">
                  {project.title}
                </h4>
                <span className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex px-3 py-1 rounded-full border-[1.5px] border-foreground/25 font-mono text-[11.5px] text-foreground/70">
                    {project.period}
                  </span>
                  <span className="grid place-items-center w-8.5 h-8.5 rounded-full border-[1.5px] border-foreground/25 text-sm text-foreground/60 transition-colors group-hover:bg-foreground group-hover:text-background group-hover:border-transparent">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
