"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type MegaMenuKey = "work" | "design" | null;

const CLOSE_DELAY_MS = 150;

export const useMegaMenu = () => {
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) return;
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const openMenu = useCallback(
    (key: MegaMenuKey) => {
      clearCloseTimer();
      setActiveMenu(key);
    },
    [clearCloseTimer],
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const closeNow = useCallback(() => {
    clearCloseTimer();
    setActiveMenu(null);
  }, [clearCloseTimer]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  return { activeMenu, openMenu, scheduleClose, closeNow, clearCloseTimer };
};
