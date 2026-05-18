"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const VISUAL_IDS = [
  "visual-obj-0",
  "visual-obj-1",
  "visual-obj-2",
  "visual-obj-3",
  "visual-obj-4",
  "visual-obj-5",
];

export const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHome) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "footer",
            start: "0% 100%",
            end: "70% 0%",
            scrub: 1,
          },
        })
        .to(logoWrapRef.current, { top: "20%", ease: "none", duration: 5 }, 0);
    });
    return () => ctx.revert();
  }, [isHome]);

  return (
    <footer className="relative overflow-hidden bg-foreground/5 border-t border-foreground/8">
      <div className="relative z-10 px-5 md:px-15 pt-12 md:pt-20 pb-10 flex flex-col min-h-80">
        {/* 메인 CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between flex-1 mb-10 md:mb-16 gap-6 md:gap-0">
          <h2 className="font-normal tracking-[-2px] md:tracking-[-4px] leading-[0.95] text-foreground" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            Let&apos;s work
            <br />
            together.
          </h2>
          <a
            href="mailto:wien200922@gmail.com"
            className="flex items-center gap-2 text-[15px] font-semibold text-foreground/50 hover:text-foreground transition-colors pb-2"
          >
            wien200922@gmail.com
            <span className="text-lg">↗</span>
          </a>
        </div>

        {/* 하단 바 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-foreground/10 pt-6 gap-3 sm:gap-0">
          <div className="flex items-center gap-6">
            <a
              href="https://dalre.tistory.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold uppercase text-foreground/30 hover:text-foreground/70 transition-colors"
            >
              Tistory
            </a>
            <a
              href="https://github.com/Da1re"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold uppercase text-foreground/30 hover:text-foreground/70 transition-colors"
            >
              Github
            </a>
          </div>
          <p className="text-[12px] text-foreground/70">Dalre &copy; 2026</p>
        </div>
      </div>

      {isHome && (
        <div
          ref={logoWrapRef}
          className="absolute left-0 top-[-50%] w-full z-0 flex justify-between pointer-events-none opacity-20"
        >
          {VISUAL_IDS.map((id) => (
            <span key={id} className="w-[16%]">
              <Image
                src={`/images/logo/${id}.png`}
                alt=""
                width={200}
                height={200}
                className="w-full"
              />
            </span>
          ))}
        </div>
      )}
    </footer>
  );
};
