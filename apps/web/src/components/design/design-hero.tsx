import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
} from "@/models/design-system-data";
import { SYSTEM_TOPICS } from "@/models/design-topics";
import Link from "next/link";

const STATS = [
  { label: "Components", value: ALL_COMPONENTS.length },
  { label: "Categories", value: COMPONENT_GROUPS.length },
  { label: "Topics", value: SYSTEM_TOPICS.length },
];

export function DesignHero() {
  return (
    <div className="mb-16 border-b border-foreground/10 pb-15">
      <h1
        className="font-normal tracking-[-2px] md:tracking-[-4px] text-foreground leading-none mb-6"
        style={{ fontSize: "clamp(36px, 7vw, 80px)" }}
      >
        Design System
      </h1>
      <p className="text-base text-foreground/60 max-w-2xl leading-[1.8]">
        <Link
          href="https://www.krds.go.kr/html/site/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-primary transition-colors font-medium"
        >
          KRDS
        </Link>
        와 접근성(KWCAG 2.2 · WAI-ARIA)을 기준으로 만든 UI 컴포넌트.
        <br />
        2026년 상반기에 개발표준 프레임워크의 공용 디자인시스템 v2.0으로 개편한
        뒤, 레포마다 복사해 가던 폴더를 설치형 패키지로 분리해 사내 여러
        프로젝트가 같은 패키지를 설치해 쓰고 있습니다. 위는 그 과정에서 내린
        판단, 아래는 컴포넌트별 개요와 설계 노트입니다.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10 max-w-xl">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-[10px] border border-foreground/10 bg-foreground/2 last:col-span-2 sm:last:col-span-1"
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
  );
}
