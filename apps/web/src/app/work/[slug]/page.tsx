import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS } from '@/models/project-data'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <div className="pt-30 pb-25">
      {/* 뒤로가기 */}
      <div className="px-15 mb-10">
        <Link href="/work" className="text-[13px] text-[#141212]/40 hover:text-[#141212] transition-colors">
          ← Work 목록으로
        </Link>
      </div>

      {/* 커버 */}
      <div
        className="mx-15 rounded-[10px] p-15 mb-15"
        style={{ backgroundColor: project.coverColor }}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-xs font-semibold tracking-[2px] text-[#141212]/50 uppercase">
            {project.tag}
          </span>
          {project.status === 'in-progress' && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#0358d5] text-white">
              진행중
            </span>
          )}
        </div>
        <h1 className="text-[56px] font-normal tracking-[-3px] text-[#141212] leading-[1.0] mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-[#141212]/60 mb-8">{project.subtitle}</p>

        <div className="flex gap-10 text-sm text-[#141212]/50 border-t border-[#141212]/10 pt-6">
          <div>
            <span className="block text-[11px] tracking-[1px] uppercase mb-1">Company</span>
            <span className="font-semibold text-[#141212]">{project.company}</span>
          </div>
          <div>
            <span className="block text-[11px] tracking-[1px] uppercase mb-1">Period</span>
            <span className="font-semibold text-[#141212]">{project.period}</span>
          </div>
          <div>
            <span className="block text-[11px] tracking-[1px] uppercase mb-1">Contribution</span>
            <span className="font-semibold text-[#141212]">{project.contribution}</span>
          </div>
        </div>
      </div>

      {/* 기술 스택 */}
      <div className="px-15 mb-15">
        <h2 className="text-[13px] font-semibold tracking-[2px] text-[#141212]/40 uppercase mb-4">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[13px] font-semibold px-3.5 py-1.5 rounded-full border border-[#141212]/15 text-[#141212]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 주요 역할 */}
      <div className="px-15 mb-15">
        <h2 className="text-[13px] font-semibold tracking-[2px] text-[#141212]/40 uppercase mb-8">
          Key Highlights
        </h2>
        <div className="grid gap-4">
          {project.highlights.map((highlight, i) => (
            <div key={i} className="p-8 rounded-[10px] bg-white/60 border border-[#141212]/8">
              <div className="flex items-start gap-4">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                  style={{ backgroundColor: project.accentColor }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#141212] tracking-[-0.5px] mb-2.5">
                    {highlight.title}
                  </h3>
                  <p className="text-[15px] text-[#141212]/60 leading-[1.8]">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 회고 */}
      {project.retrospective && (
        <div className="px-15 mb-15">
          <h2 className="text-[13px] font-semibold tracking-[2px] text-[#141212]/40 uppercase mb-8">
            Retrospective
          </h2>
          <div className="max-w-[720px]">
            {project.retrospective.split('\n\n').map((para, i) => (
              <p key={i} className="text-[17px] text-[#141212]/70 leading-[1.9] mb-5">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 다른 프로젝트 */}
      <div className="px-15 border-t border-[#141212]/10 pt-10">
        <h2 className="text-[13px] font-semibold tracking-[2px] text-[#141212]/40 uppercase mb-6">
          Other Projects
        </h2>
        <div className="flex gap-4">
          {PROJECTS.filter((p) => p.slug !== slug)
            .slice(0, 3)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group flex-1 p-6 rounded-[10px] hover:opacity-80 transition-opacity"
                style={{ backgroundColor: p.coverColor }}
              >
                <span className="block text-[11px] font-semibold tracking-[1px] text-[#141212]/50 uppercase mb-2">
                  {p.tag}
                </span>
                <h3 className="text-base font-normal text-[#141212] tracking-[-0.5px] leading-[1.3]">
                  {p.title}
                </h3>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
