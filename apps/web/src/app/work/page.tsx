import Link from 'next/link'
import { PROJECTS, FEATURED_PROJECTS } from '@/models/project-data'

export const metadata = {
  title: 'Work | Dalre',
  description: '유수빈의 프로젝트 경험',
}

export default function WorkPage() {
  return (
    <div className="pt-30 px-5 md:px-15 pb-25">
      {/* 페이지 헤더 */}
      <div className="mb-20">
        <h1 className="font-normal tracking-[-3px] md:tracking-[-5px] text-foreground leading-[0.9]" style={{ fontSize: "clamp(56px, 10vw, 100px)" }}>
          Work
        </h1>
        <p className="text-xl text-foreground/50 mt-5">
          {PROJECTS.length}개의 프로젝트 — 프론트엔드 개발자로서의 기록
        </p>
      </div>

      {/* 주요 프로젝트 */}
      <div className="mb-20">
        <h2 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-6">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURED_PROJECTS.map((project) => {
            const isDark = !!project.textColor
            const fg = project.textColor ?? 'var(--foreground)'
            const fgMuted = isDark ? 'rgba(255,255,255,0.6)' : 'color-mix(in srgb, var(--foreground) 60%, transparent)'
            const fgSubtle = isDark ? 'rgba(255,255,255,0.4)' : 'color-mix(in srgb, var(--foreground) 40%, transparent)'
            const tagBg = isDark ? 'rgba(255,255,255,0.15)' : 'color-mix(in srgb, white 60%, transparent)'

            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group relative rounded-[10px] overflow-hidden min-h-80 md:min-h-95 flex flex-col justify-between p-6 md:p-10 cursor-pointer"
                style={{ backgroundColor: project.coverColor }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs font-semibold tracking-[2px] uppercase"
                      style={{ color: fgMuted }}
                    >
                      {project.tag}
                    </span>
                    {project.status === 'in-progress' && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary text-white">
                        진행중
                      </span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: fgSubtle }}>
                    {project.period} · {project.company}
                  </p>
                </div>

                <div>
                  <h3
                    className="text-xl md:text-3xl font-normal tracking-[-0.5px] md:tracking-[-1.5px] leading-[1.1] mb-2.5 group-hover:opacity-70 transition-opacity"
                    style={{ color: fg }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm leading-[1.6] mb-5" style={{ color: fgMuted }}>
                    {project.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-semibold px-2.5 py-0.75 rounded-full"
                        style={{ backgroundColor: tagBg, color: fg }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  className="absolute top-6 right-6 md:top-10 md:right-10 text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  style={{ color: fgSubtle }}
                >
                  ↗
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 기타 프로젝트 — 게시판형 */}
      <div>
        <h2 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-6">
          All Projects
        </h2>
        <ul className="border-t border-foreground/10">
          {PROJECTS.map((project, i) => (
            <li key={project.slug} className="border-b border-foreground/10">
              <Link
                href={`/work/${project.slug}`}
                className="group flex items-center justify-between py-6 hover:px-3 transition-all"
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm text-foreground/20 font-mono w-7">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: project.status === 'in-progress' ? project.accentColor : 'transparent' }}
                  />
                  <div>
                    <h3 className="text-xl font-normal text-foreground tracking-[-0.5px]">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-foreground/40 mt-0.5">{project.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-xs text-foreground/40 hidden md:block">{project.tag}</span>
                  <span className="text-xs text-foreground/40 hidden md:block">{project.period}</span>
                  <span className="text-xs font-semibold text-foreground/40">기여도 {project.contribution}</span>
                  <span className="text-base text-foreground/30 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
