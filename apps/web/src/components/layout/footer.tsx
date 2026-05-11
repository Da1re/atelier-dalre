'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const Footer = () => {
  const logoWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: 'footer',
            start: '0% 100%',
            end: '70% 0%',
            scrub: 1,
          },
        })
        .to(logoWrapRef.current, { top: '20%', ease: 'none', duration: 5 }, 0)
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer className="relative overflow-hidden">
      <div className="h-screen px-[75px] pt-[75px] pb-6 box-border flex flex-col">
        <div className="pt-12.5 flex flex-col flex-grow z-10" style={{ background: 'rgba(247,247,247,0.26)', backdropFilter: 'blur(100px)' }}>

          {/* mainTextBox */}
          <div className="text-center px-10">
            <h2 className="text-[70px] uppercase tracking-[-8px] font-normal mb-7.5 text-[#141212]">
              💌 Comment
            </h2>
            <p className="text-[#141212] tracking-[-1.2px] font-semibold leading-8">
              제 포트폴리오 웹사이트를 방문해주셔서 감사합니다 :)
              <br />
              앞으로도 꾸준히 업데이트하며, 더 많은 프로젝트와 성과를 공유하겠습니다.
              <br />
              함께 멋진 미래를 만들어 나가길 기대합니다!
            </p>
          </div>

          {/* talkBtn */}
          <div className="grid place-items-center flex-grow">
            <a
              href="mailto:wien2009@naver.com"
              className="block w-[95px] h-[95px] rounded-full shadow-[0_0_0_13px_#f8f8f8,0_0_50px_rgba(255,255,255,0.3)]"
            >
              <span className="block w-[95%] h-[95%] mx-auto my-[2.5%] rounded-full bg-[#0358d5] transition-all duration-300 hover:w-full hover:h-full hover:my-0" />
            </a>
          </div>

          {/* btnBox */}
          <div className="flex justify-center border-t border-white/20">
            <a
              href="https://dalre.tistory.com/"
              className="m-5 px-2.5 py-2.5 bg-transparent text-[#0358d5] opacity-50 text-[13px] font-semibold uppercase hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              tistory
            </a>
            <a
              href="https://github.com/Da1re"
              className="m-5 px-2.5 py-2.5 bg-transparent text-[#0358d5] opacity-50 text-[13px] font-semibold uppercase hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              git
            </a>
          </div>
        </div>

        {/* copyright */}
        <div className="text-center pt-6 text-xs text-[#141212]">
          <p>Dalre &#64; 2026</p>
        </div>
      </div>

      <div
        ref={logoWrapRef}
        className="absolute left-0 top-[-50%] w-full z-0 flex justify-between pointer-events-none"
      >
        {['visual-obj-0', 'visual-obj-1', 'visual-obj-2', 'visual-obj-3', 'visual-obj-4', 'visual-obj-5'].map((id) => (
          <span key={id} className="w-[16%]">
            <Image src={`/images/logo/${id}.png`} alt="" width={200} height={200} className="w-full" />
          </span>
        ))}
      </div>
    </footer>
  )
}
