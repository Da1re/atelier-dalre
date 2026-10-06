import clsx from "clsx";
import { Permanent_Marker } from "next/font/google";

const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  fallback: ["cursive"],
});

interface TapeTitleProps {
  children: string;
}

export function TapeTitle({ children }: TapeTitleProps) {
  return (
    <h2 className="relative isolate inline-block ml-[-0.12em] px-[0.32em] pt-[0.06em] pb-[0.02em] text-[clamp(36px,7vw,70px)] font-normal tracking-[0.01em]">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-[14%] bottom-[8%] -z-10 rotate-[-1.6deg]"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0 2px, transparent 2px 6px), linear-gradient(180deg, rgba(236, 226, 196, 0.94), rgba(222, 209, 172, 0.94))",
          clipPath:
            "polygon(1% 0, 99% 0, 100% 14%, 98.5% 28%, 100% 43%, 98.5% 57%, 100% 72%, 98.5% 86%, 99.5% 100%, 0.5% 100%, 1.5% 86%, 0 72%, 1.5% 57%, 0 43%, 1.5% 28%, 0 14%)",
        }}
      />
      <span
        className={clsx(
          marker.className,
          "relative inline-block rotate-[-1.2deg] text-[0.82em] leading-[1.15] text-[#3b3935] mix-blend-multiply",
        )}
      >
        {children}
      </span>
    </h2>
  );
}
