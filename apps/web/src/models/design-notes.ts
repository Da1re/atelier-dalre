import type { DesignNote } from "./design-system-docs";

// 컴포넌트별 설계 노트 — 사내 디자인시스템 실제 구현 기반.
// mine(직접 구현)은 기능·타입·상태 설계 중심, migrated(마이그레이션)는 정규화·호환 중심.
export const DESIGN_NOTES: Record<string, DesignNote[]> = {
  // ─── Typography ─────────────────────────────────────────
  display: [
    {
      title: "사이즈 토큰만 노출한 디스플레이 텍스트",
      body: "가장 큰 시각 위계의 텍스트를 담당하는 컴포넌트로, size를 'l' | 'm' | 's' 세 단계로만 제한해 디자인 토큰 밖의 임의 크기가 들어오지 못하게 했다. 굵기는 항상 bold로 고정하고, 600px 이하에서는 미디어 쿼리로 폰트 크기를 한 단계씩 축소해 모바일 가독성을 확보했다.",
    },
    {
      title: "토큰과 임의 색상을 모두 받는 color prop",
      body: "color를 string 타입으로 열어두고, 값이 디자인 토큰 객체(colors)의 키이면 getColor로 실제 색상값을 조회하고 아니면 전달받은 문자열을 그대로 인라인 스타일에 적용했다. 토큰 우선 사용을 유도하면서도 예외 상황의 직접 색상 지정을 막지 않는 절충안으로 설계했다.",
    },
    {
      title: "제네릭 ElementType과 나머지 props 전달",
      body: "DisplayProps를 제네릭 E extends React.ElementType으로 정의하고 ComponentPropsWithoutRef<E>를 교차해, 표준 HTML 속성을 타입 안전하게 받도록 했다. 렌더링 태그는 h1로 고정하되 나머지 props는 스프레드로 흘려보내 확장성을 남겼다.",
    },
  ],
  heading: [
    {
      title: "레벨 숫자로 시맨틱 태그를 생성",
      body: "size를 1~5 숫자로 받아 `h${size}` 문자열을 만들고 React.createElement로 해당 헤딩 태그를 동적으로 렌더링했다. 시각 스타일과 문서 구조용 헤딩 레벨을 하나의 prop으로 묶어, 문서 위계에 맞는 시맨틱 태그가 자연스럽게 출력되도록 했다.",
    },
    {
      title: "타입과 CSS 단계의 일치",
      body: "size 타입을 1~5 리터럴로 좁히고 CSS 모듈에도 h1~h5 클래스만 두어, 정의되지 않은 레벨이 들어오는 것을 타입 단계에서 차단했다. 각 레벨은 font-size와 line-height를 함께 지정하고 600px 이하에서 별도 값으로 재조정해 반응형 위계를 유지했다.",
    },
    {
      title: "표준 HTML 속성 수용",
      body: "HeadingProps에 React.HTMLAttributes<HTMLElement>를 교차해 id, aria-* 등 일반 속성을 그대로 받도록 하고, 색상은 Display와 동일하게 토큰 키 또는 임의 색상값을 분기 처리하는 공통 패턴을 따랐다.",
    },
  ],
  title: [
    {
      title: "숫자·키워드 혼합 사이즈 스케일",
      body: "size를 1 | 2 숫자와 'xs'부터 'xxl'까지의 키워드를 함께 받도록 설계했다. 숫자 사이즈는 line-height까지 포함한 정형 스타일을, 키워드 사이즈는 rem 기반의 시각 위계를 제공해 정형 텍스트와 자유 크기 제목을 한 컴포넌트로 함께 다루도록 했다.",
    },
    {
      title: "굵기를 분리한 weight prop",
      body: "weight를 'bold' | 'semi-bold' | 'medium' | 'regular'로 받아 폰트 굵기를 클래스로 분리했다. 크기와 굵기를 독립 prop으로 떼어, 같은 사이즈에서도 강조 정도를 자유롭게 조합할 수 있게 했다.",
    },
    {
      title: "제네릭 타입과 고정 태그",
      body: "TitleProps를 제네릭 ElementType으로 정의해 HTML 속성을 타입 안전하게 받되, 실제 렌더 태그는 기본 의미 위계에 맞춰 h3로 고정했다. 색상은 토큰 키/임의 값 분기 처리를 공통 적용했다.",
    },
  ],
  body: [
    {
      title: "size와 weight를 나눈 본문 스케일",
      body: "본문 텍스트용으로 size를 1 | 2 두 단계, weight를 'regular' | 'semibold' | 'bold' 세 단계로 분리해 클래스로 조합했다. 크기와 굵기를 독립적으로 지정할 수 있어 본문 안의 강조 텍스트까지 같은 컴포넌트로 표현하게 했다.",
    },
    {
      title: "children과 label의 폴백 처리",
      body: "내용을 children 또는 label 둘 중 하나로 받을 수 있게 하고, children이 있으면 children을, 없으면 label을 렌더링하도록 폴백을 두었다. JSX 자식과 문자열 prop 두 가지 사용 방식을 모두 수용하기 위한 설계다.",
    },
    {
      title: "p 태그 기반과 공통 색상 처리",
      body: "본문 성격에 맞춰 p 태그로 렌더링하고, color는 토큰 키이면 getColor로 변환하고 아니면 임의 색상값을 그대로 적용하는 타이포 컴포넌트 공통 패턴을 따랐다.",
    },
  ],

  // ─── Inputs ─────────────────────────────────────────────
  "tel-input": [
    {
      title: "세 칸 분할 입력의 기능 범위",
      body: "전화번호를 첫/중간/끝 세 칸으로 나눠 입력받되 외부로는 합쳐진 단일 문자열로 다루도록 설계했다. splitTelNumber로 자릿수(2~12)에 따라 (2,3,4)·(2,4,4)·(3,3,4)·(3,4,4)·4,4,4 등 한국 번호 조합을 추정해 초기값을 분리하고, 02 지역번호는 10자리에서 2+4+4로 별도 처리했다.",
    },
    {
      title: "구간 길이 보존과 flushSync",
      body: "value만으로 매번 재분할하면 입력 도중 칸 경계가 흔들리는 문제가 있어, useFieldsFromValue에서 setLengthsSync로 구간 길이를 상태로 들고 자릿수 합이 맞으면 그 길이대로 슬라이스하도록 했다. 부모 리렌더와의 타이밍 경합을 막기 위해 길이 갱신을 flushSync로 먼저 커밋했다.",
    },
    {
      title: "칸 넘침 자동 이월",
      body: "각 칸은 maxLength 4로 두되, handleChange에서 첫 칸 초과분을 둘째 칸의 남은 자리만큼 채우고 다시 셋째 칸으로 넘기는 overflow 로직을 넣어 붙여넣기나 빠른 입력 시 자릿수가 자연스럽게 이월되도록 했다.",
    },
    {
      title: "검증과 표시 제어 분리",
      body: "validateTelSegments로 구간별 자릿수 규칙(첫 2~4, 둘째 3~4, 끝 4)을 검증하되, enableSegmentValidation으로 검증 자체를, showSegmentEmptyMessage·showSegmentFormatMessage·showErrorBorder로 빈값/형식 메시지와 테두리 표시를 각각 끌 수 있게 했다. 외부 error prop이 있으면 내부 메시지보다 우선하도록 displayError를 합성했다.",
    },
    {
      title: "외부 검증을 위한 segments 노출",
      body: "합쳐진 onChange 외에 onSegmentsChange로 세 칸의 실제 값을 별도 전달해, 폼 단의 검증이 분할 결과에 접근할 수 있게 했다. 콜백은 ref에 담아 최신값을 참조하면서 useLayoutEffect 의존성은 fields 각 요소로 두어 분할이 바뀔 때만 통지하도록 했다.",
    },
  ],
  textarea: [
    {
      title: "신규 토큰 시스템으로 재정의",
      body: "legacy 호환 없이 v1으로 새로 설계해 size를 small/medium/large 세 단계로 통일하고 height는 명시 prop으로 override 가능하게 했다. titlePosition·minHeight·maxHeight·isValid·setValue 같은 옛 prop을 제거하고 표준 value/onChange와 단일 className만 남겼다.",
    },
    {
      title: "상태와 a11y 연결",
      body: "error가 truthy거나 isInvalid면 invalid로 묶어 aria-invalid를 켜고, description·error·info의 id를 모아 aria-describedby로 연결했다. isRequired는 aria-required로 반영해 보조 텍스트와 필수 여부가 스크린리더에 함께 전달되도록 했다.",
    },
    {
      title: "글자 수 카운터",
      body: "useCount가 켜지고 maxLength가 숫자일 때만 카운터를 노출하도록 showCount 조건을 두고, 현재 글자 수와 maxLength를 statusRow에서 StatusLabel과 한 줄에 배치했다. forwardRef로 textarea ref를 외부에 넘겨 포커스 제어 등을 허용했다.",
    },
  ],
  toggle: [
    {
      title: "Switch에서 Toggle로 정규화",
      body: "이전 Switch를 Toggle로 rename하면서 status를 checked로 바꿔 Checkbox·Radio와 boolean 상태 모델을 통일했다. useIcon·checkedIcon·barWidth·thumbSize·labelSize 등 세분화된 prop을 제거하고 size 매트릭스(medium/large)와 단일 className으로 단순화했다.",
    },
    {
      title: "네이티브 input 기반 a11y",
      body: "type=\"checkbox\"에 role=\"switch\"를 부여한 실제 input으로 키보드·폼 동작을 보장하고, 트랙과 thumb는 aria-hidden 시각 표현으로 두었다. label이 없을 때만 title을 aria-label로 넘겨 스크린리더 이름을 보장했다.",
    },
    {
      title: "상태별 클래스 조합",
      body: "disabled→checked→default 우선순위로 트랙 클래스를 결정하고 size·color 토큰 클래스를 문자열로 합성했다. 체크 여부에 따라 Check/Close 아이콘을 항상 표시하고 색상은 disabled/checked 상태에 맞춰 토큰 변수로 분기했다.",
    },
  ],
  select: [
    {
      title: "풀 제네릭 + 자동 추론으로 재설계",
      body: "valueKey/labelKey·isEqual·variant·state 등 legacy prop을 제거하고 Select<T>로 일반화했다. value는 T|null(단일)/T[](multi)를 변환 없이 pass-through하고, getLabel/getKey를 생략하면 공용 option 유틸이 객체에서 label/name/title/text, id/value/code/key를 순서대로 감지해 콜백 없이도 동작하게 했다.",
    },
    {
      title: "단일/다중 판별 유니온 타입",
      body: "type='multi' 여부로 SingleSelectProps와 MultiSelectProps를 구분하는 판별 유니온을 두어, value와 onChange의 시그니처가 모드에 따라 타입 수준에서 갈라지도록 했다. 동등 비교는 항상 getKey 결과로 처리해 사용자가 isEqual을 직접 신경 쓰지 않게 했다.",
    },
    {
      title: "listbox 키보드/포커스 a11y",
      body: "버튼에 aria-haspopup·aria-expanded·aria-invalid·aria-describedby를 달고 드롭다운을 role=\"listbox\", 각 항목을 role=\"option\"으로 구성했다. Enter/Space/Arrow/Escape/Tab을 처리하고 focusedIndex 변경 시 scrollIntoView로 항목을 보이게 해 WAI-ARIA listbox 패턴을 맞췄다.",
    },
    {
      title: "Portal 렌더링과 위치 동기화",
      body: "usePortal로 드롭다운을 body 직속으로 띄워 z-index 격리를 가능하게 하고, usePortalPosition이 trigger의 getBoundingClientRect 기준으로 위치를 잡되 resize·capture scroll에 반응해 갱신하도록 했다. 외부 클릭 닫기 ref 집합도 portal/inline 모드에 따라 분기했다.",
    },
  ],
  checkbox: [
    {
      title: "상태 모델과 indeterminate 정규화",
      body: "checked/onChange(boolean) 표준으로 맞추고 indeterminate를 checked보다 우선하는 별도 상태로 두어, indeterminate면 내부적으로 isChecked를 true로 강제하면서 - 아이콘을 표시하도록 했다. size는 medium/large, color는 9종 토큰으로 통일했다.",
    },
    {
      title: "혼합 상태 a11y",
      body: "네이티브 input의 aria-checked를 indeterminate일 때 \"mixed\", 아니면 checked로 매핑하고, label이 없으면 title을 aria-label로 넘겨 시각 박스는 aria-hidden으로 가렸다. disabled일 때 onChange를 조기 차단해 비활성 토글을 막았다.",
    },
    {
      title: "CheckboxGroup 제네릭 통합",
      body: "CheckboxGroup<T>를 Select<T>와 동일한 자동 추론 패턴으로 묶어 value를 T[]로 pass-through하고, 토글 시 getKey 동등 비교로 추가/제거를 처리했다. 그룹 disabled와 옵션별 getDisabled를 OR로 합쳐 개별 항목 비활성을 흡수했다.",
    },
  ],
  radio: [
    {
      title: "checked 단일화로 정규화",
      body: "이전 RadioButton의 value+checked 혼용을 제거하고 checked만 받도록 정리했으며, size를 's'|'m'|'l'에서 medium/large로 통일해 Checkbox와 맞췄다. onChange는 선택될 때만 호출되는 인자 없는 콜백으로 단순화했다.",
    },
    {
      title: "네이티브 radio 기반 동작",
      body: "type=\"radio\"에 name을 공유시켜 브라우저의 단일 선택·키보드·폼 동작을 그대로 활용하고, 외곽 원과 내부 점은 aria-hidden 시각 표현으로 두었다. label이 없을 때만 title을 aria-label로 넘겼다.",
    },
    {
      title: "RadioGroup 제네릭과 키보드 네비게이션",
      body: "RadioGroup<T>를 동일 자동 추론 패턴으로 묶고 name 미지정 시 useId로 안전한 그룹 이름을 생성했다. Arrow 키로 disabled를 건너뛴 enabled 옵션만 순환 이동시키고, onChange 후 setTimeout으로 해당 input에 포커스를 옮겨 시각/포커스 상태를 동기화했다.",
    },
  ],
  chip: [
    {
      title: "single/multi를 네이티브 input으로 매핑",
      body: "Chip을 type에 따라 radio(single)/checkbox(multi) input으로 렌더링하고, single이면 항상 true로, multi면 토글로 onChange를 호출하도록 분기했다. input은 readOnly로 두고 Label에 role·aria-checked·aria-disabled·tabIndex와 Enter/Space 키 처리를 얹어 상호작용을 담당하게 했다.",
    },
    {
      title: "legacy size 흡수",
      body: "size를 large/medium/small로 정규화하되 LEGACY_SIZE_MAP으로 옛 's'|'m'|'l' 값을 매핑해 흡수하고, LegacyChipSize를 deprecated로 표시해 풀네임 사용을 유도했다. 없는 size 클래스는 medium으로 폴백했다.",
    },
    {
      title: "labelKey/valueKey 기반 그룹",
      body: "ChipGroup은 ChipOption(Record<string,string>) 배열을 받아 labelKey/valueKey로 표시값과 식별값을 뽑고, selected 배열 포함 여부로 체크 상태를 판정했다. onChange는 (value, checked, label) 형태로 넘겨 호출부가 변경된 항목을 식별하도록 했다.",
    },
  ],

  // ─── Date & Time ────────────────────────────────────────
  "single-date-picker": [
    {
      title: "입력과 달력을 한 상태원으로 묶은 단일 날짜 선택기",
      body: "TextInput과 달력 팝오버를 결합해, 키보드 직접 입력과 달력 클릭 두 경로를 단일 상태 훅 useDatePickerState로 통합하려 했다. value는 LocalDate·string·null을 모두 허용하고 pattern prop(yyyy-MM-dd, yyyy년 MM월 dd일, yyMMdd 등)에 따라 표시·파싱 형식을 바꾼다. 날짜 연산은 모두 @js-joda/core의 LocalDate로 처리해 JS Date의 타임존·가변성 문제를 피했다.",
    },
    {
      title: "tempSelectedDate와 tempInputValue 이원 상태로 임시 편집 보존",
      body: "확정 전 사용자 입력을 외부 value와 분리하기 위해 tempSelectedDate(LocalDate)와 tempInputValue(문자열) 두 임시 상태를 두었다. currentSelectedDate는 tempInputValue를 우선 parseDate하고 실패하면 tempSelectedDate로 폴백해, 입력 중인 미완성 문자열에도 달력 하이라이트가 따라가도록 했다. handleCancel은 원본 initialValue로 두 상태를 되돌려 임시 편집을 폐기한다.",
    },
    {
      title: "디바운스 검증과 자동 포맷팅 입력 처리",
      body: "handleInputChange는 autoFormatDate로 숫자만 추출해 패턴의 구분자를 자동 삽입한 뒤 validateInput을 호출한다. 검증은 useDateValidation 내부에서 debounce(500ms)로 감싸 타이핑 중 과도한 검증을 막았다. createDateValidator가 형식·minYear/maxYear·minDate/maxDate를 순차 검사해 한국어 에러 메시지를 우선순위대로 돌려준다.",
    },
    {
      title: "buttonsDisabled로 확정 모델 분기",
      body: "달력에서 날짜를 클릭하면 handleDateClick이 임시 상태를 갱신하는데, buttonsDisabled가 true(기본값)면 즉시 onChange 후 닫는 즉시 확정 모델, false면 푸터의 선택 버튼(handleConfirm)을 눌러야 확정되는 모델로 갈라진다. 같은 컴포넌트가 빠른 단일 선택과 신중한 폼 입력 양쪽을 커버하게 한 설계다.",
    },
    {
      title: "외부 클릭 닫힘과 포털 위치 보정의 trade-off",
      body: "useClickOutside는 input과 calendar ref 배열을 받아 모두의 바깥을 클릭했을 때만 닫는다. usePortal이 켜지면 달력을 createPortal로 띄워 부모 overflow 클리핑을 피하고, 위치 계산이 resize·scroll에 requestAnimationFrame으로 반응한다. 다만 위치 보정을 DOM style 직접 조작으로 처리해 선언적 렌더링과는 거리가 있는 점이 trade-off였다.",
    },
  ],
  "range-date-picker": [
    {
      title: "currentStep 기반 시작-끝 2단계 범위 선택",
      body: "범위는 tempRange([LocalDate|null, LocalDate|null])와 currentStep('start'|'end') 상태로 관리했다. 양끝이 채워졌거나 step이 'start'면 클릭값을 새 시작일로 리셋하고 step을 'end'로 넘긴다. 시작일보다 이전 날짜를 클릭하면 끝을 비우고 그 날짜를 새 시작일로 재설정해, 거꾸로 찍어도 자연스럽게 시작일이 갱신되도록 했다.",
    },
    {
      title: "두 입력 필드의 독립 검증과 교차 제약",
      body: "시작/끝 입력을 startInput·endInput으로 분리하고 useRangeValidation에서 각각 별도 debounce로 검증했다. 기본 검증을 통과한 뒤에도 시작일이 끝일보다 이후면 '시작일은 종료일보다 이전이어야 합니다' 같은 교차 제약을 추가로 검사한다. 한쪽을 비우면 반대편 값만 유지한 채 부분 범위를 통지하도록 했다.",
    },
    {
      title: "getErrorPriority로 두 입력의 에러 표시 단일화",
      body: "두 입력이 동시에 잘못될 수 있어, 하나의 에러 라인에 무엇을 노출할지 getErrorPriority로 우선순위를 정했다. '형식' 에러를 가장 먼저, 다음 시작측 '이전'·끝측 '이후' 경계 에러, 마지막으로 그 외 메시지 순으로 골라내 범위 입력의 에러 노이즈를 한 줄로 정리했다.",
    },
    {
      title: "convertToDateRange 정규화와 확정 모델 분기",
      body: "value가 string[] 또는 LocalDate[] 어느 쪽이든 convertToDateRange가 [start, end] 튜플로 정규화한다. 단일 선택기와 동일하게 buttonsDisabled가 true면 끝일 확정 즉시 닫고, false면 양끝이 모두 유효·존재할 때만 커밋한다. handleBlur는 양쪽이 유효하고 원본과 달라진 경우에만 통지해 중복 호출을 막았다.",
    },
  ],
  "time-selector": [
    {
      title: "문자열 한 줄을 단일 소스로 삼은 시간 선택기",
      body: "value를 'HH:mm' 또는 'HH:mm AM|PM' 문자열 하나로 다루고, parseValue로 시·분·meridiem 세 조각으로 분해해 useMemo로 캐싱했다. useAP에 따라 24시간·12시간 시 목록과 step(1·5·10·15)으로 나눈 분 목록을 생성한다. 변경된 조각만 받아 나머지는 기존 parsed로 보존한 뒤 다시 한 문자열로 합쳐 올려, 내부에 분해 상태를 따로 들지 않는 무상태 편집을 지향했다.",
    },
    {
      title: "본체 패널은 포털, 시·분 목록은 중첩 커스텀 드롭다운",
      body: "트리거(TextInput) 아래 패널을 createPortal로 띄워 부모 overflow 영향을 피했고, 패널 위치는 트리거의 getBoundingClientRect를 resize·scroll에서 requestAnimationFrame으로 추적했다. 시·분은 native select 대신 내부 SelectBox로 구현해 디자인을 통제했고, 열릴 때 선택값이 목록 중앙에 오도록 itemHeight 기준 scrollTop을 계산했다.",
    },
    {
      title: "외부 클릭 닫힘의 다층 처리와 trade-off",
      body: "패널은 container와 panel 두 ref를 모두 벗어난 mousedown에서만 닫고, 내부 SelectBox는 자체 wrapper ref 기준으로 별도 외부 클릭 닫힘을 가져 닫힘 판정이 계층별로 분리됐다. readOnly input에 클릭/아이콘 클릭으로만 패널을 토글해 직접 타이핑은 막았다. 다만 시·분 드롭다운에 키보드 화살표 네비게이션이 없는 점이 trade-off였다.",
    },
  ],
  "custom-date-picker": [
    {
      title: "신규 DatePicker의 직계 전신(legacy) 구현",
      body: "CustomDatePicker는 이후 DatePicker로 정규화된 구버전으로, 동일한 디렉토리 구조(state/validation/ui 훅, date/calendar/common 유틸)를 useCustom* 접두사와 Custom* 타입으로 그대로 가지고 있었다. 산출 컴포넌트도 CustomSingleDatePicker/CustomRangeDatePicker로 네이밍만 다를 뿐 LocalDate 기반 로직 골격은 신버전과 거의 일치했다.",
    },
    {
      title: "size 토큰 도입 전의 고정 높이와 즉시 확정 모델",
      body: "신버전이 size 토큰으로 높이를 토큰화한 것과 달리 구버전은 height='56px' 같은 고정 기본값만 받았다. 또한 buttonsDisabled 분기가 없어 달력 클릭 시 항상 즉시 onChange를 호출하는 단일 확정 모델이었고, handleConfirm을 통한 명시적 확정 경로도 빠져 있었다. 정규화 과정에서 이 확정 모델 분기와 푸터 버튼 흐름이 신버전에 추가됐다.",
    },
    {
      title: "정리되지 않은 흔적과 통합 방향",
      body: "구버전에는 다듬어지지 않은 디버그 코드가 일부 남아 있었고, 신버전은 이를 제거하고 검증 훅·유틸을 Custom 접두사 없는 공용 모듈로 일원화했다. CustomDatePicker는 Calendar 계열 파생 컴포넌트와 함께 신 DatePicker로 수렴되면서 사실상 마이그레이션 원본 역할을 했다.",
    },
  ],

  // ─── Navigation ─────────────────────────────────────────
  link: [
    {
      title: "토큰 기반으로 통일한 앵커",
      body: "스타일링된 <a> 요소를 size(small/medium/large)·color·weight(regular/bold)·underline 토큰으로 통일했다. color·focus ring은 Checkbox/Radio/Toggle 등 다른 컴포넌트와 동일한 토큰 체계를 따르게 맞췄고, underline이 true면 항상 밑줄, false면 hover 시에만 밑줄이 보이도록 동작을 분리했다.",
    },
    {
      title: "color만 재정의한 타입 설계",
      body: "LinkProps는 React.AnchorHTMLAttributes<HTMLAnchorElement>를 확장하되 color를 Omit해 자체 LinkColor 토큰으로 재정의했다. 덕분에 href·onClick 등 표준 앵커 속성은 ...rest로 그대로 위임되면서 디자인 토큰만 별도로 통제했다. size가 undefined면 normalizeSize 헬퍼가 'medium'으로 보정했다.",
    },
    {
      title: "접근성·보안",
      body: "target이 '_blank'일 때 rel이 없으면 'noopener noreferrer'를 자동으로 채워 reverse tabnabbing을 차단했다. 외부 링크일 때는 OpenInNew 아이콘을 자동 표시하고 aria-label='새 창에서 열림'을 부여해 새 창 이동을 스크린리더에 알렸다.",
    },
    {
      title: "고민한 점",
      body: "외부 링크 판정을 target === '_blank' 단일 기준으로 삼아 아이콘 표시와 rel 보강을 한 곳에서 파생시켰다. 외부 여부를 별도 prop으로 받지 않고 target에서 추론한 점은 API를 줄이는 대신, '_blank'가 아닌 외부 이동은 자동 처리 대상에서 빠지는 trade-off가 있었다.",
    },
  ],
  tab: [
    {
      title: "variant·size 매트릭스로 재정의",
      body: "variant(line/fill)와 size를 조합형 토큰으로 재정의했다. TabsProps를 판별 유니온으로 설계해 variant별 허용 size를 제한하고(line은 small/medium, fill은 small/large), size 미지정 시 fill이면 'large', 아니면 'medium'으로 분기했다. VARIANT_CLASS·SIZE_CLASS·COLOR_CLASS 매핑으로 className을 조립했다.",
    },
    {
      title: "제어/비제어 호환",
      body: "selectedIndex가 주어지면 제어 모드, 없으면 내부 useState로 동작하는 controlled/uncontrolled 양립 구조로 만들었다. 비제어일 때만 내부 상태를 갱신하고 onChange는 항상 호출해 두 모드의 외부 인터페이스를 일치시켰다. content는 ReactNode와 () => ReactNode를 모두 허용해 함수형 content는 선택된 탭에서만 호출되도록 지연 렌더링했다.",
    },
    {
      title: "WAI-ARIA tabs 패턴",
      body: "tablist/tab/tabpanel role과 aria-selected·aria-controls·aria-labelledby로 탭과 패널을 연결하고, roving tabindex(선택 탭만 0)를 적용했다. ArrowLeft/Right 등은 순환 이동, Home/End는 처음·끝 이동을 처리하되 disabled를 제외한 enabledTabs 기준으로 인덱스를 계산해 비활성 탭을 건너뛰고 이동 후 포커스를 옮겼다.",
    },
    {
      title: "고려한 점",
      body: "768px 이하에서 large/medium 토큰을 CSS 차원에서 small로 축소하는 반응형을 전제로 토큰을 설계했다. 선택된 탭에는 sr-only로 '선택됨' 텍스트를 추가해 aria-selected 외에 텍스트로도 상태를 보강했다.",
    },
  ],
  breadcrumb: [
    {
      title: "데이터 기반 단순 API로 정리",
      body: "items 배열과 onItemClick 콜백만 받는 단순 API로 정리했다. 클릭 시 onItemClick?.(item.value)와 item.onClick?.()을 함께 호출해 전역 핸들러와 항목별 핸들러를 둘 다 지원했다. 첫 항목에만 HomeIcon, 두 번째 이후에만 ChevronRight를 렌더링해 구분자 마크업을 데이터에서 분리했다.",
    },
    {
      title: "타이포 토큰 정합",
      body: "텍스트 렌더링을 공통 Label 컴포넌트에 위임해 디자인시스템 타이포 토큰과 정합을 맞추고, 라벨에 tabIndex={0}을 부여해 키보드 포커스를 받게 했다.",
    },
    {
      title: "모바일 말줄임과 접근성",
      body: "useIsMobile 훅으로 모바일 여부를 판단해, 모바일이면서 label이 4자를 넘는 항목은 앞 4자 + '...'로 잘라 표시하고 원본 라벨은 title 속성으로 보존했다. nav에 aria-label='브레드크럼', 장식 아이콘에는 aria-hidden을 부여했다.",
    },
  ],
  pagination: [
    {
      title: "Context로 prop drilling 제거",
      body: "currentPage·totalPage·onChangePage만 받는 API로 정리하고, PaginationData를 Context로 내려 내부 PaginationItem이 prop drilling 없이 현재 페이지 비교와 onChangePage 호출에 접근하도록 했다.",
    },
    {
      title: "페이지 윈도우 로직",
      body: "isMobile 여부로 pivotPage를 5/7로 정하고, currentPage 위치에 따라 isStart·isMiddle·isEnd 세 구간으로 분기해 페이지 목록을 구성했다. 생략 구간은 MoreHoriz 아이콘으로 표시하고 1·마지막 페이지는 항상 노출해 큰 페이지 수에서도 이동 맥락을 유지했다.",
    },
    {
      title: "고려한 점",
      body: "이전/다음 버튼은 경계 조건으로 disabled 처리하고 화살표 색을 분기했다. 페이지 번호는 자릿수가 3 이하면 16px, 초과하면 12px로 폰트를 줄여 큰 페이지 수에서도 버튼 폭을 유지했고, 모바일에서는 중간 구간 노출 개수를 줄였다.",
    },
  ],

  // ─── Data Display ───────────────────────────────────────
  detail: [
    {
      title: "가장 가벼운 보조 텍스트 단위",
      body: "상세 설명 문구를 표현하는 타이포그래피 컴포넌트로, 별도 레이아웃 없이 span 한 요소로 텍스트의 크기(size)·두께(weight)·색상(color)만 토큰화해 제어하는 가장 가벼운 단위로 설계했다. 스토리 분류도 Typography/Detail로 두어 본문 보조 텍스트 용도임을 분명히 했다.",
    },
    {
      title: "다형(polymorphic) 타입 설계",
      body: "size는 'l'|'m'|'s', weight는 'regular'|'bold'로 좁혀 각각 CSS Module 클래스에 매핑했다. 제네릭 E extends React.ElementType을 두고 DetailProps<E>를 ComponentPropsWithoutRef<E>와 교차시켜, 기본 'span' 위에 임의 엘리먼트의 네이티브 속성까지 받을 수 있는 다형 시그니처를 만들었다.",
    },
    {
      title: "색상 처리와 고민",
      body: "color를 디자인 토큰 키와 임의 CSS 색상값 양쪽으로 받게 해, color in colors로 토큰 키 여부를 판별하고 키이면 getColor로 해석, 아니면 문자열을 그대로 인라인 style에 넣었다. 클래스 합성 끝에 .trim()으로 꼬리 공백을 정리했지만, 색상을 인라인 style로 주입하는 방식은 CSS 변수 기반 테마 전환과 분리된다는 trade-off가 있었다.",
    },
  ],
  icon: [
    {
      title: "단일 진입점으로 모은 아이콘 시스템",
      body: "수백 개의 SVG 자산을 단일 icon prop으로 끌어 쓰는 통합 진입점을 만들었다. icon.import.ts에서 자산들을 ICON_IMPORT_CONFIG 객체로 등록하고, 그 키 타입을 IconType = keyof typeof ICON_IMPORT_CONFIG로 뽑아 사용처에서 자동완성과 오타 방지를 받게 했다.",
    },
    {
      title: "색 제어 방식에 따른 분류",
      body: "아이콘을 multiColor와 stroke 카테고리로 선언하고 getIconCategory로 이름을 역조회했다. getIconProps는 카테고리에 따라 --icon-primary/--icon-secondary(다중 색), --icon-color(stroke·일반) CSS 변수를 style로 내려주고, CSS Module에서 path의 fill/stroke가 이 변수를 참조하도록 연결했다.",
    },
    {
      title: "자산 형태 정규화",
      body: "IconProps를 Omit<SVGProps, 'fill'> 기반으로 두어 색 제어를 color/primary/secondary로 일원화했다. 렌더 단계에서 raw.default·raw.ReactComponent·함수 자체를 순서대로 확인해 SVGR/ESM 컴포넌트면 <SvgIcon>으로, 문자열·{src}·{default} URL 자산이면 <img>로 렌더하는 두 경로를 분기했다.",
    },
    {
      title: "접근성과 실패 처리",
      body: "img 경로에서는 alt를 aria-label 우선, 없으면 아이콘 이름으로 채우고 lazy 로딩을 적용했다. 어느 경로에서도 자산을 해석하지 못하면 console.error로 실패한 아이콘을 남기고 null을 반환해, 깨진 이미지 대신 조용히 빠지도록 했다.",
    },
    {
      title: "고민한 점",
      body: "동일 이름의 SVG가 빌드 환경(SVGR 컴포넌트 vs URL 에셋)에 따라 다른 형태로 들어오는 문제를 흡수하는 게 가장 큰 과제였다. 컴포넌트 경로는 CSS 변수로 색을 바꿀 수 있지만 URL <img>는 색 제어가 어렵다는 한계를 명시하고, 색 제어가 중요한 아이콘은 컴포넌트 경로로 들어오도록 유도했다.",
    },
  ],
  badge: [
    {
      title: "shape × color × size 매트릭스로 재정의",
      body: "신규 토큰 시스템을 variant(shape: outline/fill/pastel) × color × size 매트릭스로 재정의했다. normalize 함수가 (appearance, variant, color)를 받아 항상 { variant, color } 형태로 정규화하고, normalizeSize로 size 기본값을 맞춘 뒤 shapeClass·colorClass·sizeClass를 조합해 className을 구성했다.",
    },
    {
      title: "legacy 호환",
      body: "구버전의 appearance='solid'|'soft' + 단일 variant 표기를 SOLID_VARIANT_MAP·SOFT_VARIANT_MAP 두 테이블로 신규 {variant,color}에 매핑했다. isModernVariant로 신규 표기면 통과, legacy 키면 테이블 조회, 미일치 시 appearance별 fallback(soft→pastel, solid→fill)으로 떨어지게 했고 'red-line-small' 같은 특수 값의 size 강제 예외도 보존했다.",
    },
    {
      title: "판별 유니온과 점진적 폐기",
      body: "props 타입을 ModernProps | LegacySolidProps | LegacySoftProps 유니온으로 구성해 appearance 유무에 따라 허용 variant가 달라지도록 했다. legacy 타입에 @deprecated와 'Phase D 제거 예정' 주석을 달아 폐기 경로를 문서화했고, icon prop은 'alert'|'check'|'x' 단축키를 내부 Icon으로 매핑하되 그 외 ReactNode는 그대로 렌더하도록 열어뒀다.",
    },
  ],
  tag: [
    {
      title: "variant·size 정규화",
      body: "variant를 'text'(정적)와 'removable'(삭제 버튼) 둘로, size를 large/medium/small 풀네임으로 정리했다. normalizeSize가 기본값 'medium'을 채우고 매핑에 없으면 그대로 통과시켜 신규 표기를 우선했다.",
    },
    {
      title: "legacy size 흡수",
      body: "구버전의 한 글자 사이즈 표기를 LEGACY_SIZE_MAP({ s:'small', m:'medium', l:'large' })으로 흡수하고, 타입에서도 TagSize | LegacyTagSize 유니온으로 받되 LegacyTagSize에 @deprecated를 달아 풀네임을 권장했다.",
    },
    {
      title: "삭제 인터랙션 접근성",
      body: "removable 태그의 삭제 영역에 role='button'·aria-label='태그 삭제'·tabIndex를 부여하고 Enter/Space를 가로채 onDelete(label)을 호출했다. 모든 핸들러에서 disabled·onDelete 부재를 Early Return으로 먼저 걸러 중첩을 피했고, 이벤트는 stopPropagation으로 상위 클릭과 분리했다. showDelete를 removable && !!onDelete로 계산해 핸들러 없는 태그엔 버튼 자체가 렌더되지 않게 했다.",
    },
  ],
  carousel: [
    {
      title: "자료형 독립 인덱스 컨트롤러",
      body: "제네릭 <T>로 dataList: T[]를 받아 자료형에 독립적인 인덱스 컨트롤러로 만들고, currentIndex를 내부 state로 관리하면서 변경 시 onChange(index)로 외부에 알리는 구조로 정리했다. 현재 위치는 currentPage/totalPages로 표기했다.",
    },
    {
      title: "초기 인덱스 동기화와 빈 데이터 처리",
      body: "initialIndex로 초기 위치를 지정하고 useEffect로 변경을 감지해 currentIndex를 재동기화했다. dataList.length === 0이면 null을 반환해 빈 데이터에서 안전하게 빠지도록 했다.",
    },
    {
      title: "접근성",
      body: "이전/다음을 네이티브 button으로 두고 aria-label을 '이전'·'다음'으로 부여했다. 경계에서 isPrevDisabled(0)·isNextDisabled(마지막)를 계산해 disabled와 OR로 묶었고, 내부 화살표 아이콘에는 aria-hidden을 줘 스크린리더 중복 읽기를 막았다.",
    },
  ],

  // ─── Actions ────────────────────────────────────────────
  "file-upload": [
    {
      title: "단일/다중 업로드 분기와 검증 경로 통일",
      body: "maxFiles 값에 따라 단일(===1)과 다중 처리 경로를 분리하되, 개수 초과(maxFiles)와 용량 초과(maxFileSize) 검증을 양쪽 공통 규칙으로 정규화했다. 초과 시 showAlertModal로 'maxFiles'/'maxFileSize' 타입 메시지를 띄우는 단일 통로를 두어, legacy에서 흩어져 있던 alert 처리를 모달 서비스 기반으로 흡수했다.",
    },
    {
      title: "일괄 투입 시 부분 반영 정책의 prop화",
      body: "한 번에 여러 파일을 넣을 때 초과분 처리를 rejectPartialBatch prop으로 제어했다. 기본값(false)은 remainingSlots만큼 잘라 넣고 초과분만 버리는 관대한 동작, true면 한 건이라도 초과 시 배치 전체를 반려한다. 호출부마다 달랐던 동작을 한 옵션으로 흡수해 정규화했다.",
    },
    {
      title: "목록·카운트 표시의 모드 추론",
      body: "showFileList가 false면 내부 목록을 렌더링하지 않고 onChange로 추가분만 넘겨 외부 상태 관리에 위임할 수 있게 했고, 상단 카운트는 countDisplay('count'/'totalSize'/'none')를 명시 우선으로 받되 생략 시 maxFiles===1이면 'none', 그 외 'count'로 자동 추론했다.",
    },
    {
      title: "업로드 진행 상태와 외부 동기화",
      body: "다중 업로드 시 유효 파일을 먼저 'uploading'으로 반영한 뒤 onUpload를 순차 await하고 완료분을 name 기준으로 'success'로 갱신했다. 모든 상태 변경을 updateFiles로 묶어 setFiles와 onChange를 함께 호출했고, resetTrigger 변화를 useEffect로 감지해 초기화하는 외부 리셋 훅을 두었다.",
    },
  ],
  "file-button-upload": [
    {
      title: "버튼형 경량 업로더로 역할 분리",
      body: "드롭존·진행 상태·모달을 갖춘 FileUpload와 달리, 버튼 클릭으로 파일 선택만 처리하는 경량 변형으로 정규화했다. value(File[])를 외부에서 받아 onChange로 되돌리는 완전 제어 컴포넌트로 두어 내부 업로드 상태를 들고 있지 않게 설계했다.",
    },
    {
      title: "용량 검증과 개수 슬라이싱",
      body: "선택 파일을 maxSizeMB 기준으로 filter해 초과분을 제거하고, maxFiles===1이면 교체, 그 외에는 기존 value와 합쳐 maxFiles만큼 slice했다. input의 multiple도 maxFiles>1일 때만 부여하고, 선택 후 e.target.value를 비워 동일 파일 재선택을 가능하게 했다.",
    },
    {
      title: "초기 파일명 표시 호환",
      body: "서버에 이미 저장된 파일을 File 객체 없이 이름만으로 노출하기 위해 initialFileName을 받아 별도 표시 분기를 두었다. value가 비어 있을 때만 초기 파일명을 보여주고 삭제 시 로컬 상태만 비우도록 해, 신규 선택 흐름과 기존 첨부 표시 흐름을 분리 흡수했다.",
    },
  ],
  "step-indicator": [
    {
      title: "인덱스 기반 상태 계산 일원화",
      body: "각 단계 상태를 currentStepIndex와의 비교만으로 completion/ongoing/before로 파생시켜, 단계마다 상태를 따로 들고 있던 legacy 구조를 단일 계산식으로 정규화했다. 상태에 따라 완료(CheckIcon)·진행·예정 아이콘을 분기 렌더링한다.",
    },
    {
      title: "line/box 두 variant와 구분자 처리",
      body: "variant를 'line'/'box'로 받아 컨테이너 클래스를 결정하고, box 변형에서만 단계 사이에 ChevronRightIcon을 삽입했다. align('left'/'center')으로 정렬을 옵션화해 화면별로 달랐던 표현을 prop으로 흡수했다.",
    },
    {
      title: "접근성과 선택적 인터랙션",
      body: "ol/li 시맨틱 위에 진행 단계 aria-label, ongoing 항목의 aria-current='step', before 항목의 aria-disabled를 부여했다. onClickStep으로 단계 클릭 이동을 옵션 제공하되, focusable prop으로 tabIndex를 토글해 키보드 포커스 진입 여부를 호출부가 정하게 했다.",
    },
  ],
  "search-box": [
    {
      title: "합성 컴포넌트 구조로 재정의",
      body: "SearchBox.Row, SearchBox.Column 정적 프로퍼티를 가진 합성 컴포넌트로 정규화해, 검색 조건 영역을 행·열 조합으로 자유롭게 구성하도록 했다. 루트는 form(role='search')으로 감싸 onSubmit에서 preventDefault 후 onSearch를 호출하고, 초기화/검색 버튼을 고정 배치했다.",
    },
    {
      title: "라벨-입력 연결 자동화",
      body: "Column이 useId로 생성한 id를 React.Children.map으로 첫 번째 자식에만 cloneElement로 주입하고, 동일 id를 Label에 연결해 label-control 연결을 자동화했다. 호출부에서 id를 수동으로 맞추던 작업을 흡수해 접근성 연결을 일관되게 보장했다.",
    },
  ],

  // ─── Feedback / Layout ──────────────────────────────────
  modal: [
    {
      title: "선언적 모달 대신 명령형 서비스 API를 목표로 설계",
      body: "컴포넌트 트리에 모달 JSX를 직접 심는 대신, 어디서든 modalService.push(contents, props)로 띄우고 pop/popById/popAll로 닫을 수 있는 명령형 API를 만들었다. service가 CustomEvent를 document에 dispatch하면 최상단에 한 번 마운트된 ModalManager가 이를 수신해 modalList 상태에 반영하는 이벤트 기반 구조다. push 시 id가 없으면 uniqueId로 발급하고 그 id를 반환해 popById 제어가 가능하게 했다.",
    },
    {
      title: "Portal로 렌더 트리에서 분리하고 fixed 오버레이로 띄움",
      body: "직접 만든 Portal 컴포넌트로 document.body 하위에 동적 div를 만들어 createPortal 했다. Portal은 useMemo로 div를 한 번만 만들고 마운트 시 appendChild, 언마운트 시 removeChild로 정리한다. Modal은 position fixed + 전체 화면 오버레이로 구성하고, 각 래퍼에 data-id를 부여해 여러 모달이 동시에 떠 있을 때 DOM에서 식별 가능하게 했다.",
    },
    {
      title: "esc·백드롭·포커스 트랩을 모달 스택 기준으로 처리",
      body: "esc는 전역 keydown으로 듣되 portal-wrap 목록 중 가장 마지막(최상단) data-id와 일치할 때만 닫아, 쌓인 모달 중 맨 위만 닫히게 했다. 백드롭은 mousedown/mouseup 타깃이 모두 백드롭 자신일 때만 닫혀, 내부에서 드래그하다 백드롭에서 떼는 오작동을 막았다. 포커스 트랩은 modal/dialog 타입에 따라 갈라 Tab/Shift+Tab을 가로채 첫·마지막 요소를 순환시켰다.",
    },
    {
      title: "접근성: 포커스 복원과 강제 포커스",
      body: "모달이 열릴 때 직전 activeElement를 ref에 저장해 두고 닫힐 때 그 요소로 포커스를 되돌려 키보드 사용자의 위치를 보존했다. content 내부에 data-focus 요소가 있으면 순차 포커스를 시도하고, 모두 불가하면 content에 tabIndex 0을 부여해 모달 컨테이너 자체에 포커스를 줘 스크린리더가 진입을 인지하도록 했다.",
    },
    {
      title: "스크롤 락과 닫힘 애니메이션 동기화에 대한 고민",
      body: "본문 스크롤은 완전히 열린 상태일 때만 body overflow를 hidden으로 막고 닫히면 복원했다. 애니메이션은 mounted/trigger 두 단계를 분리해, 닫을 때 즉시 언마운트하지 않고 fade out이 끝난 뒤 항목을 제거했다. 다만 애니메이션 스타일을 data-id로 DOM을 조회해 직접 주입하는 방식이라 모달 스택이 깊어질 때 식별을 data-id에 의존하게 한 점이 trade-off였다.",
    },
  ],
  alert: [
    {
      title: "variant 기반 매핑 테이블로 정규화",
      body: "danger/warning/success/information/secondary 다섯 variant를 VARIANT_CLASS_MAP·VARIANT_PRIMARY_COLOR_MAP·ICON_COMPONENT_MAP 세 테이블로 정리해, 분기문 없이 variant 한 값으로 클래스·강조색·아이콘을 동시에 결정하도록 정규화했다. 색상은 디자인 토큰 CSS 변수로 통일했다.",
    },
    {
      title: "아이콘 override와 레이아웃 분기",
      body: "icon prop으로 variant와 다른 아이콘 계열을 따로 지정할 수 있게 해(ICON_COMPONENT_MAP[icon ?? variant]) 의미색과 아이콘을 분리했다. description은 title 유무에 따라 들여쓰기 클래스를 바꿔 아이콘 정렬을 맞췄고, 아이콘에 aria-hidden을 줘 장식 요소로 처리했다.",
    },
  ],
  "toast-bar": [
    {
      title: "이벤트 기반 큐와 매니저 구조로 재구성",
      body: "toastbarService의 타입별 메서드가 커스텀 이벤트를 dispatch하면, 한 번 마운트된 ToastBarManager가 이를 수신해 toastbars 배열에 concat하는 큐 구조로 만들었다. 타입별 옵션(아이콘, closeDelay 3000ms)은 TOASTBAR_OPTIONS 테이블로 모았고 id는 uniqueId로 발급해 close(id) 개별 제어를 지원했다.",
    },
    {
      title: "자동 닫힘 타이머와 즉시 닫힘 분리",
      body: "각 토스트는 closeDelay만큼 setTimeout으로 자동 소멸시키되, autoCloseTimestamp를 -1로 바꾸는 방식으로 외부 close 신호를 전달했다. 내부 useEffect가 -1을 감지하면 onHide와 clearTimeout을 실행해, 타이머 만료 전에도 강제로 닫을 수 있게 큐 항목 상태와 타이머를 분리했다.",
    },
    {
      title: "접근성: 타입별 aria-live와 신규 토스트 포커스",
      body: "토스트 타입에 따라 danger/warning은 assertive, succeed/info는 polite로 aria-live를 차등 적용하고 role='alert'·aria-atomic으로 알림을 맞췄다. ToastBarManager는 길이 증가를 이전 길이와 비교해 새 토스트를 감지하고, DOM 갱신 후 최신 토스트에 포커스를 이동시켰다.",
    },
  ],
  tooltip: [
    {
      title: "용도별로 CSS 툴팁과 MUI 툴팁을 분리 제공",
      body: "순수 CSS 기반 Tooltip(hover로 visible 토글, useId로 aria-describedby 연결)과 MUI를 styled로 감싼 HoverTooltip/ClickTooltip을 한 디렉토리에 정리했다. 단순 hover 안내는 위치 계산 없이 CSS placement 클래스로 처리하고, 위치 자동 계산이나 click 제어가 필요하면 MUI의 popper 엔진을 재사용하도록 역할을 나눴다.",
    },
    {
      title: "placement 정규화와 외부 제어 레지스트리",
      body: "내부 표기(top-left, bottom-center 등 12종)를 positionMap으로 MUI placement로 일관 변환했다. ClickTooltip은 모듈 스코프 Map에 id별 setOpen을 등록해 openTooltipById/closeTooltipById/popAllTooltip 같은 외부 명령형 제어를 지원하고, 언마운트 시 레지스트리에서 정리했다.",
    },
    {
      title: "클릭 툴팁의 닫힘과 접근성 보강",
      body: "ClickTooltip은 Escape·closeOnClickOutside(바깥 mousedown)·valid 플래그로 닫힘 조건을 분기하고, 닫힐 때 트리거 버튼에 포커스를 복귀시켰다. 트리거를 valid일 때 div, 아닐 때 button으로 렌더해 aria-expanded와 role='dialog' 콘텐츠를 연결하는 등 접근성을 보강했다.",
    },
  ],
  accordion: [
    {
      title: "items 배열 기반 단일 오픈 아코디언으로 재구성",
      body: "각 패널을 개별 JSX로 두는 대신 items 배열을 map으로 렌더하고, openIndex 단일 상태로 한 번에 하나만 펼쳐지도록(같은 index면 null로 토글) 구성했다. line/plain variant와 color 매핑을 분리했다.",
    },
    {
      title: "높이 애니메이션과 접근성",
      body: "펼침은 contentRef의 scrollHeight를 읽어 maxHeight를 0과 실제 높이 사이로 전환하는 방식으로 구현했다. 버튼에 aria-expanded/aria-controls, 콘텐츠 section에 aria-labelledby를 연결하고, 펼침 상태에 따라 sr-only로 '접기/펼치기' 텍스트를 제공해 스크린리더 대응을 보강했다.",
    },
  ],
};
