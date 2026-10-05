"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

interface UseCarouselAutoplayOptions {
  count: number;
  intervalMs?: number;
}

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeReduceMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCE_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getReduceMotion = () => window.matchMedia(REDUCE_MOTION_QUERY).matches;
const getServerReduceMotion = () => false;

export function useCarouselAutoplay({
  count,
  intervalMs = 6000,
}: UseCarouselAutoplayOptions) {
  const [index, setIndex] = useState(0);
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const fillRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);

  const reduceMotion = useSyncExternalStore(
    subscribeReduceMotion,
    getReduceMotion,
    getServerReduceMotion,
  );
  const playing = userPlaying ?? !reduceMotion;

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const active = playing && !hovered && !hidden;

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsedRef.current += now - last;
      last = now;
      const ratio = Math.min(elapsedRef.current / intervalMs, 1);
      fillRef.current?.style.setProperty("--progress", ratio.toFixed(3));
      if (ratio >= 1) {
        elapsedRef.current = 0;
        setIndex((i) => (i + 1) % count);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, count, intervalMs]);

  const goTo = useCallback(
    (target: number) => {
      elapsedRef.current = 0;
      fillRef.current?.style.setProperty("--progress", "0");
      setIndex(((target % count) + count) % count);
    },
    [count],
  );

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);
  const toggle = () => setUserPlaying(!playing);

  return { index, playing, fillRef, goTo, next, prev, toggle, setHovered };
}
