"use client";

import Link from "next/link";
import { PROJECTS } from "@/models/project-data";
import type { Project } from "@/models/project";

interface Props {
  onItemClick: () => void;
}

const PREVIEW_SLUGS = [
  "gwacheon-science",
  "incheon-education",
  "ai-chat-streaming",
];

const PREVIEW_PROJECTS: Project[] = PREVIEW_SLUGS.map((slug) =>
  PROJECTS.find((p) => p.slug === slug),
).filter((p): p is Project => !!p);

export const MegaMenuWork = ({ onItemClick }: Props) => {
  return (
    <div className="border-t border-foreground/8 px-5 md:px-10 py-8 md:py-10">
      <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[3px] uppercase text-foreground/40 mb-3">
                Selected Work
              </p>
              <h3
                className="font-normal tracking-[-1px] md:tracking-[-2px] text-foreground leading-[0.95]"
                style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
              >
                Work
              </h3>
              <p className="text-xs text-foreground/50 mt-3 leading-[1.6]">
                프론트엔드 개발자로서의 기록.
              </p>
            </div>
            <Link
              href="/work"
              onClick={onItemClick}
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[1px] uppercase text-foreground hover:opacity-60 transition-opacity self-start border-b border-foreground/30 pb-1"
            >
              모두 보기 <span aria-hidden>↗</span>
            </Link>
          </div>

          <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {PREVIEW_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                onClick={onItemClick}
                className="group relative rounded-[10px] overflow-hidden p-5 min-h-44 md:min-h-52 flex flex-col justify-between transition-all duration-200 hover:scale-[1.015]"
                style={{ backgroundColor: project.coverColor }}
              >
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-foreground/50">
                  {project.tag}
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-normal tracking-[-0.5px] leading-[1.2] text-foreground mb-1.5 line-clamp-2 group-hover:opacity-70 transition-opacity">
                    {project.title}
                  </h4>
                  <p className="text-[11px] text-foreground/55 leading-normal line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>
                <span className="absolute top-4 right-4 text-sm text-foreground/30 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
  );
};
