"use client";

import { useHeaderTones } from "@/hooks/use-header-tones";
import type { HeaderTone } from "@/hooks/use-header-tones";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import { useMegaMenu } from "@/hooks/use-mega-menu";
import type { MegaMenuKey } from "@/hooks/use-mega-menu";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Ref } from "react";
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

const TONE_CLASS: Record<HeaderTone, string> = {
  dark: "[--foreground:var(--paper)] [--primary:#8fbf78] dark:[--foreground:inherit]",
  photo:
    "[--foreground:var(--paper)] [--primary:#8fbf78] dark:[--foreground:inherit] drop-shadow-[0_0_2px_rgba(20,16,8,0.7),0_1px_8px_rgba(20,16,8,0.45)]",
  light: "[--foreground:var(--ink)] [--primary:#4d7a3a]",
  auto: "",
};

const LOGO_TONE_CLASS: Record<HeaderTone, string> = {
  dark: "invert",
  photo:
    "invert drop-shadow-[0_0_2px_rgba(20,16,8,0.7),0_1px_8px_rgba(20,16,8,0.45)]",
  light: "",
  auto: "dark:invert",
};

function isActivePath(pathname: string, path: string) {
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}

export const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeMenu, openMenu, scheduleClose, closeNow } = useMegaMenu();
  const hidden = useHideOnScroll();
  const { logoRef, navRef, iconsRef, tones } = useHeaderTones(
    activeMenu !== null,
  );

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("header, [data-mobile-nav]")) setMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    closeNow();
  }, [pathname, closeNow]);

  return (
    <>
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
            <HeaderLogo ref={logoRef} tone={tones.logo} onClick={closeNow} />

            <DesktopNav
              ref={navRef}
              className={TONE_CLASS[tones.nav]}
              activeMenu={activeMenu}
              openMenu={openMenu}
              scheduleClose={scheduleClose}
              closeNow={closeNow}
            />

            <div
              ref={iconsRef}
              className={clsx(
                "w-37.5 shrink-0 flex items-center justify-end gap-4 transition-[filter] duration-300",
                TONE_CLASS[tones.icons],
              )}
            >
              <ThemeToggle />
              <MenuButton
                open={menuOpen}
                onToggle={() => setMenuOpen((prev) => !prev)}
              />
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
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

interface HeaderLogoProps {
  ref: Ref<HTMLImageElement>;
  tone: HeaderTone;
  onClick: () => void;
}

function HeaderLogo({ ref, tone, onClick }: HeaderLogoProps) {
  return (
    <Link href="/" className="w-37.5 shrink-0" onClick={onClick}>
      <span className="py-0 px-px">
        <Image
          ref={ref}
          src="/images/logo/main-logo.png"
          alt="메인 로고"
          width={338}
          height={70}
          className={clsx(
            "w-23.75 h-auto transition-[filter] duration-300",
            LOGO_TONE_CLASS[tone],
          )}
        />
      </span>
    </Link>
  );
}

interface DesktopNavProps {
  ref: Ref<HTMLElement>;
  className: string;
  activeMenu: MegaMenuKey;
  openMenu: (key: MegaMenuKey) => void;
  scheduleClose: () => void;
  closeNow: () => void;
}

function DesktopNav({
  ref,
  className,
  activeMenu,
  openMenu,
  scheduleClose,
  closeNow,
}: DesktopNavProps) {
  const pathname = usePathname();

  const handleEnter = (item: MenuItem) => {
    if (!item.hasMegaMenu) {
      scheduleClose();
      return;
    }
    openMenu(item.key as "work" | "design");
  };

  return (
    <nav
      ref={ref}
      className={clsx(
        "hidden md:flex flex-1 justify-center items-center transition-[filter] duration-300",
        className,
      )}
    >
      <ul className="flex items-center gap-1">
        {MENU_LIST.map((item) => {
          const active = isActivePath(pathname, item.path);
          const isMegaOpen = item.hasMegaMenu && activeMenu === item.key;
          const highlight = active || isMegaOpen;
          return (
            <li key={item.key} onMouseEnter={() => handleEnter(item)}>
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
  );
}

interface MenuButtonProps {
  open: boolean;
  onToggle: () => void;
}

function MenuButton({ open, onToggle }: MenuButtonProps) {
  return (
    <button
      className="md:hidden flex flex-col justify-center gap-1.25 w-6 h-6 bg-transparent border-0 cursor-pointer"
      type="button"
      aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
      aria-expanded={open}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <span
        className={clsx(
          "block h-px bg-foreground rounded-full transition-all duration-300 origin-center",
          open ? "w-6 translate-y-1.75 rotate-45" : "w-6",
        )}
      />
      <span
        className={clsx(
          "block h-px bg-foreground rounded-full transition-all duration-300",
          open ? "opacity-0 w-0" : "w-4 opacity-100",
        )}
      />
      <span
        className={clsx(
          "block h-px bg-foreground rounded-full transition-all duration-300 origin-center",
          open ? "w-6 -translate-y-1.75 -rotate-45" : "w-6",
        )}
      />
    </button>
  );
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

function MobileNav({ open, onClose }: MobileNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-foreground/20 z-40 md:hidden transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />
      <nav
        data-mobile-nav
        inert={!open}
        className={clsx(
          "fixed top-0 right-0 h-full w-72 z-45 md:hidden flex flex-col pt-20 pb-10 px-8 bg-background/95 backdrop-blur-[20px] transition-transform duration-400",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <ul className="flex flex-col gap-1 flex-1">
          {MENU_LIST.map((item) => {
            const active = isActivePath(pathname, item.path);
            const itemClass = clsx(
              "block text-[32px] font-normal tracking-[-1px] py-2 rounded-md transition-colors duration-200 cursor-pointer bg-transparent border-0 text-left w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
              active ? "text-primary" : "text-foreground/70 hover:text-primary",
            );

            return (
              <li key={item.key}>
                <button
                  className={itemClass}
                  onClick={() => handleNavigate(item.path)}
                  type="button"
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-foreground/55 font-mono">© Dalre 2026</p>
      </nav>
    </>
  );
}
