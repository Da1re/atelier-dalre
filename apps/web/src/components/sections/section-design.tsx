import Link from "next/link";
import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
} from "@/models/design-system-data";

const FEATURED_SLUGS = [
  "text-input",
  "button",
  "range-date-picker",
  "modal",
];

const FEATURED = FEATURED_SLUGS
  .map((slug) => ALL_COMPONENTS.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => !!c);

const STATS = {
  components: ALL_COMPONENTS.length,
  designed: ALL_COMPONENTS.filter((c) => c.mine).length,
  categories: COMPONENT_GROUPS.length,
};

export const SectionDesign = () => {
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
        <div className="md:col-span-3 relative">
        <Link
          href="/design"
          className="group relative rounded-[10px] border border-foreground/10 p-6 md:p-10 flex flex-col justify-between min-h-72 md:min-h-100 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:z-10"
          style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 4%, transparent)" }}
        >
          <div>
            <span className="text-[10px] font-semibold tracking-[3px] uppercase text-primary">
              ★ Design System · KRDS
            </span>
            <p className="text-xs font-semibold tracking-[2px] uppercase text-foreground/60 mt-3">
              KRDS · WAI-ARIA
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
              Turborepo 독립 패키지로 분리해
              <br />
              사내 5개 이상 프로젝트에서 재사용 중인 UI 컴포넌트 라이브러리.
            </p>
            <div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-4">
              <div>
                <p className="text-[11px] tracking-[2px] uppercase text-foreground/40 mb-1">
                  Components
                </p>
                <p className="text-2xl md:text-3xl font-normal tracking-[-1px] text-foreground">
                  {STATS.components}
                </p>
              </div>
              <div>
                <p className="text-[11px] tracking-[2px] uppercase text-foreground/40 mb-1">
                  Designed
                </p>
                <p className="text-2xl md:text-3xl font-normal tracking-[-1px] text-foreground">
                  {STATS.designed}
                </p>
              </div>
              <div>
                <p className="text-[11px] tracking-[2px] uppercase text-foreground/40 mb-1">
                  Categories
                </p>
                <p className="text-2xl md:text-3xl font-normal tracking-[-1px] text-foreground">
                  {STATS.categories}
                </p>
              </div>
            </div>
          </div>

        </Link>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-2.5 md:gap-3">
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
    </section>
  );
};
