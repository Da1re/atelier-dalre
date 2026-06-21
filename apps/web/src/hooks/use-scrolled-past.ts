"use client";

import { useEffect, useState } from "react";

/** 스크롤이 offset(px)을 넘었는지 여부를 반환한다. */
export const useScrolledPast = (offset: number) => {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => setPast(window.scrollY > offset);

    handleScroll(); // 초기 위치 반영
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return past;
};
