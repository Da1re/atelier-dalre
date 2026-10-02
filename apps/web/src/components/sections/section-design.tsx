import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
  type DesignComponent,
} from "@/models/design-system-data";
import { SYSTEM_TOPICS } from "@/models/design-topics";
import Link from "next/link";

const FEATURED_SLUGS = ["button", "infobox", "modal", "select"];

const FEATURED: DesignComponent[] = FEATURED_SLUGS.map((slug) =>
  ALL_COMPONENTS.find((c) => c.slug === slug),
).filter((c): c is DesignComponent => !!c);

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
          href="/design"
          className="md:col-span-3 group relative rounded-[10px] border border-foreground/10 p-6 md:p-10 flex flex-col justify-between min-h-72 md:min-h-100 overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:z-10"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--foreground) 4%, transparent)",
          }}
        >
          <div>
            <span className="text-[10px] font-semibold tracking-[3px] uppercase text-primary">
              ★ Internal · Package
            </span>
            <p className="text-xs font-semibold tracking-[2px] uppercase text-foreground/60 mt-3">
              KRDS · KWCAG 2.2
            </p>
          </div>
          <div>
            <h3
              className="font-normal tracking-[-1px] md:tracking-[-3px] leading-[1.05] mb-4 text-foreground group-hover:opacity-70 transition-opacity"
              style={{ fontSize: "clamp(28px, 5vw, 56px)" }}
            >
              design-system
            </h3>
            <p className="text-sm md:text-lg leading-[1.6] max-w-2xl text-foreground/70 mb-6">
              레포마다 복사해 가던 디자인시스템을 설치형 패키지로 분리했다.
              <br />
              설계 판단, 문제 해결, 운영까지 그 과정의 기록.
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
        </Link>

        <div className="md:col-span-2 flex flex-col gap-3">
          <ul className="flex flex-wrap gap-2">
            {SYSTEM_TOPICS.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/design/system/${topic.slug}`}
                  className="inline-flex items-center text-[12px] px-3 py-1.5 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-background transition-colors"
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-2.5 md:gap-3 flex-1">
            {FEATURED.map((comp) => (
              <Link
                key={comp.slug}
                href={`/design/${comp.slug}`}
                className="group relative rounded-[10px] border border-foreground/10 bg-foreground/3 p-4 md:p-5 hover:border-foreground/25 hover:bg-foreground/6 transition-all flex flex-col justify-between min-h-32"
              >
                <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-foreground/30" />
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-foreground/40">
                  Component
                </span>
                <div>
                  <p className="text-[15px] md:text-base font-normal tracking-[-0.3px] text-foreground mb-1">
                    {comp.name}
                  </p>
                  <p className="text-[11px] md:text-[12px] text-foreground/50 leading-normal">
                    {comp.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
