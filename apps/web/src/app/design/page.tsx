import { COMPONENT_GROUPS, STORYBOOK_URL } from "@/models/design-system-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System | Dalre",
  description:
    "몸·마음건강코칭통합지원시스템 디자인 시스템 — dak-design-system",
};

export default function DesignPage() {
  const totalCount = COMPONENT_GROUPS.reduce(
    (acc, g) => acc + g.components.length,
    0,
  );
  const mineCount = COMPONENT_GROUPS.reduce(
    (acc, g) => acc + g.components.filter((c) => c.mine).length,
    0,
  );

  return (
    <div className="pt-30 px-5 md:px-15 pb-25">
      {/* 헤더 */}
      <div className="mb-20 border-b border-foreground/10 pb-15">
        <p className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-4">
          Design System
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-0">
          <div>
            <h1 className="font-normal tracking-[-2px] md:tracking-[-4px] text-foreground leading-none mb-6" style={{ fontSize: "clamp(36px, 7vw, 80px)" }}>
              design-system
            </h1>
            <p className="text-base text-foreground/60 max-w-xl leading-[1.8]">
              몸·마음건강코칭통합지원시스템 전용 컴포넌트 라이브러리.
              접근성(WAI-ARIA)을 기반으로 설계한 {totalCount}종의 UI 컴포넌트.
              Turborepo 모노레포 내 독립 패키지로 분리되어 다수 서비스에서
              재사용.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-foreground/50">
                직접 설계·구현한 컴포넌트 {mineCount}종
              </span>
            </div>
          </div>
          <span className="shrink-0 flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-full border border-foreground/10 text-foreground/30 cursor-not-allowed mb-1">
            Storybook 준비중
          </span>
        </div>
      </div>

      {/* 컴포넌트 그룹 */}
      <div className="flex flex-col gap-16">
        {COMPONENT_GROUPS.map((group) => (
          <div key={group.category}>
            <div className="flex items-baseline justify-between mb-6 border-b border-foreground/10 pb-4">
              <div className="flex items-baseline gap-4">
                <h2 className="text-2xl font-normal tracking-[-0.5px] text-foreground">
                  {group.category}
                </h2>
                <span className="text-xs text-foreground/40 font-mono">
                  {group.components.length}
                </span>
              </div>
              <p className="text-xs text-foreground/40">{group.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {group.components.map((comp) => (
                <a
                  key={comp.name}
                  href={`${STORYBOOK_URL}/?path=/docs/${comp.story}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "group relative p-5 rounded-[10px] border transition-all",
                    comp.mine
                      ? "border-primary/25 bg-primary/3 hover:border-primary/50 hover:bg-primary/6"
                      : "border-foreground/8 hover:border-foreground/20 hover:bg-foreground/2",
                  ].join(" ")}
                >
                  {comp.mine && (
                    <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                  <p
                    className={[
                      "text-[15px] font-normal tracking-[-0.3px] mb-1.5 transition-colors",
                      comp.mine
                        ? "text-primary"
                        : "text-foreground group-hover:text-foreground/70",
                    ].join(" ")}
                  >
                    {comp.name}
                  </p>
                  <p className="text-[12px] text-foreground/40 leading-[1.5]">
                    {comp.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
