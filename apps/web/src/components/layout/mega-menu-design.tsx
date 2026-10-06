"use client";

import {
  ALL_COMPONENTS,
  type DesignComponent,
} from "@/models/design-system-data";
import { SYSTEM_TOPICS } from "@/models/design-topics";
import Link from "next/link";

interface MegaMenuDesignProps {
  onItemClick: () => void;
}

const FEATURED_SLUGS = ["button", "infobox", "modal", "select"];

const FEATURED: DesignComponent[] = FEATURED_SLUGS.map((slug) =>
  ALL_COMPONENTS.find((c) => c.slug === slug),
).filter((c): c is DesignComponent => !!c);

// 왼쪽 소개 열과 카드 높이·제목 크기는 Work 메가메뉴(mega-menu-work.tsx)와 같은 값을 쓴다
export function MegaMenuDesign({ onItemClick }: MegaMenuDesignProps) {
  return (
    <div className="border-t border-foreground/8 px-5 md:px-10 py-8 md:py-10">
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-3 flex flex-col justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold tracking-[3px] uppercase text-foreground/40 mb-3">
              Internal · Package
            </p>
            <h3
              className="font-normal tracking-[-1px] md:tracking-[-2px] text-foreground leading-[0.95]"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Design System
            </h3>
            <p className="text-xs text-foreground/50 mt-3 leading-[1.6]">
              KRDS · 접근성 기반. 설치형 패키지로 분리한 기록.
            </p>
          </div>
          <Link
            href="/design"
            onClick={onItemClick}
            className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[1px] uppercase text-foreground hover:opacity-60 transition-opacity self-start border-b border-foreground/30 pb-1"
          >
            모두 보기 <span aria-hidden>↗</span>
          </Link>
        </div>

        <div className="col-span-12 md:col-span-3">
          <p className="text-[10px] font-semibold tracking-[2px] uppercase text-foreground/40 mb-3">
            System
          </p>
          <ul className="flex flex-col gap-1">
            {SYSTEM_TOPICS.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/design/system/${topic.slug}`}
                  onClick={onItemClick}
                  className="group flex items-baseline justify-between gap-3 py-2 border-b border-foreground/8 hover:border-foreground/30 transition-colors"
                >
                  <span className="text-[14px] text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </span>
                  <span className="text-[10px] tracking-[1px] uppercase text-foreground/35">
                    {topic.eyebrow}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-6 @container">
          <div className="grid h-full grid-cols-2 auto-rows-fr @2xl:grid-cols-4 gap-3 md:gap-4">
          {FEATURED.map((comp) => (
            <Link
              key={comp.slug}
              href={`/design/${comp.slug}`}
              onClick={onItemClick}
              className="group relative rounded-[10px] border border-foreground/10 bg-foreground/3 hover:border-foreground/25 hover:bg-foreground/6 p-5 min-h-24 @2xl:min-h-52 flex flex-col justify-end @2xl:justify-between transition-all"
            >
              <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-foreground/30" />
              <span className="hidden @2xl:inline text-[10px] font-semibold tracking-[2px] uppercase text-foreground/40">
                Component
              </span>
              <div>
                <p className="text-base md:text-lg font-normal tracking-[-0.5px] leading-[1.2] text-foreground mb-1.5 group-hover:opacity-70 transition-opacity">
                  {comp.name}
                </p>
                {/* 설명이 한 줄인 카드(Modal)만 이름이 내려앉지 않도록 두 줄 높이를 항상 확보한다 */}
                <p className="text-[11px] text-foreground/55 leading-normal line-clamp-2 min-h-[2lh] text-pretty">
                  {comp.desc}
                </p>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
