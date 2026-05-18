"use client";

import gsap from "gsap";
import { useEffect } from "react";
import { TerminalAnimation } from "./section-in/terminal-animation";

const STROKE_LINES = [
  { text: "craft.", align: "left" as const },
  { text: "something.", align: "center" as const },
  { text: "meaningful.", align: "right" as const },
];

const alignClass = {
  left: "pl-4 md:pl-12",
  center: "text-center",
  right: "text-right pr-4 md:pr-12",
};

// sine 파형을 20개 점으로 polygon 생성
// level: 수위(% from top), amplitude: 파고(%), phase: 파동 위상(rad)
const N = 20;
const makePoly = (level: number, amplitude: number, phase: number) => {
  const top = Array.from({ length: N + 1 }, (_, i) => {
    const x = (i / N) * 100;
    const y = Math.max(
      0,
      Math.min(
        100,
        level + amplitude * Math.sin((i / N) * Math.PI * 2 + phase),
      ),
    );
    return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  }).join(", ");
  return `polygon(${top}, 100% 100%, 0% 100%)`;
};

export const SectionIn = () => {
  useEffect(() => {
    const fills = document.querySelectorAll<HTMLElement>(".git-fill");
    if (!fills.length) return;

    const tls: gsap.core.Timeline[] = [];

    fills.forEach((el, i) => {
      const state = { level: 100, amplitude: 0, phase: 0 };
      const update = () => {
        el.style.clipPath = makePoly(state.level, state.amplitude, state.phase);
      };

      update();

      const tl = gsap.timeline({
        repeat: -1,
        delay: i * 1.2,
        repeatDelay: 0.6,
        repeatRefresh: true,
        onRepeat: () => {
          state.level = 100;
          state.amplitude = 0;
          state.phase = 0;
          update();
        },
      });

      tl.to(state, {
        level: 20,
        amplitude: 8,
        phase: Math.PI * 2,
        duration: 3.0,
        ease: "power2.out",
        onUpdate: update,
      })

        .to(state, {
          level: 5,
          amplitude: 40,
          phase: Math.PI * 3,
          duration: 0.5,
          ease: "power3.out",
          onUpdate: update,
        })

        .to(state, {
          amplitude: 34,
          phase: Math.PI * 4,
          duration: 0.52,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          amplitude: 28,
          phase: Math.PI * 5,
          duration: 0.5,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          amplitude: 22,
          phase: Math.PI * 6,
          duration: 0.48,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          amplitude: 16,
          phase: Math.PI * 7,
          duration: 0.46,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          amplitude: 10,
          phase: Math.PI * 8,
          duration: 0.44,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          amplitude: 5,
          phase: Math.PI * 9,
          duration: 0.42,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          amplitude: 2,
          phase: Math.PI * 10,
          duration: 0.4,
          ease: "sine.inOut",
          onUpdate: update,
        })

        .to(state, {
          amplitude: 0,
          duration: 0.5,
          ease: "sine.out",
          onUpdate: update,
        })

        .to(
          state,
          {
            level: 38,
            amplitude: 18,
            phase: Math.PI * 11,
            duration: 1.0,
            ease: "power1.in",
            onUpdate: update,
          },
          "+=0.7",
        )
        .to(state, {
          level: 65,
          amplitude: 12,
          phase: Math.PI * 12,
          duration: 0.8,
          ease: "power1.in",
          onUpdate: update,
        })

        .to(state, {
          level: 76,
          amplitude: 22,
          phase: Math.PI * 13,
          duration: 0.42,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          level: 84,
          amplitude: 15,
          phase: Math.PI * 14,
          duration: 0.4,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          level: 90,
          amplitude: 8,
          phase: Math.PI * 15,
          duration: 0.38,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          level: 100,
          amplitude: 0,
          phase: Math.PI * 16,
          duration: 0.5,
          ease: "power2.in",
          onUpdate: update,
        });

      tls.push(tl);
    });

    return () => {
      tls.forEach((tl) => tl.kill());
    };
  }, []);

  return (
    <section className="section-in relative h-lvh flex flex-col md:justify-center justify-end">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[95%] h-px bg-foreground/25" />

      <div className="mainTextBox absolute inset-x-0 top-[12%] md:inset-0 md:top-auto flex flex-col md:justify-center pointer-events-none select-none gap-3 md:gap-6">
        {STROKE_LINES.map(({ text, align }) => (
          <div key={text} className="relative">
            <p
              className={`font-medium tracking-[-3px] md:tracking-[-6px] ${alignClass[align]}`}
              style={{
                fontSize: "clamp(40px, 9.5vw, 170px)",
                WebkitTextStroke:
                  "1.5px color-mix(in srgb, var(--foreground), transparent)",
                color: "transparent",
              }}
            >
              {text}
            </p>
            <p
              className={`git-fill absolute inset-0 font-medium tracking-[-3px] md:tracking-[-6px] ${alignClass[align]}`}
              style={{
                fontSize: "clamp(40px, 9.5vw, 170px)",
                color: "color-mix(in srgb, var(--foreground) 80%, transparent)",
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 md:px-15 py-8 md:py-16">
        <div className="w-full md:w-[85%]">
          <TerminalAnimation />
        </div>
      </div>
    </section>
  );
};
