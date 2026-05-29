import {
  HERO_PROJECT,
  LARGE_PROJECTS,
  LIST_PROJECTS,
  SMALL_FEATURED_PROJECTS,
} from "@/models/project-data";
import type { Project } from "@/models/project";
import Link from "next/link";

const getColors = (project: Project) => {
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
  return { isDark, fg, fgMuted, fgSubtle, tagClass };
};

const ArrowIcon = ({ color }: { color: string }) => (
  <span
    className="absolute top-6 right-6 md:top-10 md:right-10 text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
    style={{ color }}
  >
    ↗
  </span>
);

export const SectionWork = () => {
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

      {/* HERO 카드 */}
      {HERO_PROJECT && (
        <Link
          href={`/work/${HERO_PROJECT.slug}`}
          className="group relative rounded-[10px] overflow-hidden flex flex-col justify-between p-6 md:p-12 pt-7 md:pt-14 cursor-pointer min-h-80 md:min-h-[28rem] mb-4 md:mb-5"
          style={{ backgroundColor: HERO_PROJECT.coverColor }}
        >
          {/* 상단 액센트 스트라이프 */}
          <span className="absolute top-0 left-0 right-0 h-1 bg-foreground" />

          {(() => {
            const c = getColors(HERO_PROJECT);
            return (
              <>
                <div className="pr-10 md:pr-14">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-semibold tracking-[3px] uppercase text-primary">
                      ★ Featured
                    </span>
                  </div>
                  <span
                    className="text-xs font-semibold tracking-[2px] uppercase"
                    style={{ color: c.fgMuted }}
                  >
                    {HERO_PROJECT.tag}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {HERO_PROJECT.status === "in-progress" && (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary text-white">
                        진행중
                      </span>
                    )}
                    {HERO_PROJECT.heroBadge && (
                      <span
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: c.isDark
                            ? "rgba(255,255,255,0.15)"
                            : "color-mix(in srgb, var(--foreground) 8%, transparent)",
                          color: c.fg,
                        }}
                      >
                        {HERO_PROJECT.heroBadge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto">
                  <span
                    className="block text-xs mb-3"
                    style={{ color: c.fgSubtle }}
                  >
                    {HERO_PROJECT.period}
                  </span>
                  <h3
                    className="font-normal tracking-[-1px] md:tracking-[-3px] leading-[1.05] mb-4 group-hover:opacity-70 transition-opacity"
                    style={{
                      color: c.fg,
                      fontSize: "clamp(28px, 5vw, 64px)",
                    }}
                  >
                    {HERO_PROJECT.title}
                  </h3>
                  <p
                    className="text-base md:text-lg leading-[1.6] max-w-2xl"
                    style={{ color: c.fgMuted }}
                  >
                    {HERO_PROJECT.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-6">
                    {HERO_PROJECT.techStack.slice(0, 7).map((tech) => (
                      <span
                        key={tech}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${c.tagClass}`}
                        style={{ color: c.fg }}
                      >
                        {tech}
                      </span>
                    ))}
                    {HERO_PROJECT.techStack.length > 7 && (
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${c.tagClass}`}
                        style={{ color: c.fg }}
                      >
                        +{HERO_PROJECT.techStack.length - 7}
                      </span>
                    )}
                  </div>
                </div>

                <ArrowIcon color={c.fgSubtle} />
              </>
            );
          })()}
        </Link>
      )}

      {/* LARGE 2-col 그리드 */}
      {LARGE_PROJECTS.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
          {LARGE_PROJECTS.map((project) => {
            const c = getColors(project);
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
                    style={{ color: c.fgMuted }}
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
                  <span className="text-xs" style={{ color: c.fgSubtle }}>
                    {project.period}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3
                    className="text-2xl md:text-4xl font-normal tracking-[-1px] md:tracking-[-2px] leading-[1.1] mb-3 group-hover:opacity-70 transition-opacity"
                    style={{ color: c.fg }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.6]"
                    style={{ color: c.fgMuted }}
                  >
                    {project.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${c.tagClass}`}
                        style={{ color: c.fg }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${c.tagClass}`}
                        style={{ color: c.fg }}
                      >
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                <ArrowIcon color={c.fgSubtle} />
              </Link>
            );
          })}
        </div>
      )}

      {/* SMALL FEATURED 컴팩트 카드 */}
      {SMALL_FEATURED_PROJECTS.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
          {SMALL_FEATURED_PROJECTS.map((project) => {
            const c = getColors(project);
            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group relative rounded-[10px] overflow-hidden min-h-52 flex flex-col justify-between p-5 md:p-6 cursor-pointer"
                style={{ backgroundColor: project.coverColor }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="text-[11px] font-semibold tracking-[2px] uppercase"
                    style={{ color: c.fgMuted }}
                  >
                    {project.tag}
                  </span>
                  <span className="text-[11px]" style={{ color: c.fgSubtle }}>
                    {project.period}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3
                    className="text-lg md:text-xl font-normal tracking-[-0.5px] leading-[1.2] mb-2 group-hover:opacity-70 transition-opacity"
                    style={{ color: c.fg }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-xs leading-[1.55]"
                    style={{ color: c.fgMuted }}
                  >
                    {project.subtitle}
                  </p>
                </div>

                <span
                  className="absolute top-5 right-5 text-base group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  style={{ color: c.fgSubtle }}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* LIST 텍스트 리스트 */}
      {LIST_PROJECTS.length > 0 && (
        <ul className="border-t border-foreground/10">
          {LIST_PROJECTS.map((project) => (
            <li
              key={project.slug}
              className="border-b border-foreground/10"
            >
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
      )}
    </section>
  );
};
