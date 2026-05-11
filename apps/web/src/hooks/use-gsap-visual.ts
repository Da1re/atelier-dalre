'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useGsapVisual = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // visual 섹션 로고 스크롤 분산 애니메이션
      const visual = gsap.timeline({
        scrollTrigger: {
          trigger: '.visual',
          start: '100% 100%',
          end: '100% 0%',
          scrub: 1,
        },
      })

      visual
        .to('#visual-obj-0', { x: -100, y: -50, rotate: 20, ease: 'none', duration: 5 }, 0)
        .to('#visual-obj-1', { x: -30, y: -150, rotate: -10, ease: 'none', duration: 5 }, 0)
        .to('#visual-obj-2', { x: 0, y: 400, rotate: -10, ease: 'none', duration: 5 }, 0)
        .to('#visual-obj-3', { x: 50, y: 300, rotate: 10, ease: 'none', duration: 5 }, 0)
        .to('#visual-obj-4', { x: 100, y: 100, rotate: -10, ease: 'none', duration: 5 }, 0)
        .to('#visual-obj-5', { x: 50, y: 450, rotate: 20, ease: 'none', duration: 5 }, 0)
    })

    return () => ctx.revert()
  }, [])
}
