import { DesignTopicSteps } from "@/components/sections/section-design/design-topic-steps";
import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
} from "@/models/design-system-data";
import { SYSTEM_TOPICS } from "@/models/design-topics";
import Link from "next/link";

const STATS = [
  { label: "Components", value: ALL_COMPONENTS.length },
  { label: "Categories", value: COMPONENT_GROUPS.length },
  { label: "Topics", value: SYSTEM_TOPICS.length },
];

export function SectionDesign() {
  return (
    <section>
      <div className="flex justify-between items-end mb-10 md:mb-15 border-t border-foreground/25 pt-10">
        <h2
          className="font-normal tracking-[-2px] md:tracking-[-4px] text-foreground"
          style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
        >
          Design System
        </h2>
        <Link
          href="/design"
          className="text-sm font-semibold text-primary hover:opacity-60 transition-opacity pb-2.5"
        >
          모두 보기 →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
        <Link
          href="/work/design-system-package"
          className="md:col-span-3 group relative rounded-[10px] border border-foreground/10 p-6 md:p-10 flex flex-col justify-between min-h-72 md:min-h-100 overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:z-10"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--foreground) 4%, transparent)",
          }}
        >
          <span className="absolute top-0 left-0 right-0 h-1 bg-primary" />
          <div>
            <span className="text-[10px] font-semibold tracking-[3px] uppercase text-primary">
              ★ Latest · Internal Package
            </span>
            <p className="text-xs font-semibold tracking-[2px] uppercase text-foreground/60 mt-3">
              2026.08 – 2026.10 · KRDS · KWCAG 2.2
            </p>
          </div>
          <div>
            <h3
              className="font-normal tracking-[-1px] md:tracking-[-3px] leading-[1.05] mb-4 text-foreground group-hover:opacity-70 transition-opacity"
              style={{ fontSize: "clamp(28px, 5vw, 56px)" }}
            >
              복사가 아니라 설치
            </h3>
            <p className="text-sm md:text-lg leading-[1.6] max-w-2xl text-foreground/70 mb-6">
              레포마다 복사해 가던 디자인시스템을 설치형 패키지로 분리했다.
              <br />
              원본은 하나, 소비 프로젝트는 버전을 따라간다.
            </p>
            <div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[11px] tracking-[2px] uppercase text-foreground/40 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-normal tracking-[-1px] text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <span className="absolute top-6 right-6 md:top-10 md:right-10 text-xl text-foreground/40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
            ↗
          </span>
        </Link>

        <div className="md:col-span-2 flex flex-col gap-3">
          <p className="text-[11px] font-semibold tracking-[2px] uppercase text-foreground/40">
            패키지화하면서 내린 판단
          </p>
          <DesignTopicSteps />
          <Link
            href="/design"
            className="text-[12px] text-foreground/50 hover:text-primary transition-colors self-end"
          >
            컴포넌트 설계 노트 {ALL_COMPONENTS.length}개 →
          </Link>
        </div>
      </div>
    </section>
  );
}
