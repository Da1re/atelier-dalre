import { SectionAbout } from "@/components/sections/section-about";
import { SectionDesign } from "@/components/sections/section-design";
import { SectionIn } from "@/components/sections/section-in";
import { SectionVisual } from "@/components/sections/section-visual";
import { SectionWork } from "@/components/sections/section-work";

export default function MainPage() {
  return (
    <div className="flex flex-col px-3 py-5 md:p-10 gap-14 md:gap-24 w-full">
      <SectionVisual />
      <SectionAbout />
      <SectionIn />
      <SectionDesign />
      <SectionWork />
    </div>
  );
}
