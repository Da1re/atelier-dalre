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
    <section className="bg-white text-[#141412] mb-0 px-[50px] py-[50px]">
      <div className="mb-37.5">
        <h2 className="text-[100px] uppercase tracking-[-5px] font-normal">
          OTHER PROJECTS
        </h2>
      </div>

      <ul className="other-projects-list border-t border-black">
        {OTHER_PROJECTS.map((project, i) => (
          <li
            key={i}
            className="grid border-b border-black p-2.5 cursor-none"
            style={{ gridTemplateColumns: "2fr 1fr auto" }}
          >
            <h3 className="text-[40px] tracking-[-1px] font-normal">
              {project.title}
            </h3>
            <p className="self-center">{project.type}</p>
            <p className="self-center">{project.year}</p>
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
            width: "300px",
            height: "200px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </section>
  );
};
