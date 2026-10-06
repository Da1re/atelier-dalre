import type { ReactNode, RefObject } from "react";

interface CarouselControlsProps {
  count: number;
  index: number;
  playing: boolean;
  fillRef: RefObject<HTMLSpanElement | null>;
  onSelect: (index: number) => void;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
}

interface RoundButtonProps {
  label: string;
  onClick: () => void;
  children: ReactNode;
}

function RoundButton({ label, onClick, children }: RoundButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="w-11 h-11 rounded-full bg-foreground/8 hover:bg-foreground/15 flex items-center justify-center text-foreground transition-colors"
    >
      {children}
    </button>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
      <rect x="2" y="1.5" width="3.5" height="11" rx="1" />
      <rect x="8.5" y="1.5" width="3.5" height="11" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
      <path d="M3 1.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L4.2 1.1A.8.8 0 0 0 3 1.8z" />
    </svg>
  );
}

export function CarouselControls({
  count,
  index,
  playing,
  fillRef,
  onSelect,
  onToggle,
  onPrev,
  onNext,
}: CarouselControlsProps) {
  const dots = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="flex items-center justify-center md:justify-between mt-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-4 h-11 rounded-full bg-foreground/8">
          {dots.map((i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}번째 프로젝트`}
                aria-current={isActive || undefined}
                onClick={() => onSelect(i)}
                className={
                  isActive
                    ? "relative w-10 h-2 rounded-full bg-foreground/20 overflow-hidden transition-[width] duration-300"
                    : "w-2 h-2 rounded-full bg-foreground/30 hover:bg-foreground/60 transition-colors"
                }
              >
                {isActive && (
                  <span
                    ref={fillRef}
                    className="absolute inset-0 origin-left rounded-full bg-foreground"
                    style={{ transform: "scaleX(var(--progress, 0))" }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <RoundButton
          label={playing ? "자동 재생 멈춤" : "자동 재생"}
          onClick={onToggle}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </RoundButton>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <RoundButton label="이전 프로젝트" onClick={onPrev}>
          ←
        </RoundButton>
        <RoundButton label="다음 프로젝트" onClick={onNext}>
          →
        </RoundButton>
      </div>
    </div>
  );
}
