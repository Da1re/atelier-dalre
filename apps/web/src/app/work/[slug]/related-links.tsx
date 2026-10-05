import Link from 'next/link'
import type { ProjectLink } from '@/models/project'

interface RelatedLinksProps {
  links?: ProjectLink[]
}

export function RelatedLinks({ links }: RelatedLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <div className="px-15 mb-15">
      <h2 className="text-[13px] font-semibold tracking-[2px] text-foreground/40 uppercase mb-6">
        Design Notes
      </h2>
      <ul className="flex flex-wrap gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2 rounded-full border border-primary/25 text-primary hover:bg-primary hover:text-background transition-colors"
            >
              {link.label}
              <span aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
