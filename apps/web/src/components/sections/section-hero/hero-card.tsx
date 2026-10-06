import clsx from "clsx";
import Image from "next/image";
import { FiberOverlay } from "./hero-overlays";

const PERFORATION =
  "radial-gradient(circle at 0 0, #0000 calc(var(--s) * 0.46), #000 calc(var(--s) * 0.46 + 0.6px)) 0 0 / calc(var(--s) * 2) calc(var(--s) * 2), linear-gradient(#000 0 0) content-box";

export function HeroCard() {
  return (
    <div
      className={clsx(
        "absolute top-1/2 left-1/2 z-2 aspect-[1.55] w-(--card-w) [@media(max-width:760px)]:top-[58%]",
        "transform-[translate(-50%,-50%)_rotate(-1.5deg)] filter-[drop-shadow(0_16px_32px_rgba(20,30,10,0.2))]",
      )}
    >
      <div
        className="absolute inset-0 bg-[#f6f1e6] p-(--s) [--s:16px]"
        style={{
          WebkitMask: PERFORATION,
          mask: PERFORATION,
          WebkitMaskRepeat: "round, no-repeat",
          maskRepeat: "round, no-repeat",
        }}
      >
        <FiberOverlay />
        <div
          className="absolute inset-(--s)"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(31, 38, 27, 0.06), inset 0 0 60px rgba(120, 95, 50, 0.1)",
          }}
        >
          <Image
            className="pointer-events-none absolute top-[9%] left-[7%] h-auto w-[26%] max-w-[150px] opacity-[0.92]"
            src="/images/logo/main-logo.png"
            alt="Dalre"
            width={338}
            height={70}
          />
          <h1
            className={clsx(
              "absolute bottom-[calc(var(--s)*-1-0.2em)] left-[calc(var(--s)*-1-0.03em)] m-0",
              "flex items-baseline gap-[0.12em] whitespace-nowrap text-ink",
              "font-display text-[length:calc(var(--card-w)*0.21)] leading-[0.9] font-bold tracking-[-0.05em]",
            )}
          >
            Portfolio <small className="inline-block font-sans text-[0.28em] font-bold tracking-[-0.02em] italic transform-[rotate(-8deg)_translateY(-1.2em)]">2026</small>
          </h1>
        </div>
      </div>
    </div>
  );
}
