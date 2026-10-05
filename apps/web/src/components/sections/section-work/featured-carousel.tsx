"use client";

import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";
import { CAROUSEL_PROJECTS } from "@/models/project-data";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { CarouselControls } from "./carousel-controls";
import { CarouselSlide } from "./carousel-slide";

export function FeaturedCarousel() {
  const count = CAROUSEL_PROJECTS.length;
  const { index, playing, fillRef, goTo, next, prev, toggle, setHovered } =
    useCarouselAutoplay({ count });
  const trackRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [index]);

  const handleScroll = () => {
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const settled = Math.round(track.scrollLeft / track.clientWidth);
      if (settled !== index) goTo(settled);
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
        className="flex overflow-x-auto snap-x snap-mandatory rounded-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CAROUSEL_PROJECTS.map((project, i) => (
          <CarouselSlide
            key={project.slug}
            project={project}
            index={i}
            total={count}
          />
        ))}
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
