"use client";

import clsx from "clsx";
import { useScrolledPast } from "@/hooks/use-scrolled-past";

// 이만큼 내려간 뒤부터 버튼 노출
const SHOW_AFTER = 400;

export const ScrollToTop = () => {
  const visible = useScrolledPast(SHOW_AFTER);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="맨 위로"
      className={clsx(
        "fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-foreground/15 bg-background/80 backdrop-blur-sm text-foreground shadow-sm cursor-pointer transition-all duration-300 ease-out hover:bg-foreground hover:text-background hover:border-foreground",
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-3",
      )}
    >
      <span aria-hidden className="text-lg leading-none">
        ↑
      </span>
    </button>
  );
};
