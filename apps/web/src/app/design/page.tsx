import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
  TOKEN_GROUPS,
  isMigrated,
} from "@/models/design-system-data";
import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";

export const metadata: Metadata = {
  title: "Design System | Dalre",
  description: " 디자인 시스템 — design-system",
};

export default function DesignPage() {
  const totalCount = ALL_COMPONENTS.length;
  const mineCount = ALL_COMPONENTS.filter((c) => c.mine).length;
  const migratedCount = ALL_COMPONENTS.filter(
    (c) => !c.mine && isMigrated(c.slug),
  ).length;

  return (
    <ViewTransition
      enter={{ "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", default: "none" }}
      default="none"
    >
    <div className="pt-30 px-5 md:px-15 pb-25 max-w-screen-2xl mx-auto w-full">
      <div className="mb-16 border-b border-foreground/10 pb-15">
        <p className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-4">
          Design System
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-0">
          <div>
            <h1
              className="font-normal tracking-[-2px] md:tracking-[-4px] text-foreground leading-none mb-6"
              style={{ fontSize: "clamp(36px, 7vw, 80px)" }}
            >
              design-system
            </h1>
            <p className="text-base text-foreground/60 max-w-2xl leading-[1.8] break-keep">
              <Link
                href="https://www.krds.go.kr/html/site/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-primary transition-colors font-medium"
              >
                KRDS
              </Link>{" "}
              및 접근성(WAI-ARIA)을 기반으로 구현된 {totalCount}종의 UI
              컴포넌트.
              <br /> Turborepo 모노레포 내 독립 패키지로 분리되어 사내 5개 이상
              프로젝트에서 재사용 중입니다.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <span className="inline-flex items-center gap-2 text-xs text-foreground/50">
                <span className="w-2 h-2 rounded-full bg-primary" />
                직접 설계·구현 {mineCount}종
              </span>
              <span className="inline-flex items-center gap-2 text-xs text-foreground/50">
                <span className="w-2 h-2 rounded-full border-[1.5px] border-foreground/40" />
                v2.0 재설계·마이그 {migratedCount}종
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* UX/DX 기여 — 디자인 너머의 설계 */}
      <div className="mb-16 border-l-2 border-primary/40 pl-5 md:pl-7">
        <p className="text-[11px] tracking-[2px] uppercase text-primary/80 font-medium mb-3">
          Design → Development
        </p>
        <p className="text-[15px] md:text-base text-foreground/75 leading-[1.85] max-w-3xl break-keep">
          디자인 시안은 정적인 UI를 정의하지만, 실제 사용성은 그 사이의 상태와
          흐름에서 결정된다. 로딩·에러·빈 값·비활성 같은 상태 전이, 키보드·스크린리더
          접근성, 입력 중 커서·포커스 이동, 그리고 사용처가 흔들리지 않는 API
          설계까지 — UI 너머의 UX/DX는 구현 단계에서 직접 설계했다. 각 컴포넌트의{" "}
          <span className="text-foreground font-medium">설계 노트</span>에 그
          의사결정을 정리했다.
        </p>
      </div>

      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-sm font-semibold tracking-[2px] uppercase text-foreground/50">
            Library
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Components", value: totalCount },
            { label: "Designed", value: mineCount },
            { label: "Categories", value: COMPONENT_GROUPS.length },
            { label: "Adopted", value: "5+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-[10px] border border-foreground/10 bg-foreground/2"
            >
              <p className="text-[11px] tracking-[2px] uppercase text-foreground/40 mb-2">
                {stat.label}
              </p>
              <p
                className="font-normal tracking-[-1px] text-foreground"
                style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-6 border-b border-foreground/10 pb-4">
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-normal tracking-[-0.5px] text-foreground">
              Tokens & Infra
            </h2>
            <span className="text-xs text-foreground/40 font-mono">
              {TOKEN_GROUPS.length}
            </span>
          </div>
          <p className="text-xs text-foreground/40">
            컴포넌트 위에 깔린 토큰·유틸 레이어
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TOKEN_GROUPS.map((group) => (
            <div
              key={group.name}
              className="p-5 rounded-[10px] border border-foreground/10"
            >
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-[15px] font-medium text-foreground">
                  {group.name}
                </p>
                <span className="text-[11px] text-foreground/40">
                  {group.desc}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-[12px] text-foreground/55 leading-[1.6] pl-3 relative"
                  >
                    <span className="absolute left-0 top-[9px] w-1 h-1 rounded-full bg-foreground/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

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
              {group.components.map((comp) => {
                const hasV2 = isMigrated(comp.slug);
                const kind = comp.mine
                  ? "original"
                  : hasV2
                    ? "migrated"
                    : null;

                return (
                  <Link
                    key={comp.slug}
                    href={`/design/${comp.slug}`}
                    transitionTypes={["nav-forward"]}
                    className={[
                      "group relative p-5 rounded-[10px] border transition-all",
                      kind === "original"
                        ? "border-primary/25 bg-primary/3 hover:border-primary/50 hover:bg-primary/6"
                        : kind === "migrated"
                          ? "border-foreground/15 bg-foreground/3 hover:border-foreground/30 hover:bg-foreground/5"
                          : "border-foreground/8 hover:border-foreground/20 hover:bg-foreground/2",
                    ].join(" ")}
                  >
                    {kind === "original" && (
                      <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                    {kind === "migrated" && (
                      <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full border-[1.5px] border-foreground/40" />
                    )}
                    <p
                      className={[
                        "text-[15px] lg:text-base font-normal tracking-[-0.3px] mb-1.5 transition-colors",
                        kind === "original"
                          ? "text-primary"
                          : kind === "migrated"
                            ? "text-foreground/80"
                            : "text-foreground group-hover:text-foreground/70",
                      ].join(" ")}
                    >
                      {comp.name}
                    </p>
                    <p className="text-[12px] lg:text-[13px] text-foreground/40 leading-[1.5]">
                      {comp.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
    </ViewTransition>
  );
}
