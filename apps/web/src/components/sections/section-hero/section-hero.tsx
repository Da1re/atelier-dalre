import clsx from "clsx";
import Image from "next/image";
import { HeroCard } from "./hero-card";
import { HeroNote } from "./hero-note";
import {
  AgeOverlay,
  FadeOverlay,
  GrainOverlay,
  LeakOverlay,
  NoiseOverlay,
} from "./hero-overlays";
import { HeroPolaroid } from "./hero-polaroid";
import { Postmark, VintageStamp } from "./hero-stamp";
import { HeroTicker } from "./hero-ticker";

export function SectionHero() {
  return (
    <section
      aria-label="소개"
      data-header-tone="photo"
      className={clsx(
        "@container relative isolate overflow-hidden rounded-[12px] text-ink [-webkit-touch-callout:none]",
        "min-h-[clamp(560px,82svh,800px)] [@media(max-width:760px)]:min-h-[540px]",
        "[--card-w:min(64cqi,680px)] [@media(max-width:760px)]:[--card-w:90cqi]",
        "[--card-l:calc(50%-var(--card-w)/2)] [--card-t:calc(50%-var(--card-w)/3.1)]",
      )}
      style={{
        background:
          "linear-gradient(180deg, #cfdbe6 0%, #e8edf0 52%, #b9cda2 53%, #93ad7c 100%)",
      }}
    >
      <Image
        className="pointer-events-none z-0 object-cover object-[50%_42%] filter-[sepia(0.2)_saturate(0.82)_contrast(0.9)_brightness(0.98)]"
        src="/images/hero-park.jpg"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
      />
      <GrainOverlay />
      <HeroCard />
      <HeroNote />
      <VintageStamp />
      <Postmark />
      <HeroPolaroid />
      <AgeOverlay />
      <LeakOverlay />
      <FadeOverlay />
      <NoiseOverlay />
      <HeroTicker />
    </section>
  );
}
