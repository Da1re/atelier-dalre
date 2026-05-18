"use client";

import {
  type LineType,
  type TerminalLine,
  TERMINAL_LINES,
} from "@/models/terminal-data";
import { useEffect, useState } from "react";

const getLineClass = (type: LineType) => {
  switch (type) {
    case "command":
      return "text-gray-100";
    case "json":
      return "text-[#79c0ff]";
    case "git":
      return "text-[#e3b341]";
    case "success":
      return "text-[#28c840]";
    default:
      return "text-gray-400";
  }
};

export const TerminalAnimation = () => {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
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
    const speed = line.type === "command" ? 40 : 15;

    if (currentChar < line.text.length) {
      const t = setTimeout(() => setCurrentChar((p) => p + 1), speed);
      return () => clearTimeout(t);
    }
    const pause =
      line.type === "empty" ? 100 : line.type === "command" ? 300 : 80;
    const t = setTimeout(() => {
      setDisplayedLines((p) => [...p, line]);
      setCurrentLine((p) => p + 1);
      setCurrentChar(0);
    }, pause);
    return () => clearTimeout(t);
  }, [currentLine, currentChar]);

  const currentTyping =
    currentLine < TERMINAL_LINES.length
      ? TERMINAL_LINES[currentLine].text.slice(0, currentChar)
      : "";

  const currentType =
    currentLine < TERMINAL_LINES.length
      ? TERMINAL_LINES[currentLine].type
      : "command";

  const reset = () => {
    setDisplayedLines([]);
    setCurrentLine(0);
    setCurrentChar(0);
  };

  return (
    <div
      className="w-full rounded-[18px] overflow-hidden bg-[#1a1a1a] dark:bg-[#0d0d0d]"
      style={{
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
      }}
    >
      {/* 타이틀바 — 글래스 */}
      <div
        className="flex items-center px-5 py-3.5"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
        }}
      >
        <div className="group flex gap-2 w-16 shrink-0">
          <span
            onClick={reset}
            className="w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer flex items-center justify-center"
          >
            <span className="hidden group-hover:block text-[#680000] text-[8px] font-bold leading-none">
              ✕
            </span>
          </span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-xs text-gray-500 font-mono">
          dalre — zsh
        </span>
        <div className="w-16 shrink-0" />
      </div>

      {/* 터미널 바디 */}
      <div className="p-6 font-mono text-sm leading-[1.8] min-h-105 text-gray-300">
        {displayedLines.map((line, i) => (
          <div key={i} className={getLineClass(line.type)}>
            {line.text || " "}
          </div>
        ))}
        {currentLine < TERMINAL_LINES.length && (
          <div className={getLineClass(currentType)}>
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
            <div className="text-xs mt-4 text-right">
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #4b5563, #9ca3af, #4b5563)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4.5s linear infinite",
                }}
              >
                click ● to replay (red dot)
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
