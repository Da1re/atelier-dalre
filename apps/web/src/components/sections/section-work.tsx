import { FEATURED_PROJECTS, OTHER_PROJECT_LIST } from "@/models/project-data";
import Link from "next/link";

export const SectionWork = () => {
  return (
    <section>
      <div className="flex justify-between items-end mb-10 md:mb-15 border-t border-foreground/25 pt-10">
        <h2 className="font-normal tracking-[-2px] md:tracking-[-4px] text-foreground" style={{ fontSize: "clamp(40px, 8vw, 80px)" }}>
          Work
        </h2>
        <Link
          href="/work"
          className="text-sm font-semibold text-primary hover:opacity-60 transition-opacity pb-2.5"
        >
          모두 보기 →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
        {FEATURED_PROJECTS.map((project) => {
          const isDark = !!project.textColor;
          const fg = project.textColor ?? "var(--foreground)";
          const fgMuted = isDark
            ? "rgba(255,255,255,0.6)"
            : "color-mix(in srgb, var(--foreground) 60%, transparent)";
          const fgSubtle = isDark
            ? "rgba(255,255,255,0.4)"
            : "color-mix(in srgb, var(--foreground) 40%, transparent)";
          const tagClass = isDark
            ? "bg-white/15 dark:bg-white/25 dark:border dark:border-white/25"
            : "bg-white/60 dark:bg-foreground/10 dark:border dark:border-foreground/20";

          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group relative rounded-[10px] overflow-hidden min-h-72 md:min-h-100 flex flex-col justify-between p-6 md:p-10 cursor-pointer"
              style={{ backgroundColor: project.coverColor }}
            >
              <div>
                <span
                  className="text-xs font-semibold tracking-[2px] uppercase"
                  style={{ color: fgMuted }}
                >
                  {project.tag}
                </span>
                {project.status === "in-progress" && (
                  <span className="block mt-1.5 w-fit text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary text-white">
                    진행중
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5 mt-2">
                <span className="text-xs" style={{ color: fgSubtle }}>
                  {project.period}
                </span>
              </div>

              <div className="mt-auto">
                <h3
                  className="text-2xl md:text-4xl font-normal tracking-[-1px] md:tracking-[-2px] leading-[1.1] mb-3 group-hover:opacity-70 transition-opacity"
                  style={{ color: fg }}
                >
                  {project.title}
                </h3>
                <p className="text-sm leading-[1.6]" style={{ color: fgMuted }}>
                  {project.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${tagClass}`}
                      style={{ color: fg }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${tagClass}`}
                      style={{ color: fg }}
                    >
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <span
                className="absolute top-6 right-6 md:top-10 md:right-10 text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                style={{ color: fgSubtle }}
              >
                ↗
              </span>
            </Link>
          );
        })}
      </div>

      <ul className="border-t border-foreground/10">
        {OTHER_PROJECT_LIST.map((project) => (
          <li key={project.slug} className="border-b border-foreground/10">
            <Link
              href={`/work/${project.slug}`}
              className="group flex justify-between items-center py-5 hover:px-2.5 transition-all"
            >
              <div className="flex items-center gap-4 md:gap-5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: project.accentColor }}
                />
                <h3 className="text-base md:text-lg font-normal text-foreground tracking-[-0.5px]">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 md:gap-7.5">
                <span className="text-xs text-foreground/40 hidden md:block">{project.tag}</span>
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
    </section>
  );
};
