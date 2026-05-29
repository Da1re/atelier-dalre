export type ProjectStatus = 'in-progress' | 'completed'
export type ProjectSize = 'large' | 'medium' | 'small'
// 메인 페이지 Work 섹션 시각 위계
//  - hero  : 풀폭 1개 (가장 강조)
//  - large : 2-col 그리드
//  - small : 1-col 컴팩트 카드
//  - undefined : 하단 텍스트 리스트
export type ProjectPriority = 'hero' | 'large' | 'small'

export interface ProjectHighlight {
  title: string
  description: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  company: string
  period: string
  status: ProjectStatus
  size: ProjectSize
  priority?: ProjectPriority
  contribution: string
  techStack: string[]
  highlights: ProjectHighlight[]
  retrospective?: string
  coverColor: string
  accentColor: string
  textColor?: string
  siteUrl?: string
  tag: string
  // 메인 hero 카드용 강조 배지 ("20+ services using" 등)
  heroBadge?: string
}
