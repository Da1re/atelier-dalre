export type LineType = "command" | "output" | "json" | "git" | "success" | "empty";

export interface TerminalLine {
  text: string;
  type: LineType;
}

export const TERMINAL_LINES: TerminalLine[] = [
  { text: "$ git log --oneline -4", type: "command" },
  { text: "  3e9a71c feat: 디자인시스템 패키지화", type: "git" },
  { text: "  8b2f04d feat: SSE 기반 AI 응답 스트리밍 채팅", type: "git" },
  { text: "  c51d9e2 feat: 화상회의 SDK 연동", type: "git" },
  { text: "  f0a6b38 feat: 공통 에디터 패키지 Module Federation 배포", type: "git" },
  { text: "", type: "empty" },
  { text: "$ git add .", type: "command" },
  { text: '$ git commit -m "feat: 포트폴리오 리디자인"', type: "command" },
  { text: "$ git push origin main", type: "command" },
  { text: "", type: "empty" },
  { text: "  ✓ Compiled successfully", type: "success" },
  { text: "  ✓ Deployed to production", type: "success" },
];
