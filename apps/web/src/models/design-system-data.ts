export const STORYBOOK_URL = "https://storybook.saycore.kr";

export interface DesignComponent {
  name: string;
  desc: string;
  story: string;
  mine?: boolean;
}

export interface DesignComponentGroup {
  category: string;
  description: string;
  components: DesignComponent[];
}

export const COMPONENT_GROUPS: DesignComponentGroup[] = [
  {
    category: "Typography",
    description: "타이포그래피 스케일 — 콘텐츠 계층을 정의하는 텍스트 컴포넌트",
    components: [
      { name: "Display", desc: "최상위 대형 헤드라인", story: "components-display--docs", mine: true },
      { name: "Heading", desc: "섹션 제목 계층 (h1–h6)", story: "components-heading--docs", mine: true },
      { name: "Title", desc: "카드·패널 타이틀", story: "components-title--docs", mine: true },
      { name: "Body", desc: "본문 텍스트 사이즈 시스템", story: "components-body--docs", mine: true },
      { name: "Label", desc: "폼 레이블 및 보조 텍스트", story: "components-label--docs" },
    ],
  },
  {
    category: "Inputs",
    description: "사용자 입력 컴포넌트 — 비즈니스 로직을 내부에 캡슐화",
    components: [
      { name: "TextInput", desc: "텍스트 입력 (success / error / info 상태)", story: "components-textinput--docs", mine: true },
      { name: "NumberInput", desc: "숫자 입력 — 콤마·소수점 자동 처리", story: "components-numberinput--docs", mine: true },
      { name: "PhoneInput", desc: "전화번호 자동 포맷팅 (010-0000-0000)", story: "components-phoneinput--docs", mine: true },
      { name: "TextArea", desc: "멀티라인 텍스트 입력", story: "components-textarea--docs", mine: true },
      { name: "Select", desc: "드롭다운 선택", story: "components-select--docs" },
      { name: "Checkbox", desc: "단일·그룹 체크박스", story: "components-checkbox--docs" },
      { name: "RadioButton", desc: "라디오 버튼 그룹", story: "components-radiobutton--docs" },
      { name: "Switch", desc: "토글 스위치 — 접근성 적용", story: "components-switch--docs", mine: true },
      { name: "ChipGroup", desc: "다중 선택 칩 그룹", story: "components-chipgroup--docs" },
    ],
  },
  {
    category: "Date & Time",
    description: "날짜·시간 선택 컴포넌트 — 단일·범위·커스텀 달력",
    components: [
      { name: "SingleDatePicker", desc: "단일 날짜 선택", story: "components-datepicker-singledatepicker--docs", mine: true },
      { name: "RangeDatePicker", desc: "시작·종료 범위 날짜 선택", story: "components-datepicker-rangedatepicker--docs", mine: true },
      { name: "CustomDatePicker", desc: "커스텀 트리거 기반 날짜 선택", story: "components-customdatepicker-singledatepicker--docs" },
      { name: "TimeSelector", desc: "시·분 시간 선택", story: "components-timeselector--docs" },
      { name: "ScheduleCalendar", desc: "일정 시각화 캘린더", story: "components-schedulecalendar--docs" },
    ],
  },
  {
    category: "Navigation",
    description: "페이지·섹션 간 이동을 돕는 네비게이션 컴포넌트",
    components: [
      { name: "Tab", desc: "PC 탭 네비게이션", story: "components-tab--docs" },
      { name: "MScrollTab", desc: "모바일 스크롤 탭", story: "components-mscrolltab--docs" },
      { name: "Breadcrumb", desc: "경로 탐색 브레드크럼", story: "components-breadcrumb--docs" },
      { name: "Pagination", desc: "페이지 네이션", story: "components-pagination--docs" },
      { name: "Link", desc: "인라인 링크 텍스트", story: "components-link--docs", mine: true },
      { name: "LinkButton", desc: "링크 스타일 버튼", story: "components-linkbutton--docs", mine: true },
    ],
  },
  {
    category: "Data Display",
    description: "데이터를 구조적으로 시각화하는 컴포넌트",
    components: [
      { name: "Table", desc: "PC 데이터 테이블", story: "components-table--docs" },
      { name: "MTable", desc: "모바일 반응형 테이블", story: "components-mtable--docs" },
      { name: "Detail", desc: "키-값 상세 정보 레이아웃", story: "components-detail--docs", mine: true },
      { name: "Badge", desc: "상태·카운트 배지", story: "components-badge--docs" },
      { name: "Tag", desc: "태그·레이블 칩", story: "components-tag--docs" },
      { name: "Icon", desc: "아이콘 컴포넌트 시스템", story: "components-icon--docs" },
      { name: "Carousel", desc: "이미지·카드 슬라이더", story: "components-carousel--docs" },
    ],
  },
  {
    category: "Actions",
    description: "사용자 인터랙션을 처리하는 액션 컴포넌트",
    components: [
      { name: "Button", desc: "Primary / Secondary / Danger 등 variant 시스템", story: "components-button--docs", mine: true },
      { name: "FileUpload", desc: "파일 드래그·클릭 업로드", story: "components-fileupload--docs" },
      { name: "FileButtonUpload", desc: "버튼 트리거 파일 업로드", story: "components-filebuttonupload--docs" },
      { name: "StepIndicator", desc: "다단계 프로세스 진행 표시", story: "components-stepindicator--docs" },
    ],
  },
  {
    category: "Feedback",
    description: "사용자에게 상태·정보를 전달하는 피드백 컴포넌트",
    components: [
      { name: "Modal", desc: "전역 모달 시스템", story: "components-modal--docs", mine: true },
      { name: "Alert", desc: "인라인 알림 메시지", story: "components-alert--docs" },
      { name: "ToastBar", desc: "자동 소멸 토스트 알림", story: "components-toastbar--docs" },
      { name: "Tooltip", desc: "호버 툴팁", story: "components-tooltip--docs" },
      { name: "Spinner", desc: "로딩 인디케이터", story: "components-spinner--docs" },
      { name: "Portal", desc: "DOM 외부 렌더링 포털", story: "components-portal--docs" },
      { name: "LoadingPage", desc: "전체 페이지 로딩 화면", story: "components-loadingpage--docs" },
      { name: "ErrorPage", desc: "에러 상태 페이지", story: "components-errorpage--docs" },
    ],
  },
  {
    category: "Layout",
    description: "페이지 구조를 잡는 레이아웃 컴포넌트",
    components: [
      { name: "Masthead", desc: "페이지 상단 마스트헤드 영역", story: "components-masthead--docs" },
      { name: "Accordion", desc: "접기·펼치기 아코디언", story: "components-accordion--docs" },
    ],
  },
];