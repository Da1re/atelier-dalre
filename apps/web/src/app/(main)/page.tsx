import { SectionDesign } from "@/components/sections/section-design";
import { SectionHero } from "@/components/sections/section-hero/section-hero";
import { SectionIn } from "@/components/sections/section-in";
import { SectionWork } from "@/components/sections/section-work";

export default function MainPage() {
  return (
    <div className="flex flex-col px-3 pt-24 pb-5 md:px-10 md:pt-28 md:pb-10 gap-14 md:gap-24 w-full">
      <SectionHero />
      <SectionIn />
      <SectionDesign />
      <SectionWork />
    </div>
  );
}
