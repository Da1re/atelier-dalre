import clsx from "clsx";

interface TerminalTapeProps {
  className: string;
}

export function TerminalTape({ className }: TerminalTapeProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute z-20 h-[32px] w-[96px] md:w-[128px]",
        className,
      )}
      style={{
        background:
          "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0 2px, transparent 2px 6px), linear-gradient(180deg, rgba(236, 226, 196, 0.94), rgba(222, 209, 172, 0.94))",
        clipPath:
          "polygon(2% 0, 98% 0, 100% 14%, 97% 28%, 100% 43%, 97% 57%, 100% 72%, 97% 86%, 99% 100%, 1% 100%, 3% 86%, 0 72%, 3% 57%, 0 43%, 3% 28%, 0 14%)",
      }}
    />
  );
}
