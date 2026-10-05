import {
  COMPONENT_GROUPS,
  type ComponentBadge,
} from "@/models/design-system-data";
import clsx from "clsx";
import { ComponentCard } from "./component-card";
import { BADGE_DOT_CLASS, BADGE_LABEL } from "./status-badge";

const LEGEND: ComponentBadge[] = [
  "original",
  "migrated",
  "retired",
  "deprecated",
];

export function ComponentCatalog() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 mb-10 border-b border-foreground/10 pb-4">
        <h2 className="text-2xl font-normal tracking-[-0.5px] text-foreground">
          Components
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {LEGEND.map((kind) => (
            <li
              key={kind}
              className="inline-flex items-center gap-2 text-xs text-foreground/50"
            >
              <span
                className={clsx("w-2 h-2 rounded-full", BADGE_DOT_CLASS[kind])}
              />
              {BADGE_LABEL[kind]}
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
            <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3">
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
