"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const OTHER_PROJECTS = [
  {
    title: "Web UI/UX",
    type: "User Activity",
    year: "2023",
    imgSrc: "/images/projects/img0.png",
  },
  {
    title: "Web UI/UX",
    type: "Team Activity",
    year: "2023",
    imgSrc: "/images/projects/img1.png",
  },
  {
    title: "Web UI/UX",
    type: "Payment details",
    year: "2023",
    imgSrc: "/images/projects/img2.png",
  },
  {
    title: "Web UI/UX",
    type: "Account Setting",
    year: "2023",
    imgSrc: "/images/projects/img3.png",
  },
  {
    title: "Logo",
    type: "Platform Circle Logo",
    year: "2023",
    imgSrc: "/images/projects/img4.png",
  },
  {
    title: "Logo",
    type: "Platform Main Logo",
    year: "2023",
    imgSrc: "/images/projects/img5.png",
  },
];

export const SectionOtherProjects = () => {
  const imgBoxRef = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState(OTHER_PROJECTS[0].imgSrc);
  const [visible, setVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const listItems = document.querySelectorAll(".other-projects-list li");
    const imgBox = imgBoxRef.current;
    if (!imgBox) return;

    const handleMouseOver = (i: number) => () => {
      setCurrentImg(OTHER_PROJECTS[i].imgSrc);
      setVisible(true);
      gsap.killTweensOf(imgBox);
      gsap.fromTo(
        imgBox,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3 },
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (imgBox) {
        imgBox.style.left = `${e.clientX + 20}px`;
        imgBox.style.top = `${e.clientY - 20}px`;
      }
    };

    const handleMouseOut = () => {
      gsap.killTweensOf(imgBox);
      gsap.to(imgBox, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => setVisible(false),
      });
    };

    listItems.forEach((item, i) => {
      item.addEventListener("mouseover", handleMouseOver(i));
      item.addEventListener("mousemove", handleMouseMove as EventListener);
      item.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      listItems.forEach((item, i) => {
        item.removeEventListener("mouseover", handleMouseOver(i));
        item.removeEventListener("mousemove", handleMouseMove as EventListener);
        item.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return (
    <section className="bg-foreground/5 text-foreground rounded-2xl flex flex-col gap-8 md:gap-12 px-5 md:px-12.5 py-8 md:py-12.5">
      <h2 className="uppercase font-normal tracking-[-3px] md:tracking-[-5px]" style={{ fontSize: "clamp(48px, 12vw, 100px)" }}>
        OTHERS
      </h2>

      <ul className="other-projects-list border-t border-foreground">
        {OTHER_PROJECTS.map((project, i) => (
          <li
            key={i}
            className="border-b border-foreground p-2.5 cursor-none flex items-center justify-between gap-3"
          >
            <h3 className="font-normal tracking-[-0.5px] md:tracking-[-1px]" style={{ fontSize: "clamp(22px, 6vw, 40px)" }}>
              {project.title}
            </h3>
            <p className="self-center text-xs md:text-base text-foreground/60 hidden sm:block">{project.type}</p>
            <p className="self-center text-xs md:text-base shrink-0">{project.year}</p>
          </li>
        ))}
      </ul>

      <div
        ref={imgBoxRef}
        className="fixed z-[100] rounded-[12px] overflow-hidden pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: "300px",
          opacity: 0,
          transform: "scale(0)",
          transformOrigin: "top left",
        }}
      >
        <img
          src={currentImg}
          alt=""
          style={{
            width: "fit-content",
            height: "auto",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </section>
  );
};
