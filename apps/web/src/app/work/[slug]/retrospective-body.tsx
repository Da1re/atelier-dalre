'use client'

import { useState } from 'react'

interface Props {
  retrospective: string
  retroKeywords?: string[]
  accentColor: string
}

export function RetrospectiveBody({
  retrospective,
  retroKeywords,
  accentColor,
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null)
  const activeIndex = hoveredIndex ?? pinnedIndex
  const paragraphs = retrospective.split('\n\n')
  const hasKeywords = !!retroKeywords && retroKeywords.length > 0

  if (!hasKeywords) {
    return (
      <div className="max-w-180">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-[17px] text-foreground/70 leading-[1.9] mb-5"
          >
            {para}
          </p>
        ))}
      </div>
    )
  }

  const handleEnter = (i: number) => () => setHoveredIndex(i)
  const handleLeave = () => setHoveredIndex(null)
  const handlePin = (i: number) => () => {
    setPinnedIndex((prev) => (prev === i ? null : i))
  }

  return (
    <div className="grid grid-cols-[1fr_280px] gap-12">
      <div className="max-w-180">
        {paragraphs.map((para, i) => (
          <div key={i} className="mb-5">
            <p
              className="text-[17px] text-foreground/70 leading-[1.9] rounded-md -mx-3 px-3 -my-2 py-2 transition-colors duration-200"
              style={{
                backgroundColor:
                  activeIndex === i
                    ? `color-mix(in srgb, ${accentColor} 8%, transparent)`
                    : 'transparent',
              }}
            >
              {para}
            </p>
          </div>
        ))}
      </div>
      <aside className="sticky top-30 self-start">
        <h3 className="text-[11px] font-semibold tracking-[2px] text-foreground/40 uppercase mb-1">
          Key Themes
        </h3>
        <p className="text-[11px] text-foreground/35 italic mb-4">
          마우스를 올려보면 본문이 강조돼요
        </p>
        <ul className="space-y-2">
          {retroKeywords!.map((keyword, i) => (
            <li key={i}>
              <button
                type="button"
                onMouseEnter={handleEnter(i)}
                onMouseLeave={handleLeave}
                onClick={handlePin(i)}
                className="w-full text-left text-[13px] leading-[1.6] pl-3 py-1.5 border-l-2 cursor-pointer transition-colors duration-200 rounded-r-md"
                style={{
                  borderColor: accentColor,
                  color:
                    activeIndex === i
                      ? accentColor
                      : 'color-mix(in srgb, var(--foreground) 60%, transparent)',
                  backgroundColor:
                    pinnedIndex === i
                      ? `color-mix(in srgb, ${accentColor} 6%, transparent)`
                      : 'transparent',
                }}
              >
                {keyword}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
