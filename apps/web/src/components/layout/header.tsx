"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

type MenuType = "link" | "text" | "button";

interface MenuItem {
  label: string;
  type: MenuType;
  path?: string;
}

const MENU_LIST: MenuItem[] = [
  { label: "Home", type: "link", path: "/" },
  { label: "About", type: "link", path: "/about" },
  { label: "Work", type: "button", path: "/work" },
  { label: "Design System", type: "button", path: "/design" },
];

const DELAY_CLASSES = ["", "delay-75", "delay-100", "delay-150"];

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("header")) setMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const handleNavigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50">
      <div className="px-5 md:px-15 pb-0 flex justify-between items-center">
        <Link href="/" className="w-37.5 flex-shrink-0 z-50">
          <span className="py-0 px-px">
            <Image
              src="/images/logo/main-logo.png"
              alt="메인 로고"
              width={95}
              height={30}
              className="w-[95px] dark:invert"
            />
          </span>
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="relative flex-1 text-center min-h-15 hidden md:block">
          <button
            className="text-[10px] font-semibold absolute left-1/2 -translate-x-1/2 top-2.5 py-7.5 px-10 z-50 cursor-pointer text-foreground select-none bg-transparent border-0"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
          >
            MENU
            <span
              className={clsx(
                "block absolute left-1/2 -translate-x-1/2 top-[15px] h-px rounded-full bg-foreground transition-all duration-300",
                menuOpen ? "w-32.5" : "w-17.5",
              )}
              aria-hidden
            />
          </button>

          <ul
            className={clsx(
              "group/menu fixed left-1/2 -translate-x-1/2 w-[99vw] text-center rounded-[5px] pt-32.5 pb-12.5 box-border z-40 transition-all",
              menuOpen
                ? "top-2.5 opacity-100 pointer-events-auto duration-[400ms]"
                : "top-[-1300%] opacity-0 pointer-events-none duration-[1500ms]",
            )}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(30px)",
            }}
          >
            {MENU_LIST.map((item, idx) => {
              const delayClass = menuOpen && idx <= 3 ? DELAY_CLASSES[idx] : "";
              const animClass = clsx(
                "block text-[40px] font-normal duration-[600ms] transform",
                menuOpen ? "translate-y-0" : "-translate-y-25",
                delayClass,
              );
              const active = !!item.path && isActive(item.path);
              const itemClass = clsx(
                animClass,
                "transition-all duration-200",
                active
                  ? "text-primary"
                  : "text-foreground group-hover/menu:opacity-30 hover:!opacity-100 hover:text-primary",
              );

              if (item.type === "link") {
                return (
                  <li className="overflow-hidden py-1" key={item.label}>
                    <Link href={item.path!} className={itemClass} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li className="overflow-hidden py-1" key={item.label}>
                  <button
                    className={clsx(itemClass, "cursor-pointer bg-transparent border-0 outline-none text-center w-full")}
                    onClick={() => handleNavigate(item.path!)}
                    type="button"
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="w-37.5 shrink-0 flex items-center justify-end gap-4 z-50">
          <ThemeToggle />

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.25 w-6 h-6 bg-transparent border-0 cursor-pointer"
            type="button"
            aria-label="메뉴 열기"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
          >
            <span
              className={clsx(
                "block h-px bg-foreground rounded-full transition-all duration-300 origin-center",
                menuOpen ? "w-6 translate-y-1.75 rotate-45" : "w-6",
              )}
            />
            <span
              className={clsx(
                "block h-px bg-foreground rounded-full transition-all duration-300",
                menuOpen ? "opacity-0 w-0" : "w-4 opacity-100",
              )}
            />
            <span
              className={clsx(
                "block h-px bg-foreground rounded-full transition-all duration-300 origin-center",
                menuOpen ? "w-6 -translate-y-1.75 -rotate-45" : "w-6",
              )}
            />
          </button>
        </div>
      </div>

      {/* 모바일 드로어 */}
      <>
        <div
          className={clsx(
            "fixed inset-0 bg-foreground/20 z-40 md:hidden transition-opacity duration-300",
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={clsx(
            "fixed top-0 right-0 h-full w-72 z-50 md:hidden flex flex-col pt-20 pb-10 px-8 transition-transform duration-400",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
          style={{
            backgroundColor: "rgba(248, 248, 248, 0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <ul className="flex flex-col gap-1 flex-1">
            {MENU_LIST.map((item) => {
              const active = !!item.path && isActive(item.path);
              const itemClass = clsx(
                "block text-[32px] font-normal tracking-[-1px] py-2 transition-colors duration-200",
                active ? "text-primary" : "text-foreground/70 hover:text-primary",
              );

              if (item.type === "link") {
                return (
                  <li key={item.label}>
                    <Link href={item.path!} className={itemClass} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <button
                    className={clsx(itemClass, "cursor-pointer bg-transparent border-0 outline-none text-left w-full")}
                    onClick={() => handleNavigate(item.path!)}
                    type="button"
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-foreground/30 font-mono">© Dalre 2026</p>
        </nav>
      </>
    </header>
  );
};
