import {
  getComponentBadges,
  type ComponentBadge,
  type DesignComponent,
} from "@/models/design-system-data";
import clsx from "clsx";
import Link from "next/link";

interface ComponentCardProps {
  component: DesignComponent;
}

type CardTone = ComponentBadge | "plain";

const CARD_CLASS: Record<CardTone, string> = {
  original:
    "border-primary/25 bg-primary/3 hover:border-primary/50 hover:bg-primary/6",
  migrated:
    "border-foreground/15 bg-foreground/3 hover:border-foreground/30 hover:bg-foreground/5",
  retired:
    "border-dashed border-foreground/15 opacity-60 hover:opacity-100 hover:border-foreground/30",
  deprecated: "border-amber-500/25 bg-amber-500/3 hover:border-amber-500/50",
  plain: "border-foreground/8 hover:border-foreground/20 hover:bg-foreground/2",
};

const NAME_CLASS: Record<CardTone, string> = {
  original: "text-primary",
  migrated: "text-foreground/80",
  retired: "text-foreground/60 line-through decoration-foreground/30",
  deprecated: "text-foreground/80",
  plain: "text-foreground group-hover:text-foreground/70",
};

const DOT_CLASS: Record<ComponentBadge, string> = {
  original: "bg-primary",
  migrated: "border-[1.5px] border-foreground/40",
  retired: "bg-foreground/25",
  deprecated: "bg-amber-500/70",
};

export function ComponentCard({ component }: ComponentCardProps) {
  const badges = getComponentBadges(component);
  // 상태(retired·deprecated)가 있으면 그것이 카드 톤을 결정한다
  const tone: CardTone = component.status ?? badges[0] ?? "plain";

  return (
    <Link
      href={`/design/${component.slug}`}
      transitionTypes={["nav-forward"]}
      className={clsx(
        "group relative p-5 rounded-[10px] border transition-all",
        CARD_CLASS[tone],
      )}
    >
      <span className="absolute top-3.5 right-3.5 flex gap-1.5">
        {badges.map((b) => (
          <span
            key={b}
            className={clsx("w-1.5 h-1.5 rounded-full", DOT_CLASS[b])}
          />
        ))}
      </span>
      <p
        className={clsx(
          "text-[15px] lg:text-base font-normal tracking-[-0.3px] mb-1.5 transition-colors",
          NAME_CLASS[tone],
        )}
      >
        {component.name}
      </p>
      <p className="text-[12px] lg:text-[13px] text-foreground/40 leading-normal">
        {component.desc}
      </p>
    </Link>
  );
}
