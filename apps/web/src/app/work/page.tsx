import Link from 'next/link'
import { PROJECTS, FEATURED_PROJECTS, OTHER_PROJECT_LIST } from '@/models/project-data'

export const metadata = {
  title: 'Work | Dalre',
  description: '유수빈의 프로젝트 경험',
}

export default function WorkPage() {
  return (
    <div className="pt-30 px-15 pb-25">
      {/* 페이지 헤더 */}
      <div className="mb-20">
        <h1 className="text-[100px] font-normal tracking-[-5px] text-[#141212] leading-[0.9]">
          Work
        </h1>
        <p className="text-xl text-[#585858] mt-5">
          {PROJECTS.length}개의 프로젝트 — 프론트엔드 개발자로서의 기록
        </p>
      </div>

      {/* 주요 프로젝트 */}
      <div className="mb-20">
        <h2 className="text-[13px] font-semibold tracking-[3px] text-[#141212]/40 uppercase mb-6">
          Featured Projects
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {FEATURED_PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group relative rounded-[10px] overflow-hidden min-h-[380px] flex flex-col justify-between p-10 cursor-pointer"
              style={{ backgroundColor: project.coverColor }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold tracking-[2px] text-[#141212]/60 uppercase">
                    {project.tag}
                  </span>
                  {project.status === 'in-progress' && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#0358d5] text-white">
                      진행중
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#141212]/40">{project.period} · {project.company}</p>
              </div>

              <div>
                <h3 className="text-3xl font-normal tracking-[-1.5px] text-[#141212] leading-[1.1] mb-2.5 group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-sm text-[#141212]/50 leading-[1.6] mb-5">
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-[11px] font-semibold px-2.5 py-0.75 rounded-full bg-white/60 text-[#141212]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <span className="absolute top-10 right-10 text-lg text-[#141212]/30 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 기타 프로젝트 — 게시판형 */}
      <div>
        <h2 className="text-[13px] font-semibold tracking-[3px] text-[#141212]/40 uppercase mb-6">
          All Projects
        </h2>
        <ul className="border-t border-[#141212]/10">
          {OTHER_PROJECT_LIST.map((project, i) => (
            <li key={project.slug} className="border-b border-[#141212]/10">
              <Link
                href={`/work/${project.slug}`}
                className="group flex items-center justify-between py-6 hover:px-3 transition-all"
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm text-[#141212]/20 font-mono w-7">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <div>
                    <h3 className="text-xl font-normal text-[#141212] tracking-[-0.5px]">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-[#141212]/40 mt-0.5">{project.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-xs text-[#141212]/40 hidden md:block">{project.tag}</span>
                  <span className="text-xs text-[#141212]/40 hidden md:block">{project.period}</span>
                  <span className="text-xs font-semibold text-[#141212]/40">기여도 {project.contribution}</span>
                  <span className="text-base text-[#141212]/30 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
