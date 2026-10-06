export function getTrackStep(track: HTMLElement) {
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  return track.clientWidth + gap;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function moveTrack(
  track: HTMLElement,
  from: number,
  to: number,
  count: number,
) {
  const step = getTrackStep(track);
  const target = to * step;
  const clone = count * step;
  const last = count - 1;

  if (Math.abs(track.scrollLeft - target) < 2) return;
  if (prefersReducedMotion()) {
    track.scrollTo({ left: target, behavior: "instant" });
    return;
  }
  if (from === last && to === 0) {
    track.scrollTo({ left: clone, behavior: "smooth" });
    return;
  }
  if (from === 0 && to === last) {
    track.scrollTo({ left: clone, behavior: "instant" });
  }
  track.scrollTo({ left: target, behavior: "smooth" });
}
