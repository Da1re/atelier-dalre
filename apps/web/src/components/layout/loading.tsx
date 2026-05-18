"use client";

import Image from "next/image";
import { useEffect } from "react";

export const Loading = () => {
  useEffect(() => {
    const loading = document.querySelector(".loading") as HTMLElement | null;
    if (!loading) return;

    const rotate = document.querySelectorAll<HTMLElement>(".rotate");
    const opacity = document.querySelectorAll<HTMLElement>(".opacity");
    // .rotateText / .opacityText 는 GSAP 으로 처리하므로 .on 부착 제외

    const t1 = setTimeout(() => loading.classList.add("scene1"), 0);
    const t2 = setTimeout(() => loading.classList.add("scene2"), 1500);
    const t3 = setTimeout(() => {
      loading.classList.remove("scene1", "scene2");
      sessionStorage.setItem("loadingDone", "1");
    }, 2500);
    const t4 = setTimeout(
      () => rotate.forEach((el) => el.classList.add("on")),
      2500,
    );
    const t6 = setTimeout(
      () => opacity.forEach((el) => el.classList.add("on")),
      2500,
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t6);
    };
  }, []);

  return (
    <div className="loading">
      <div className="logo">
        <span>
          <Image
            src="/images/logo/main-logo.png"
            alt=""
            width={200}
            height={60}
            className="w-full dark:invert"
          />
        </span>
      </div>
    </div>
  );
};
