'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COLOR_MAP: Record<string, string> = {
  a: 'rgba(209, 219, 253, 0.6)',
  b: 'rgba(144, 195, 205, 0.41)',
  c: 'rgba(255, 119, 74, 0.6)',
  d: 'rgba(71, 177, 113, 0.52)',
  e: 'rgba(255, 185, 79, 0.52)',
}

const PROJECT_LIST = [
  { color: 'a', title: '비대면 원격근무 Workation Service', year: 2022 },
  { color: 'b', title: '스마트 소비재 부품 제조 협업 플랫폼', year: 2023 },
  { color: 'c', title: 'AI Dataset Web', year: 2023 },
  { color: 'd', title: 'Annotation Tool Lite Ver.', year: 2023 },
  { color: 'e', title: '', year: '' },
  { color: 'a', title: '', year: '' },
  { color: 'b', title: '', year: '' },
  { color: 'c', title: '', year: '' },
  { color: 'd', title: '', year: '' },
]

export const SectionProjects = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // con3 카드 3D 플립 애니메이션 — 스크롤 진입 시
      const listCards = document.querySelectorAll('.section-projects .listBox li')
      listCards.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: '0% 60%',
          onEnter: () => {
            gsap.set(el, { rotationX: '-65deg', z: '-500px', opacity: 0 })
            gsap.to(el, {
              rotationX: 0,
              z: 0,
              opacity: 1,
              delay: (i % 3) * 0.1,
            })
          },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-projects mb-37.5 px-15">
      <div className="flex justify-between">
        {/* sticky 제목 */}
        <div className="w-[28%]">
          <h4
            className="text-[60px] text-[#141212] sticky"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            My Projects
          </h4>
        </div>

        {/* 프로젝트 그리드 */}
        <ul
          className="listBox w-[70%] flex justify-between flex-wrap overflow-hidden"
          style={{ perspective: '900px' }}
        >
          {PROJECT_LIST.map((project, i) => (
            <li key={i} className="w-[32.2%] h-[25em] cursor-pointer relative">
              <div
                className="flex justify-center items-center relative overflow-hidden max-h-[80%] hover:opacity-70 transition-opacity"
                style={{ background: COLOR_MAP[project.color] }}
              >
                <div className="py-[10%]">
                  <Image
                    src="/images/logo/Main_Logo2_wh.png"
                    alt={project.title || ''}
                    width={200}
                    height={100}
                    className="w-[40%] py-[17%]"
                  />
                </div>
              </div>
              <h4 className="flex justify-between mt-[15px] mb-[50px] font-semibold tracking-[-1.8px] text-[#141212]">
                <span>{project.title}</span>
                <span className="opacity-60 font-normal">{project.year}</span>
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
