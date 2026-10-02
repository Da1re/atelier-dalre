import { COMPONENT_GROUPS } from "@/models/design-system-data";
import { ComponentCard } from "./component-card";

const LEGEND = [
  { dot: "bg-primary", label: "직접 설계·구현" },
  { dot: "border-[1.5px] border-foreground/40", label: "가이드 패턴으로 재설계" },
  { dot: "bg-foreground/25", label: "패키지화에서 제거" },
  { dot: "bg-amber-500/70", label: "deprecated" },
];

export function ComponentCatalog() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 mb-10 border-b border-foreground/10 pb-4">
        <h2 className="text-2xl font-normal tracking-[-0.5px] text-foreground">
          Components
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {LEGEND.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2 text-xs text-foreground/50"
            >
              <span className={`w-2 h-2 rounded-full ${item.dot}`} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-16">
        {COMPONENT_GROUPS.map((group) => (
          <section key={group.category}>
            <div className="flex items-baseline justify-between mb-6">
              <div className="flex items-baseline gap-4">
                <h3 className="text-xl font-normal tracking-[-0.5px] text-foreground">
                  {group.category}
                </h3>
                <span className="text-xs text-foreground/40 font-mono">
                  {group.components.length}
                </span>
              </div>
              <p className="text-xs text-foreground/40">{group.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {group.components.map((comp) => (
                <ComponentCard key={comp.slug} component={comp} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
