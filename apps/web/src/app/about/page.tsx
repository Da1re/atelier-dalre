import type { Metadata } from "next";
import Image from "next/image";
import { CAREER, CERTIFICATIONS, EDUCATION, SKILLS } from "./models";

export const metadata: Metadata = {
  title: "About | Dalre",
  description: "유수빈 — FE Developer",
};

export default function AboutPage() {
  return (
    <div className="pt-30 px-5 md:px-15 pb-25 max-w-screen-2xl mx-auto w-full">
      {/* 헤더 */}
      <div className="mb-20 border-b border-foreground/10 pb-15">
        <p className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-4">
          About
        </p>
        <h1 className="font-normal tracking-[-2px] md:tracking-[-4px] text-foreground leading-none mb-8" style={{ fontSize: "clamp(48px, 8vw, 80px)" }}>
          유수빈
        </h1>
        <div className="max-w-2xl">
          <p className="text-xl text-foreground leading-[1.7] mb-4">
            <span className="text-primary font-semibold">
              복잡한 걸 단순하게, 단순한 걸 아름답게 만드는 FE 개발자
            </span>
            입니다.
          </p>
          <p className="text-base text-foreground/60 leading-[1.8] mb-4">
            복잡한 구조를 정리하고, 그게 화면에 구현되는 순간이 좋습니다.
            프론트엔드를 선택한 이유도 그렇고, 지금도 개발을 계속하게 만드는
            이유입니다.
          </p>
          <p className="text-base text-foreground/60 leading-[1.8]">
            좋은 UI는 좋은 DX에서 나온다고 생각합니다. 공통 컴포넌트와
            아키텍처를 설계해 팀 전체가 편하게 일할 수 있는 환경을 만드는 데
            관심이 많습니다.
          </p>
        </div>
      </div>

      {/* 경력 */}
      <div className="mb-20">
        <h2 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-8">
          Career
        </h2>
        <ul className="border-t border-foreground/10">
          {CAREER.map((c) => (
            <li
              key={c.company}
              className="border-b border-foreground/10 py-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-10"
            >
              <div>
                <p className="text-lg font-normal text-foreground tracking-[-0.5px] mb-1">
                  {c.company}
                </p>
                <p className="text-sm text-foreground/50">{c.role}</p>
                <p className="text-xs text-foreground/40 mt-2 font-mono">
                  {c.period}
                </p>
              </div>
              <p className="text-sm text-foreground/60 leading-[1.8] self-center">
                {c.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* 스킬 */}
      <div className="mb-20">
        <h2 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-8">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-8">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <p className="text-xs font-semibold tracking-[1.5px] text-foreground/40 uppercase mb-3">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-[13px] font-semibold px-3 py-1.5 rounded-full border border-foreground/15 text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 자격/어학/수상 */}
      <div className="mb-20">
        <h2 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase mb-8">
          Certifications
        </h2>
        <ul className="border-t border-foreground/10">
          {CERTIFICATIONS.map((c) => (
            <li
              key={c.name}
              className="border-b border-foreground/10 py-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 flex items-center justify-center shrink-0">
                  {c.pinned && (
                    <Image
                      src="/images/star-icon.svg"
                      alt="pinned"
                      width={16}
                      height={16}
                    />
                  )}
                </span>
                <div>
                  <p
                    className={`text-lg  tracking-[-0.5px] ${c.pinned ? "text-primary font-semibold" : "text-foreground"}`}
                  >
                    {c.name}
                  </p>
                  {c.issuer && (
                    <p className="text-sm text-foreground/50 mt-0.5">
                      {c.issuer}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs text-foreground/40 font-mono">{c.date}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* 학력 */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[13px] font-semibold tracking-[3px] text-foreground/40 uppercase">
            Education
          </h2>
          <span className="text-[12px] font-semibold px-3 py-1 rounded-full border border-foreground/20 text-foreground/60">
            대학원(석사) 재학중
          </span>
        </div>
        <ul className="border-t border-foreground/10">
          {EDUCATION.map((e) => (
            <li
              key={e.school}
              className="border-b border-foreground/10 py-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-lg font-normal text-foreground tracking-[-0.5px]">
                    {e.school}
                  </p>
                  <p className="text-sm text-foreground/50 mt-0.5">
                    {e.major} · {e.degree}
                    {e.gpa && (
                      <span className="ml-2 text-xs font-mono">
                        GPA {e.gpa}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <p className="text-xs text-foreground/40 font-mono">{e.period}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
