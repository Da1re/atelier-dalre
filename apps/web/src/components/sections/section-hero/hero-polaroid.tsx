import clsx from "clsx";
import Image from "next/image";
import { MetalClip } from "./hero-overlays";

export function HeroPolaroid() {
  return (
    <>
      <MetalClip
        className={clsx(
          "absolute top-[calc(var(--card-t)-var(--card-w)*0.06)] left-[calc(var(--card-l)+var(--card-w)*0.8925)] z-7 w-[calc(var(--card-w)*0.045)]",
          "[@media(max-width:760px)]:top-[1%] [@media(max-width:760px)]:right-[calc(4%+22px)] [@media(max-width:760px)]:left-auto [@media(max-width:760px)]:w-[26px]",
          "transform-[rotate(-14deg)] filter-[drop-shadow(0_2px_3px_rgba(0,0,0,0.35))]",
        )}
      />
      <figure
        className={clsx(
          "absolute top-[calc(var(--card-t)-var(--card-w)*0.005)] left-[calc(var(--card-l)+var(--card-w)*0.76)] z-6 w-[calc(var(--card-w)*0.27)]",
          "[@media(max-width:760px)]:top-[5%] [@media(max-width:760px)]:right-[4%] [@media(max-width:760px)]:left-auto [@media(max-width:760px)]:w-[30%]",
          "m-0 bg-white p-[9px_9px_34px] transform-[rotate(-14deg)] [box-shadow:0_10px_24px_rgba(0,0,0,0.16)]",
        )}
      >
        <div data-header-tone="photo" className="aspect-[0.82] overflow-hidden bg-[#98a394]">
          <Image
            className="pointer-events-none block h-full w-full object-cover filter-[saturate(0.85)_contrast(1.05)]"
            src="/images/con2_1.jpg"
            alt=""
            width={675}
            height={1200}
          />
        </div>
        <figcaption className="absolute right-0 bottom-[9px] left-0 text-center font-mono text-[10.5px] text-[#666]">
          Yoo Subin · FE
        </figcaption>
      </figure>
    </>
  );
}
