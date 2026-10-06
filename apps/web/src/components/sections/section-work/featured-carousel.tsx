"use client";

import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";
import { CAROUSEL_PROJECTS } from "@/models/project-data";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { CarouselControls } from "./carousel-controls";
import { CarouselSlide } from "./carousel-slide";
import { getTrackStep, moveTrack } from "./carousel-track";

export function FeaturedCarousel() {
  const count = CAROUSEL_PROJECTS.length;
  const { index, playing, fillRef, goTo, next, prev, toggle, setHovered } =
    useCarouselAutoplay({ count });
  const trackRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<number | undefined>(undefined);
  const fromRef = useRef(index);

  useEffect(() => {
    const track = trackRef.current;
    const from = fromRef.current;
    fromRef.current = index;
    if (!track) return;
    moveTrack(track, from, index, count);
  }, [index, count]);

  const handleScroll = () => {
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const settled = Math.round(track.scrollLeft / getTrackStep(track));
      if (settled >= count) track.scrollTo({ left: 0, behavior: "instant" });
      const real = settled % count;
      if (real !== index) goTo(real);
    }, 120);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <div
      aria-roledescription="carousel"
      aria-label="주요 프로젝트"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory rounded-[28px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CAROUSEL_PROJECTS.map((project, i) => (
          <CarouselSlide
            key={project.slug}
            project={project}
            index={i}
            total={count}
          />
        ))}
        <div aria-hidden inert className="flex w-full shrink-0 snap-start">
          <CarouselSlide
            project={CAROUSEL_PROJECTS[0]}
            index={0}
            total={count}
          />
        </div>
      </div>
      <CarouselControls
        count={count}
        index={index}
        playing={playing}
        fillRef={fillRef}
        onSelect={goTo}
        onToggle={toggle}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
