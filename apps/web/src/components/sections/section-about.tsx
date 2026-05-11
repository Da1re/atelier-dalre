"use client";

import gsap from "gsap";
import { useEffect } from "react";

const TEXT_ANI_LIST = [
  "UX for users, DX for developers.",
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
    <section className="section-about">
      <div className="rounded-xl p-10! overflow-hidden px-15 py-25 bg-white/20 backdrop-blur-[100px] grid grid-cols-2 gap-y-12 gap-x-14 lg:min-h-120">
        <div className="text-3xl row-start-2 text-[#141212]">
          <p>
            안녕하세요! ♪(´▽｀)
            <br /> FE Developer 유수빈입니다.
          </p>
        </div>
        <div className="max-w-150 text-xl col-start-2 text-[#141212] tracking-[-1.1px]">
          <p className="">
            <span className="text-[#0358d5] font-semibold">
              UX와 DX, 두 방향을 함께 고민하는 FE 개발자
            </span>
            입니다.
            <br />
            좋은 UI는 좋은 DX에서 나온다고 생각하며, <br />
            공통 컴포넌트와 유틸을 설계해 팀 전체가 편한 환경을 만들어갑니다.
          </p>
        </div>

        <div className="max-w-150 text-xl col-start-2 text-[#141212] tracking-[-1.1px] flex flex-col gap-5 w-full">
          <p className="">
            작은 개선이 쌓여 큰 차이를 만든다고 믿습니다.
            <br />
            사용자에게 더 나은 경험을, 동료에게 더 편한 코드를 —
            <br />그 두 가치를 함께 만들어가고 있습니다. 🌱
          </p>
          <div className="text-sm font-semibold px-6 py-3 h-8 flex items-center rounded-full w-fit  bg-white text-black uppercase">
            <span className=" flex items-center gap-3">
              @ skill
              {skillStack.map((skill, i) => (
                <span key={i} className="flex items-center gap-3 italic">
                  {skill}
                  {i < skillStack.length - 1 && (
                    <span className="opacity-20">|</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3.5 relative">
        <div
          className="absolute right-0 top-0 w-27.5 h-27.5 rounded-full bg-[#ff7900]"
          style={{ animation: "blink linear 1.5s 0s infinite" }}
        />
        <ul className="textAni grid max-w-200">
          {TEXT_ANI_LIST.map((text, i) => (
            <li
              key={i}
              className="text-[65px] uppercase tracking-[-1px] opacity-0"
              style={{
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
