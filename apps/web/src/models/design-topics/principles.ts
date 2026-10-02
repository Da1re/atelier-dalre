import type { SystemTopic } from "./types";

export const PRINCIPLES: SystemTopic = {
  slug: "principles",
  title: "설계 원칙",
  eyebrow: "Principles",
  summary:
    "이름은 모양과 색으로, 커스터마이즈는 CSS 변수 창구로만, 삭제는 사용처를 센 뒤에. 한 번 정하면 모든 컴포넌트가 따르는 규칙들이다.",
  notes: [
    {
      title: "variant는 모양, color는 색, size는 풀네임",
      body: "Figma는 버튼을 Primary·Secondary·Tertiary 같은 위계로 부르지만 코드는 모양(solid·outline·text)과 색(11종)으로 분리했다. 위계 이름은 조합을 표현하지 못해서, 회색 채움이나 빨간 테두리가 필요해지면 quaternary 같은 이름이 계속 늘어난다. 모양 3 × 색 11은 이름 없이 다 표현된다. 함정도 문서에 남겼다. 'secondary'는 색이 아니라 위계(테두리 버튼)라서 solid + secondary로 바꾸면 타입은 통과하지만 화면이 달라진다.",
    },
    {
      title: "브랜드 커스터마이즈는 CSS 변수 창구로만",
      body: "소비 프로젝트가 패키지 파일을 직접 고치는 순간 분기가 다시 시작된다. 그래서 토큰을 @layer ds.tokens 안에 선언하고, 프로젝트는 평범한 :root 선언으로 덮어쓰게 했다. 레이어 밖 선언이 레이어 안 선언을 항상 이기므로 import 순서와 무관하게 동작한다. 프로젝트가 정하는 것은 브랜드 색 3종뿐이고 공공 표준(KRDS)과 시스템 색은 고정이다. '탭 밑줄은 Primary의 40% 단계'처럼 요구가 실제로 올 때만 --ds-* 창구를 하나씩 연다. 미리 다 열어 두지 않는다.",
    },
    {
      title: "SemVer: major는 아끼고, 삭제는 사용처를 센 뒤에",
      body: "소비 프로젝트가 ^1.x로 자동 추종하므로 minor에서 쓰이는 것을 즉시 제거하면 어딘가가 깨진다. 개명·삭제는 @deprecated 별칭을 남기고, 사용처가 0인 것만 minor에서 지운다. 그것도 '아마 안 쓸 것'이 아니라 실제로 세서 확인한다. major는 개별 삭제가 아니라 기능이 큰 폭으로 늘어난 릴리스에만 쓴다. Alert를 InfoBox로 통합할 때 별칭과 prop 호환을 남긴 덕에 46곳을 쓰던 프로젝트는 고칠 것이 없었다.",
    },
    {
      title: "스타일 진입점은 역할별로 쪼갠다",
      body: "tokens.css(변수) / theme.css(Tailwind @theme) / base.css(리셋·전역) / fonts.css / styles.css(전부)로 나눠 소비 프로젝트가 필요한 것만 import하게 했다. 자체 리셋이 있는 프로젝트는 base를 빼고, Tailwind를 안 쓰는 프로젝트는 theme를 뺀다. 한 덩어리로 주면 안 쓰는 규칙이 프로젝트 전역을 덮어쓴다.",
    },
    {
      title: "접근성은 :focus-visible과 명시도 0으로",
      body: "기준은 KWCAG 2.2다. 포커스 링은 :focus가 아니라 :focus-visible에 걸어 마우스 클릭 때는 뜨지 않고 키보드 때만 뜨게 했다. 앱이 직접 만든 요소를 위한 전역 규칙은 :where()로 감싸 명시도를 0으로 만들어, 패키지 컴포넌트의 규칙이 항상 이기게 했다. 전수조사에서 포커스 표시가 없던 19곳, 키보드 조작이 안 되던 2곳, 스크린리더 이름이 없던 11곳, 포커스 링이 잘리던 3곳, 달력 포커스 10곳을 한 번에 고쳤다.",
    },
    {
      title: "토큰은 공공 표준과 시안을 대조해 정리했다",
      body: "색은 11종 × 명도 단계로 표준화하고 이름을 통일했다(information → info, gray-5 → gray-05). 디자인팀 Figma 23종 컴포넌트를 전 사이즈 실측하고 KRDS 공식 패키지와 대조하니 팔레트는 HEX가 100% 일치하고 이름만 달랐다. radius는 Figma에서 같은 4px이 세 가지 이름으로 불리고 있어 실제 값 5개로 정리했다. 의도적으로 맞추지 않은 값도 사유와 함께 기록해 다음에 또 조사하지 않게 했다.",
    },
  ],
  relatedComponents: ["button", "infobox", "tab"],
};
