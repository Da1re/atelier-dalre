import { AdjacentNav } from "@/components/design/adjacent-nav";
import { DesignNoteList } from "@/components/design/design-note-list";
import { StatusBadge } from "@/components/design/status-badge";
import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
  getComponentBadges,
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
  return { title: `${comp.name} | Design System`, description: comp.desc };
}

const toAdjacent = (slug: string, offset: number) => {
  const idx = ALL_COMPONENTS.findIndex((c) => c.slug === slug);
  const target = ALL_COMPONENTS[idx + offset];
  if (!target) return null;
  return {
    href: `/design/${target.slug}`,
    name: target.name,
    desc: target.desc,
  };
};

export default async function DesignDetailPage({ params }: Props) {
  const { slug } = await params;
  const comp = getComponentBySlug(slug);
  if (!comp) notFound();

  const doc = getComponentDoc(slug);
  const badges = getComponentBadges(comp);
  const groupOf = COMPONENT_GROUPS.find((g) =>
    g.components.some((c) => c.slug === slug),
  );

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", default: "none" }}
      exit={{ "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="pt-30 px-5 md:px-15 pb-25 max-w-screen-2xl mx-auto w-full">
        <div className="mb-10">
          <Link
            href="/design"
            transitionTypes={["nav-back"]}
            className="text-[13px] text-foreground/40 hover:text-foreground transition-colors"
          >
            ← Design System 목록으로
          </Link>
        </div>

        <div className="border-b border-foreground/10 pb-12 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {groupOf && (
              <span className="text-[11px] tracking-[2px] uppercase text-foreground/40 font-medium">
                {groupOf.category}
              </span>
            )}
            {badges.map((b) => (
              <StatusBadge key={b} kind={b} />
            ))}
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
          {comp.statusNote && (
            <p className="text-sm text-foreground/45 mt-3">{comp.statusNote}</p>
          )}
        </div>

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
                {doc.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2.5 text-[14px] text-foreground/75 leading-[1.6]"
                  >
                    <span className="block w-1 h-1 rounded-full bg-foreground/30 mt-2.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        <DesignNoteList notes={doc?.designNotes ?? []} />

        <AdjacentNav prev={toAdjacent(slug, -1)} next={toAdjacent(slug, 1)} />
      </div>
    </ViewTransition>
  );
}
