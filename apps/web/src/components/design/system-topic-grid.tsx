import { SYSTEM_TOPICS } from "@/models/design-topics";
import Link from "next/link";

export function SystemTopicGrid() {
  return (
    <div className="mb-24">
      <div className="flex items-baseline justify-between mb-6 border-b border-foreground/10 pb-4">
        <div className="flex items-baseline gap-4">
          <h2 className="text-2xl font-normal tracking-[-0.5px] text-foreground">
            System
          </h2>
          <span className="text-xs text-foreground/40 font-mono">
            {SYSTEM_TOPICS.length}
          </span>
        </div>
        <p className="text-xs text-foreground/40">
          패키지화하면서 내린 판단과 배운 것
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {SYSTEM_TOPICS.map((topic) => (
          <Link
            key={topic.slug}
            href={`/design/system/${topic.slug}`}
            transitionTypes={["nav-forward"]}
            className="group flex flex-col justify-between gap-6 p-6 rounded-[14px] border border-primary/20 bg-primary/3 hover:border-primary/50 hover:bg-primary/6 transition-all min-h-56"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-[2px] uppercase text-primary mb-3">
                {topic.eyebrow}
              </p>
              <h3 className="text-lg font-medium tracking-[-0.3px] text-foreground mb-2">
                {topic.title}
              </h3>
              <p className="text-[13px] text-foreground/55 leading-[1.7]">
                {topic.summary}
              </p>
            </div>
            <ul className="flex flex-col gap-1.5">
              {topic.notes.slice(0, 2).map((note) => (
                <li
                  key={note.title}
                  className="text-[12px] text-foreground/45 pl-3 relative truncate"
                >
                  <span className="absolute left-0 top-1.75 w-1 h-1 rounded-full bg-foreground/30" />
                  {note.title}
                </li>
              ))}
              <li className="text-[12px] text-foreground/35 pl-3">
                노트 {topic.notes.length}개 →
              </li>
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
}
