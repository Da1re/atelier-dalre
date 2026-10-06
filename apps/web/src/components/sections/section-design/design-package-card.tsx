import { ALL_COMPONENTS, COMPONENT_GROUPS } from "@/models/design-system-data";
import { SYSTEM_TOPICS } from "@/models/design-topics";
import Link from "next/link";

const STATS = [
  { label: "Components", value: ALL_COMPONENTS.length },
  { label: "Categories", value: COMPONENT_GROUPS.length },
  { label: "Topics", value: SYSTEM_TOPICS.length },
];

export function DesignPackageCard() {
  return (
    <Link
      href="/design"
      className="md:col-span-3 group relative grid md:grid-cols-[1fr_minmax(160px,30%)] gap-8 md:gap-0 min-h-72 md:min-h-100 p-6.5 md:p-10 rounded-[28px] bg-accent text-accent-foreground cursor-pointer transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1"
    >
      <div className="flex flex-col justify-between gap-10 md:pr-10">
        <div className="pr-8 md:pr-0">
          <p className="text-[10px] font-semibold tracking-[3px] uppercase">
            <span className="text-[#4d7a3a]">★</span> Latest · Internal Package
          </p>
          <p className="text-xs font-semibold tracking-[2px] uppercase opacity-60 mt-3">
            2026.08 ~ 2026.10 · KRDS · KWCAG 2.2
          </p>
        </div>
        <div>
          <h3
            className="font-normal tracking-[-1px] md:tracking-[-3px] leading-[1.05] mb-4 transition-opacity group-hover:opacity-70"
            style={{ fontSize: "clamp(28px, 4.4vw, 56px)" }}
          >
            디자인시스템 패키지화
          </h3>
          <p className="text-sm md:text-lg leading-[1.6] opacity-75">
            레포마다 복사해 가던 디자인시스템을 설치형 패키지로 분리했다.
            <br />
            버전 태그로 배포하고 소비 프로젝트는 패키지를 설치해 쓴다.
          </p>
        </div>
      </div>

      <dl className="flex md:flex-col gap-6 md:gap-0 pt-5 md:pt-0 md:pl-8 border-t-[1.5px] md:border-t-0 md:border-l-[1.5px] border-current/25">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="md:flex-1 md:py-4 md:first:pt-0 md:border-t-[1.5px] md:first:border-t-0 border-current/25"
          >
            <dt className="text-[11px] tracking-[2px] uppercase opacity-60 mb-1">
              {stat.label}
            </dt>
            <dd className="text-2xl md:text-5xl font-normal tracking-[-1px]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <span
        aria-hidden
        className="absolute top-6.5 right-6.5 md:top-10 md:right-10 text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        ↗
      </span>
    </Link>
  );
}
