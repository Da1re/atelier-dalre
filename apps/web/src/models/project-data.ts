import type { Project } from '@/models/project'

export const PROJECTS: Project[] = [
  {
    slug: 'gwacheon-science',
    title: '국립과천과학관 차세대 통합 포털',
    subtitle: '관리자/사용자 포털 구축 — 모노레포 기반 대규모 시스템',
    company: '(주)세이코어',
    period: '2025.01 ~ 현재',
    status: 'in-progress',
    size: 'large',
    contribution: '30%',
    techStack: ['React', 'TypeScript', 'Jotai', 'React Query', 'Webpack Module Federation', 'Turborepo', 'pnpm'],
    highlights: [
      {
        title: '에디터 패키지 — Module Federation 기반 독립 배포',
        description:
          'TinyMCE 기반 에디터를 독립 모듈로 분리하여 20개 이상의 하위 서비스에서 재사용 가능하도록 설계. useDakEditorConfig 훅으로 플러그인·툴바·폰트 설정을 중앙 관리하고, Context API 기반 EditorProvider로 다중 에디터 그룹 간 콘텐츠 자동 동기화 처리.',
      },
      {
        title: '공통 디자인 시스템 구축',
        description:
          'TextInput, NumberInput, PhoneInput, DatePicker, Switch, Button 등 10여 종의 핵심 UI 컴포넌트를 직접 설계·구현. PhoneInput 자동 포맷팅, DatePicker 기간 제한, NumberInput 입력 제어 등 비즈니스 로직을 컴포넌트 내부에 캡슐화하여 팀 개발 생산성 향상.',
      },
      {
        title: '파파고 번역 API 연동 — 다중 에디터 동기화',
        description:
          '독립된 에디터 인스턴스마다 파파고 API를 연동하여 콘텐츠를 실시간 번역. EditorProvider Context를 통해 번역 상태를 에디터 그룹 간 자동으로 동기화하는 아키텍처 설계.',
      },
      {
        title: '동적 메뉴 시스템 — RBAC 권한 제어',
        description:
          'Drag & Drop 기반 메뉴 계층 구조 관리, 부서·직급별 메뉴 접근 권한 필터링(RBAC), IP 접근 제어 시스템 구현. 담당 기여도 95%.',
      },
      {
        title: '통합검색 클라이언트',
        description:
          '9개 카테고리 다중 필터, 이중 예약 API 병렬 호출 후 병합, React Query + Jotai Atom 패턴으로 불필요한 리렌더링 방지. 검색어 자동완성(Debounce), 키워드 하이라이팅, 추천/최근 검색어 구현.',
      },
    ],
    retrospective: `이 프로젝트에서 가장 도전적이었던 건 Module Federation 기반의 에디터 패키지 설계였습니다.

기존에는 에디터를 각 서비스마다 직접 구현하다보니 코드 중복과 유지보수 비용이 컸는데, 독립 배포 가능한 모듈로 분리하면서 이 문제를 근본적으로 해결했습니다.

특히 다중 에디터 간 파파고 번역 상태 동기화는 단순히 API를 호출하는 것을 넘어, Context 기반의 상태 관리 아키텍처를 설계해야 했고 이 과정에서 상태 관리에 대한 이해가 깊어졌습니다.

공통 디자인 시스템을 처음부터 설계하면서 "단순히 예쁜 컴포넌트"가 아닌, 비즈니스 로직을 캡슐화한 재사용 가능한 컴포넌트의 가치를 체감했습니다.`,
    coverColor: 'rgba(209, 219, 253, 0.5)',
    accentColor: '#0358d5',
    tag: 'Portal / Design System',
  },
  {
    slug: 'incheon-education',
    title: '인천교육청 원격 화상회의 시스템',
    subtitle: '전역 아키텍처 설계 — DAK MEET SDK 통합',
    company: '(주)세이코어',
    period: '2024.11 ~ 현재',
    status: 'in-progress',
    size: 'large',
    contribution: '35%',
    techStack: ['React', 'TypeScript', 'Jotai', 'React Query', 'WebRTC', 'DAK MEET SDK', 'Turborepo'],
    highlights: [
      {
        title: '화상회의 SDK 통합 — DAK MEET',
        description:
          'WebRTC 기반 DAK MEET SDK를 Next.js 환경에 통합. 실시간 영상·음성 스트림 관리, 참가자 상태 동기화, 화면 공유 기능 구현. SDK 라이프사이클을 React 컴포넌트 생명주기와 연결하여 안정적인 연결 관리.',
      },
      {
        title: '전역 Auth Layer 설계',
        description:
          'Jotai 기반 전역 인증 상태 관리 아키텍처 설계. Access Token 자동 갱신(Silent Refresh), 인증 만료 감지 및 로그인 리다이렉트, Role 기반 라우트 가드를 전역 레이어로 구현하여 각 페이지에서 인증 로직을 제거.',
      },
      {
        title: '전역 마스킹 해제 모달',
        description:
          '개인정보 보호를 위해 마스킹 처리된 데이터의 해제 요청을 전역으로 관리하는 모달 시스템 구현. 어느 페이지에서든 단일 진입점으로 마스킹 해제 권한 요청·승인 플로우를 처리.',
      },
      {
        title: '로그인 버그 수정 및 안정화',
        description:
          'Silent Refresh 타이밍 이슈로 인한 인증 토큰 충돌 문제 디버깅 및 수정. Interceptor 레벨에서 요청 큐잉 처리로 다중 API 호출 시 토큰 갱신 경쟁 조건(Race Condition) 해결.',
      },
    ],
    retrospective: `화상회의 SDK 통합은 단순한 라이브러리 연동이 아니었습니다.

WebRTC 특성상 네트워크 상태, 미디어 디바이스 권한, 브라우저 호환성 등 예측하기 어려운 변수가 많았고, 이를 React 컴포넌트 생명주기와 안정적으로 연결하는 과정이 쉽지 않았습니다.

전역 Auth Layer를 설계하면서 "인증은 전역 관심사"라는 개념을 코드로 구현해보는 경험을 했습니다. 기존에는 각 페이지마다 인증 체크 로직이 흩어져 있었는데, 이를 단일 레이어로 응집시키면서 코드의 응집도와 유지보수성이 크게 향상됐습니다.

마스킹 해제 모달처럼 "전역에서 어디서나 호출 가능한 UI"를 Jotai로 구현하면서 전역 상태 관리의 실용적인 활용 패턴을 익혔습니다.`,
    coverColor: 'rgba(144, 195, 205, 0.4)',
    accentColor: '#0f6e56',
    tag: 'WebRTC / Architecture',
  },
  {
    slug: 'agri-cooperation',
    title: '대중소기업 농어업협력재단 기술보호 시스템',
    subtitle: '동적 위즈윅 신청서 로직 개발',
    company: '(주)세이코어',
    period: '2024.11 ~ 2025.04',
    status: 'completed',
    size: 'medium',
    contribution: '40%',
    techStack: ['React', 'TypeScript', 'React Query', 'TinyMCE', 'Jotai'],
    highlights: [
      {
        title: '동적 위즈윅 신청서 로직',
        description:
          '단일 컴포넌트 17개, 그룹 컴포넌트 6개 기반의 동적 신청서 시스템 설계 및 개발. 신청서 임시저장, 미리보기, 동적 프로세스 추가 로직 구현.',
      },
      {
        title: '에디터 이미지 URL 치환 로직',
        description:
          '에디터 내 첨부 이미지의 서버 URL ↔ 로컬 Blob URL 치환 로직 구현. 임시저장 시 Blob URL을 서버에 업로드하고 URL을 교체하는 플로우 안정화.',
      },
    ],
    retrospective: undefined,
    coverColor: 'rgba(255, 119, 74, 0.3)',
    accentColor: '#993c1d',
    tag: 'Form / Editor',
  },
  {
    slug: 'smart-manufacturing',
    title: '스마트 소비재 부품 제조 협업 플랫폼',
    subtitle: 'R&D 스마트 제조혁신 기술개발사업',
    company: '前 직장',
    period: '2022.07 ~ 2024.01',
    status: 'completed',
    size: 'medium',
    contribution: '40%',
    techStack: ['React', 'Redux', 'Tailwind CSS', 'JWT', 'Axios'],
    highlights: [
      {
        title: '핵심 기능 개발',
        description: 'JWT 로그인/회원가입, 사용자별 알림 시스템, 배송 API, 통합검색, 메인 페이지, 플랫폼 설정/관리 페이지 개발.',
      },
    ],
    retrospective: undefined,
    coverColor: 'rgba(71, 177, 113, 0.3)',
    accentColor: '#3b6d11',
    tag: 'Platform / React',
  },
  {
    slug: 'workation',
    title: '비대면 원격근무 워케이션 서비스',
    subtitle: '원격근무 환경 대시보드 및 설문조사 시스템',
    company: '前 직장',
    period: '2022.07 ~ 2024.01',
    status: 'completed',
    size: 'small',
    contribution: '25%',
    techStack: ['Vue.js', 'Vuex'],
    highlights: [
      {
        title: '대시보드 & 설문조사',
        description: '메인 페이지, 설문조사 기능, 마음챙김 영상 매칭, 대시보드 인터페이스, 사용자 통계 개발.',
      },
    ],
    retrospective: undefined,
    coverColor: 'rgba(255, 185, 79, 0.3)',
    accentColor: '#854f0b',
    tag: 'Vue.js / Dashboard',
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.size === 'large')
export const OTHER_PROJECT_LIST = PROJECTS.filter((p) => p.size !== 'large')
