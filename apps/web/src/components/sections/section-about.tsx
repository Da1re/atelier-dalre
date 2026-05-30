"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect } from "react";

const TEXT_ANI_LIST = [
  "Make it simple. Make it beautiful.",
  "Every commit counts.",
  "Progress over perfection.",
  "Better code makes better teammates.",
  "You found the right developer.",
  "Let's connect",
];

const skillStack = ["React", "TypeScript", "TailwindCSS", "Next.js"];

export const SectionAbout = () => {
  useEffect(() => {
    const items = document.querySelectorAll(".section-about .textAni li");
    if (items.length === 0) return;

    const tl = gsap.timeline({ repeat: -1 });
    items.forEach((el) => {
      tl.to(el, { opacity: 1, x: 0, ease: "power4.out", duration: 0.5 }).to(
        el,
        { opacity: 0, x: 0, ease: "power4.out", duration: 0.5, delay: 1 },
      );
    });
    tl.play();

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="section-about flex flex-col gap-4">
      <div className="relative rounded-xl overflow-hidden px-5 md:px-15 py-12 md:py-25 bg-white/20 backdrop-blur-[100px] grid grid-cols-1 md:grid-cols-2 lg:min-h-100 items-center gap-y-8 md:gap-y-10">
        <Link
          href="/about"
          className="absolute top-10 right-10 flex items-center gap-1.5 text-sm font-semibold text-foreground/30 hover:text-foreground/70 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          <span className="hidden md:inline">More about me</span>
          <span className="text-lg">↗</span>
        </Link>
        <div className="md:row-start-2 flex flex-col gap-3 md:gap-4">
          <div className="text-2xl md:text-3xl text-foreground">
            안녕하세요! ♪(´▽｀)
            <br /> FE Developer 유수빈입니다.
          </div>
          <div className="text-xs md:text-sm text-foreground/50 tracking-normal flex flex-col md:flex-row md:items-center gap-y-1 md:gap-x-2">
            <span>Frontend · 4y+ since 2022</span>
            <span className="hidden md:inline text-foreground/25">•</span>
            <span>한양대 공학대학원 컴퓨터공학 재학</span>
          </div>
        </div>
        <div className="max-w-150 text-base md:text-xl md:col-start-2 text-foreground tracking-[-1.1px]">
          <p className="">
            <span className="text-primary font-semibold">
              복잡한 걸 단순하게, 단순한 걸 아름답게 만드는 FE 개발자
            </span>
            입니다.
          </p>
        </div>

        <div className="max-w-150 text-base md:text-xl md:col-start-2 text-foreground tracking-[-1.1px] flex flex-col gap-5 w-full">
          <p className="">
            사용자에게 더 나은 경험을, 동료에게 더 편한 코드를 —
            <br />그 두 가치를 함께 만들어가고 있습니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {skillStack.map((skill) => (
              <span
                key={skill}
                className="text-[13px] font-semibold px-3 py-1.5 rounded-full border border-foreground/15 text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute right-0 top-0 w-7 h-7 rounded-full bg-primary"
          style={{ animation: "blink linear 1.5s 0s infinite" }}
        />
        <ul className="textAni grid max-w-200">
          {TEXT_ANI_LIST.map((text, i) => (
            <li
              key={i}
              className="uppercase tracking-[-1px] opacity-0 text-foreground"
              style={{
                fontSize: "clamp(28px, 5vw, 65px)",
                gridRowStart: 1,
                gridColumnStart: 1,
                transform: "translateX(30px)",
              }}
            >
              {text}
            </li>
          ))}
        </ul>
        <a
          href="mailto:wien200922@gmail.com"
          className="text-sm font-semibold px-6 py-3 rounded-full inline-block bg-white text-black uppercase mt-7.5 svgAni"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
};
