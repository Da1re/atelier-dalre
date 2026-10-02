import { CASES } from "./cases";
import { OPERATIONS } from "./operations";
import { PRACTICE } from "./practice";
import { PRINCIPLES } from "./principles";
import type { SystemTopic, SystemTopicSlug } from "./types";
import { WHY_PACKAGE } from "./why-package";

export type { SystemTopic, SystemTopicSlug } from "./types";

// 허브·메가메뉴·이전/다음 네비가 모두 이 순서를 따른다
export const SYSTEM_TOPICS: SystemTopic[] = [
  WHY_PACKAGE,
  PRINCIPLES,
  CASES,
  OPERATIONS,
  PRACTICE,
];

export const getTopicBySlug = (slug: string) =>
  SYSTEM_TOPICS.find((t) => t.slug === slug);

export function getAdjacentTopics(slug: SystemTopicSlug) {
  const idx = SYSTEM_TOPICS.findIndex((t) => t.slug === slug);
  const prev = idx > 0 ? SYSTEM_TOPICS[idx - 1] : null;
  const next = idx < SYSTEM_TOPICS.length - 1 ? SYSTEM_TOPICS[idx + 1] : null;
  return { prev, next };
}
