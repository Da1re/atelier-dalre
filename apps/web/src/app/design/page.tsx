import { getComponentChanges } from "@/models/design-system-changes";
import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
  STORYBOOK_URL,
  TOKEN_GROUPS,
  V2_STATS,
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
    (c) => !c.mine && getComponentChanges(c.slug),
  ).length;

  return (
    <ViewTransition
      enter={{ "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", default: "none" }}
      default="none"
    >
    <div className="pt-30 px-5 md:px-15 pb-25 max-w-screen-2xl mx-auto w-full">
      {/* 헤더 */}
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
            <p className="text-base text-foreground/60 max-w-xl leading-[1.8]">
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
              <br /> Turborepo 모노레포 내 독립 패키지로 분리되어 다수
              서비스에서 재사용했습니다.
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
          <a
            href={STORYBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-full border border-foreground/15 text-foreground hover:bg-foreground hover:text-background transition-colors mb-1"
          >
            Storybook 열기 →
          </a>
        </div>
      </div>

      {/* v2.0 통계 카드 */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-sm font-semibold tracking-[2px] uppercase text-foreground/50">
            v2.0 Migration
          </h2>
          <span className="text-[11px] text-foreground/40 font-mono">
            2025.05 — 2025.05
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Components", value: V2_STATS.components },
            { label: "Changes", value: `${V2_STATS.changes}+` },
            {
              label: "Lines Added",
              value: `+${V2_STATS.linesAdded.toLocaleString()}`,
            },
            {
              label: "Lines Removed",
              value: `−${V2_STATS.linesRemoved.toLocaleString()}`,
            },
            { label: "Commits", value: V2_STATS.commits },
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

      {/* A. Tokens & Infra */}
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
              {group.components.map((comp) => {
                const hasV2 = !!getComponentChanges(comp.slug);
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
