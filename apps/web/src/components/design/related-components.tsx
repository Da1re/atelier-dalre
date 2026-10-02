import {
  getComponentBySlug,
  type DesignComponent,
} from "@/models/design-system-data";
import { ComponentCard } from "./component-card";

interface RelatedComponentsProps {
  slugs: string[];
}

export function RelatedComponents({ slugs }: RelatedComponentsProps) {
  const components = slugs
    .map((slug) => getComponentBySlug(slug))
    .filter((c): c is DesignComponent => !!c);

  if (components.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-foreground/10">
      <h2 className="text-[11px] tracking-[2px] uppercase text-foreground/40 font-medium mb-6">
        관련 컴포넌트
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {components.map((comp) => (
          <ComponentCard key={comp.slug} component={comp} />
        ))}
      </div>
    </div>
  );
}
