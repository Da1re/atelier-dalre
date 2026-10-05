import type { Project } from "@/models/project";
import Link from "next/link";

interface CarouselSlideProps {
  project: Project;
  index: number;
  total: number;
}

export function CarouselSlide({ project, index, total }: CarouselSlideProps) {
  const isDark = !!project.textColor;
  const fg = project.textColor ?? "var(--foreground)";
  const fgMuted = isDark
    ? "rgba(255,255,255,0.6)"
    : "color-mix(in srgb, var(--foreground) 60%, transparent)";
  const fgSubtle = isDark
    ? "rgba(255,255,255,0.4)"
    : "color-mix(in srgb, var(--foreground) 40%, transparent)";
  const chipBorder = isDark
    ? "rgba(255,255,255,0.3)"
    : "color-mix(in srgb, var(--foreground) 25%, transparent)";
  const keywords = project.retroKeywords?.slice(0, 2) ?? [];
  const position = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-roledescription="slide"
      aria-label={`${index + 1} / ${total} ${project.title}`}
      className="group relative w-full shrink-0 snap-start flex flex-col justify-between min-h-80 md:min-h-128 p-6 md:p-12 overflow-hidden"
      style={{ backgroundColor: project.coverColor }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-lg h-lg rounded-full blur-3xl opacity-30"
        style={{
          background: `radial-gradient(closest-side, ${project.accentColor}, transparent)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="text-[10px] font-semibold tracking-[2px] uppercase px-3 py-1 rounded-full border"
            style={{ borderColor: chipBorder, color: fg }}
          >
            {project.tag}
          </span>
          {project.status === "in-progress" && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary text-white">
              진행중
            </span>
          )}
        </div>
        <span className="text-xs font-mono shrink-0" style={{ color: fgSubtle }}>
          {position}
        </span>
      </div>

      <div className="relative mt-auto pt-10">
        <p className="text-xs mb-3" style={{ color: fgSubtle }}>
          {project.period} · {project.company}
        </p>
        <h3
          className="font-normal tracking-[-1px] md:tracking-[-3px] leading-[1.02] mb-4 group-hover:opacity-70 transition-opacity"
          style={{ color: fg, fontSize: "clamp(30px, 5.5vw, 72px)" }}
        >
          {project.title}
        </h3>
        <p
          className="text-base md:text-lg leading-[1.6] max-w-2xl mb-5"
          style={{ color: fgMuted }}
        >
          {project.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full border"
              style={{ borderColor: chipBorder, color: fg }}
            >
              {kw}
            </span>
          ))}
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/60 dark:bg-foreground/10"
              style={{ color: fg }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <span
        aria-hidden
        className="absolute bottom-6 right-6 md:bottom-12 md:right-12 text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
        style={{ color: fgSubtle }}
      >
        ↗
      </span>
    </Link>
  );
}
