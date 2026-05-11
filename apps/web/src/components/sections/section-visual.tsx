"use client";

import { useGsapVisual } from "@/hooks/use-gsap-visual";
import Image from "next/image";

const VISUAL_OBJ_LIST = [
  {
    id: "visual-obj-0",
    src: "/images/logo/visual-obj-0.png",
    alt: "visual object 0",
  },
  {
    id: "visual-obj-1",
    src: "/images/logo/visual-obj-1.png",
    alt: "visual object 1",
  },
  {
    id: "visual-obj-2",
    src: "/images/logo/visual-obj-2.png",
    alt: "visual object 2",
  },
  {
    id: "visual-obj-3",
    src: "/images/logo/visual-obj-3.png",
    alt: "visual object 3",
  },
  {
    id: "visual-obj-4",
    src: "/images/logo/visual-obj-4.png",
    alt: "visual object 4",
  },
  {
    id: "visual-obj-5",
    src: "/images/logo/visual-obj-5.png",
    alt: "visual object 5",
  },
];

export const SectionVisual = () => {
  useGsapVisual();

  return (
    <section className="visual mb-0">
      <div
        className="grid h-[110vh] px-15 pt-20 pb-10 box-border"
        style={{ gridTemplateRows: "1fr auto auto" }}
      >
        <h1
          className="font-normal leading-[0.9] tracking-[-2px]"
          style={{
            fontSize: "clamp(50px, 5.5vw, 80px)",
            maxWidth: "fit-content",
            margin: "0 auto",
            alignContent: "center",
            justifySelf: "center",
          }}
        >
          <span className="rotateText block overflow-hidden">
            <p>Be natural</p>
          </span>
          <span className="opacityText block overflow-hidden">
            <i>more Attention</i>
          </span>
          <div className="grid" style={{ gridTemplateColumns: "auto 75%" }}>
            <span className="rotateText block overflow-hidden self-end">
              <i>Create</i>
            </span>
            <span className="opacityText block overflow-hidden self-end">
              <i>Developer</i>
            </span>
            <div
              className="svgAni flex items-center"
              style={{ gridRow: "1 / 3" }}
            >
              <Image
                src="/images/star-icon.svg"
                alt="star icon"
                width={80}
                height={80}
                className="w-full"
              />
            </div>
          </div>
        </h1>

        <h2
          className="opacity font-normal text-xl text-[#585858] mb-12.5"
          style={{ alignSelf: "flex-end" }}
        >
          Creation, production & distribution of Web.
          <br />
          <span>In Magazine. And everywhere else.</span>
        </h2>

        <div className="rotate flex justify-between">
          {VISUAL_OBJ_LIST.map((obj) => (
            <span key={obj.id} id={obj.id} className="w-[16%]">
              <Image
                src={obj.src}
                alt={obj.alt}
                width={200}
                height={200}
                className="w-full"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
