import { DESIGN_NOTES } from "./design-notes";

export interface DesignNote {
  /** 소제목 — 예: "풀려던 문제", "고려한 trade-off" */
  title: string;
  body: string;
}

export interface ComponentDoc {
  overview: string;
  features: string[];
  /** 설계 노트 — 무엇을 고민하고 어떻게 결정했는지 (상세 페이지 전용) */
  designNotes?: DesignNote[];
}

// 컴포넌트 기본 문서 (overview + features)
export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  // ─── Typography ──────────────────────────────────────────
  display: {
    overview:
      "히어로·랜딩 영역의 최상위 헤드라인 컴포넌트. 페이지에서 가장 큰 시각적 위계를 차지하며, 강한 첫인상을 줍니다.",
    features: [
      "size 토큰 (large / medium / small)",
      "font-weight 옵션 (normal / medium / semibold)",
      "color 토큰 매핑",
      "반응형 폰트 사이즈",
    ],
  },
  heading: {
    overview:
      "섹션 제목용 헤딩 컴포넌트. size 하나가 시각 크기와 시맨틱 태그(h1–h5)를 함께 정해, 문서 위계에 맞는 태그가 출력됩니다.",
    features: [
      "h1–h5 시맨틱 태그 (size 1~5)",
      "레벨별 font-size·line-height, 600px 이하 재조정",
      "color 토큰 또는 임의 색상값",
      "id·aria-* 등 표준 HTML 속성",
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
      "본문 텍스트 스케일 시스템. 가독성을 위해 폰트 사이즈와 line-height가 토큰으로 정규화되어 있습니다.",
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
    designNotes: [
      {
        title: "무엇을 만들려 했나",
        body: "표준 input의 onChange 시그니처는 그대로 두면서 아이콘·비밀번호 토글·내용 삭제·상태 표시(error/info)까지 한 컴포넌트에 담는 게 목표였다. 사용처는 일반 input처럼 쓰되, 부가 기능은 prop으로만 켜는 구조로 설계했다.",
      },
      {
        title: "아이콘·버튼의 접근성",
        body: "아이콘에 onIconClick이 있으면 단순 span이 아니라 내부 button으로 감싸(IconSlot 분기) 키보드·스크린리더로 누를 수 있게 했다. 비밀번호 토글·삭제 버튼도 각각 의미 있는 aria-label을 부여했다.",
      },
      {
        title: "상태와 a11y 연결",
        body: "error 또는 isInvalid면 aria-invalid를 켜고, description·error·info의 id를 모아 aria-describedby로 연결해 스크린리더가 보조 텍스트까지 읽도록 했다. 메시지 노출은 StatusLabel로 일원화했다.",
      },
      {
        title: "layout-shift 제거",
        body: "아이콘 유무와 invalid 상태에 따라 input의 좌우 padding이 달라지는데, 조합별 클래스(getIconClass)로 padding을 미리 확정해 상태가 바뀌어도 입력창이 흔들리지 않게 했다.",
      },
      {
        title: "ref 노출(forwardRef)",
        body: "NumberInput·PhoneInput처럼 이 컴포넌트를 감싸는 상위 입력들이 내부 input을 직접 제어해야 해서 forwardRef로 ref를 외부에 노출했다.",
      },
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
    designNotes: [
      {
        title: "무엇을 만들려 했나",
        body: "숫자 입력의 콤마 표기·소수점·raw 값 분리를 컴포넌트 내부에 캡슐화했다. 화면에는 1,000으로 보이지만 부모에게는 콤마 없는 raw 값(1000)을 합성 이벤트로 넘겨, 폼 로직이 순수 숫자만 다루도록 했다.",
      },
      {
        title: "가장 고민한 지점 — 커서 점프",
        body: "콤마를 넣으면 '1000'이 '1,000'으로 길이가 늘어 커서가 엉뚱한 위치로 튄다. 그래서 입력 전후로 '커서 앞쪽 콤마 개수'의 차이를 계산하고, 포맷팅 후 setSelectionRange로 커서를 보정했다. displayValue가 갱신된 뒤 useEffect에서 한 박자 늦게 커서를 복원하는 게 핵심이었다.",
      },
      {
        title: "TextInput 재사용",
        body: "숫자 전용 동작만 얹고 레이아웃·상태·접근성은 TextInput을 그대로 감싸 재사용했다. 커서 제어를 위해 ref로 내부 input의 selectionStart를 읽어온다.",
      },
      {
        title: "옵션 설계",
        body: "useComma·defaultZero·allowDecimal·decimalScale로 콤마 표기·기본 0·소수점 허용·자리수를 prop으로 열었고, 유효하지 않은 입력은 변환 단계에서 null로 걸러 무시했다.",
      },
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
    designNotes: [
      {
        title: "무엇을 만들려 했나",
        body: "전화번호를 3구간(3·4·4)으로 나눠 입력받되, 외부에는 일반 input처럼 합쳐진 문자열을 합성 이벤트로 돌려주는 컴포넌트로 설계했다. 사용처는 단일 값처럼 다루고 분할/조합은 내부가 책임진다.",
      },
      {
        title: "자동 포커스 이동",
        body: "각 칸을 ref 배열로 잡아, 한 칸이 최대 자릿수에 도달하면 다음 칸으로 포커스를 자동 이동시켰다. 입력값은 정규식으로 숫자만 남기고 구간별 maxLength로 잘라 형식이 항상 유지되게 했다.",
      },
      {
        title: "초기값 분해 — 가장 까다로웠던 부분",
        body: "외부 value가 바뀌면 splitPhoneNumber로 다시 3구간으로 쪼개는데, 단순 3·4·4가 아니라 전체 자릿수(9/10/11)와 02 지역번호를 판별해 02-354-8645·031-234-5678·010-1234-5678을 모두 올바르게 끊도록 했다.",
      },
      {
        title: "역동기화 방지",
        body: "내부 입력값(세 칸을 합친 문자열)과 외부 value가 실제로 다를 때만 split을 다시 돌려, 불필요한 재계산과 값이 되돌아가는 현상을 막았다.",
      },
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
      "풀 제네릭 드롭다운. T 타입을 그대로 받아서 getLabel / getKey가 옵셔널 — 표준 필드(label/name/title, id/value/code/key)는 자동 추론합니다.",
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
      "라디오 버튼과 RadioGroup<T>. Checkbox와 동일한 풀 제네릭 패턴을 따릅니다.",
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
      "단일 날짜 선택 컴포넌트. 27종 pattern을 지원하고, portal RAF 추적으로 스크롤/리사이즈에도 패널 위치가 정확히 따라갑니다.",
    features: [
      "27종 pattern (YYYY-MM-DD, YYYY-MM, 한글 등)",
      "editable / buttonsDisabled / placeholder[]",
      "TextInput v1 기반",
      "portal RAF 위치 추적",
      "MUI 아이콘으로 교체",
    ],
  },
  "range-date-picker": {
    overview:
      "시작–종료 범위 선택. 두 input 대신 single-box UI로 통합되어 좁은 영역에서도 자연스럽게 동작합니다.",
    features: [
      "Range single-box UI",
      "pattern 27종 공유",
      "TextInput v1 기반",
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
      "시·분 시간 선택. AccessTime 아이콘 + readonly TextInput 트리거 패턴으로 인풋과 한 카드처럼 보이며, 패널은 portal + RAF로 정확히 따라갑니다.",
    features: [
      "useAP (오전/오후) 모드",
      "step (1·5·10·15 분)",
      "size 토큰 (small / medium / large)",
      "선택 즉시 onChange",
      "DatePicker 기반 커스텀 드롭다운",
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
      "PC 환경 탭 네비게이션. fill / line variant와 scaleX 애니메이션 인디케이터를 지원합니다.",
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
      "현재 경로의 위계를 표시하는 브레드크럼 내비게이션. 마지막 항목은 비활성화되고, 중간 항목은 클릭 가능합니다.",
    features: [
      "items 배열",
      "현재 위치 자동 마지막 처리",
      "MUI 아이콘 (분리자)",
      "긴 경로 ellipsis",
    ],
  },
  pagination: {
    overview:
      "페이지네이션. 현재 페이지 주변 번호와 처음·마지막 페이지를 보여 주고, 모바일에서는 노출하는 번호 수를 줄입니다.",
    features: [
      "currentPage / totalPage / onChangePage",
      "앞·중간·끝 구간별 페이지 윈도우와 생략 표시",
      "경계에서 이전 / 다음 비활성화",
      "MUI 아이콘",
    ],
  },
  link: {
    overview:
      "인라인 링크 텍스트 컴포넌트. 외부 링크는 OpenInNew 아이콘과 rel='noopener noreferrer'가 자동 부착됩니다.",
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
      "Table과 columns 호환",
    ],
  },
  detail: {
    overview:
      "상세 설명 문구용 타이포그래피 컴포넌트. 별도 레이아웃 없이 size·weight·color 토큰만으로 제어하는 가장 가벼운 텍스트 단위입니다.",
    features: [
      "size (l / m / s)",
      "weight (regular / bold)",
      "color 토큰 + 임의 색상값",
      "polymorphic (as 엘리먼트, 기본 span)",
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
      "라벨이나 카테고리를 표시하는 태그. 단순 텍스트 / 삭제 가능 두 가지 variant를 제공합니다.",
    features: [
      "variant (text / removable)",
      "size (large / medium / small)",
      "color 토큰",
      "MUI delete 아이콘",
    ],
  },
  icon: {
    overview:
      "프로젝트 전반에서 사용하는 아이콘 시스템. MUI 아이콘과 커스텀 SVG를 함께 다루며, color / size 토큰을 받습니다.",
    features: [
      "MUI + 커스텀 SVG",
      "size 토큰",
      "color 토큰",
      "currentColor 상속",
    ],
  },
  carousel: {
    overview:
      "데이터 목록을 한 장씩 넘겨 보는 슬라이더. 자료형과 상관없이 인덱스만 관리하고, 바뀔 때 onChange로 알립니다.",
    features: [
      "제네릭 dataList와 currentIndex",
      "initialIndex 동기화, 빈 데이터면 렌더하지 않음",
      "이전 / 다음 버튼 (경계에서 비활성화)",
      "MUI 아이콘 24px 정렬",
    ],
  },

  // ─── Actions ─────────────────────────────────────────────
  button: {
    overview:
      "디자인시스템의 모든 액션을 책임지는 핵심 컴포넌트. variant × color × size 매트릭스로 거의 모든 케이스를 표현합니다.",
    features: [
      "variant 3종 (solid / outline / text)",
      "color 11종 + size 5단",
      "height / rounded 토큰",
      "icon + onIconClick (a11y wrap)",
      "KRDS Outline tinted override",
    ],
    designNotes: [
      {
        title: "무엇을 만들려 했나 — 기능 범위",
        body: "Primary·Secondary·Danger 등 화면마다 흩어져 있던 버튼 케이스를 하나로 흡수하는 범용 버튼이 목표였다. variant(solid·outline·text) × color(11종) × size(5단) 매트릭스로, 거의 모든 조합을 prop만으로 표현할 수 있게 설계했다.",
      },
      {
        title: "고려한 타입 설계",
        body: "variant·color·size를 느슨한 string이 아니라 ButtonVariant·ButtonSemanticColor·ButtonSize 유니온 타입으로 제약해, 잘못된 값을 컴파일 타임에 걸러지게 했다. icon은 ReactNode로 받아 어떤 아이콘이든 주입할 수 있게, iconPosition으로 좌·우 배치를 열어뒀다.",
      },
      {
        title: "로딩 상태 — 특히 신경 쓴 부분",
        body: "loading이 켜지면 Spinner를 자동 노출하고 loadingText로 문구를 교체하며, 클릭 이벤트를 막아(preventDefault) 비동기 처리 중 중복 제출을 차단했다. aria-busy로 스크린리더에도 진행 상태를 전달한다.",
      },
      {
        title: "접근성",
        body: "disabled와 loading을 isDisabled 하나로 통합해 aria-disabled를 부여하고 tabIndex를 -1로 두어 키보드 포커스에서 제외했다. 아이콘만 있는 버튼의 onIconClick도 내부 button 엘리먼트로 감싸 키보드·스크린리더로 조작 가능하게 했다.",
      },
      {
        title: "호환까지 고려한 점",
        body: "새 패턴을 도입하면서도 기존 화면이 쓰던 옛 명칭(primary, s·m·l 등)을 내부 normalize 레이어에서 신규 패턴으로 매핑해, 수많은 사용처를 한 번에 고치지 않아도 깨지지 않게 했다.",
      },
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
      "버튼 형태의 트리거로 파일을 받는 업로드. FileUpload와 동일 모델을 공유하지만 UI가 미니멀합니다.",
    features: [
      "버튼 트리거",
      "파일명 표시 슬롯",
      "multiple / accept",
      "FileUpload prop 호환",
    ],
  },
  "step-indicator": {
    overview:
      "다단계 프로세스의 진행도를 표시하는 인디케이터. 커스텀 SVG로 단계 마커를 그리고 라벨 정렬을 보정합니다.",
    features: [
      "현재 / 완료 / 대기 상태",
      "커스텀 SVG 마커",
      "라벨 정렬 보정",
      "수평 / 수직 옵션",
    ],
  },
  "search-box": {
    overview:
      "검색 조건 영역. SearchBox.Row·SearchBox.Column으로 조건 입력을 행·열로 배치하고, 초기화·검색 버튼을 함께 둡니다.",
    features: [
      "Row / Column 합성 구조",
      "form(role=search) 제출로 onSearch 호출",
      "Column 라벨과 첫 입력 자동 연결",
      "MUI 아이콘",
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
      "인라인 알림 메시지. variant 하나로 색·강조색·아이콘이 정해집니다. 패키지화 단계에서 InfoBox로 통합되어 지금은 deprecated 별칭입니다.",
    features: [
      "danger / warning / success / information / secondary",
      "title + description",
      "icon prop으로 아이콘 계열 따로 지정",
      "MUI 아이콘",
    ],
  },
  infobox: {
    overview:
      "제목·본문·액션을 담는 정보 안내 박스. 시안에서 하나였던 '인포박스'가 코드에서는 Alert와 InfoBox 둘로 갈라져 있던 것을 이쪽으로 통합했습니다.",
    features: [
      "color 7종 (info / success / warning / danger / navy / gray / primary)",
      "title + description + 액션 슬롯",
      "구분선 solid / dashed / dotted",
      "Alert 별칭 유지 (deprecated)",
    ],
    designNotes: [
      {
        title: "두 컴포넌트를 하나로 합친 이유",
        body: "디자인 시안의 '인포박스' 하나가 코드에서는 Alert와 InfoBox 두 컴포넌트에 걸쳐 있었고, 소비 프로젝트 두 곳이 서로 정반대 것을 쓰고 있었다. 'alert'는 디자인 쪽에서 떠 있는 알림을 뜻해 이름부터 혼동을 불렀다. 색 체계 7종을 InfoBox로 옮기고 Alert는 deprecated 별칭으로 남겼다.",
      },
      {
        title: "사용처를 세고 나서 바꿨다",
        body: "통합 전에 소비 프로젝트의 사용처를 실제로 셌다. 한 곳은 InfoBox만 수십 곳에서 쓰고 Alert는 쓰지 않았고, 다른 한 곳은 반대로 Alert를 주로 썼다. 별칭과 prop 호환(surface → color)을 남긴 덕에 InfoBox를 쓰던 곳은 고칠 게 하나도 없었다.",
      },
      {
        title: "구분선은 border-style이 아니라 그라디언트로",
        body: "1px dotted 선은 화면에서 실선처럼 보여 시안과 달랐다. border-style 대신 반복 그라디언트로 점선·파선을 그려 간격을 직접 제어했다.",
      },
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
      "짧은 안내 툴팁. 단순한 hover 안내는 CSS 툴팁으로, 위치 자동 계산이나 클릭 제어가 필요하면 MUI 기반 툴팁으로 나눠 씁니다.",
    features: [
      "hover 툴팁 (aria-describedby 연결)",
      "placement 12종을 MUI placement로 변환",
      "클릭 툴팁: Escape·바깥 클릭으로 닫힘, 포커스 복귀",
      "Close 버튼 없이 호버만으로 닫힘",
    ],
  },
  spinner: {
    overview:
      "로딩 인디케이터. size와 color만 받는 작은 컴포넌트.",
    features: [
      "size 토큰",
      "color 토큰",
      "label (a11y)",
      "speed 옵션",
    ],
  },
  portal: {
    overview:
      "DOM 트리 외부에 렌더링하는 포털. Modal / DatePicker / TimeSelector 등 모든 떠다니는 UI의 기반입니다.",
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
      "에러 상태를 한 화면으로 알리는 페이지. 404 / 500 / unknown 같은 케이스를 같은 UI로 다룹니다.",
    features: [
      "코드 + 메시지 + 액션",
      "재시도 / 홈으로 버튼",
      "일러스트 슬롯",
      "에러 객체 정형화",
    ],
  },

  "not-found-page": {
    overview:
      "없는 경로로 들어왔을 때 보여 주는 404 화면. 이동 방식은 앱마다 라우터가 다르므로 '홈으로' 버튼의 동작만 onClick으로 받습니다.",
    features: [
      "onClick 하나로 라우터 이동 위임",
      "ErrorPage와 같은 레이아웃 톤",
      "오타였던 옛 이름은 별칭으로 유지",
    ],
  },
  "progress-bar": {
    overview:
      "설문·신청서처럼 문항을 차례로 채우는 화면에서 전체 대비 완료 비율을 보여 주는 막대.",
    features: [
      "length(전체) / currentProgress(완료) 두 값만 받음",
      "비율 계산은 컴포넌트 내부",
      "className 확장",
    ],
  },

  // ─── Layout ──────────────────────────────────────────────
  drawer: {
    overview:
      "화면 가장자리에서 밀려 나오는 패널. 모바일 바텀시트와 PC 사이드 패널을 같은 컴포넌트로 다룹니다.",
    features: [
      "position (top / bottom / left / right)",
      "open + setOpen 제어 컴포넌트",
      "title 슬롯 (생략 시 제목 줄 없음)",
      "Portal 기반 렌더링",
    ],
  },
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
      "접기·펼치기 아코디언. items 배열로 패널을 그리고 한 번에 하나만 펼쳐지며, plain variant에는 color prop으로 톤을 입힐 수 있습니다.",
    features: [
      "line / plain variant",
      "plain color prop (primary / secondary / blue / navy / gray)",
      "단일 열림 (같은 항목을 다시 누르면 닫힘)",
      "inert warning 처리",
    ],
  },
};

export const getComponentDoc = (slug: string): ComponentDoc | undefined => {
  const doc = COMPONENT_DOCS[slug];
  if (!doc) return undefined;
  return { ...doc, designNotes: DESIGN_NOTES[slug] ?? doc.designNotes };
};
