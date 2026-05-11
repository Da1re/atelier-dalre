import { FEATURED_PROJECTS, OTHER_PROJECT_LIST } from "@/models/project-data";
import Link from "next/link";

export const SectionWork = () => {
  return (
    <section className="mb-37.5 px-15">
      <div className="flex justify-between items-end mb-15 border-t border-[#3b3b3b] pt-10">
        <h2 className="text-[80px] font-normal tracking-[-4px] text-[#141212]">
          Work
        </h2>
        <Link
          href="/work"
          className="text-sm font-semibold text-[#0358d5] hover:opacity-60 transition-opacity pb-2.5"
        >
          모두 보기 →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        {FEATURED_PROJECTS.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative rounded-[10px] overflow-hidden min-h-[400px] flex flex-col justify-between p-10 cursor-pointer"
            style={{ backgroundColor: project.coverColor }}
          >
            <span className="text-xs font-semibold tracking-[2px] text-[#141212]/60 uppercase">
              {project.tag}
            </span>

            <div className="flex items-center gap-2.5 mt-2">
              <span className="text-xs text-[#141212]/50">
                {project.period}
              </span>
              {project.status === "in-progress" && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#0358d5] text-white">
                  진행중
                </span>
              )}
            </div>

            <div className="mt-auto">
              <h3 className="text-4xl font-normal tracking-[-2px] text-[#141212] leading-[1.1] mb-3 group-hover:opacity-70 transition-opacity">
                {project.title}
              </h3>
              <p className="text-sm text-[#141212]/60 leading-[1.6]">
                {project.subtitle}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-5">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/60 text-[#141212]"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 5 && (
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/60 text-[#141212]">
                    +{project.techStack.length - 5}
                  </span>
                )}
              </div>
            </div>

            <span className="absolute top-10 right-10 text-xl text-[#141212]/40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              ↗
            </span>
          </Link>
        ))}
      </div>

      <ul className="border-t border-[#141212]/10">
        {OTHER_PROJECT_LIST.map((project) => (
          <li key={project.slug} className="border-b border-[#141212]/10">
            <Link
              href={`/work/${project.slug}`}
              className="group flex justify-between items-center py-5 hover:px-2.5 transition-all"
            >
              <div className="flex items-center gap-5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: project.accentColor }}
                />
                <h3 className="text-lg font-normal text-[#141212] tracking-[-0.5px]">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-7.5">
                <span className="text-xs text-[#141212]/40">{project.tag}</span>
                <span className="text-xs text-[#141212]/40">
                  {project.period}
                </span>
                <span className="text-base text-[#141212]/30 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
