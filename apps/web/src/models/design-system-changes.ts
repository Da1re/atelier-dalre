import type { ComponentV2 } from "./design-system-data";

// slug 기준 v2.0 작업 내역
export const COMPONENT_CHANGES: Record<string, ComponentV2> = {
  // ─── B. 가이드 패턴 재설계 (18 컴포넌트) ─────────────────
  button: {
    summary: "v2.0 재설계 · 8건",
    changes: [
      {
        category: "API",
        items: [
          "variant 3종 (solid / outline / text) × color 11종 × size 5단 매트릭스",
          "height / rounded 토큰화",
          "legacy variant·size 자동 normalize (사용처 호환)",
        ],
      },
      {
        category: "A11y",
        items: [
          "icon + onIconClick → 내부 <button>으로 wrap",
          "아이콘 클릭 시 키보드 / 스크린리더 접근 가능",
        ],
      },
      {
        category: "Style",
        items: [
          "KRDS Outline 만 tinted (.outline.color_blue selector, specificity 0,2,0)",
          "CSS variable cascade 패턴 적용",
        ],
      },
      {
        category: "Storybook",
        items: [
          "Project (Primary / Secondary), KRDS (Solid / Outline / Tertiary / Disabled), Danger (Solid / Outline), Icon 케이스",
          "Foundations 페이지 (Colors / Typography / Radius / Shadow)",
        ],
      },
    ],
  },

  badge: {
    summary: "v2.0 재설계 · 3건",
    changes: [
      {
        category: "API",
        items: [
          "shape (outline / fill / pastel) × color 11종 × size 매트릭스",
          "숫자 표기 모드",
        ],
      },
      {
        category: "Style",
        items: ["CSS variable cascade 패턴 적용", "11개 color 토큰 매핑"],
      },
      {
        category: "Migration",
        items: ["legacy appearance + variant → 신규 normalize"],
      },
    ],
  },

  tag: {
    summary: "v2.0 재설계 · 3건",
    changes: [
      {
        category: "API",
        items: [
          "variant (text / removable) × size (large / medium / small) 매트릭스",
          "legacy size (s / m / l) 자동 normalize",
        ],
      },
      {
        category: "Migration",
        items: [
          "delete 아이콘 → @mui/icons-material 변경",
          "Label 컴포넌트 의존 제거 (단순 span 으로 마크업 정리)",
        ],
      },
      {
        category: "Storybook",
        items: ["Default / text_tag / removable_tag / Disabled / All"],
      },
    ],
  },

  chip: {
    summary: "v2.0 재설계 · 4건",
    changes: [
      {
        category: "API",
        items: [
          "ChipGroup<T> 풀 제네릭",
          "single / multi 모드 + 전체 토글",
          "legacy size (s / m / l) 자동 normalize",
        ],
      },
      {
        category: "A11y",
        items: ["focus ring (Checkbox / Radio / Toggle와 통일)"],
      },
      {
        category: "Migration",
        items: ["체크 아이콘 → @mui/icons-material"],
      },
      {
        category: "Storybook",
        items: [
          "Chip Matrix (state × size)",
          "ChipGroup Single / Multi / Disabled",
        ],
      },
    ],
  },

  "text-input": {
    summary: "v2.0 재설계 · 5건",
    changes: [
      {
        category: "API",
        items: [
          "legacy props 전체 제거 (useIcon, useDelete, isValid, clickableIcon, minHeight, maxHeight, titlePosition, titleAttr, inputClassName, setValue)",
          "표준 onChange + isInvalid prop, size 매트릭스 (small / medium / large)",
          "icon: ReactNode + onIconClick / deleteAction / password 토글",
        ],
      },
      {
        category: "A11y",
        items: [
          "IconSlot 헬퍼로 onIconClick 시 <button> wrap",
          "키보드 접근 가능한 인터랙티브 아이콘",
        ],
      },
      {
        category: "Style",
        items: [
          "focus / invalid 시 padding 보정으로 layout-shift 제거",
          "hover 상태 default / invalid 분기 처리",
        ],
      },
      {
        category: "Migration",
        items: [
          "MUI 아이콘 적용 (Search / Cancel / Visibility / VisibilityOff)",
          "StatusLabel: Label 의존 제거, MUI(Cancel / Info) 적용",
        ],
      },
      {
        category: "Storybook",
        items: [
          "Default·info / Error / Disabled → size × empty/filled 3×2 매트릭스",
          "Icon · Password · Delete · onIconClick · FullSlots(email) 통합",
        ],
      },
    ],
  },

  "number-input": {
    summary: "v2.0 재설계 · 1건",
    changes: [
      {
        category: "API",
        items: ["setValue → 표준 onChange 합성 이벤트로 시그니처 통일"],
      },
      {
        category: "Storybook",
        items: [
          "WithComma 초기값 + raw 노출",
          "DefaultZero / States (error + disabled) 추가",
        ],
      },
    ],
  },

  "phone-input": {
    summary: "v2.0 재설계 · 1건",
    changes: [
      {
        category: "API",
        items: ["setValue → 표준 onChange 합성 이벤트"],
      },
      {
        category: "Storybook",
        items: [
          "Default / Required / WithInitialValue (자동 split) 케이스 신규",
        ],
      },
    ],
  },

  "tel-input": {
    summary: "v2.0 재설계 · 1건",
    changes: [
      {
        category: "API",
        items: [
          "onChange(value) 시그니처 + isInvalid prop",
          "구간 길이 보존 로직",
        ],
      },
      {
        category: "Storybook",
        items: [
          "Default / SegmentValidation / ExternalError / WithInitialValue",
        ],
      },
    ],
  },

  textarea: {
    summary: "v2.0 재설계 · 2건",
    changes: [
      {
        category: "API",
        items: [
          "legacy props 전체 제거 (titlePosition, titleClassName, inputClassName, minHeight, maxHeight, isValid, setValue)",
          "표준 onChange + isInvalid prop, size 매트릭스 (small / medium / large)",
        ],
      },
      {
        category: "Style",
        items: ["공용 .scrollbar utility 적용"],
      },
      {
        category: "Storybook",
        items: ["Default·info / Error / Disabled / count / info+count / error+count 매트릭스"],
      },
    ],
  },

  select: {
    summary: "v2.0 재설계 · 5건",
    changes: [
      {
        category: "API",
        items: [
          "풀 제네릭 Select<T>",
          "getLabel / getKey 옵셔널 + 자동 추론 (label/name/title/text, id/value/code/key)",
          "레거시 props 전체 제거 (valueKey / labelKey 등)",
          "multi 모드 체크박스 패턴 통일",
        ],
      },
      {
        category: "A11y",
        items: ["키보드 a11y 보강", "focus ring 통일"],
      },
      {
        category: "Style",
        items: ["Size 매트릭스 padding 보정 버그 수정"],
      },
      {
        category: "Migration",
        items: [
          "CitySelect 등 사용처 일괄 마이그",
          "MUI 아이콘 적용",
        ],
      },
      {
        category: "Storybook",
        items: [
          "number / literal union / {value, label} / User { id, name } / 비표준 객체 / multi / size / state 케이스",
          "각 케이스에 한국어 docs 포함",
        ],
      },
    ],
  },

  checkbox: {
    summary: "v2.0 재설계 · 4건",
    changes: [
      {
        category: "API",
        items: [
          "Checkbox: status: 'on' | 'off' → 표준 boolean",
          "onChange: (checked: boolean) => void",
          "size: 's' | 'm' | 'l' → 'medium' | 'large'",
          "CheckboxGroup<T>: 풀 제네릭, Select<T>와 동일 자동 추론 패턴",
          "getLabel / getKey 옵셔널, getDisabled 옵셔널, valueKey / labelKey 제거",
          "color prop 추가",
        ],
      },
      {
        category: "A11y",
        items: ["focus ring 통일"],
      },
      {
        category: "Style",
        items: [
          ".box svg display: block + line-height: 0 → 아이콘 baseline 정렬",
          "wrapper display: inline-flex → flex + width: fit-content",
        ],
      },
      {
        category: "Migration",
        items: ["DakCheckBox / DakCheckBoxGroup 6 파일 완전 삭제"],
      },
      {
        category: "Storybook",
        items: [
          "docs + State × Size 매트릭스",
          "4가지 Group 케이스 (primitive / value-label / User 객체 / 비표준)",
        ],
      },
    ],
  },

  radio: {
    summary: "v2.0 재설계 · 4건",
    changes: [
      {
        category: "API",
        items: [
          "RadioButton → Radio 개명",
          "RadioGroup<T> 풀 제네릭",
          "color / size prop 추가",
        ],
      },
      {
        category: "A11y",
        items: ["focus ring 통일"],
      },
    ],
  },

  toggle: {
    summary: "v2.0 재설계 · 3건",
    changes: [
      {
        category: "API",
        items: ["Switch → Toggle 개명", "v1 재설계"],
      },
      {
        category: "Style",
        items: ["커스텀 SVG 아이콘"],
      },
      {
        category: "Migration",
        items: ["Select multi 체크박스 패턴과 통일"],
      },
    ],
  },

  link: {
    summary: "v2.0 재설계 · 2건",
    changes: [
      {
        category: "API",
        items: [
          "color 토큰 9종 추가 (Checkbox / Radio / Toggle와 동일)",
          'target="_blank" 시 MUI OpenInNew 아이콘 자동 표시',
          'target="_blank" 시 rel="noopener noreferrer" 자동 부착',
        ],
      },
      {
        category: "A11y",
        items: [
          "focus ring",
          "외부 링크 안내 아이콘으로 새 창 열림 시각화",
        ],
      },
      {
        category: "Migration",
        items: ["LinkButton 삭제"],
      },
      {
        category: "Storybook",
        items: ["사용법 docs + Sizes / Colors / External / Underline 케이스"],
      },
    ],
  },

  "single-date-picker": {
    summary: "v2.0 재설계 · 14건 (DatePicker 패키지)",
    changes: [
      {
        category: "API",
        items: [
          "pattern 27종 (YYYY / YYYY-MM / YYYY.MM.DD / 한글 등)",
          "editable / buttonsDisabled / placeholder[] / size 토큰",
          "TextInput v1 어댑트",
        ],
      },
      {
        category: "A11y",
        items: [
          "cursor pointer: readOnly 시 input cursor (pointerInput / defaultCursor 클래스)",
          "YearMonthSelector type='button' 명시",
        ],
      },
      {
        category: "Style",
        items: [
          "Range single-box 통합",
          "드롭다운 위치 재계산",
          "portal RAF 추적으로 scroll / resize 따라가는 패널",
        ],
      },
      {
        category: "Migration",
        items: [
          "인천 프로젝트 포팅",
          "아이콘 MUI 마이그",
          "root element fallback (#app → #root → body)",
          "years / months useMemo 안정화",
        ],
      },
    ],
  },

  "range-date-picker": {
    summary: "v2.0 재설계 · DatePicker와 공통",
    changes: [
      {
        category: "API",
        items: ["Range single-box UI 통합", "pattern 27종 공유"],
      },
      {
        category: "Storybook",
        items: ["RangePicker 케이스"],
      },
    ],
  },

  "custom-date-picker": {
    summary: "v2.0 재설계 · DatePicker 신규",
    changes: [
      {
        category: "API",
        items: [
          "DatePickerCalendar / EventCalendar / MonthPicker / YearPicker 신규 컴포넌트",
        ],
      },
      {
        category: "Storybook",
        items: ["MonthPicker / YearPicker / EventCalendar 케이스"],
      },
    ],
  },

  "time-selector": {
    summary: "v2.0 재설계 · 7건",
    changes: [
      {
        category: "API",
        items: [
          "useAP / step (1·5·10·15) / size (small·medium·large) / disabled / isInvalid / isRequired",
          "선택 즉시 onChange (확인 / 취소 footer 제거)",
        ],
      },
      {
        category: "Style",
        items: [
          "AccessTime 아이콘 + TextInput readonly trigger 패턴",
          "패널 portal 처리 + 위치 / 폭 RAF 추적",
          "시 / 분 커스텀 dropdown (DatePicker YearMonthSelector 패턴, box-shadow only, primary-05 hover, secondary 톤 스크롤바)",
          "input 과 한 카드 디자인",
        ],
      },
      {
        category: "Migration",
        items: [
          "legacy TimeSelectorPopup / TimeSelectorInput / usePopup 3 파일 삭제 → 단일 컴포넌트 통합",
        ],
      },
      {
        category: "Storybook",
        items: [
          "Default / UseAP / StepInterval / Sizes / Portal(overflow:hidden) / States",
        ],
      },
    ],
  },

  accordion: {
    summary: "v2.0 재설계 · 2건",
    changes: [
      {
        category: "API",
        items: [
          "plain variant 에 color prop (primary / secondary / blue / navy / gray) 추가",
        ],
      },
      {
        category: "A11y",
        items: ["inert warning 처리"],
      },
    ],
  },

  tab: {
    summary: "v2.0 재설계 · 8건",
    changes: [
      {
        category: "API",
        items: [
          "variant 2종 (fill / line)",
          "size 분리 + color 5종 토큰",
          "반응형 동작",
        ],
      },
      {
        category: "Style",
        items: [
          "scaleX 애니메이션 (line variant 인디케이터)",
          "hover hint 표시",
        ],
      },
      {
        category: "A11y",
        items: ["native button 재구성"],
      },
      {
        category: "Migration",
        items: ["MScrollTab 호환 유지"],
      },
      {
        category: "Storybook",
        items: ["Plain · color variants 케이스"],
      },
    ],
  },

  // ─── C. 아이콘 MUI 마이그 · UX 보강 (11 컴포넌트) ─────────
  breadcrumb: {
    summary: "v2.0 마이그 · 1건",
    changes: [
      {
        category: "Migration",
        items: ["legacy Icon → MUI 아이콘 마이그"],
      },
    ],
  },

  pagination: {
    summary: "v2.0 마이그 · 1건",
    changes: [
      {
        category: "Style",
        items: ["반응형 페이지 네비 동작"],
      },
      {
        category: "Migration",
        items: ["legacy Icon → MUI 아이콘 마이그"],
      },
    ],
  },

  modal: {
    summary: "v2.0 마이그 · 1건",
    changes: [
      {
        category: "Migration",
        items: ["legacy Icon → MUI 아이콘 마이그"],
      },
    ],
  },

  "file-upload": {
    summary: "v2.0 재설계 · 2건",
    changes: [
      {
        category: "API",
        items: ["countDisplay prop 추가 ('count' | 'totalSize' | 'none')"],
      },
      {
        category: "Style",
        items: ["드롭존 인터랙션 개선 (dragActive 시각화)"],
      },
      {
        category: "Migration",
        items: ["legacy Icon → MUI 아이콘"],
      },
    ],
  },

  "file-button-upload": {
    summary: "v2.0 재설계 · 1건",
    changes: [
      {
        category: "Style",
        items: ["가이드 매칭 UI 재구성"],
      },
      {
        category: "Migration",
        items: [
          "DakFileUpload 3 파일 삭제",
          "text-dak-* className → 가이드 text-* 매핑",
          "legacy Icon → MUI 아이콘",
        ],
      },
    ],
  },

  alert: {
    summary: "v2.0 재설계 · 1건",
    changes: [
      {
        category: "Style",
        items: ["아이콘 + description 색 토큰 매칭"],
      },
      {
        category: "Migration",
        items: ["legacy Icon → MUI 아이콘 마이그"],
      },
    ],
  },

  "toast-bar": {
    summary: "v2.0 마이그 · 1건",
    changes: [
      {
        category: "Migration",
        items: ["legacy Icon → MUI 아이콘 마이그"],
      },
    ],
  },

  tooltip: {
    summary: "v2.0 재설계 · 1건",
    changes: [
      {
        category: "API",
        items: ["Close 버튼 제거 (호버만으로 닫힘)"],
      },
      {
        category: "Migration",
        items: ["legacy Icon → MUI 아이콘"],
      },
    ],
  },

  carousel: {
    summary: "v2.0 마이그 · 1건",
    changes: [
      {
        category: "Style",
        items: ["24px 아이콘 정렬"],
      },
      {
        category: "Migration",
        items: ["legacy Icon → MUI 아이콘"],
      },
    ],
  },

  "step-indicator": {
    summary: "v2.0 재설계 · 1건",
    changes: [
      {
        category: "Style",
        items: ["커스텀 SVG + 정렬 보정"],
      },
    ],
  },

  "search-box": {
    summary: "v2.0 마이그 · 1건",
    changes: [
      {
        category: "Migration",
        items: ["legacy Icon → MUI 아이콘 마이그"],
      },
    ],
  },
};

export const getComponentChanges = (slug: string) => COMPONENT_CHANGES[slug];
