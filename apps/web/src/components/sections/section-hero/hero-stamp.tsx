import clsx from "clsx";

const W = 100;
const H = 124;

function edge(count: number, length: number) {
  const step = length / (count - 1);
  return Array.from({ length: count }, (_, i) => i * step);
}

const XS = edge(14, W);
const YS = edge(17, H);
const HOLES = [
  ...XS.map((x) => ({ cx: x, cy: 0 })),
  ...XS.map((x) => ({ cx: x, cy: H })),
  ...YS.map((y) => ({ cx: 0, cy: y })),
  ...YS.map((y) => ({ cx: W, cy: y })),
];

const STAR_PATH =
  "M-973.552,2491.774s43.54-1.791,49.846,48.231c6.3-50.022,49.846-48.231,49.846-48.231v-.015s-43.541,1.786-49.846-48.237c-6.306,50.022-49.846,48.237-49.846,48.237";

const PAPER = "#efe8d6";
const FIELD = "#56654c";

export function VintageStamp() {
  return (
    <svg
      className={clsx(
        "absolute top-[calc(var(--card-t)+var(--card-w)*0.04)] left-[calc(var(--card-l)+var(--card-w)*0.34)] z-4 w-[calc(var(--card-w)*0.17)] [@media(max-width:760px)]:hidden",
        "transform-[rotate(-8deg)] filter-[drop-shadow(0_3px_6px_rgba(0,0,0,0.2))]",
      )}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
    >
      <defs>
        <mask id="hero-stamp-perf">
          <rect width={W} height={H} fill="white" />
          {HOLES.map((hole, i) => (
            <circle key={i} cx={hole.cx} cy={hole.cy} r="2.7" fill="black" />
          ))}
        </mask>
        <filter id="hero-stamp-wear" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="11" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -12 8.8" result="specks" />
          <feComposite in="SourceGraphic" in2="specks" operator="in" />
        </filter>
      </defs>
      <g mask="url(#hero-stamp-perf)">
        <rect width={W} height={H} fill={PAPER} />
        <g filter="url(#hero-stamp-wear)">
          <rect x="7" y="7" width="86" height="110" fill="none" stroke={FIELD} strokeWidth="0.6" />
          <rect x="10" y="10" width="80" height="104" fill={FIELD} />
          <g transform="translate(30 43) scale(0.4)" fill={PAPER}>
            <path d={STAR_PATH} transform="translate(973.552 -2443.522)" />
          </g>
          <text className="font-serif" x="15" y="25" fontSize="12" fill={PAPER}>
            2022
          </text>
        </g>
      </g>
    </svg>
  );
}

export function Postmark() {
  return (
    <svg
      className={clsx(
        "absolute top-[calc(var(--card-t)+var(--card-w)*0.17)] left-[calc(var(--card-l)+var(--card-w)*0.462)] z-5 w-[calc(var(--card-w)*0.325)] [@media(max-width:760px)]:hidden",
        "overflow-visible text-[#26291f] opacity-[0.7] mix-blend-multiply transform-[rotate(-4deg)]",
        "[&_text]:font-mono [&_text]:font-medium [&_text]:tracking-[0.06em]",
      )}
      viewBox="0 0 220 100"
      aria-hidden="true"
    >
      <defs>
        <filter id="hero-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.6 1.6" result="dots" />
          <feComposite in="rough" in2="dots" operator="in" />
        </filter>
        <path id="hero-postmark-top" d="M20 50A30 30 0 0 1 80 50" />
        <path id="hero-postmark-bottom" d="M13 50A37 37 0 0 0 87 50" />
      </defs>
      <g filter="url(#hero-ink)" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="44" strokeWidth="1.8" />
        <path d="M102 34q5.5-7 11 0t11 0t11 0t11 0t11 0t11 0t11 0t11 0t11 0t11 0" strokeWidth="2.2" />
        <path d="M102 50q5.5-7 11 0t11 0t11 0t11 0t11 0t11 0t11 0t11 0t11 0t11 0" strokeWidth="2.2" />
        <path d="M102 66q5.5-7 11 0t11 0t11 0t11 0t11 0t11 0t11 0t11 0t11 0t11 0" strokeWidth="2.2" />
        <g fill="currentColor" stroke="none" fontSize="10">
          <text>
            <textPath href="#hero-postmark-top" startOffset="50%" textAnchor="middle">
              SEOUL
            </textPath>
          </text>
          <text>
            <textPath href="#hero-postmark-bottom" startOffset="50%" textAnchor="middle">
              KOREA
            </textPath>
          </text>
          <text x="50" y="55" fontSize="14" textAnchor="middle">
            2026
          </text>
        </g>
      </g>
    </svg>
  );
}
