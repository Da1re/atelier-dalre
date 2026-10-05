import { SYSTEM_TOPICS } from "@/models/design-topics";
import Link from "next/link";

export function DesignTopicSteps() {
  return (
    <ol className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
      {SYSTEM_TOPICS.map((topic, i) => (
        <li key={topic.slug}>
          <Link
            href={`/design/system/${topic.slug}`}
            className="group flex items-start gap-4 py-4 px-2 hover:px-4 hover:bg-foreground/3 rounded-lg transition-all"
          >
            <span className="text-[11px] font-mono text-foreground/30 pt-1 w-5 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold tracking-[2px] uppercase text-primary mb-1">
                {topic.eyebrow}
              </p>
              <h4 className="text-[15px] md:text-base font-medium tracking-[-0.3px] text-foreground mb-1 group-hover:opacity-70 transition-opacity">
                {topic.title}
              </h4>
              <p className="text-[12px] text-foreground/50 leading-[1.6] line-clamp-2 text-pretty">
                {topic.summary}
              </p>
            </div>
            <span className="text-sm text-foreground/30 pt-1 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
