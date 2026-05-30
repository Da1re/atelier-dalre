"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const useGsapVisual = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = document.querySelectorAll<HTMLElement>(
        ".visual h1 .rotateText, .visual h1 .opacityText",
      );

      const loadingDone =
        typeof window !== "undefined" &&
        sessionStorage.getItem("loadingDone") === "1";

      const splitToChars = (line: HTMLElement) => {
        const target = line.querySelector("p, i") as HTMLElement | null;
        if (!target || target.querySelector(".char")) return;
        const text = target.textContent || "";
        target.textContent = "";
        text.split("").forEach((c) => {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = c === " " ? " " : c;
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity, filter";
          target.appendChild(span);
        });
        line.style.overflow = "visible";
      };

      const getChars = (line: HTMLElement) =>
        line.querySelectorAll<HTMLElement>(".char");

      const setupVisualText = () => {
        lines.forEach(splitToChars);
        const h1 = document.querySelector<HTMLElement>(".visual h1");
        if (h1) h1.style.perspective = "800px";

        const c0 = Array.from(getChars(lines[0]));
        const c1 = Array.from(getChars(lines[1]));
        const c2 = Array.from(getChars(lines[2]));
        const c3 = Array.from(getChars(lines[3]));
        console.log("[useGsapVisual] char counts:", c0.length, c1.length, c2.length, c3.length);

        gsap.set(c0, { y: -180, rotation: -120, opacity: 0, scale: 0.4 });
        gsap.set(c1, { scale: 3, filter: "blur(24px)", opacity: 0 });
        gsap.set(c2, {
          x: (i: number) => (i % 2 === 0 ? -80 : 80),
          rotation: (i: number) => (i % 2 === 0 ? -180 : 180),
          scale: 0.3,
          opacity: 0,
        });
        gsap.set(c3, { y: 150, opacity: 0, skewY: 12, scale: 0.7 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".visual",
            start: "top 85%",
            toggleActions: "play none play reset",
          },
        });

        tl
          .to(c0, {
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "back.out(2)",
            stagger: 0.06,
          })
          .to(
            c1,
            {
              scale: 1,
              filter: "blur(0px)",
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              stagger: 0.05,
            },
            "-=0.5",
          )
          .to(
            c2,
            {
              x: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 1.0,
              ease: "back.out(1.8)",
              stagger: 0.06,
            },
            "-=0.5",
          )
          .to(
            c3,
            {
              y: 0,
              opacity: 1,
              skewY: 0,
              scale: 1,
              duration: 1.3,
              ease: "elastic.out(1, 0.4)",
              stagger: 0.055,
            },
            "-=0.6",
          );
      };

      if (loadingDone) setupVisualText();
      else gsap.delayedCall(2.5, setupVisualText);

      gsap.fromTo(
        ".visual h2",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".visual",
            start: "top 70%",
            toggleActions: "play none none reset",
          },
        },
      );

      const visual = gsap.timeline({
        scrollTrigger: {
          trigger: ".visual",
          start: "100% 100%",
          end: "100% 0%",
          scrub: 1,
        },
      });

      visual
        .to(
          "#visual-obj-0",
          { x: -100, y: -50, rotate: 20, ease: "none", duration: 5 },
          0,
        )
        .to(
          "#visual-obj-1",
          { x: -30, y: -150, rotate: -10, ease: "none", duration: 5 },
          0,
        )
        .to(
          "#visual-obj-2",
          { x: 0, y: 400, rotate: -10, ease: "none", duration: 5 },
          0,
        )
        .to(
          "#visual-obj-3",
          { x: 50, y: 300, rotate: 10, ease: "none", duration: 5 },
          0,
        )
        .to(
          "#visual-obj-4",
          { x: 100, y: 100, rotate: -10, ease: "none", duration: 5 },
          0,
        )
        .to(
          "#visual-obj-5",
          { x: 50, y: 450, rotate: 20, ease: "none", duration: 5 },
          0,
        );

      gsap.to(".visual .svgAni", {
        rotation: 360,
        duration: 18,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.to(".visual .svgAni img", {
        scale: 1.08,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.to(".visual .scrollIndicator-arrow", {
        y: 6,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);
};
