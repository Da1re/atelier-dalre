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
    <section className="section-creation mb-37.5 px-15">
      <div className="mainTextBox relative">
        <p className="title overflow-hidden text-[120px] tracking-[-5px]">
          <i className="block">CREATION</i>
        </p>

        <p className="title overflow-hidden text-[120px] tracking-[-5px]">
          <i className="block">PRODUCTION</i>
        </p>

        <div className="flex justify-end">
          <div className="max-w-[550px] mr-5 rounded-[10px] overflow-hidden">
            <Image
              src="/images/flower.gif"
              alt=""
              width={550}
              height={350}
              className="w-full rounded-[10px]"
              unoptimized
            />
          </div>
          <p className="title overflow-hidden text-[120px] tracking-[-5px] self-start">
            <i className="block">DIFFUSION</i>
          </p>
        </div>
      </div>
    </section>
  );
};
