"use client";

import { useEffect, useState } from "react";

const TERMINAL_LINES = [
  "$ git add .",
  '$ git commit -m "chore: migrate to Next.js + Tailwind"',
  "$ git push origin main",
  "",
  "✓ Deployed to production",
];

export const TerminalAnimation = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar((p) => p + 1), 50);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayedLines((p) => [...p, line]);
      setCurrentLine((p) => p + 1);
      setCurrentChar(0);
    }, 400);
    return () => clearTimeout(t);
  }, [currentLine, currentChar]);

  const currentTyping =
    currentLine < TERMINAL_LINES.length
      ? TERMINAL_LINES[currentLine].slice(0, currentChar)
      : "";

  const reset = () => {
    setDisplayedLines([]);
    setCurrentLine(0);
    setCurrentChar(0);
  };

  return (
    <div className="w-125 h-48 bg-[#1a1a1a] rounded-[10px] p-6 font-mono text-sm overflow-hidden">
      <div className="group flex gap-2 mb-4">
        <span
          onClick={reset}
          className="w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer flex items-center justify-center"
        >
          <span className="hidden group-hover:block text-[#680000] text-[8px] font-bold leading-none">
            ✕
          </span>
        </span>
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center">
          <span className="hidden group-hover:block text-[#613e00] text-[8px] font-bold leading-none">
            −
          </span>
        </span>
        <span className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center">
          <span className="hidden group-hover:block text-[#004c00] text-[8px] font-bold leading-none">
            +
          </span>
        </span>
      </div>
      {displayedLines.map((line, i) => (
        <div
          key={i}
          className={line.startsWith("✓") ? "text-[#28c840]" : "text-gray-300"}
        >
          {line || " "}
        </div>
      ))}
      {currentLine < TERMINAL_LINES.length && (
        <div className="text-gray-300">
          {currentTyping}
          <span className={showCursor ? "opacity-100" : "opacity-0"}>▋</span>
        </div>
      )}
      {currentLine >= TERMINAL_LINES.length && (
        <>
          <span
            className={`text-[#28c840] ${showCursor ? "opacity-100" : "opacity-0"}`}
          >
            ▋
          </span>
          <div className="text-xs mt-2 text-right">
            <span
              style={{
                background: "linear-gradient(90deg, #6b7280, #ffffff, #6b7280)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                animation: "shimmer 4.5s linear infinite",
              }}
            >
              click ● to replay (red dot)
            </span>
          </div>
        </>
      )}
    </div>
  );
};
