'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type MenuType = 'link' | 'text' | 'button'

interface MenuItem {
  label: string
  type: MenuType
  path?: string
}

const MENU_LIST: MenuItem[] = [
  { label: 'Home', type: 'link', path: '/' },
  { label: 'About', type: 'text' },
  { label: 'Work', type: 'button', path: '/work' },
  { label: 'Design System', type: 'button', path: '/design' },
]

const DELAY_CLASSES = ['', 'delay-75', 'delay-100', 'delay-150']

export const Header = () => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('header')) setMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  const handleNavigate = (path: string) => {
    router.push(path)
    setMenuOpen(false)
  }

  return (
    <header className="fixed w-full z-50">
      <div className="pt-10 px-15 pb-0 flex justify-between items-center">
        <Link href="/" className="w-37.5 flex-shrink-0 z-50">
          <span className="py-0 px-px">
            <Image src="/images/logo/main-logo.png" alt="메인 로고" width={95} height={30} className="w-[95px]" />
          </span>
        </Link>

        <nav className="relative flex-1 text-center min-h-15">
          <button
            className="text-[10px] font-semibold absolute left-1/2 -translate-x-1/2 top-2.5 py-7.5 px-0 z-50 cursor-pointer text-[#141212] select-none bg-transparent border-0"
            type="button"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((prev) => !prev) }}
          >
            MENU
            <span
              className={clsx(
                'block absolute left-1/2 -translate-x-1/2 top-[15px] h-px rounded-full bg-[#141212] transition-all duration-300',
                menuOpen ? 'w-32.5' : 'w-17.5',
              )}
              aria-hidden
            />
          </button>

          <ul
            className={clsx(
              'fixed left-1/2 -translate-x-1/2 w-[99vw] text-center rounded-[5px] pt-32.5 pb-12.5 box-border z-40 transition-all',
              menuOpen
                ? 'top-2.5 opacity-100 pointer-events-auto duration-[400ms]'
                : 'top-[-1300%] opacity-0 pointer-events-none duration-[1500ms]',
            )}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(30px)' }}
          >
            {MENU_LIST.map((item, idx) => {
              const delayClass = menuOpen && idx <= 3 ? DELAY_CLASSES[idx] : ''
              const animClass = clsx(
                'block text-[40px] transition-all duration-[600ms] transform',
                menuOpen ? 'translate-y-0' : '-translate-y-25',
                delayClass,
              )

              if (item.type === 'link') {
                return (
                  <li className="overflow-hidden py-1" key={item.label}>
                    <Link href={item.path!} className={clsx(animClass, 'text-[#141212]')}>{item.label}</Link>
                  </li>
                )
              }

              if (item.type === 'text') {
                return (
                  <li className="overflow-hidden py-1" key={item.label}>
                    <span className={clsx(animClass, 'text-[#d3d3d3]')}>{item.label}</span>
                  </li>
                )
              }

              return (
                <li className="overflow-hidden py-1" key={item.label}>
                  <button
                    className={clsx(animClass, 'text-[#141212] cursor-pointer bg-transparent border-0 outline-none text-center w-full')}
                    onClick={() => handleNavigate(item.path!)}
                    type="button"
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="w-37.5 flex-shrink-0 flex justify-end items-center z-50" />
      </div>
    </header>
  )
}
