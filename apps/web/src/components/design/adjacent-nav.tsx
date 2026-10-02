import Link from "next/link";

export interface AdjacentLink {
  href: string;
  name: string;
  desc: string;
}

interface AdjacentNavProps {
  prev: AdjacentLink | null;
  next: AdjacentLink | null;
}

const CARD_CLASS =
  "group flex flex-col gap-1 p-5 rounded-[10px] border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/2 transition-all";

export function AdjacentNav({ prev, next }: AdjacentNavProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-20 pt-10 border-t border-foreground/10">
      {prev ? (
        <Link
          href={prev.href}
          transitionTypes={["nav-back"]}
          className={CARD_CLASS}
        >
          <span className="text-[11px] tracking-[2px] uppercase text-foreground/40">
            ← Previous
          </span>
          <span className="text-base text-foreground group-hover:text-primary transition-colors">
            {prev.name}
          </span>
          <span className="text-[12px] text-foreground/40">{prev.desc}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          transitionTypes={["nav-forward"]}
          className={`${CARD_CLASS} md:text-right`}
        >
          <span className="text-[11px] tracking-[2px] uppercase text-foreground/40">
            Next →
          </span>
          <span className="text-base text-foreground group-hover:text-primary transition-colors">
            {next.name}
          </span>
          <span className="text-[12px] text-foreground/40">{next.desc}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
