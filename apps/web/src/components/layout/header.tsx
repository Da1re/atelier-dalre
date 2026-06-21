"use client";

import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import { useMegaMenu } from "@/hooks/use-mega-menu";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MegaMenuDesign } from "./mega-menu-design";
import { MegaMenuWork } from "./mega-menu-work";
import { ThemeToggle } from "./theme-toggle";

type MenuKey = "home" | "about" | "work" | "design";

interface MenuItem {
  key: MenuKey;
  label: string;
  path: string;
  hasMegaMenu: boolean;
}

const MENU_LIST: MenuItem[] = [
  { key: "home", label: "Home", path: "/", hasMegaMenu: false },
  { key: "about", label: "About", path: "/about", hasMegaMenu: false },
  { key: "work", label: "Work", path: "/work", hasMegaMenu: true },
  { key: "design", label: "Design System", path: "/design", hasMegaMenu: true },
];

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeMenu, openMenu, scheduleClose, closeNow } = useMegaMenu();
  const hidden = useHideOnScroll();

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

  useEffect(() => {
    closeNow();
  }, [pathname, closeNow]);

  const handleMobileNavigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <header
      className={clsx(
        "fixed top-3 md:top-4 left-3 md:left-10 right-3 md:right-10 z-50 transition-transform duration-700 ease-out will-change-transform",
        hidden && !menuOpen && !activeMenu
          ? "translate-y-[-200%]"
          : "translate-y-0",
      )}
    >
      <div
        onMouseLeave={scheduleClose}
        className={clsx(
          "rounded-[14px] border overflow-hidden transition-[background-color,border-color,box-shadow,backdrop-filter] ease-out",
          activeMenu
            ? "duration-300 border-foreground/10 bg-background/85 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]"
            : "duration-650 border-transparent bg-transparent shadow-none",
        )}
      >
        <div className="px-5 md:px-10 py-4 md:py-5 flex justify-between items-center">
          <Link href="/" className="w-37.5 shrink-0" onClick={closeNow}>
            <span className="py-0 px-px">
              <Image
                src="/images/logo/main-logo.png"
                alt="메인 로고"
                width={95}
                height={30}
                className="w-23.75 dark:invert"
              />
            </span>
          </Link>

          <nav className="hidden md:flex flex-1 justify-center items-center">
            <ul className="flex items-center gap-1">
              {MENU_LIST.map((item) => {
                const active = isActive(item.path);
                const isMegaOpen = item.hasMegaMenu && activeMenu === item.key;
                const highlight = active || isMegaOpen;
                return (
                  <li
                    key={item.key}
                    onMouseEnter={() => {
                      if (item.hasMegaMenu) {
                        openMenu(item.key as "work" | "design");
                        return;
                      }
                      scheduleClose();
                    }}
                  >
                    <Link
                      href={item.path}
                      onClick={closeNow}
                      className={clsx(
                        "group inline-flex flex-col items-center gap-1.5 px-5 py-2.5 text-[13px] font-medium tracking-tight transition-colors",
                        highlight
                          ? "text-foreground"
                          : "text-foreground/60 hover:text-foreground",
                      )}
                    >
                      {item.label}
                      <span
                        className={clsx(
                          "block w-1 h-1 rounded-full transition-all duration-200",
                          highlight
                            ? "bg-primary scale-100"
                            : "bg-foreground/30 scale-75 group-hover:scale-100 group-hover:bg-foreground/70",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="w-37.5 shrink-0 flex items-center justify-end gap-4">
            <ThemeToggle />

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

        <div
          className={clsx(
            "hidden md:grid transition-[grid-template-rows] ease-out",
            activeMenu ? "duration-400" : "duration-650",
          )}
          style={{ gridTemplateRows: activeMenu ? "1fr" : "0fr" }}
          aria-hidden={!activeMenu}
        >
          <div className="overflow-hidden">
            {activeMenu === "work" && <MegaMenuWork onItemClick={closeNow} />}
            {activeMenu === "design" && (
              <MegaMenuDesign onItemClick={closeNow} />
            )}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "fixed inset-0 bg-foreground/20 z-40 md:hidden transition-opacity duration-300",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
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
            const active = isActive(item.path);
            const itemClass = clsx(
              "block text-[32px] font-normal tracking-[-1px] py-2 transition-colors duration-200 cursor-pointer bg-transparent border-0 outline-none text-left w-full",
              active ? "text-primary" : "text-foreground/70 hover:text-primary",
            );

            return (
              <li key={item.key}>
                <button
                  className={itemClass}
                  onClick={() => handleMobileNavigate(item.path)}
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
    </header>
  );
};
