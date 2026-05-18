export type LineType = "command" | "output" | "json" | "git" | "success" | "empty";

export interface TerminalLine {
  text: string;
  type: LineType;
}

export const TERMINAL_LINES: TerminalLine[] = [
  { text: "$ git log --oneline -4", type: "command" },
  { text: "  a3f2c1 feat: 디자인 시스템 공통 컴포넌트 라이브러리 구축", type: "git" },
  { text: "  b7d4e2 feat: SSE 실시간 스트리밍 대시보드 구현", type: "git" },
  { text: "  c9f3a1 feat: SDK 화상회의 플로우 구현", type: "git" },
  { text: "  d2e1f0 feat: 에디터 모노레포 패키지 모듈 구현", type: "git" },
  { text: "", type: "empty" },
  { text: "$ git add .", type: "command" },
  { text: '$ git commit -m "feat: 포트폴리오 v2 — Next.js + Tailwind"', type: "command" },
  { text: "$ git push origin main", type: "command" },
  { text: "", type: "empty" },
  { text: "  ✓ Build complete — 1.8s", type: "success" },
  { text: "  ✓ Deployed to production", type: "success" },
];
