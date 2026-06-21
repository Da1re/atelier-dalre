"use client";

import { useEffect, useState } from "react";

const TOP_THRESHOLD = 120;
const MIN_DELTA = 10;

export const useHideOnScroll = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let anchorY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = Math.max(window.scrollY, 0);

      if (currentY < TOP_THRESHOLD) {
        setHidden(false);
        anchorY = currentY;
      } else if (currentY - anchorY > MIN_DELTA) {
        setHidden(true);
        anchorY = currentY;
      } else if (anchorY - currentY > MIN_DELTA) {
        setHidden(false);
        anchorY = currentY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return hidden;
};
