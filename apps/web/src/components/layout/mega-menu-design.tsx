"use client";

import Link from "next/link";
import {
  ALL_COMPONENTS,
  STORYBOOK_URL,
} from "@/models/design-system-data";

interface Props {
  onItemClick: () => void;
}

const FEATURED_OVERRIDES: Record<string, string> = {
  "text-input": "텍스트 입력",
  button: "Variant 시스템",
  "range-date-picker": "범위 날짜 선택",
  modal: "전역 모달",
};

const FEATURED = Object.keys(FEATURED_OVERRIDES)
  .map((slug) => ALL_COMPONENTS.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => !!c);

export const MegaMenuDesign = ({ onItemClick }: Props) => {
  return (
    <div className="border-t border-foreground/8 px-5 md:px-10 py-8 md:py-10">
      <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3 flex flex-col justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[3px] uppercase text-foreground/40 mb-2.5">
                Internal · Storybook
              </p>
              <h3
                className="font-normal tracking-[-1px] text-foreground leading-[0.95]"
                style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}
              >
                design-system
              </h3>
              <p className="text-xs text-foreground/50 mt-2 leading-[1.6]">
                KRDS · WAI-ARIA 기반
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Link
                href="/design"
                onClick={onItemClick}
                className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[1px] uppercase text-foreground hover:opacity-60 transition-opacity border-b border-foreground/30 pb-1"
              >
                모두 보기 <span aria-hidden>↗</span>
              </Link>
              <a
                href={STORYBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onItemClick}
                className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[1px] uppercase text-foreground hover:opacity-60 transition-opacity border-b border-foreground/30 pb-1"
              >
                Storybook <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-3">
            {FEATURED.map((comp) => (
              <Link
                key={comp.slug}
                href={`/design/${comp.slug}`}
                onClick={onItemClick}
                className="group relative rounded-[10px] border border-foreground/10 bg-foreground/3 hover:border-foreground/25 hover:bg-foreground/6 p-5 min-h-44 md:min-h-48 flex flex-col justify-between transition-all"
              >
                <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-foreground/30" />
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-foreground/40">
                  Component
                </span>
                <div>
                  <p className="text-base font-normal tracking-[-0.3px] text-foreground mb-1">
                    {comp.name}
                  </p>
                  <p className="text-[11px] text-foreground/50 leading-normal">
                    {FEATURED_OVERRIDES[comp.slug] ?? comp.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
  );
};
