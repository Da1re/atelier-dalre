import type { DesignNote } from "@/models/design-system-docs";

export type SystemTopicSlug =
  | "why-package"
  | "principles"
  | "cases"
  | "operations"
  | "practice";

export interface SystemTopic {
  slug: SystemTopicSlug;
  title: string;
  /** 영문 라벨 — 카드 상단·상세 헤더 */
  eyebrow: string;
  /** 허브 카드와 상세 헤더에 쓰는 한두 문장 */
  summary: string;
  notes: DesignNote[];
  /** 관련 컴포넌트 slug — 상세 하단에 카드로 노출 */
  relatedComponents: string[];
}
