import type { Project } from "@/models/project";

const RAW_PROJECTS: Project[] = [
  {
    slug: "gwacheon-science",
    title: "국립과천과학관 차세대 통합 포털",
    subtitle: "관리자/사용자 포털 구축 — 모노레포 기반 대규모 시스템",
    company: "(주)세이코어",
    period: "2025.06 ~ 2026.01",
    status: "completed",
    size: "large",
    priority: "large",
    starred: true,
    heroBadge: "Module Federation · 하위 서비스 20+",
    contribution: "공통 에디터·통합검색 패키지와 동적 메뉴 설계·구현",
    siteUrl: "https://www.sciencecenter.go.kr/gnsm/",
    techStack: [
      "React",
      "TypeScript",
      "Jotai",
      "React Query",
      "Webpack Module Federation",
      "Turborepo",
      "pnpm",
    ],
    highlights: [
      {
        title: "공통 디자인시스템 구축 및 적용",
        description:
          "TextInput, NumberInput, PhoneInput, DatePicker, Switch, Button 같은 핵심 UI 컴포넌트를 직접 설계·구현. PhoneInput 자동 포맷팅, DatePicker·RangePicker, NumberInput 입력 제어 같은 로직을 컴포넌트 안에 캡슐화.",
      },
      {
        title:
          "공통 에디터 패키지 — 요구사항 맞춤 설계 & Module Federation 독립 배포",
        description:
          "서비스 요구사항에 맞춰 TinyMCE 플러그인·툴바·폰트를 처음부터 커스터마이징하여 에디터 패키지를 직접 설계·구현. Module Federation으로 독립 배포해 20개 이상 하위 서비스에서 재사용 가능하도록 구조화. 에디터 설정 훅으로 설정을 중앙 관리하고, Context API 기반 EditorProvider로 다중 에디터 그룹 간 콘텐츠 자동 동기화 처리.",
      },

      {
        title: "파파고 번역 API 연동 — ID 기반 에디터 간 번역 파이프라인",
        description:
          "다중 에디터로 다국어 콘텐츠를 작성하는 시나리오에서, 에디터마다 고유 ID를 부여하고 source/target ID로 번역 경로를 명시적으로 제어하는 구조 설계. 번역 트리거는 에디터 모듈 내부 컴포넌트로 캡슐화해 재사용성을 확보했고, 트리거 시 source 에디터 콘텐츠를 파파고 API로 번역해 target 에디터에 주입하도록 구현.",
      },
      {
        title: "에디터 콘텐츠 인터랙션 — script 차단 + 선언적 액션 props 설계",
        description:
          "고객사가 에디터에서 모든 HTML 태그 작성을 허용해줄 것을 요구한 반면, 관리자·사용자 양측 모두 XSS 취약점은 차단해야 하는 상충 요구가 있었음. 직접적인 script 실행은 sanitize로 모두 차단하되, navigate·모달 호출 등 동적 인터랙션은 선언적 액션 props로 콘텐츠에 기술하도록 contract를 정의. iframe으로 렌더링되는 사용자 뷰어가 props를 React 핸들러로 해석해 동작을 수행하도록 구현해, 보안과 자유도를 동시에 만족시킴.",
      },
      {
        title: "동적 메뉴 시스템 — 사용자 정의 메뉴 기반 라우터 자동 생성",
        description:
          "관리자가 콘텐츠·카드·게시판 등 사전 정의된 템플릿 타입으로 메뉴를 직접 생성하면, 서버가 내려준 메뉴 트리를 클라이언트에서 라우터 객체로 변환해 페이지가 동적으로 구성되는 구조 설계. 메뉴 고유 식별자로 페이지 컴포넌트를 매핑하고 템플릿 타입별 공통 Wrapper를 자동 할당해, 메뉴 추가 시 별도 코드 수정 없이 라우팅이 확장되도록 구현. @dnd-kit 기반 계층 트리 관리(optimistic update 적용)와 서버 응답 기반 RBAC·IP 필터링으로 권한·메뉴 모델을 일원화.",
      },
      {
        title: "통합검색 클라이언트 — 동적 다중 필터 + 카테고리별 이중 페이징",
        description:
          "외부 검색 솔루션 위에 카테고리별 동적 다중 필터 UI를 얹고, 한 화면에서 예약 도메인(통합예약·교육관 학습관리시스템) 두 카테고리가 각각 독립된 페이지네이션 상태를 갖는 이중 페이징 구조로 설계. React Query + Jotai Atom 패턴으로 필터 상태와 검색 결과를 분리해 불필요한 리렌더링을 방지하고, 키워드 하이라이팅·추천/최근 검색어 등 검색 UX 강화.",
      },
    ],
    retrospective: `이 프로젝트에서 가장 도전적이었던 건 Module Federation 기반의 공통 에디터 패키지 설계였습니다.

이 에디터는 콘텐츠형·카드형·게시판형 등 거의 모든 메뉴 타입에서 콘텐츠 작성의 핵심으로 쓰였고, 20개 이상의 하위 서비스가 각자 독립 배포되는 환경에서 단순 패키지 의존만으로는 "에디터 한 줄을 고쳐도 모든 서비스를 다시 배포해야 하는" 운영 부담이 따라왔습니다. Module Federation으로 에디터를 한 번 배포해두고 각 서비스가 런타임에 동적으로 로드해 쓰는 구조로 가져가면서, 이 부담을 근본적으로 해결했습니다.

특히 다중 에디터 환경에서의 파파고 번역 기능은 단순히 API를 호출하는 것을 넘어, "어떤 에디터의 콘텐츠를 어디로 번역할 것인가"라는 경로 자체를 어떻게 모델링할지가 핵심이었습니다. 에디터 인스턴스에 고유 ID를 부여하고 source/target을 명시적으로 지정하는 구조를 택하면서, 다중 인스턴스 환경에서 상태와 동작을 어떻게 식별·격리할지에 대한 감을 잡을 수 있었습니다.

에디터에서 HTML 자유도와 XSS 차단을 양립시켜야 했던 요구에서는, script 실행은 sanitize로 차단하되 navigate·모달 같은 동작은 선언적 props contract로 분리해 뷰어가 해석하도록 설계했습니다. 보안과 자유도가 충돌할 때 직접 우회보다 데이터 계약으로 간극을 메우는 접근의 가치를 체감했습니다.

동적 메뉴 시스템에서는 사용자가 만든 데이터로 클라이언트 라우터가 런타임에 구성되는 구조를 설계하면서, 정적으로 정의된 라우터에만 익숙했던 사고방식이 한 단계 확장됐습니다. 메뉴 식별자와 템플릿 타입으로 컴포넌트와 Wrapper를 매핑하는 방식은 메뉴 추가 시 코드 변경 없이 시스템이 확장되는 구조였고, 데이터 모델이 앱 구조를 결정한다는 관점을 갖게 됐습니다.

공통 디자인시스템의 입력 컴포넌트를 직접 설계하면서, 보기 좋은 컴포넌트보다 비즈니스 로직을 캡슐화한 재사용 가능한 컴포넌트의 가치를 체감했습니다.`,
    retroKeywords: [
      "Module Federation · 런타임 동적 로드",
      "다중 인스턴스 식별·격리",
      "데이터 계약으로 보안·자유도 양립",
      "런타임 라우터 구성",
      "비즈니스 로직 캡슐화 컴포넌트",
    ],
    coverColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
    accentColor: "var(--primary)",
    tag: "Portal / Design System",
  },
  {
    slug: "design-system-package",
    title: "디자인시스템 패키지화",
    subtitle:
      "레포마다 복사되던 디자인시스템을 패키지로 — 설계 원칙·소비 프로젝트 전환·폐쇄망 배포 표준화",
    company: "(주)세이코어",
    period: "2026.08 ~ 2026.10",
    status: "completed",
    size: "large",
    priority: "hero",
    starred: true,
    contribution: "패키지화와 프로젝트 전환 담당",
    techStack: [
      "React",
      "TypeScript",
      "Storybook",
      "CSS Cascade Layers",
      "GitLab CI",
      "pnpm",
      "SemVer",
    ],
    highlights: [
      {
        title: "패키지 분리와 태그 기반 배포 파이프라인",
        description:
          "사내 표준 레포 안에 있던 디자인시스템 폴더를 별도 레포의 설치형 패키지로 분리. MR에서 lint·타입체크·빌드·스토리북 빌드를 돌리고, 버전 태그를 밀면 태그와 package.json 버전 일치를 검사한 뒤 사내 레지스트리에 publish하는 파이프라인 구성. 스토리북은 main 머지 시 자동 배포.",
      },
      {
        title: "props 명명 규칙과 브랜드 커스터마이즈 창구 — variant · color · size, CSS 변수",
        description:
          "모양은 variant, 색은 color, 크기는 size 풀네임으로 명명 규칙을 정리하고, 기존 이름은 @deprecated 별칭으로 남겨 SemVer 안에서 점진 전환. 프로젝트별 브랜드 색·간격은 패키지를 고치지 않고 CSS Cascade Layers 위의 변수 창구로만 재현하도록 설계.",
      },
      {
        title: "접근성 전수조사와 공공 표준 대조 — KWCAG 2.2 · KRDS · Figma",
        description:
          "컴포넌트 전체를 KWCAG 2.2 기준으로 점검해 키보드 조작·초점 표시·명시도를 보강하고, 토큰은 공공 디자인 표준(KRDS)과 시안을 대조해 정리.",
      },
      {
        title: "AI 에이전트용 계약 파일 — JSDoc에서 metadata.json 자동 생성",
        description:
          "AI 코딩 도구가 빌드 산출물 대신 읽을 단일 JSON을 빌드 시 타입과 JSDoc에서 자동 생성. 유니온 타입은 판별자를 검출해 variants로 분리하고, 설명이 빠진 prop은 coverage 파일로 드러나게 함. JSON은 직접 고치지 않고 JSDoc을 고치는 방식으로 운영.",
      },
      {
        title: "소비 프로젝트 전환 — 첫 실서비스와 앱 4개 모노레포",
        description:
          "스포츠안전재단을 첫 실서비스로 전환하며 생긴 렌더링 회귀를 계산 스타일 대조로 추적. 이어서 앱 4개 모노레포에서 로컬 사본을 지우고 패키지로 전환. 레거시 API 치환, 충돌 해소를 머지 커밋과 치환 커밋으로 분리, AI 도구 교차 리뷰와 절차 리허설을 거친 뒤 push.",
      },
      {
        title: "폐쇄망 배포 표준화 — 조달은 vendor tgz 하나, CI 도구는 둘",
        description:
          "공공기관 폐쇄망에서 레지스트리 설치가 깨지는 문제에 대해, 팀 리드가 실서비스에서 먼저 해결한 vendor tgz 방식을 분석해 표준 프레임워크로 이식. GitLab CI와 젠킨스 모두 같은 계약으로 동작하게 하고, 팀 리드가 만들어 둔 fail-close 배포 게이트 같은 안전장치도 함께 가져옴.",
      },
    ],
    retrospective: `레포마다 복사해 간 디자인시스템 폴더는 각자 고쳐지며 갈라졌고, 어느 것이 표준인지 말할 수 없었습니다. 사람이 신경 써서 맞추는 방식에는 한계가 있어서, 디자인시스템을 레포 하나로 모으고 나머지 프로젝트는 패키지를 설치해 쓰는 구조로 바꿨습니다.

전환할 때는 로컬 사본에 쌓인 팀원들의 패치를 지우지 않고, 먼저 패키지의 정식 기능으로 흡수한 뒤에 바꿨습니다.

폐쇄망 배포 표준화에서는 새 설계를 만들지 않고, 팀 리드가 실서비스에서 먼저 해결한 방식을 분석해 표준 프레임워크로 이식했습니다. 앱 4개 모노레포를 전환할 때는 머지 절차를 임시 디렉터리에서 끝까지 미리 돌려 보며, 읽어서는 보이지 않던 절차 결함을 찾았습니다. 세부 설계 판단은 Design System 메뉴의 설계 노트에 정리해 두었습니다.`,
    retroKeywords: [
      "로컬 사본 → 설치형 패키지 전환",
      "팀 패치를 패키지 기능으로 흡수",
      "폐쇄망 배포 표준화 · 절차 리허설",
    ],
    relatedLinks: [
      { label: "설계 노트 전체 보기", href: "/design" },
      { label: "왜 패키지로 분리했나", href: "/design/system/why-package" },
      { label: "운영과 배포", href: "/design/system/operations" },
    ],
    coverColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
    accentColor: "var(--primary)",
    tag: "Design System / Package",
  },
  {
    slug: "scoa-workmate",
    title: "SCOA WorkMate",
    subtitle: "자사 AI 어시스턴트 — SSE 기반 스트리밍 채팅 시스템",
    company: "(주)세이코어",
    period: "2026.03",
    status: "completed",
    size: "large",
    priority: "large",
    starred: true,
    contribution: "AI 어시스턴트 채팅 파트 설계·구현",
    techStack: [
      "Next.js",
      "TypeScript",
      "SSE",
      "React Query",
      "Server Actions",
      "Turborepo",
    ],
    highlights: [
      {
        title: "GS 인증 1등급 제품의 AI 채팅 파트",
        description:
          "2026년 8월 한국산업기술시험원(KTL)에서 GS(소프트웨어품질) 인증 1등급을 받은 자사 솔루션. 제품 단위 인증이며, 프론트엔드 중 AI 어시스턴트 채팅 파트의 설계와 구현을 담당.",
      },
      {
        title: "SSE 기반 AI 응답 스트리밍 — 청크 처리 & 재연결 처리",
        description:
          "Server-Sent Events로 AI 응답을 청크 단위로 실시간 스트리밍 처리. 채팅 세션 UUID 관리, 스트림 중단·재연결 처리, 응답 완료 후 상태 전환 로직 구현.",
      },
      {
        title: "출처 카드와 세션 상태 — 마커 치환 & 기존/신규 대화 구분",
        description:
          "답변 안의 [1] 같은 출처 마커를 찾아 reference 데이터와 연결해 출처 카드로 바꾸고, 채팅 세션은 ID로 매핑해 기존 대화를 이어 가는 경우와 새 대화를 시작하는 경우의 상태를 구분해 관리. 세션 생성·조회·삭제 Server Action 연동, 사이드바 최근 대화 목록, 마크다운 렌더링까지 채팅 레이아웃 전체 구현.",
      },
      {
        title: "스트리밍 중 스크롤 제어 — 따라 내려가기와 위치 유지",
        description:
          "응답이 실시간으로 길어지는 동안, 사용자가 맨 아래를 보고 있을 때만 자동으로 따라 내려가고 위로 올려 읽는 중이면 위치를 유지하는 스크롤 훅 구현. 아래에서 멀어지면 '맨 아래로' 버튼을 띄우고, scrollend 이벤트가 없는 브라우저에서도 버튼 상태가 어긋나지 않게 대체 처리.",
      },
    ],
    retrospective: undefined,
    retroKeywords: [
      "SSE 청크 스트리밍 · 재연결",
      "스트리밍 중 스크롤 위치 보존",
      "세션 ID 상태 매핑",
    ],
    coverColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
    accentColor: "var(--primary)",
    tag: "AI / SSE Streaming",
  },
  {
    slug: "incheon-education",
    title: "인천교육청 몸마음건강코칭 통합지원시스템",
    subtitle: "역할 기반 인증 구조 · 화상회의 SDK 연동",
    company: "(주)세이코어",
    period: "2026.02 ~ 2026.07",
    status: "completed",
    size: "large",
    priority: "large",
    contribution: "역할 기반 인증 구조와 화상회의 SDK 연동 대부분",
    techStack: [
      "React",
      "TypeScript",
      "Jotai",
      "React Query",
      "React Hook Form",
      "WebSocket",
      "Turborepo",
    ],
    highlights: [
      {
        title: "화상회의 SDK 연동 — 파일 저장을 제외한 연동·매핑 로직",
        description:
          "외부 화상회의 SDK를 모노레포 환경에 연동. 참가자 상태 동기화와 SDK 라이프사이클을 React 컴포넌트 생명주기와 연결. 파일 저장을 제외한 연동·매핑 로직 대부분을 프론트에서 설계·구현하고, 팀 리드와 필요한 API 명세를 정리해 백엔드에 공유.",
      },
      {
        title: "다중 첨부 공유 우회 설계 — 솔루션 1:1 제약 → fan-out 푸시",
        description:
          "화상회의 솔루션의 첨부파일 공유가 1:1 귓속말 방식으로만 지원되는 제약 때문에 다중 참가자 공유가 불가능했음. 백엔드로 파일을 업로드한 뒤 업로드 완료 이벤트를 WebSocket 리스너가 받아 첨부 목록 React Query를 refetch하고, 방 참가자 전원을 순회하며 솔루션의 1:1 이벤트 push를 반복 호출해 fan-out 효과를 만드는 구조로 우회. 외부 솔루션의 제약 안에서 도메인을 다시 설계한 사례.",
      },
      {
        title:
          "전역 Auth Layer 설계 — 다중 회원 타입 라우팅 & 토큰·userInfo 중앙 관리",
        description:
          "회원 타입별로 접근 가능한 영역이 갈리는 시스템에서, Jotai 기반 전역 인증 상태 관리 아키텍처를 설계. Role 기반 route guard를 전역 레이어로 끌어올려 각 페이지에서 인증 분기 로직을 제거하고, Access Token Silent Refresh와 만료 감지·로그인 리다이렉트를 하나의 흐름으로 묶음. userInfo set/get 공통 hook을 분리해 어느 페이지에서든 동일한 인터페이스로 사용자 정보에 접근하도록 정리.",
      },
    ],
    retrospective: `화상회의 SDK 연동은 원래 백엔드가 이끌던 영역이었지만, 일정상 파일 저장을 제외한 연동·매핑 로직 대부분을 프론트에서 맡게 됐습니다. 시연 일정에 맞추기 위해 팀 리드와 필요한 API 명세를 정리해 백엔드에 공유하며 협업했습니다.

외부 솔루션 자체의 제약 — 예를 들어 첨부파일 공유가 1:1 귓속말 방식으로만 지원되는 구조 — 도 자체 백엔드 업로드 후 WebSocket 이벤트를 방 참가자 전원에게 fan-out 푸시하는 우회 설계로 풀어냈고, 단순 솔루션 사용자가 아니라 "솔루션의 제약 안에서 도메인을 어떻게 다시 설계할지"까지 책임지는 경험을 했습니다.

회원 타입마다 접근 가능한 영역이 갈리는 시스템에서 전역 Auth Layer를 설계하면서, 인증·역할 분기를 페이지가 아니라 전역 레이어에서 처리하는 구조를 코드로 구현해 봤습니다. 각 페이지마다 흩어져 있던 인증 체크와 role 분기를 단일 레이어로 응집시키면서 코드의 응집도와 유지보수성이 크게 향상됐고, userInfo 같은 공용 상태도 set/get hook으로 정리하면서 "전역 상태에 어떻게 접근하게 할 것인가"라는 인터페이스 설계의 감을 잡았습니다.`,
    retroKeywords: [
      "SDK 연동·매핑 로직 설계",
      "솔루션 제약 우회 · fan-out 푸시",
      "다중 회원 타입 Auth Layer",
    ],
    coverColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
    accentColor: "var(--primary)",
    tag: "Video SDK / Auth Layer",
  },
  {
    slug: "Ultari",
    title: "대·중소기업·농어업협력재단 기술보호 시스템",
    subtitle: "동적 위즈윅 신청서 로직 개발",
    company: "(주)세이코어",
    period: "2024.11 ~ 2025.06",
    status: "completed",
    size: "large",
    contribution: "동적 폼 빌더와 신청서 입력 컴포넌트",
    techStack: ["React", "JavaScript", "Jotai"],
    highlights: [
      {
        title:
          "DnD 동적 신청서 빌더 — 입력 컴포넌트 직접 구현 & JSON 기반 폼 흐름",
        description:
          "퇴사자가 초기 단계로 남긴 신규공고 4단계 신청서를 인계받아 끝까지 완성. 운영자가 신청서를 드래그 앤 드롭으로 조합·배치하는 동적 폼 빌더에서, 단일 입력 컴포넌트(텍스트·날짜·파일·이메일·주소 등)와 그룹 컴포넌트(기본정보·담당자·컨소시엄·바우처 등)를 직접 구현. 빌더가 조합한 폼 스키마와 값을 JSON으로 직렬화해 서버와 주고받고, 신청 단계에서 항목 수정·추가까지 처리하는 흐름을 함께 설계. Jotai atom + localStorage 기반 임시 저장·복구로 폼 상태 안정화.",
      },
      {
        title: "에디터 이미지 URL 치환 로직",
        description:
          "에디터 내 첨부 이미지의 서버 URL ↔ 로컬 Blob URL 치환 로직 구현. 임시저장 시 Blob URL을 서버에 업로드하고 URL을 교체하는 플로우 안정화.",
      },
    ],
    retrospective: undefined,
    coverColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
    accentColor: "var(--primary)",
    tag: "Form / Editor",
  },
  {
    slug: "smart-manufacturing",
    title: "스마트 소비재 부품 제조 협업 플랫폼",
    subtitle: "R&D 스마트 제조혁신 기술개발사업",
    company: "(주)인더스웰",
    period: "2023.07 ~ 2024.01",
    status: "completed",
    size: "medium",
    contribution: "로그인·메인·검색 화면과 관리자 화면",
    techStack: ["React", "Redux", "Tailwind CSS", "JWT", "Axios"],
    highlights: [
      {
        title: "로그인·메인·검색 화면과 관리자 화면 개발",
        description:
          "R&D 스마트 제조혁신 기술개발사업에 기획 단계부터 참여해, 로그인·메인·검색 화면과 관리자 화면을 개발.",
      },
    ],
    retrospective: undefined,
    coverColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
    accentColor: "var(--primary)",
    tag: "Platform / React",
  },
  {
    slug: "workation",
    title: "비대면 원격근무 워케이션 서비스",
    subtitle: "원격근무 환경 대시보드 및 설문조사 시스템",
    company: "(주)인더스웰",
    period: "2022.07 ~ 2023.01",
    status: "completed",
    size: "small",
    contribution: "대시보드·영상 출력·설문 화면과 유지보수",
    techStack: ["Vue.js", "Vuex"],
    highlights: [
      {
        title: "원격근무 대시보드·영상 출력·설문 화면 개발",
        description:
          "원격근무 대시보드, 워케이션 영상 출력, 설문조사 화면을 개발하고 이후 유지보수 담당.",
      },
    ],
    retrospective: undefined,
    coverColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
    accentColor: "var(--primary)",
    tag: "Vue.js / Dashboard",
  },
  {
    slug: "sports-safety",
    title: "스포츠안전재단 체육행사 안전정보시스템",
    subtitle: "사용자 포털 주도 개발 — 다단계 안전관리계획서 작성·심사 흐름 설계",
    company: "(주)세이코어",
    period: "2026.06 ~ 현재",
    status: "in-progress",
    size: "large",
    priority: "large",
    starred: true,
    contribution: "프론트엔드 신규 구축, 계획서 작성·제출 흐름 담당",
    siteUrl: "https://inspection.sportsafety.or.kr/",
    techStack: [
      "React",
      "TypeScript",
      "React Query",
      "Zustand",
      "React Hook Form",
      "React Router",
      "Vite",
      "pnpm",
    ],
    highlights: [
      {
        title:
          "안전관리계획서 다단계 작성 폼 — URL step 동기화 & 임시저장·이어작성·불러오기 단일 프리필 경로",
        description:
          "행사 정보·안전인력·보험·첨부·제출처로 이어지는 4단계 계획서 작성 흐름을 React Hook Form + Provider 스코프 Zustand로 설계. 현재 스텝을 URL 쿼리로 동기화해 새로고침·뒤로가기에도 위치가 유지되고, 폼 모델과 서버 DTO 사이에 매퍼를 두어 임시저장·이어작성·이전 계획서 불러오기·보완요청 재제출이 모두 같은 프리필 경로를 타도록 통일. 스텝별 필수 검증 실패 시 토스트 안내와 해당 필드로의 스크롤·초점 이동까지 한 흐름으로 처리.",
      },
      {
        title: "역할 기반 행사·심사 흐름 — 상태코드·역할정책 모델 선언",
        description:
          "역할마다 행사목록·홈·상세에서 보이는 정보와 액션이 달라지는 시스템에서, 계획서 상태코드와 역할 정책을 모델로 먼저 정의하고 목록·상세·보완요청·제출취소·승인·이력 조회 화면이 그 모델을 참조하도록 구성. 역할별 목록 상태는 Provider 스코프 store로 분리하고 소속 단체 전환 시 캐시를 무효화해 역할 간 상태가 섞이지 않게 처리. 관리자 측 지자체 그룹관리(시/도 → 시/군/구 → 그룹 상세 3단 패널)와 회원·단체 관리도 함께 구현.",
      },
      {
        title: "인증·세션 레이어 — 토큰 갱신·중복 로그인·미활동 만료·본인인증",
        description:
          "JWT 디코드 기반 사용자 상태, 토큰 갱신 실패 시 로그아웃, 탭 포커스·가시성 변경 시 인증 재검증, 중복 로그인 감지 시 전역 강제 로그아웃(사용자·관리자 공통), 미활동 세션 연장 안내 모달과 자동 로그아웃, 회원 유형 미선택·비밀번호 변경 필요 같은 중간 상태의 로그인 분기까지 페이지가 아닌 하나의 레이어에서 처리. PASS/아이핀 본인인증 연동에서는 팝업 복귀 시 오리진이 바뀌는 문제를 프록시 설정으로 해결.",
      },
      {
        title: "API 에러 계층 정규화 — 인터셉터 throw & mutation 패턴 통일",
        description:
          "응답 인터셉터가 실패를 ApiError로 던지도록 바꾸고 각 fetcher에 흩어져 있던 실패 가드를 걷어내 React Query가 에러 상태를 일관되게 잡도록 정리. mutation 호출을 mutate + onSuccess로 통일하고, 전역 토스트 알림·중복 토스트 제거·재시도 정책을 한 곳에서 관리.",
      },
      {
        title: "웹 접근성(KWCAG) 대응 — 키보드 조작·초점 관리·시맨틱 보강",
        description:
          "Select를 WAI-ARIA combobox 패턴으로 키보드 조작 가능하게 재구성하고, 전체메뉴 드로어 초점 관리, nav 랜드마크 이름, 폼 라벨 연결·라디오 그룹·오류 발생 시 초점 이동, Tab aria-controls·Table caption·알림 inert, 캘린더 대체 입력 경로 안내 등 KWCAG 2.2 자체 체크리스트 항목을 사용자 앱과 디자인시스템 양쪽에서 함께 보강.",
      },
      {
        title: "디자인시스템 패키지 전환 & 에디터 이식",
        description:
          "사내 디자인시스템을 로컬 사본에서 설치형 패키지로 전환한 첫 실서비스로, 전환 과정에서 생긴 폰트 렌더링 회귀를 계산 스타일 대조로 추적해 해결. OWASP ZAP 점검에서 TinyMCE 취약점이 나와, 다른 개발자가 다른 프로젝트에서 Tiptap으로 만든 에디터를 가져와 이식하고 TinyMCE 벤더 파일을 걷어냄.",
      },
    ],
    retrospective: `이 프로젝트에서 가장 오래 붙들었던 건 안전관리계획서 작성 폼이었습니다. 한 번에 작성해서 제출하는 폼이 아니라 임시저장 → 이어작성 → 제출 → 보완요청 → 재제출 → 확인완료, 그리고 제출취소까지 상태가 돌고, 이전 계획서를 불러와 시작하는 경로까지 있어서 "폼 데이터가 어디서 와서 어디로 가는가"를 먼저 정리하지 않으면 스텝 하나를 고칠 때마다 다른 진입 경로가 깨졌습니다. 폼 모델과 서버 DTO 사이에 매퍼를 두고 모든 진입 경로가 하나의 프리필 함수를 타게 하자, 이후 필드 구조가 바뀌는 요구가 몇 차례 들어왔을 때도 수정 지점이 한 곳으로 모였습니다.

같은 "행사목록" 화면이 운영단체에게는 작성 도구, 지자체에게는 심사 도구, 정부에게는 조회 도구였습니다. 처음에는 역할 조건문이 화면마다 늘어나는 걸 보고, 상태코드와 역할 정책을 모델로 선언하고 화면은 그 모델을 읽기만 하도록 바꿨습니다. 역할별 목록 상태를 Provider로 스코핑한 것도 같은 이유였습니다. 과천 포털의 동적 메뉴에서 얻은, 데이터 모델이 앱 구조를 결정한다는 관점을 이번에는 권한과 상태라는 더 작은 단위에서 다시 적용해본 셈입니다.

인증·세션은 처음엔 로그인과 로그아웃뿐이었지만 운영 요구가 쌓이면서 중복 로그인 차단, 미활동 만료, 회원 유형 미선택 같은 중간 상태가 계속 늘어났습니다. 인천교육청 몸마음건강코칭 시스템에서 설계했던 전역 Auth Layer 경험을 그대로 가져와 이런 요구를 페이지가 아니라 레이어에서 흡수하도록 했고, 덕분에 요구가 추가될 때마다 화면 코드를 건드리지 않아도 됐습니다. 본인인증 팝업이 복귀하면서 오리진을 잃는 문제를 프록시로 풀어낸 것도, 외부 솔루션의 제약을 앱 구조 안에서 우회하는 또 하나의 사례였습니다.

프로젝트 중반에 fetcher마다 실패 가드가 중복되고 에러 토스트가 두 번 뜨는 문제를 겪으면서 API 계층을 다시 정리했습니다. 인터셉터가 실패를 한 번만 던지고 나머지 코드는 성공 경로만 쓴다는 원칙을 세우자 fetcher와 mutation 코드가 눈에 띄게 단순해졌고, 실패를 한 곳에서 정규화하는 구조가 실제로 어떤 코드 모양이 되는지 체감했습니다.

웹 접근성 대응은 KWCAG 2.2 자체 체크리스트 항목을 하나씩 확인하는 것으로 시작했지만, 결국 사용자 앱에서 고치는 것보다 디자인시스템 컴포넌트 자체를 고치는 쪽이 다른 화면과 프로젝트에 그대로 재사용된다는 걸 체감했습니다. 사내 디자인시스템을 설치형 패키지로 전환한 첫 실서비스이기도 해서, 전환 과정에서 생긴 렌더링 회귀를 계산 스타일 대조로 추적한 경험이 이후 다른 프로젝트를 전환할 때의 절차가 됐습니다.`,
    retroKeywords: [
      "폼 모델 ↔ DTO 매퍼 · 단일 프리필 경로",
      "역할·상태코드 모델 선언",
      "전역 세션 레이어",
      "인터셉터 에러 정규화",
      "디자인시스템 단 접근성 보강",
    ],
    coverColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
    accentColor: "var(--primary)",
    tag: "Form Flow / Auth Layer",
  },
];

function displayRank(slug: string) {
  const order = [
    "design-system-package",
    "scoa-workmate",
    "gwacheon-science",
    "sports-safety",
  ];
  const index = order.indexOf(slug);
  return index === -1 ? order.length : index;
}

function sortProjectsForDisplay(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const rank = displayRank(a.slug) - displayRank(b.slug);
    if (rank !== 0) return rank;
    const aStart = a.period.split("~")[0].trim();
    const bStart = b.period.split("~")[0].trim();
    return bStart.localeCompare(aStart);
  });
}

export const PROJECTS: Project[] = sortProjectsForDisplay(RAW_PROJECTS);

export const HERO_PROJECT = PROJECTS.find((p) => p.priority === "hero");
export const LARGE_PROJECTS = PROJECTS.filter((p) => p.priority === "large");
export const SMALL_FEATURED_PROJECTS = PROJECTS.filter(
  (p) => p.priority === "small",
);
export const LIST_PROJECTS = PROJECTS.filter((p) => !p.priority);

export const FEATURED_PROJECTS = PROJECTS.filter((p) => !!p.priority);
export const OTHER_PROJECT_LIST = PROJECTS.filter((p) => !p.priority);

export const CAROUSEL_PROJECTS: Project[] = FEATURED_PROJECTS.filter(
  (project) => project.slug !== "design-system-package",
);
