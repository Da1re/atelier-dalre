export const STORYBOOK_URL = "https://storybook.saycore.kr";

export type ChangeCategory =
  | "Props"
  | "A11y"
  | "Style"
  | "Storybook"
  | "API"
  | "Migration"
  | "Tokens";

export interface ChangeGroup {
  category: ChangeCategory;
  items: string[];
}

export interface ComponentV2 {
  summary: string; // "v2.0 재설계 · 8건"
  changes: ChangeGroup[];
}

export interface DesignComponent {
  slug: string;
  name: string;
  desc: string;
  story: string;
  mine?: boolean; // 처음부터 끝까지 본인이 만든 컴포넌트
  v2?: ComponentV2; // v2.0 작업 내역
}

export interface DesignComponentGroup {
  category: string;
  description: string;
  components: DesignComponent[];
}

// ─── v2.0 작업 메타 ───────────────────────────────────────────
export const V2_STATS = {
  components: 29,
  changes: 103,
  linesAdded: 8200,
  linesRemoved: 3700,
  commits: 25,
} as const;

// ─── A. 토큰 · 인프라 ─────────────────────────────────────────
export interface TokenGroup {
  name: string;
  desc: string;
  items: string[];
}

export const TOKEN_GROUPS: TokenGroup[] = [
  {
    name: "Color Tokens",
    desc: "v1 컬러 토큰 시스템",
    items: [
      "primary / secondary / blue / navy / red / gray 등 11종",
      "05–70 단계로 명도 표준화 (0-padded)",
      "var(--krds-color-*) → var(--color-*) 일괄 마이그",
      "information → info, gray-5 → gray-05 명명 통일",
    ],
  },
  {
    name: "Typography Tokens",
    desc: "텍스트 사이즈 토큰",
    items: [
      "--text-xs / sm / base / lg / xl",
      "Display / Heading / Title / Body / Label 매핑",
      "Button scoa 타이포 → 가이드 text-* 매핑",
    ],
  },
  {
    name: "Size & Spacing",
    desc: "컴포넌트 공통 사이즈/간격",
    items: [
      "small / medium / large 3단 표준화",
      "padding 보정으로 layout-shift 제거",
      "focus / invalid 상태 padding 분기",
    ],
  },
  {
    name: "KRDS Mapping",
    desc: "KRDS ↔ Project 토큰 매핑",
    items: [
      "KRDS Outline tinted variant",
      "CSS variable cascade 패턴 (.color_* → shape rule)",
      "Tailwind @theme on-demand 누락 보완을 위한 :root 명시",
    ],
  },
  {
    name: "Scrollbar Utility",
    desc: "전역 스크롤바 유틸",
    items: [
      "공용 .scrollbar utility 추가",
      "secondary 톤 스크롤바 (DatePicker / TimeSelector)",
    ],
  },
];

// ─── 컴포넌트 그룹 ─────────────────────────────────────────
export const COMPONENT_GROUPS: DesignComponentGroup[] = [
  {
    category: "Typography",
    description: "타이포그래피 스케일 — 콘텐츠 계층을 정의하는 텍스트 컴포넌트",
    components: [
      {
        slug: "display",
        name: "Display",
        desc: "최상위 대형 헤드라인",
        story: "components-display--docs",
        mine: true,
      },
      {
        slug: "heading",
        name: "Heading",
        desc: "섹션 제목 계층 (h1–h6)",
        story: "components-heading--docs",
        mine: true,
      },
      {
        slug: "title",
        name: "Title",
        desc: "카드·패널 타이틀",
        story: "components-title--docs",
        mine: true,
      },
      {
        slug: "body",
        name: "Body",
        desc: "본문 텍스트 사이즈 시스템",
        story: "components-body--docs",
        mine: true,
      },
      {
        slug: "label",
        name: "Label",
        desc: "폼 레이블 및 보조 텍스트",
        story: "components-label--docs",
      },
    ],
  },
  {
    category: "Inputs",
    description: "사용자 입력 컴포넌트 — 비즈니스 로직을 내부에 캡슐화",
    components: [
      {
        slug: "text-input",
        name: "TextInput",
        desc: "텍스트 입력 (success / error / info 상태)",
        story: "components-textinput--docs",
        mine: true,
      },
      {
        slug: "number-input",
        name: "NumberInput",
        desc: "숫자 입력 — 콤마·소수점 자동 처리",
        story: "components-numberinput--docs",
        mine: true,
      },
      {
        slug: "phone-input",
        name: "PhoneInput",
        desc: "전화번호 자동 포맷팅 (010-0000-0000)",
        story: "components-phoneinput--docs",
        mine: true,
      },
      {
        slug: "tel-input",
        name: "TelInput",
        desc: "구간 분리형 전화번호 입력",
        story: "components-telinput--docs",
        mine: true,
      },
      {
        slug: "textarea",
        name: "TextArea",
        desc: "멀티라인 텍스트 입력",
        story: "components-textarea--docs",
        mine: true,
      },
      {
        slug: "select",
        name: "Select",
        desc: "드롭다운 선택 — 풀 제네릭",
        story: "components-select--docs",
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        desc: "단일·그룹 체크박스",
        story: "components-checkbox--docs",
      },
      {
        slug: "radio",
        name: "Radio",
        desc: "라디오 버튼 그룹",
        story: "components-radio--docs",
      },
      {
        slug: "toggle",
        name: "Toggle",
        desc: "토글 스위치 — 접근성 적용",
        story: "components-toggle--docs",
        mine: true,
      },
      {
        slug: "chip",
        name: "Chip",
        desc: "다중 선택 칩 그룹",
        story: "components-chip--docs",
      },
    ],
  },
  {
    category: "Date & Time",
    description: "날짜·시간 선택 컴포넌트 — 단일·범위·커스텀 달력",
    components: [
      {
        slug: "single-date-picker",
        name: "SingleDatePicker",
        desc: "단일 날짜 선택",
        story: "components-datepicker-singledatepicker--docs",
        mine: true,
      },
      {
        slug: "range-date-picker",
        name: "RangeDatePicker",
        desc: "시작·종료 범위 날짜 선택",
        story: "components-datepicker-rangedatepicker--docs",
        mine: true,
      },
      {
        slug: "custom-date-picker",
        name: "CustomDatePicker",
        desc: "커스텀 트리거 기반 날짜 선택",
        story: "components-customdatepicker-singledatepicker--docs",
      },
      {
        slug: "time-selector",
        name: "TimeSelector",
        desc: "시·분 시간 선택",
        story: "components-timeselector--docs",
        mine: true,
      },
      {
        slug: "schedule-calendar",
        name: "ScheduleCalendar",
        desc: "일정 시각화 캘린더",
        story: "components-schedulecalendar--docs",
      },
    ],
  },
  {
    category: "Navigation",
    description: "페이지·섹션 간 이동을 돕는 네비게이션 컴포넌트",
    components: [
      {
        slug: "tab",
        name: "Tab",
        desc: "PC 탭 네비게이션",
        story: "components-tab--docs",
      },
      {
        slug: "mscroll-tab",
        name: "MScrollTab",
        desc: "모바일 스크롤 탭",
        story: "components-mscrolltab--docs",
      },
      {
        slug: "breadcrumb",
        name: "Breadcrumb",
        desc: "경로 탐색 브레드크럼",
        story: "components-breadcrumb--docs",
      },
      {
        slug: "pagination",
        name: "Pagination",
        desc: "페이지 네이션",
        story: "components-pagination--docs",
      },
      {
        slug: "link",
        name: "Link",
        desc: "인라인 링크 텍스트",
        story: "components-link--docs",
        mine: true,
      },
    ],
  },
  {
    category: "Data Display",
    description: "데이터를 구조적으로 시각화하는 컴포넌트",
    components: [
      {
        slug: "table",
        name: "Table",
        desc: "PC 데이터 테이블",
        story: "components-table--docs",
      },
      {
        slug: "mtable",
        name: "MTable",
        desc: "모바일 반응형 테이블",
        story: "components-mtable--docs",
      },
      {
        slug: "detail",
        name: "Detail",
        desc: "키-값 상세 정보 레이아웃",
        story: "components-detail--docs",
        mine: true,
      },
      {
        slug: "badge",
        name: "Badge",
        desc: "상태·카운트 배지",
        story: "components-badge--docs",
      },
      {
        slug: "tag",
        name: "Tag",
        desc: "태그·레이블 칩",
        story: "components-tag--docs",
      },
      {
        slug: "icon",
        name: "Icon",
        desc: "아이콘 컴포넌트 시스템",
        story: "components-icon--docs",
        mine: true,
      },
      {
        slug: "carousel",
        name: "Carousel",
        desc: "이미지·카드 슬라이더",
        story: "components-carousel--docs",
      },
    ],
  },
  {
    category: "Actions",
    description: "사용자 인터랙션을 처리하는 액션 컴포넌트",
    components: [
      {
        slug: "button",
        name: "Button",
        desc: "Primary / Secondary / Danger 등 variant 시스템",
        story: "components-button--docs",
        mine: true,
      },
      {
        slug: "file-upload",
        name: "FileUpload",
        desc: "파일 드래그·클릭 업로드",
        story: "components-fileupload--docs",
      },
      {
        slug: "file-button-upload",
        name: "FileButtonUpload",
        desc: "버튼 트리거 파일 업로드",
        story: "components-filebuttonupload--docs",
      },
      {
        slug: "step-indicator",
        name: "StepIndicator",
        desc: "다단계 프로세스 진행 표시",
        story: "components-stepindicator--docs",
      },
      {
        slug: "search-box",
        name: "SearchBox",
        desc: "검색 인풋",
        story: "components-searchbox--docs",
      },
    ],
  },
  {
    category: "Feedback",
    description: "사용자에게 상태·정보를 전달하는 피드백 컴포넌트",
    components: [
      {
        slug: "modal",
        name: "Modal",
        desc: "전역 모달 시스템",
        story: "components-modal--docs",
        mine: true,
      },
      {
        slug: "alert",
        name: "Alert",
        desc: "인라인 알림 메시지",
        story: "components-alert--docs",
      },
      {
        slug: "toast-bar",
        name: "ToastBar",
        desc: "자동 소멸 토스트 알림",
        story: "components-toastbar--docs",
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        desc: "호버 툴팁",
        story: "components-tooltip--docs",
      },
      {
        slug: "spinner",
        name: "Spinner",
        desc: "로딩 인디케이터",
        story: "components-spinner--docs",
      },
      {
        slug: "portal",
        name: "Portal",
        desc: "DOM 외부 렌더링 포털",
        story: "components-portal--docs",
      },
      {
        slug: "loading-page",
        name: "LoadingPage",
        desc: "전체 페이지 로딩 화면",
        story: "components-loadingpage--docs",
      },
      {
        slug: "error-page",
        name: "ErrorPage",
        desc: "에러 상태 페이지",
        story: "components-errorpage--docs",
      },
    ],
  },
  {
    category: "Layout",
    description: "페이지 구조를 잡는 레이아웃 컴포넌트",
    components: [
      {
        slug: "masthead",
        name: "Masthead",
        desc: "페이지 상단 마스트헤드 영역",
        story: "components-masthead--docs",
      },
      {
        slug: "accordion",
        name: "Accordion",
        desc: "접기·펼치기 아코디언",
        story: "components-accordion--docs",
      },
    ],
  },
];

// ─── 평탄화 헬퍼 (slug 검색용) ─────────────────────────────
export const ALL_COMPONENTS: DesignComponent[] = COMPONENT_GROUPS.flatMap(
  (g) => g.components,
);

export const getComponentBySlug = (slug: string) =>
  ALL_COMPONENTS.find((c) => c.slug === slug);
