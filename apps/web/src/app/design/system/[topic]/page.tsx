import { AdjacentNav } from "@/components/design/adjacent-nav";
import { DesignNoteList } from "@/components/design/design-note-list";
import { RelatedComponents } from "@/components/design/related-components";
import {
  SYSTEM_TOPICS,
  getAdjacentTopics,
  getTopicBySlug,
  type SystemTopic,
} from "@/models/design-topics";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

export function generateStaticParams() {
  return SYSTEM_TOPICS.map((t) => ({ topic: t.slug }));
}

interface Props {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const found = getTopicBySlug(topic);
  if (!found) return { title: "Design System | Dalre" };
  return {
    title: `${found.title} | Design System`,
    description: found.summary,
  };
}

const toAdjacent = (topic: SystemTopic | null) => {
  if (!topic) return null;
  return {
    href: `/design/system/${topic.slug}`,
    name: topic.title,
    desc: topic.eyebrow,
  };
};

export default async function SystemTopicPage({ params }: Props) {
  const { topic } = await params;
  const found = getTopicBySlug(topic);
  if (!found) notFound();

  const { prev, next } = getAdjacentTopics(found.slug);

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
          <p className="text-[11px] tracking-[2px] uppercase text-primary font-semibold mb-4">
            System · {found.eyebrow}
          </p>
          <h1
            className="font-normal tracking-[-2px] md:tracking-[-4px] text-foreground leading-none mb-5"
            style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            {found.title}
          </h1>
          <p className="text-base md:text-lg text-foreground/60 leading-[1.7] max-w-3xl">
            {found.summary}
          </p>
        </div>

        <DesignNoteList notes={found.notes} heading="노트" eyebrow="Notes" />

        <RelatedComponents slugs={found.relatedComponents} />

        <AdjacentNav prev={toAdjacent(prev)} next={toAdjacent(next)} />
      </div>
    </ViewTransition>
  );
}
