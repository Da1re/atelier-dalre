export type ComponentStatus = "retired" | "deprecated";
export type ComponentBadge = "original" | "migrated" | ComponentStatus;

export interface DesignComponent {
  slug: string;
  name: string;
  desc: string;
  mine?: boolean; // 처음부터 끝까지 본인이 만든 컴포넌트
  status?: ComponentStatus;
  /** retired·deprecated 사유 한 줄 — 카드와 상세 헤더에 노출 */
  statusNote?: string;
}

export interface DesignComponentGroup {
  category: string;
  description: string;
  components: DesignComponent[];
}

// 패키지로 분리하면서 제거한 타이포 래퍼 4종(Display·Title·Body·Detail)이 같은 사유를 공유한다
const TYPO_RETIRED_NOTE =
  "패키지로 분리하면서 타이포 래퍼를 제거하고 토큰·유틸 클래스로 대체";

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
        mine: true,
        status: "retired",
        statusNote: TYPO_RETIRED_NOTE,
      },
      {
        slug: "heading",
        name: "Heading",
        desc: "섹션 제목 계층 (h1–h6)",
        mine: true,
      },
      {
        slug: "title",
        name: "Title",
        desc: "카드·패널 타이틀",
        mine: true,
        status: "retired",
        statusNote: TYPO_RETIRED_NOTE,
      },
      {
        slug: "body",
        name: "Body",
        desc: "본문 텍스트 사이즈 시스템",
        mine: true,
        status: "retired",
        statusNote: TYPO_RETIRED_NOTE,
      },
      {
        slug: "detail",
        name: "Detail",
        desc: "상세 설명용 보조 텍스트",
        mine: true,
        status: "retired",
        statusNote: TYPO_RETIRED_NOTE,
      },
      {
        slug: "label",
        name: "Label",
        desc: "폼 레이블 및 보조 텍스트",
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
        mine: true,
      },
      {
        slug: "number-input",
        name: "NumberInput",
        desc: "숫자 입력 — 콤마·소수점 자동 처리",
        mine: true,
      },
      {
        slug: "phone-input",
        name: "PhoneInput",
        desc: "전화번호 자동 포맷팅 (010-0000-0000)",
        mine: true,
      },
      {
        slug: "tel-input",
        name: "TelInput",
        desc: "구간 분리형 전화번호 입력",
        mine: true,
      },
      {
        slug: "textarea",
        name: "TextArea",
        desc: "멀티라인 텍스트 입력",
        mine: true,
      },
      {
        slug: "select",
        name: "Select",
        desc: "드롭다운 선택 — 풀 제네릭",
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        desc: "단일·그룹 체크박스",
      },
      {
        slug: "radio",
        name: "Radio",
        desc: "라디오 버튼 그룹",
      },
      {
        slug: "toggle",
        name: "Toggle",
        desc: "토글 스위치 — 접근성 적용",
        mine: true,
      },
      {
        slug: "chip",
        name: "Chip",
        desc: "다중 선택 칩 그룹",
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
        mine: true,
      },
      {
        slug: "range-date-picker",
        name: "RangeDatePicker",
        desc: "시작·종료 범위 날짜 선택",
        mine: true,
      },
      {
        slug: "custom-date-picker",
        name: "CustomDatePicker",
        desc: "커스텀 트리거 기반 날짜 선택",
      },
      {
        slug: "time-selector",
        name: "TimeSelector",
        desc: "시·분 시간 선택",
        mine: true,
      },
      {
        slug: "schedule-calendar",
        name: "ScheduleCalendar",
        desc: "일정 시각화 캘린더",
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
      },
      {
        slug: "mscroll-tab",
        name: "MScrollTab",
        desc: "모바일 스크롤 탭",
      },
      {
        slug: "breadcrumb",
        name: "Breadcrumb",
        desc: "경로 탐색 브레드크럼",
      },
      {
        slug: "pagination",
        name: "Pagination",
        desc: "페이지 네이션",
      },
      {
        slug: "link",
        name: "Link",
        desc: "인라인 링크 텍스트",
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
      },
      {
        slug: "mtable",
        name: "MTable",
        desc: "모바일 반응형 테이블",
      },
      {
        slug: "badge",
        name: "Badge",
        desc: "상태·카운트 배지",
      },
      {
        slug: "tag",
        name: "Tag",
        desc: "태그·레이블 칩",
      },
      {
        slug: "icon",
        name: "Icon",
        desc: "아이콘 컴포넌트 시스템",
        mine: true,
      },
      {
        slug: "carousel",
        name: "Carousel",
        desc: "이미지·카드 슬라이더",
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
        desc: "variant(모양) × color × size 매트릭스",
        mine: true,
      },
      {
        slug: "file-upload",
        name: "FileUpload",
        desc: "파일 드래그·클릭 업로드",
      },
      {
        slug: "file-button-upload",
        name: "FileButtonUpload",
        desc: "버튼 트리거 파일 업로드",
      },
      {
        slug: "step-indicator",
        name: "StepIndicator",
        desc: "다단계 프로세스 진행 표시",
      },
      {
        slug: "search-box",
        name: "SearchBox",
        desc: "검색 인풋",
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
        mine: true,
      },
      {
        slug: "alert",
        name: "Alert",
        desc: "인라인 알림 메시지",
        status: "deprecated",
        statusNote: "InfoBox로 통합. 기존 사용처가 깨지지 않도록 별칭을 남김",
      },
      {
        slug: "infobox",
        name: "InfoBox",
        desc: "정보 안내 박스 — 7색 체계",
        mine: true,
      },
      {
        slug: "toast-bar",
        name: "ToastBar",
        desc: "자동 소멸 토스트 알림",
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        desc: "호버 툴팁",
      },
      {
        slug: "spinner",
        name: "Spinner",
        desc: "로딩 인디케이터",
      },
      {
        slug: "portal",
        name: "Portal",
        desc: "DOM 외부 렌더링 포털",
      },
      {
        slug: "loading-page",
        name: "LoadingPage",
        desc: "전체 페이지 로딩 화면",
      },
      {
        slug: "error-page",
        name: "ErrorPage",
        desc: "에러 상태 페이지",
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
      },
      {
        slug: "accordion",
        name: "Accordion",
        desc: "접기·펼치기 아코디언",
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

// ─── 마이그레이션(가이드 패턴 재설계) 대상 슬러그 ─────────────
export const MIGRATED_SLUGS = new Set<string>([
  "button", "badge", "tag", "chip",
  "text-input", "number-input", "phone-input", "tel-input", "textarea",
  "select", "checkbox", "radio", "toggle", "link",
  "single-date-picker", "range-date-picker", "custom-date-picker", "time-selector",
  "accordion", "tab", "breadcrumb", "pagination", "modal",
  "file-upload", "file-button-upload", "alert", "toast-bar", "tooltip",
  "carousel", "step-indicator", "search-box",
]);

export const isMigrated = (slug: string) => MIGRATED_SLUGS.has(slug);

// 카드·상세 헤더가 같은 순서로 배지를 그리도록 한 곳에서 계산한다
export function getComponentBadges(comp: DesignComponent): ComponentBadge[] {
  const badges: ComponentBadge[] = [];
  if (comp.mine) badges.push("original");
  if (!comp.mine && isMigrated(comp.slug)) badges.push("migrated");
  if (comp.status) badges.push(comp.status);
  return badges;
}
