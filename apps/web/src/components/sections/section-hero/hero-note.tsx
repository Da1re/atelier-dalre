import clsx from "clsx";
import { PaperOverlay } from "./hero-overlays";

const SPIRAL_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 56' preserveAspectRatio='none'%3E%3Cpath fill-rule='evenodd' d='M6 0H24V56H5L7 52L4 48L6 45H18V36H6L4 32L7 28L3 24L6 19L4 14L7 9L4 4ZM11 11H18V20H11Z'/%3E%3C/svg%3E") 0 0 / 24px calc(var(--lh) * 2) repeat-y, linear-gradient(#000 0 0) 24px 0 / calc(100% - 24px) 100% no-repeat`;

export function HeroNote() {
  return (
    <div
      className={clsx(
        "absolute top-[calc(var(--card-t)-var(--card-w)*0.06)] left-[calc(var(--card-l)-var(--card-w)*0.1)] z-3 w-[calc(var(--card-w)*0.5)]",
        "[@media(max-width:760px)]:top-[6%] [@media(max-width:760px)]:left-[4%] [@media(max-width:760px)]:w-[58%]",
        "transform-[rotate(5deg)] filter-[drop-shadow(0_8px_14px_rgba(30,25,10,0.22))_drop-shadow(0_1px_1px_rgba(0,0,0,0.12))]",
      )}
    >
      <div
        className={clsx(
          "relative rounded-[2px_4px_22px_2px] p-[22px_22px_22px_40px] text-[#2b2a24] [@media(max-width:760px)]:p-[18px_14px_18px_32px]",
          "font-sans text-[13px] leading-(--lh) font-medium tracking-[-0.01em] break-keep [@media(max-width:760px)]:text-[11px]",
          "[--lh:28px] [--rule-x:30px] [--rule-y:15px]",
          "[@media(max-width:760px)]:[--lh:24px] [@media(max-width:760px)]:[--rule-x:24px] [@media(max-width:760px)]:[--rule-y:12px]",
        )}
        style={{
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(120, 96, 52, 0.08), rgba(120, 96, 52, 0) 26%), repeating-linear-gradient(180deg, transparent 0 calc(var(--lh) - 1px), rgba(58, 56, 48, 0.3) calc(var(--lh) - 1px) var(--lh)) var(--rule-x) var(--rule-y) / calc(100% - var(--rule-x) - 14px) calc(100% - var(--rule-y) - 10px) no-repeat, #efebde",
          boxShadow: "inset 0 0 22px rgba(110, 88, 45, 0.07)",
          WebkitMask: SPIRAL_MASK,
          mask: SPIRAL_MASK,
        }}
      >
        <PaperOverlay />
        <p className="font-bold">안녕하세요! ♪(´▽｀)</p>
        <p>FE Developer 유수빈입니다.</p>
        <p className="mt-(--lh) font-mono text-[11px] tracking-[0] text-[rgba(43,42,36,0.72)] [@media(max-width:760px)]:text-[9.5px]">
          Frontend · 4년 차 · 2022~
          <br />
          한양대 공학대학원 컴퓨터공학 재학
        </p>
        <p className="font-mono text-[11px] tracking-[0] text-[#4d7a3a] [@media(max-width:760px)]:text-[9.5px]">
          #React #TypeScript #TailwindCSS #Next.js
        </p>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[-14px] left-1/2 h-[30px] w-[34%] mix-blend-multiply transform-[translateX(-50%)_rotate(-7deg)]"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0 2px, transparent 2px 6px), linear-gradient(180deg, rgba(236, 226, 196, 0.82), rgba(222, 209, 172, 0.82))",
          clipPath:
            "polygon(2% 0, 98% 0, 100% 14%, 97% 28%, 100% 43%, 97% 57%, 100% 72%, 97% 86%, 99% 100%, 1% 100%, 3% 86%, 0 72%, 3% 57%, 0 43%, 3% 28%, 0 14%)",
        }}
      />
    </div>
  );
}
