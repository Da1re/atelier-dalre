import Link from "next/link";
import {
  HERO_PROJECT,
  LARGE_PROJECTS,
  PROJECTS,
} from "@/models/project-data";
import type { Project } from "@/models/project";

export const metadata = {
  title: "Work | Dalre",
  description: "유수빈의 프로젝트 경험",
};

const getColors = (project: Project) => {
  const isDark = !!project.textColor;
  const fg = project.textColor ?? "var(--foreground)";
  const fgMuted = isDark
    ? "rgba(255,255,255,0.6)"
    : "color-mix(in srgb, var(--foreground) 60%, transparent)";
  const fgSubtle = isDark
    ? "rgba(255,255,255,0.4)"
    : "color-mix(in srgb, var(--foreground) 40%, transparent)";
  const tagBg = isDark
    ? "rgba(255,255,255,0.15)"
    : "color-mix(in srgb, white 60%, transparent)";
  return { isDark, fg, fgMuted, fgSubtle, tagBg };
};

export default function WorkPage() {
  return (
    <div className="pt-30 px-5 md:px-15 pb-25 max-w-screen-2xl mx-auto w-full">
      {/* 페이지 헤더 */}
      <div className="mb-20">
        <h1
          className="font-normal tracking-[-3px] md:tracking-[-5px] text-foreground leading-[0.9]"
          style={{ fontSize: "clamp(56px, 10vw, 100px)" }}
        >
          Work
        </h1>
        <p className="text-xl text-foreground/50 mt-5">
          {PROJECTS.length}개의 프로젝트 — 프론트엔드 개발자로서의 기록
        </p>
      </div>

      {/* HERO 카드 */}
      {HERO_PROJECT && (
        <div className="mb-5">
          <h2 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-6">
            Highlight
          </h2>
          {(() => {
            const c = getColors(HERO_PROJECT);
            return (
              <Link
                href={`/work/${HERO_PROJECT.slug}`}
                className="group relative rounded-[10px] overflow-hidden flex flex-col justify-between p-6 md:p-12 pt-7 md:pt-14 cursor-pointer min-h-80 md:min-h-[28rem]"
                style={{ backgroundColor: HERO_PROJECT.coverColor }}
              >
                {/* 상단 액센트 스트라이프 */}
                <span className="absolute top-0 left-0 right-0 h-1 bg-foreground" />

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
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: c.tagBg, color: c.fg }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  className="absolute top-6 right-6 md:top-10 md:right-10 text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  style={{ color: c.fgSubtle }}
                >
                  ↗
                </span>
              </Link>
            );
          })()}
        </div>
      )}

      {/* LARGE 2-col 그리드 */}
      {LARGE_PROJECTS.length > 0 && (
        <div className="mb-20">
          <h2 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-6">
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LARGE_PROJECTS.map((project) => {
              const c = getColors(project);
              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group relative rounded-[10px] overflow-hidden min-h-80 md:min-h-95 flex flex-col justify-between p-6 md:p-10 cursor-pointer"
                  style={{ backgroundColor: project.coverColor }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-semibold tracking-[2px] uppercase"
                        style={{ color: c.fgMuted }}
                      >
                        {project.tag}
                      </span>
                      {project.status === "in-progress" && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary text-white">
                          진행중
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: c.fgSubtle }}>
                      {project.period} · {project.company}
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-xl md:text-3xl font-normal tracking-[-0.5px] md:tracking-[-1.5px] leading-[1.1] mb-2.5 group-hover:opacity-70 transition-opacity"
                      style={{ color: c.fg }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm leading-[1.6] mb-5"
                      style={{ color: c.fgMuted }}
                    >
                      {project.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-semibold px-2.5 py-0.75 rounded-full"
                          style={{ backgroundColor: c.tagBg, color: c.fg }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span
                    className="absolute top-6 right-6 md:top-10 md:right-10 text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    style={{ color: c.fgSubtle }}
                  >
                    ↗
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 전체 프로젝트 — 게시판형 */}
      <div>
        <h2 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-6">
          All Projects
        </h2>
        <ul className="border-t border-foreground/10">
          {PROJECTS.map((project, i) => (
            <li key={project.slug} className="border-b border-foreground/10">
              <Link
                href={`/work/${project.slug}`}
                className="group flex items-center justify-between py-6 hover:px-3 transition-all"
              >
                <div className="flex items-center gap-6">
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
                  <div>
                    <h3 className="text-xl font-normal text-foreground tracking-[-0.5px]">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-foreground/40 mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-xs text-foreground/40 hidden md:block">
                    {project.tag}
                  </span>
                  <span className="text-xs text-foreground/40 hidden md:block">
                    {project.period}
                  </span>
                  <span className="text-xs font-semibold text-foreground/40">
                    기여도 {project.contribution}
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
    </div>
  );
}
