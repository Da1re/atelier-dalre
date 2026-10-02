import { ComponentCatalog } from "@/components/design/component-catalog";
import { DesignHero } from "@/components/design/design-hero";
import { SystemTopicGrid } from "@/components/design/system-topic-grid";
import type { Metadata } from "next";
import { ViewTransition } from "react";

export const metadata: Metadata = {
  title: "Design System | Dalre",
  description:
    "사내 디자인시스템을 설치형 패키지로 분리하며 내린 설계 판단과 컴포넌트별 설계 노트",
};

export default function DesignPage() {
  return (
    <ViewTransition
      enter={{ "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", default: "none" }}
      default="none"
    >
      <div className="pt-30 px-5 md:px-15 pb-25 max-w-screen-2xl mx-auto w-full">
        <DesignHero />
        <SystemTopicGrid />
        <ComponentCatalog />
      </div>
    </ViewTransition>
  );
}
