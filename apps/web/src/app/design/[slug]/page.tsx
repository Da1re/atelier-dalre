import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
  getComponentBySlug,
  isMigrated,
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

export default async function DesignDetailPage({ params }: Props) {
  const { slug } = await params;
  const comp = getComponentBySlug(slug);
  if (!comp) notFound();

  const migrated = isMigrated(slug);
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
          ) : migrated ? (
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

      {/* 설계 노트 */}
      {doc?.designNotes && doc.designNotes.length > 0 && (
        <div className="mb-16 pb-12 border-b border-foreground/10">
          <div className="flex items-baseline gap-3 mb-8">
            <h2 className="text-[11px] tracking-[2px] uppercase text-foreground/40 font-medium">
              설계 노트
            </h2>
            <span className="text-[11px] text-foreground/30 font-mono">
              Design Decisions
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {doc.designNotes.map((note, i) => (
              <div
                key={i}
                className="rounded-[14px] border border-foreground/10 bg-foreground/2 p-6 md:p-7"
              >
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-[12px] font-semibold tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-snug">
                    {note.title}
                  </h3>
                </div>
                <p className="text-[14px] text-foreground/65 leading-[1.85]">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

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
