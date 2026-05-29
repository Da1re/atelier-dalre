export interface ComponentDoc {
  overview: string;
  features: string[];
}

// 컴포넌트 기본 문서 (overview + features)
export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  // ─── Typography ──────────────────────────────────────────
  display: {
    overview:
      "히어로·랜딩 영역의 최상위 헤드라인 컴포넌트. 페이지에서 가장 큰 시각적 위계를 차지하며, 자극적인 첫인상을 책임집니다.",
    features: [
      "size 토큰 (large / medium / small)",
      "font-weight 옵션 (normal / medium / semibold)",
      "color 토큰 매핑",
      "반응형 폰트 사이즈",
    ],
  },
  heading: {
    overview:
      "섹션 제목용 헤딩 컴포넌트. h1–h6 의미 태그를 지원하며, 시각적 사이즈와 시맨틱 레벨을 분리해서 SEO·a11y 양쪽에 안전합니다.",
    features: [
      "h1–h6 시맨틱 레벨",
      "시각 사이즈 토큰 (level 과 분리)",
      "weight / color 옵션",
      "as prop 으로 태그 오버라이드",
    ],
  },
  title: {
    overview:
      "카드, 패널, 다이얼로그 등의 영역 타이틀에 사용하는 중간 위계 컴포넌트.",
    features: [
      "size 3단",
      "subtitle 슬롯",
      "color 토큰",
      "trailing 슬롯 (액션 버튼·아이콘)",
    ],
  },
  body: {
    overview:
      "본문 텍스트 스케일 시스템. 가독성을 위해 폰트 사이즈와 line-height 가 토큰으로 정규화되어 있습니다.",
    features: [
      "size (xs / sm / base / lg / xl)",
      "weight (regular / medium / semibold)",
      "color 토큰 매핑",
      "as prop (p / span / div)",
    ],
  },
  label: {
    overview:
      "폼 필드 레이블과 보조 메타 텍스트. 필수 표시(*)와 부가 설명을 한 단위로 다룹니다.",
    features: [
      "required (*) 표시",
      "size (small / medium / large)",
      "보조 description 슬롯",
      "for / htmlFor 자동 연결",
    ],
  },

  // ─── Inputs ──────────────────────────────────────────────
  "text-input": {
    overview:
      "범용 텍스트 입력 컴포넌트. 표준 onChange 시그니처 위에 icon / password 토글 / clear 액션 / 상태 표시를 한 컴포넌트에서 다룹니다.",
    features: [
      "size 매트릭스 (small / medium / large)",
      "isInvalid + StatusLabel 통합",
      "icon: ReactNode + onIconClick (자동 <button> wrap)",
      "deleteAction / password 토글",
      "focus·invalid 시 padding 보정으로 layout-shift 제거",
    ],
  },
  "number-input": {
    overview:
      "숫자 전용 입력. 콤마 자동 표기, 소수점 처리, raw 값 노출까지 비즈니스 로직을 내부에 캡슐화합니다.",
    features: [
      "콤마 자동 포맷팅 (raw 값 onChange 동시 노출)",
      "소수점 / 음수 옵션",
      "min / max 클램프",
      "표준 onChange 합성 이벤트",
    ],
  },
  "phone-input": {
    overview:
      "한국 휴대전화 번호 자동 포맷팅 (010-0000-0000). 초기값을 자동 split 하고, 입력 중에도 형식이 유지됩니다.",
    features: [
      "010-0000-0000 자동 포맷",
      "WithInitialValue 자동 split",
      "표준 onChange 합성 이벤트",
      "Required / Validation 케이스",
    ],
  },
  "tel-input": {
    overview:
      "구간 분리형 전화번호 (지역번호 / 국번 / 끝자리). 구간 길이를 보존하면서 자유로운 포맷을 지원합니다.",
    features: [
      "구간별 input 분리",
      "구간 길이 보존 로직",
      "SegmentValidation",
      "외부 isInvalid prop",
    ],
  },
  textarea: {
    overview:
      "멀티라인 텍스트 입력. 글자수 카운트와 size 매트릭스, 공용 스크롤바 유틸을 함께 사용합니다.",
    features: [
      "size 매트릭스 (small / medium / large)",
      "글자수 count 표기",
      "isInvalid + StatusLabel",
      "공용 .scrollbar utility",
    ],
  },
  select: {
    overview:
      "풀 제네릭 드롭다운. T 타입을 그대로 받아서 getLabel / getKey 가 옵셔널 — 표준 필드(label/name/title, id/value/code/key)는 자동 추론합니다.",
    features: [
      "풀 제네릭 Select<T>",
      "getLabel / getKey 자동 추론",
      "multi 모드 체크박스 패턴",
      "키보드 a11y + focus ring",
      "size 매트릭스 padding 보정",
    ],
  },
  checkbox: {
    overview:
      "단일 체크박스와 CheckboxGroup<T> 를 함께 제공. 표준 boolean 시그니처와 풀 제네릭 그룹 패턴을 사용합니다.",
    features: [
      "표준 boolean onChange",
      "CheckboxGroup<T> 풀 제네릭",
      "color / size prop",
      "focus ring 통일",
      "primitive · value-label · 객체 타입 모두 지원",
    ],
  },
  radio: {
    overview:
      "라디오 버튼과 RadioGroup<T>. Checkbox 와 동일한 풀 제네릭 패턴을 따릅니다.",
    features: [
      "RadioGroup<T> 풀 제네릭",
      "color / size prop",
      "focus ring",
      "name 자동 생성",
    ],
  },
  toggle: {
    overview:
      "온/오프 토글 스위치. 커스텀 SVG 아이콘으로 상태 전환을 시각화합니다.",
    features: [
      "표준 boolean onChange",
      "커스텀 SVG 아이콘",
      "size 토큰",
      "color 옵션",
    ],
  },
  chip: {
    overview:
      "다중 선택 칩 그룹. single / multi 모드와 전체 토글을 지원하는 풀 제네릭 컴포넌트입니다.",
    features: [
      "ChipGroup<T> 풀 제네릭",
      "single / multi 모드",
      "전체 토글 옵션",
      "focus ring (Checkbox 통일)",
      "MUI 아이콘",
    ],
  },

  // ─── Date & Time ─────────────────────────────────────────
  "single-date-picker": {
    overview:
      "단일 날짜 선택 컴포넌트. 27종 pattern 을 지원하고, portal RAF 추적으로 스크롤/리사이즈에도 패널 위치가 정확히 따라갑니다.",
    features: [
      "27종 pattern (YYYY-MM-DD, YYYY-MM, 한글 등)",
      "editable / buttonsDisabled / placeholder[]",
      "TextInput v1 어댑트",
      "portal RAF 위치 추적",
      "MUI 아이콘 마이그",
    ],
  },
  "range-date-picker": {
    overview:
      "시작–종료 범위 선택. 두 input 대신 single-box UI 로 통합되어 좁은 영역에서도 자연스럽게 동작합니다.",
    features: [
      "Range single-box UI",
      "pattern 27종 공유",
      "TextInput v1 어댑트",
      "portal RAF 추적",
    ],
  },
  "custom-date-picker": {
    overview:
      "트리거 컴포넌트를 자유롭게 끼울 수 있는 헤드리스 DatePicker. EventCalendar, MonthPicker, YearPicker 등 시나리오별 변형을 함께 제공합니다.",
    features: [
      "커스텀 트리거 슬롯",
      "EventCalendar / MonthPicker / YearPicker",
      "DatePickerCalendar 기본 셸",
      "포털 기반 패널",
    ],
  },
  "time-selector": {
    overview:
      "시·분 시간 선택. AccessTime 아이콘 + readonly TextInput 트리거 패턴으로 인풋과 한 카드처럼 보이며, 패널은 portal + RAF 로 정확히 따라갑니다.",
    features: [
      "useAP (오전/오후) 모드",
      "step (1·5·10·15 분)",
      "size 토큰 (small / medium / large)",
      "선택 즉시 onChange",
      "DatePicker YMS 패턴 커스텀 dropdown",
    ],
  },
  "schedule-calendar": {
    overview:
      "월·주 단위 일정 시각화 캘린더. 일정 카드를 셀 안에 자유 배치할 수 있는 layout 컨테이너입니다.",
    features: [
      "월 / 주 뷰 전환",
      "일정 카드 슬롯",
      "오늘 / 선택 / 휴일 강조",
      "다국어 라벨",
    ],
  },

  // ─── Navigation ──────────────────────────────────────────
  tab: {
    overview:
      "PC 환경 탭 네비게이션. fill / line variant 와 scaleX 애니메이션 인디케이터를 지원합니다.",
    features: [
      "variant (fill / line)",
      "color 5종 + size",
      "scaleX 인디케이터 애니메이션",
      "반응형 + native button 재구성",
    ],
  },
  "mscroll-tab": {
    overview:
      "모바일 스크롤 탭. 탭이 많아지면 가로로 스크롤되며, 현재 선택 탭이 자동으로 뷰포트 안으로 들어옵니다.",
    features: [
      "가로 스크롤 컨테이너",
      "선택 탭 자동 scrollIntoView",
      "Tab 컴포넌트와 prop 호환",
      "스크롤바 hidden",
    ],
  },
  breadcrumb: {
    overview:
      "현재 경로의 위계를 표시하는 빵부스러기 네비. 마지막 항목은 비활성화되고, 중간 항목은 클릭 가능합니다.",
    features: [
      "items 배열",
      "현재 위치 자동 마지막 처리",
      "MUI 아이콘 (분리자)",
      "긴 경로 ellipsis",
    ],
  },
  pagination: {
    overview:
      "페이지 네이션. PC 에서는 페이지 번호 풀 노출, 모바일에서는 ‹ N / Total › 컴팩트 형태로 반응형 동작합니다.",
    features: [
      "반응형 (PC full / 모바일 compact)",
      "currentPage / totalCount / pageSize",
      "이전 / 다음 / 처음 / 끝",
      "MUI 아이콘",
    ],
  },
  link: {
    overview:
      "인라인 링크 텍스트 컴포넌트. 외부 링크는 OpenInNew 아이콘과 rel='noopener noreferrer' 가 자동 부착됩니다.",
    features: [
      "color 토큰 9종",
      "target=_blank 시 OpenInNew + 보안 rel 자동",
      "underline 옵션",
      "focus ring",
    ],
  },

  // ─── Data Display ────────────────────────────────────────
  table: {
    overview:
      "PC 데이터 테이블. 정렬, 셀 슬롯, sticky 헤더 등 기본 기능을 갖춘 헤드리스 베이스.",
    features: [
      "columns 정의",
      "정렬 onSortChange",
      "셀 / 헤더 렌더 슬롯",
      "sticky header",
    ],
  },
  mtable: {
    overview:
      "모바일 반응형 테이블. 행을 카드 형태로 풀어서 좁은 화면에서도 가독성을 유지합니다.",
    features: [
      "행 → 카드 변환",
      "주요 컬럼 우선 노출",
      "expand / detail",
      "Table 과 columns 호환",
    ],
  },
  detail: {
    overview:
      "키–값 형태의 상세 정보 레이아웃. dl/dt/dd 시맨틱과 그리드 정렬을 한 컴포넌트로 제공합니다.",
    features: [
      "key–value 그리드",
      "다중 컬럼 옵션",
      "size 토큰",
      "value 슬롯 (커스텀 렌더)",
    ],
  },
  badge: {
    overview:
      "상태나 카운트를 표시하는 배지. shape × color × size 매트릭스로 사용 케이스를 확장합니다.",
    features: [
      "shape (outline / fill / pastel)",
      "color 11종 토큰",
      "size 토큰",
      "숫자 / 텍스트 모드",
    ],
  },
  tag: {
    overview:
      "라벨이나 카테고리를 표시하는 태그. 단순 텍스트 / 삭제 가능 두 가지 variant 를 제공합니다.",
    features: [
      "variant (text / removable)",
      "size (large / medium / small)",
      "color 토큰",
      "MUI delete 아이콘",
    ],
  },
  icon: {
    overview:
      "프로젝트 전반에서 사용하는 아이콘 시스템. MUI 아이콘과 커스텀 SVG 를 함께 다루며, color / size 토큰을 받습니다.",
    features: [
      "MUI + 커스텀 SVG",
      "size 토큰",
      "color 토큰",
      "currentColor 상속",
    ],
  },
  carousel: {
    overview:
      "이미지 / 카드 슬라이더. 자동 재생, 인디케이터, 화살표 컨트롤을 옵션으로 제공합니다.",
    features: [
      "auto-play",
      "인디케이터 / 화살표",
      "터치 / 드래그 지원",
      "MUI 아이콘 24px 정렬",
    ],
  },

  // ─── Actions ─────────────────────────────────────────────
  button: {
    overview:
      "디자인 시스템의 모든 액션을 책임지는 핵심 컴포넌트. variant × color × size 매트릭스로 거의 모든 케이스를 표현합니다.",
    features: [
      "variant 3종 (solid / outline / text)",
      "color 11종 + size 5단",
      "height / rounded 토큰",
      "icon + onIconClick (a11y wrap)",
      "KRDS Outline tinted override",
    ],
  },
  "file-upload": {
    overview:
      "드래그 앤 드롭 / 클릭 파일 업로드. 드롭존 시각화와 다양한 카운트 표기를 지원합니다.",
    features: [
      "드래그 앤 드롭 + 클릭",
      "countDisplay ('count' / 'totalSize' / 'none')",
      "multiple / accept",
      "dragActive 시각화",
    ],
  },
  "file-button-upload": {
    overview:
      "버튼 형태의 트리거로 파일을 받는 업로드. FileUpload 와 동일 모델을 공유하지만 UI 가 미니멀합니다.",
    features: [
      "버튼 트리거",
      "파일명 표시 슬롯",
      "multiple / accept",
      "FileUpload prop 호환",
    ],
  },
  "step-indicator": {
    overview:
      "다단계 프로세스의 진행도를 표시하는 인디케이터. 커스텀 SVG 로 단계 마커를 그리고 라벨 정렬을 보정합니다.",
    features: [
      "현재 / 완료 / 대기 상태",
      "커스텀 SVG 마커",
      "라벨 정렬 보정",
      "수평 / 수직 옵션",
    ],
  },
  "search-box": {
    overview:
      "검색용 인풋. 돋보기 아이콘, 클리어, 엔터 검색 등 검색 패턴을 한 컴포넌트로 묶었습니다.",
    features: [
      "MUI search / clear 아이콘",
      "엔터 onSearch",
      "size 토큰",
      "deleteAction",
    ],
  },

  // ─── Feedback ────────────────────────────────────────────
  modal: {
    overview:
      "전역 모달 시스템. usePortal 기반으로 어디서든 띄울 수 있고, esc / 백드롭 닫힘과 포커스 트랩을 기본 처리합니다.",
    features: [
      "Portal 기반 전역 모달",
      "esc / 백드롭 닫힘",
      "포커스 트랩 + 복귀",
      "size / placement 옵션",
    ],
  },
  alert: {
    overview:
      "인라인 알림 메시지. info / success / warning / danger 색을 가지며, description 영역에서 톤이 자동 매칭됩니다.",
    features: [
      "info / success / warning / danger 톤",
      "title + description",
      "MUI 아이콘",
      "dismissible 옵션",
    ],
  },
  "toast-bar": {
    overview:
      "자동 소멸 토스트 알림. 큐 시스템으로 여러 메시지를 순차 표시하고, 위치와 지속 시간을 설정할 수 있습니다.",
    features: [
      "큐 + 자동 소멸",
      "position (top / bottom)",
      "duration / persistent",
      "MUI 아이콘",
    ],
  },
  tooltip: {
    overview:
      "호버시 보이는 짧은 안내 툴팁. 외부 라이브러리 없이 portal + 위치 계산으로 가볍게 동작합니다.",
    features: [
      "placement 자동 / 수동",
      "hover delay",
      "portal 기반",
      "MUI 아이콘 (필요 시)",
    ],
  },
  spinner: {
    overview:
      "로딩 인디케이터. size 와 color 만 받는 작은 컴포넌트.",
    features: [
      "size 토큰",
      "color 토큰",
      "label (a11y)",
      "speed 옵션",
    ],
  },
  portal: {
    overview:
      "DOM 트리 외부에 렌더링하는 포털. Modal / DatePicker / TimeSelector 등 모든 떠다니는 UI 의 기반입니다.",
    features: [
      "root fallback (#app → #root → body)",
      "SSR 안전",
      "다중 포털",
      "useId 키 격리",
    ],
  },
  "loading-page": {
    overview:
      "페이지 전체 로딩 화면. 라우트 진입 / 데이터 페치 도중 임시로 채우는 풀스크린 셸입니다.",
    features: [
      "풀스크린 backdrop",
      "Spinner + 메시지",
      "transparent / opaque",
      "z-index 최상위",
    ],
  },
  "error-page": {
    overview:
      "에러 상태를 한 화면으로 알리는 페이지. 404 / 500 / unknown 같은 케이스를 같은 UI 로 다룹니다.",
    features: [
      "코드 + 메시지 + 액션",
      "재시도 / 홈으로 버튼",
      "일러스트 슬롯",
      "에러 객체 정형화",
    ],
  },

  // ─── Layout ──────────────────────────────────────────────
  masthead: {
    overview:
      "페이지 상단 마스트헤드 영역. 타이틀, breadcrumb, 액션 버튼을 한 단위로 묶어 일관된 헤더 레이아웃을 잡습니다.",
    features: [
      "title + subtitle",
      "breadcrumb 슬롯",
      "액션 버튼 영역",
      "반응형",
    ],
  },
  accordion: {
    overview:
      "접기·펼치기 아코디언. plain variant 에는 color prop 으로 톤을 입힐 수 있습니다.",
    features: [
      "plain / outlined variant",
      "plain color prop (primary / secondary / blue / navy / gray)",
      "단일 / 다중 열림",
      "inert warning 처리",
    ],
  },
};

export const getComponentDoc = (slug: string) => COMPONENT_DOCS[slug];
