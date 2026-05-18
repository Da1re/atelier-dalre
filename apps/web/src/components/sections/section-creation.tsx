"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const SectionCreation = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleItems = document.querySelectorAll(
        ".section-creation .title i",
      );
      titleItems.forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: "100% 100%",
              end: "100% 100%",
              scrub: 1,
            },
          })
          .fromTo(el, { y: 150 }, { y: 0, ease: "none", duration: 5 }, 0);
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-creation px-5 md:px-15">
      <div className="mainTextBox relative">
        <p className="title overflow-hidden tracking-[-2px] md:tracking-[-5px] text-primary" style={{ fontSize: "clamp(36px, 10vw, 120px)" }}>
          <i className="block">CREATION</i>
        </p>

        <p className="title overflow-hidden tracking-[-2px] md:tracking-[-5px] text-primary" style={{ fontSize: "clamp(36px, 10vw, 120px)" }}>
          <i className="block">PRODUCTION</i>
        </p>

        <div className="flex flex-col-reverse md:flex-row md:justify-end items-stretch md:items-start gap-3 md:gap-0">
          <div className="w-full md:max-w-137.5 md:mr-5 rounded-[10px] overflow-hidden">
            <Image
              src="/images/flower.gif"
              alt=""
              width={550}
              height={350}
              className="w-full rounded-[10px]"
              unoptimized
            />
          </div>
          <p className="title overflow-hidden tracking-[-2px] md:tracking-[-5px] self-start text-primary" style={{ fontSize: "clamp(36px, 10vw, 120px)" }}>
            <i className="block">DIFFUSION</i>
          </p>
        </div>
      </div>
    </section>
  );
};
