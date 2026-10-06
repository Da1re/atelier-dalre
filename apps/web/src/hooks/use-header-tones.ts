"use client";

import { toneBehind } from "@/models/header-tone";
import type { BackdropTone, ToneRegion } from "@/models/header-tone";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type HeaderTone = BackdropTone | "auto";

type HeaderTones = Record<"logo" | "nav" | "icons", HeaderTone>;

function contentRect(el: HTMLElement) {
  const boxes = Array.from(el.children, (child) =>
    child.getBoundingClientRect(),
  ).filter((box) => box.width > 0);
  if (boxes.length === 0) return el.getBoundingClientRect();
  const left = Math.min(...boxes.map((box) => box.left));
  const top = Math.min(...boxes.map((box) => box.top));
  const right = Math.max(...boxes.map((box) => box.right));
  const bottom = Math.max(...boxes.map((box) => box.bottom));
  return new DOMRect(left, top, right - left, bottom - top);
}

function restingRegion(el: HTMLElement, header: HTMLElement): ToneRegion {
  const rect = contentRect(el);
  const restingTop = parseFloat(getComputedStyle(header).top) || 0;
  const lift = restingTop - header.getBoundingClientRect().top;
  return {
    left: rect.left,
    top: rect.top + lift,
    width: rect.width,
    height: rect.height,
  };
}

function measureGroup(el: HTMLElement | null): HeaderTone {
  const header = el?.closest("header");
  if (!el || !header || el.offsetParent === null) return "auto";
  return toneBehind(restingRegion(el, header), header);
}

function sameTones(a: HeaderTones, b: HeaderTones) {
  return a.logo === b.logo && a.nav === b.nav && a.icons === b.icons;
}

export function useHeaderTones(paused: boolean) {
  const pathname = usePathname();
  const logoRef = useRef<HTMLImageElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState<HeaderTones | null>(null);

  useEffect(() => {
    if (paused) return;
    const events = ["scroll", "load", "transitionend"] as const;
    let frame = 0;
    const update = () => {
      frame = 0;
      const next: HeaderTones = {
        logo: measureGroup(logoRef.current),
        nav: measureGroup(navRef.current),
        icons: measureGroup(iconsRef.current),
      };
      setMeasured((prev) => (prev && sameTones(prev, next) ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new MutationObserver(schedule);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });
    events.forEach((type) =>
      document.addEventListener(type, schedule, { capture: true, passive: true }),
    );
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      events.forEach((type) =>
        document.removeEventListener(type, schedule, { capture: true }),
      );
      window.removeEventListener("resize", schedule);
    };
  }, [paused, pathname]);

  const tones: HeaderTones =
    !paused && measured ? measured : { logo: "auto", nav: "auto", icons: "auto" };

  return { logoRef, navRef, iconsRef, tones };
}
