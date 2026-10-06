function TickerStar() {
  return (
    <i className="font-sans text-[34px] font-bold text-[#4d7a3a] not-italic transform-[translateY(6px)] [@media(max-width:760px)]:text-[28px] [@media(max-width:760px)]:transform-[translateY(5px)]">
      *
    </i>
  );
}

const LINE = (
  <span className="inline-flex items-baseline gap-[26px] pr-[26px] leading-none text-ink">
    <span className="font-serif text-[32px] tracking-[-0.035em] [@media(max-width:760px)]:text-[26px] [&_em]:italic">
      Desi<em>g</em>n syste<em>m</em>s, mono<em>r</em>epos &amp; for<em>m</em>{" "}
      fl<em>o</em>ws
    </span>
    <TickerStar />
    <span className="font-sans text-[22px] font-normal tracking-[-0.045em] [@media(max-width:760px)]:text-[18px]">
      Frontend Developer · Seoul
    </span>
    <TickerStar />
    <span className="font-serif text-[32px] tracking-[-0.03em] text-[#4d7a3a] italic [@media(max-width:760px)]:text-[26px]">
      Say hi
    </span>
    <span className="font-mono text-[15px] tracking-[-0.04em] text-[rgba(31,38,27,0.72)] [@media(max-width:760px)]:text-[13px]">
      wien200922@gmail.com
    </span>
    <TickerStar />
    <span className="font-sans text-[22px] font-normal tracking-[-0.045em] [@media(max-width:760px)]:text-[18px]">
      Since 2022
    </span>
    <TickerStar />
  </span>
);

export function HeroTicker() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-0 bottom-0 left-0 z-9 flex h-[54px] items-center overflow-hidden bg-[#f6f1e6] [border-top:1px_solid_rgba(31,38,27,0.14)] [@media(max-width:760px)]:h-[46px]"
    >
      <style href="hero-marquee" precedence="default">
        {"@keyframes hero-marquee { to { transform: translateX(-50%); } }"}
      </style>
      <div className="flex animate-[hero-marquee_13s_linear_infinite] whitespace-nowrap will-change-transform motion-reduce:animate-none">
        {LINE}
        {LINE}
      </div>
    </div>
  );
}
