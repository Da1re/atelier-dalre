import type { ComponentBadge } from "@/models/design-system-data";
import clsx from "clsx";

interface StatusBadgeProps {
  kind: ComponentBadge;
}

// 카드 점·허브 범례·상세 배지가 같은 색과 이름을 쓰도록 여기 한 곳에서만 정의한다
export const BADGE_DOT_CLASS: Record<ComponentBadge, string> = {
  original: "bg-primary",
  migrated: "border-[1.5px] border-foreground/40",
  retired: "bg-foreground/25",
  deprecated: "bg-amber-500/70",
};

export const BADGE_LABEL: Record<ComponentBadge, string> = {
  original: "직접 설계·구현",
  migrated: "가이드 패턴으로 재설계",
  retired: "패키지화에서 제거",
  deprecated: "deprecated",
};

const BADGE_CLASS: Record<ComponentBadge, string> = {
  original: "bg-primary/10 text-primary border-primary/20",
  migrated: "bg-foreground/5 text-foreground/70 border-foreground/15",
  retired:
    "bg-foreground/5 text-foreground/45 border-foreground/10 line-through decoration-foreground/30",
  deprecated:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
};

export function StatusBadge({ kind }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border",
        BADGE_CLASS[kind],
      )}
    >
      <span
        className={clsx("w-1.5 h-1.5 rounded-full", BADGE_DOT_CLASS[kind])}
      />
      {BADGE_LABEL[kind]}
    </span>
  );
}
