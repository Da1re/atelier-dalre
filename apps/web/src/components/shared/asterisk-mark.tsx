import clsx from "clsx";

const SIZE_CLASS = {
  sm: "w-2 h-2 text-[15px]",
  md: "w-3 h-3 text-[22px]",
} as const;

interface AsteriskMarkProps {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
}

export function AsteriskMark({ size = "md", className }: AsteriskMarkProps) {
  return (
    <span
      aria-hidden
      className={clsx(
        "inline-flex shrink-0 items-center justify-center font-sans font-bold leading-none text-primary select-none",
        SIZE_CLASS[size],
        className,
      )}
    >
      <span className="translate-y-[0.2em]">*</span>
    </span>
  );
}
