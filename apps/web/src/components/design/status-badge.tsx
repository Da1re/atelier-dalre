import { AsteriskMark } from "@/components/shared/asterisk-mark";
import type { ComponentBadge } from "@/models/design-system-data";
import clsx from "clsx";

interface StatusBadgeProps {
  kind: ComponentBadge;
}

const DOT_SIZE_CLASS = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
} as const;

interface BadgeDotProps {
  kind: ComponentBadge;
  size?: keyof typeof DOT_SIZE_CLASS;
}

// 카드 점·허브 범례·상세 배지가 같은 색과 이름을 쓰도록 여기 한 곳에서만 정의한다
export const BADGE_DOT_CLASS: Record<ComponentBadge, string> = {
  original: "bg-primary",
  migrated: "border-[1.5px] border-foreground/40",
  polished: "border-[1.5px] border-dashed border-foreground/40",
  retired: "bg-foreground/25",
  deprecated: "bg-amber-500/70",
};

export const BADGE_LABEL: Record<ComponentBadge, string> = {
  original: "직접 설계·구현",
  migrated: "가이드 패턴으로 재설계",
  polished: "아이콘·UX 보강",
  retired: "패키지화에서 제거",
  deprecated: "deprecated",
};

const BADGE_CLASS: Record<ComponentBadge, string> = {
  original: "bg-primary/10 text-primary border-primary/20",
  migrated: "bg-foreground/5 text-foreground/70 border-foreground/15",
  polished:
    "bg-foreground/[0.03] text-foreground/65 border-dashed border-foreground/20",
  retired:
    "bg-foreground/5 text-foreground/45 border-foreground/10 line-through decoration-foreground/30",
  deprecated:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
};

export function BadgeDot({ kind, size = "sm" }: BadgeDotProps) {
  if (kind === "original") return <AsteriskMark size="sm" />;

  return (
    <span
      className={clsx(
        "rounded-full",
        DOT_SIZE_CLASS[size],
        BADGE_DOT_CLASS[kind],
      )}
    />
  );
}

export function StatusBadge({ kind }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border",
        BADGE_CLASS[kind],
      )}
    >
      <BadgeDot kind={kind} />
      {BADGE_LABEL[kind]}
    </span>
  );
}
