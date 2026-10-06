import type { Project } from "@/models/project";
import Link from "next/link";

const CREAM = "#fcf5ef";
const DEEP_GREEN = "#4d7a3a";
const INK = "var(--ink)";

interface SlideTone {
  bg: string;
  fg: string;
  border: string;
  pillBg: string;
  pillFg: string;
}

const TONES: SlideTone[] = [
  {
    bg: CREAM,
    fg: INK,
    border: "currentColor",
    pillBg: DEEP_GREEN,
    pillFg: CREAM,
  },
  { bg: INK, fg: CREAM, border: "transparent", pillBg: CREAM, pillFg: INK },
  {
    bg: DEEP_GREEN,
    fg: CREAM,
    border: "transparent",
    pillBg: CREAM,
    pillFg: DEEP_GREEN,
  },
  {
    bg: "#bfcfae",
    fg: INK,
    border: "transparent",
    pillBg: DEEP_GREEN,
    pillFg: CREAM,
  },
  {
    bg: "var(--accent)",
    fg: INK,
    border: "transparent",
    pillBg: DEEP_GREEN,
    pillFg: CREAM,
  },
];

interface CarouselSlideProps {
  project: Project;
  index: number;
  total: number;
}

export function CarouselSlide({ project, index, total }: CarouselSlideProps) {
  const tone = TONES[index % TONES.length];
  const keywords = project.retroKeywords?.slice(0, 2) ?? [];
  const position = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-roledescription="slide"
      aria-label={`${index + 1} / ${total} ${project.title}`}
      className="group relative w-full shrink-0 snap-start flex flex-col justify-between min-h-80 md:min-h-128 p-6 md:p-12 rounded-[28px] border-[1.5px] overflow-hidden cursor-pointer"
      style={{
        backgroundColor: tone.bg,
        color: tone.fg,
        borderColor: tone.border,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold tracking-[2px] uppercase px-3 py-1 rounded-full border border-current/35">
            {project.tag}
          </span>
          {project.status === "in-progress" && (
            <span
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: tone.pillBg, color: tone.pillFg }}
            >
              진행중
            </span>
          )}
        </div>
        <span className="text-xs font-mono shrink-0 opacity-60">
          {position}
        </span>
      </div>

      <div className="mt-auto pt-10">
        <p className="font-mono text-xs mb-3 opacity-70">
          {project.period} · {project.company}
        </p>
        <h3
          className="font-normal tracking-[-1px] md:tracking-[-3px] leading-[1.02] mb-4 transition-opacity group-hover:opacity-70"
          style={{ fontSize: "clamp(30px, 5.5vw, 72px)" }}
        >
          {project.title}
        </h3>
        <p className="text-base md:text-lg leading-[1.6] max-w-2xl mb-6 opacity-75">
          {project.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 pt-5 pr-10 border-t-[1.5px] border-current">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-current/35"
            >
              {kw}
            </span>
          ))}
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-current/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <span
        aria-hidden
        className="absolute bottom-6 right-6 md:bottom-12 md:right-12 text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        ↗
      </span>
    </Link>
  );
}
