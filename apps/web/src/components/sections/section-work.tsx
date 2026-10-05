import { FeaturedCarousel } from "@/components/sections/section-work/featured-carousel";
import { PROJECTS } from "@/models/project-data";
import Link from "next/link";

export function SectionWork() {
  return (
    <section>
      <div className="flex justify-between items-end mb-10 md:mb-15 border-t border-foreground/25 pt-10">
        <h2
          className="font-normal tracking-[-2px] md:tracking-[-4px] text-foreground"
          style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
        >
          Work
        </h2>
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
                className="group flex justify-between items-center py-5 px-2 hover:px-4 hover:bg-foreground/3 transition-all rounded-lg"
              >
                <div className="flex items-center gap-4 md:gap-5">
                  <span className="text-sm text-foreground/20 font-mono w-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        project.status === "in-progress"
                          ? project.accentColor
                          : "transparent",
                    }}
                  />
                  <h4 className="text-base md:text-lg font-normal text-foreground tracking-[-0.5px]">
                    {project.title}
                  </h4>
                </div>
                <div className="flex items-center gap-4 md:gap-7.5">
                  <span className="text-xs text-foreground/40 hidden md:block">
                    {project.tag}
                  </span>
                  <span className="text-xs text-foreground/40 hidden md:block">
                    {project.period}
                  </span>
                  <span className="text-base text-foreground/30 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
