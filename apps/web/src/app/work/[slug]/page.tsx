import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS } from '@/models/project-data'
import { RetrospectiveBody } from './retrospective-body'

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
    <div className="pt-30 pb-25 max-w-screen-2xl mx-auto w-full">
      <div className="px-15 mb-10">
        <Link href="/work" className="text-[13px] text-foreground/40 hover:text-foreground transition-colors">
          ← Work 목록으로
        </Link>
      </div>

      {(() => {
        const isDark = !!project.textColor
        const fg = project.textColor ?? 'var(--foreground)'
        const fgMuted = isDark ? 'rgba(255,255,255,0.5)' : 'color-mix(in srgb, var(--foreground) 50%, transparent)'
        const fgSub = isDark ? 'rgba(255,255,255,0.6)' : 'color-mix(in srgb, var(--foreground) 60%, transparent)'
        const borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'color-mix(in srgb, var(--foreground) 10%, transparent)'

        return (
          <div
            className="mx-15 rounded-[10px] p-15 mb-15"
            style={{ backgroundColor: project.coverColor }}
          >
            <div className="flex items-center gap-2.5 mb-4">
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
            <h1
              className="text-[56px] font-normal tracking-[-3px] leading-none mb-4"
              style={{ color: fg }}
            >
              {project.title}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-lg" style={{ color: fgSub }}>
                {project.subtitle}
              </p>
              {project.siteUrl && (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-opacity hover:opacity-70"
                  style={{ borderColor, color: fg }}
                >
                  사이트 바로가기 ↗
                </a>
              )}
            </div>

            <div
              className="flex gap-10 text-sm pt-6"
              style={{ borderTop: `1px solid ${borderColor}`, color: fgMuted }}
            >
              <div>
                <span className="block text-[11px] tracking-[1px] uppercase mb-1">Company</span>
                <span className="font-semibold" style={{ color: fg }}>{project.company}</span>
              </div>
              <div>
                <span className="block text-[11px] tracking-[1px] uppercase mb-1">Period</span>
                <span className="font-semibold" style={{ color: fg }}>{project.period}</span>
              </div>
              <div>
                <span className="block text-[11px] tracking-[1px] uppercase mb-1">Contribution</span>
                <span className="font-semibold" style={{ color: fg }}>{project.contribution}</span>
              </div>
            </div>
          </div>
        )
      })()}

      <div className="px-15 mb-15">
        <h2 className="text-[13px] font-semibold tracking-[2px] text-foreground/40 uppercase mb-4">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[13px] font-semibold px-3.5 py-1.5 rounded-full border border-foreground/15 text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.highlights.length > 0 && (
        <div className="px-15 mb-15">
          <h2 className="text-[13px] font-semibold tracking-[2px] text-foreground/40 uppercase mb-8">
            Key Highlights
          </h2>
          <div className="grid gap-4">
            {project.highlights.map((highlight, i) => (
              <div key={i} className="p-8 rounded-[10px] bg-white/60 border border-foreground/8">
                <div className="flex items-start gap-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground tracking-[-0.5px] mb-2.5">
                      {highlight.title}
                    </h3>
                    <p className="text-[15px] text-foreground/60 leading-[1.8]">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.retrospective && (
        <div className="px-15 mb-15">
          <h2 className="text-[13px] font-semibold tracking-[2px] text-foreground/40 uppercase mb-8">
            Retrospective
          </h2>
          <RetrospectiveBody
            retrospective={project.retrospective}
            retroKeywords={project.retroKeywords}
            accentColor={project.accentColor}
          />
        </div>
      )}

      <div className="px-15 border-t border-foreground/10 pt-10">
        <h2 className="text-[13px] font-semibold tracking-[2px] text-foreground/40 uppercase mb-6">
          Other Projects
        </h2>
        <div className="flex gap-4">
          {PROJECTS.filter((p) => p.slug !== slug)
            .slice(0, 3)
            .map((p) => {
              const isDark = !!p.textColor
              const fg = p.textColor ?? 'var(--foreground)'
              const fgMuted = isDark ? 'rgba(255,255,255,0.5)' : 'color-mix(in srgb, var(--foreground) 50%, transparent)'

              return (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group flex-1 p-6 rounded-[10px] hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: p.coverColor }}
                >
                  <span
                    className="block text-[11px] font-semibold tracking-[1px] uppercase mb-2"
                    style={{ color: fgMuted }}
                  >
                    {p.tag}
                  </span>
                  <h3
                    className="text-base font-normal tracking-[-0.5px] leading-[1.3]"
                    style={{ color: fg }}
                  >
                    {p.title}
                  </h3>
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}
