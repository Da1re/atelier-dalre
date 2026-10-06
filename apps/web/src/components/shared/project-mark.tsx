import { AsteriskMark } from "./asterisk-mark";

interface ProjectMarkProps {
  starred?: boolean;
}

export function ProjectMark({ starred = false }: ProjectMarkProps) {
  if (starred) {
    return (
      <span className="flex w-3 justify-center">
        <AsteriskMark />
        <span className="sr-only">주요 프로젝트</span>
      </span>
    );
  }

  return (
    <span className="flex w-3 justify-center">
      <span className="w-2 h-2 rounded-full border-[1.5px] border-foreground/30" />
    </span>
  );
}
