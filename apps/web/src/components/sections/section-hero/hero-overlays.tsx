const OVERLAY = "pointer-events-none absolute inset-0 h-full w-full";

export function GrainOverlay() {
  return (
    <svg className={`${OVERLAY} opacity-[0.16] mix-blend-multiply`} aria-hidden="true">
      <filter id="hero-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-grain)" />
    </svg>
  );
}

export function NoiseOverlay() {
  return (
    <svg className={`${OVERLAY} z-1 opacity-[0.28] mix-blend-multiply`} aria-hidden="true">
      <filter id="hero-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="9" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.9" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-noise)" />
    </svg>
  );
}

export function FiberOverlay() {
  return (
    <svg className={`${OVERLAY} opacity-[0.35] mix-blend-multiply`} aria-hidden="true">
      <filter id="hero-fiber">
        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.9" numOctaves="3" seed="4" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 .55 0 0 0 0 .5 0 0 0 0 .4 0 0 0 .5 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-fiber)" />
    </svg>
  );
}

export function PaperOverlay() {
  return (
    <svg className={`${OVERLAY} opacity-[0.16] mix-blend-multiply`} aria-hidden="true">
      <filter id="hero-paper-tooth">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 .3 0 0 0 0 .28 0 0 0 0 .22 0 0 0 .55 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-paper-tooth)" />
    </svg>
  );
}

export function AgeOverlay() {
  return (
    <div
      className={`${OVERLAY} z-1 mix-blend-multiply`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, rgba(255, 240, 210, 0) 40%, rgba(70, 55, 25, 0.38) 100%), linear-gradient(180deg, rgba(120, 95, 50, 0.12), rgba(120, 95, 50, 0.18))",
      }}
    />
  );
}

export function LeakOverlay() {
  return (
    <div
      className={`${OVERLAY} z-1 mix-blend-screen`}
      style={{
        background:
          "radial-gradient(ellipse at 6% -4%, rgba(255, 196, 130, 0.5), rgba(255, 196, 130, 0) 46%), radial-gradient(ellipse at 100% 60%, rgba(255, 230, 190, 0.22), rgba(255, 230, 190, 0) 40%)",
      }}
    />
  );
}

export function FadeOverlay() {
  return (
    <div
      className={`${OVERLAY} z-1 mix-blend-normal`}
      style={{
        background:
          "linear-gradient(180deg, rgba(246, 241, 230, 0.26), rgba(246, 241, 230, 0.14) 55%, rgba(214, 203, 176, 0.2))",
      }}
    />
  );
}

export function MetalClip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 96" aria-hidden="true">
      <defs>
        <linearGradient id="hero-clip-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9ebee" />
          <stop offset="0.5" stopColor="#9aa1a8" />
          <stop offset="1" stopColor="#d9dde1" />
        </linearGradient>
      </defs>
      <path d="M10 26v50a9 9 0 0 0 18 0V16a7 7 0 0 0-14 0v52a3.5 3.5 0 0 0 7 0V24" fill="none" stroke="url(#hero-clip-metal)" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 26v50a9 9 0 0 0 18 0V16a7 7 0 0 0-14 0v52a3.5 3.5 0 0 0 7 0V24" fill="none" stroke="#6f767d" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
