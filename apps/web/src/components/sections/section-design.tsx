import { DesignPackageCard } from "@/components/sections/section-design/design-package-card";
import { DesignTopicSteps } from "@/components/sections/section-design/design-topic-steps";
import { TapeTitle } from "@/components/shared/tape-title";
import { ALL_COMPONENTS } from "@/models/design-system-data";
import Link from "next/link";

export function SectionDesign() {
  return (
    <section>
      <div className="flex justify-between items-end mb-10 md:mb-15 border-t border-foreground/25 pt-10">
        <TapeTitle>Design System</TapeTitle>
        <Link
          href="/design"
          className="text-sm font-semibold text-primary hover:opacity-60 transition-opacity pb-2.5"
        >
          모두 보기 →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
        <DesignPackageCard />

        <div className="md:col-span-2 flex flex-col gap-3">
          <DesignTopicSteps />
          <Link
            href="/design"
            className="text-[12px] text-foreground/50 hover:text-primary transition-colors self-end"
          >
            컴포넌트 {ALL_COMPONENTS.length}개 →
          </Link>
        </div>
      </div>
    </section>
  );
}
