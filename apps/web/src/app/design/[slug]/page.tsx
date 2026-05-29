import { getComponentChanges } from "@/models/design-system-changes";
import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
  STORYBOOK_URL,
  getComponentBySlug,
} from "@/models/design-system-data";
import { getComponentDoc } from "@/models/design-system-docs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

export function generateStaticParams() {
  return ALL_COMPONENTS.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComponentBySlug(slug);
  if (!comp) return { title: "Design System | Dalre" };
  return {
    title: `${comp.name} | Design System`,
    description: comp.desc,
  };
}

const CATEGORY_TONES: Record<string, string> = {
  Props: "border-blue-500/20 text-blue-600 dark:text-blue-400",
  API: "border-blue-500/20 text-blue-600 dark:text-blue-400",
  A11y: "border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
  Style: "border-violet-500/20 text-violet-600 dark:text-violet-400",
  Storybook: "border-orange-500/20 text-orange-600 dark:text-orange-400",
  Migration: "border-rose-500/20 text-rose-600 dark:text-rose-400",
  Tokens: "border-amber-500/20 text-amber-600 dark:text-amber-400",
};

export default async function DesignDetailPage({ params }: Props) {
  const { slug } = await params;
  const comp = getComponentBySlug(slug);
  if (!comp) notFound();

  const v2 = getComponentChanges(slug);
  const doc = getComponentDoc(slug);
  const groupOf = COMPONENT_GROUPS.find((g) =>
    g.components.some((c) => c.slug === slug),
  );

  // 이전 / 다음 컴포넌트
  const idx = ALL_COMPONENTS.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? ALL_COMPONENTS[idx - 1] : null;
  const next =
    idx < ALL_COMPONENTS.length - 1 ? ALL_COMPONENTS[idx + 1] : null;

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", default: "none" }}
      exit={{ "nav-back": "nav-back", default: "none" }}
      default="none"
    >
    <div className="pt-30 px-5 md:px-15 pb-25 max-w-screen-2xl mx-auto w-full">
      {/* 뒤로 */}
      <div className="mb-10">
        <Link
          href="/design"
          transitionTypes={["nav-back"]}
          className="text-[13px] text-foreground/40 hover:text-foreground transition-colors"
        >
          ← Design System 목록으로
        </Link>
      </div>

      {/* 헤더 */}
      <div className="border-b border-foreground/10 pb-12 mb-12">
        <div className="flex items-center gap-3 mb-4">
          {groupOf && (
            <span className="text-[11px] tracking-[2px] uppercase text-foreground/40 font-medium">
              {groupOf.category}
            </span>
          )}
          {comp.mine ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              original
            </span>
          ) : v2 ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-foreground/5 text-foreground/70 border border-foreground/15">
              <span className="w-1.5 h-1.5 rounded-full border-[1.5px] border-foreground/40" />
              migrated
            </span>
          ) : null}
        </div>

        <h1
          className="font-normal tracking-[-2px] md:tracking-[-4px] text-foreground leading-none mb-4"
          style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
        >
          {comp.name}
        </h1>
        <p className="text-base md:text-lg text-foreground/60 leading-[1.6]">
          {comp.desc}
        </p>
        {v2 && (
          <p className="text-sm text-foreground/40 mt-3 font-mono">
            {v2.summary}
          </p>
        )}
      </div>

      {/* Overview + Features */}
      {doc && (
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 md:gap-16 mb-16 pb-12 border-b border-foreground/10">
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-foreground/40 font-medium mb-4">
              Overview
            </h2>
            <p className="text-[15px] md:text-base text-foreground/80 leading-[1.8]">
              {doc.overview}
            </p>
          </section>
          <section>
            <h2 className="text-[11px] tracking-[2px] uppercase text-foreground/40 font-medium mb-4">
              Features
            </h2>
            <ul className="flex flex-col gap-2.5">
              {doc.features.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-[14px] text-foreground/75 leading-[1.6]"
                >
                  <span className="text-foreground/30 mt-2.5 shrink-0">
                    <span className="block w-1 h-1 rounded-full bg-current" />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* 변경 내역 */}
      {v2 ? (
        <div className="flex flex-col gap-10 mb-16">
          <h2 className="text-[11px] tracking-[2px] uppercase text-foreground/40 font-medium">
            v2.0 Changelog
          </h2>
          {v2.changes.map((group) => (
            <section key={group.category}>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={[
                    "inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full border bg-background",
                    CATEGORY_TONES[group.category] ||
                      "border-foreground/15 text-foreground/60",
                  ].join(" ")}
                >
                  {group.category}
                </span>
                <span className="text-xs text-foreground/30 font-mono">
                  {group.items.length}건
                </span>
              </div>
              <ul className="flex flex-col gap-3 pl-1">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[15px] text-foreground/80 leading-[1.7]"
                  >
                    <span className="text-foreground/30 mt-[10px] shrink-0">
                      <span className="block w-1 h-1 rounded-full bg-current" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        doc && (
          <div className="mb-16 p-5 rounded-[10px] border border-foreground/10 bg-foreground/2">
            <p className="text-xs text-foreground/50">
              v2.0 작업 범위 외 — 별도의 변경 내역이 정리되지 않은 컴포넌트입니다.
            </p>
          </div>
        )
      )}

      {/* Storybook 링크 */}
      <a
        href={`${STORYBOOK_URL}/?path=/docs/${comp.story}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-3 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors"
      >
        Storybook 에서 보기
        <span aria-hidden>→</span>
      </a>

      {/* 이전 / 다음 네비 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-20 pt-10 border-t border-foreground/10">
        {prev ? (
          <Link
            href={`/design/${prev.slug}`}
            transitionTypes={["nav-back"]}
            className="group flex flex-col gap-1 p-5 rounded-[10px] border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/2 transition-all"
          >
            <span className="text-[11px] tracking-[2px] uppercase text-foreground/40">
              ← Previous
            </span>
            <span className="text-base text-foreground group-hover:text-primary transition-colors">
              {prev.name}
            </span>
            <span className="text-[12px] text-foreground/40">{prev.desc}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/design/${next.slug}`}
            transitionTypes={["nav-forward"]}
            className="group flex flex-col gap-1 p-5 rounded-[10px] border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/2 transition-all md:text-right"
          >
            <span className="text-[11px] tracking-[2px] uppercase text-foreground/40">
              Next →
            </span>
            <span className="text-base text-foreground group-hover:text-primary transition-colors">
              {next.name}
            </span>
            <span className="text-[12px] text-foreground/40">{next.desc}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
    </ViewTransition>
  );
}
