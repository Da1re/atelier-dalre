import { colorLuminance, toneForLuminance } from "./color";
import type { BackdropTone, ToneRegion } from "./types";

type Paint = number | "photo";

function samplePoints(region: ToneRegion) {
  const columns = 5;
  const rows = [0.3, 0.7];
  return Array.from({ length: columns * rows.length }, (_, i) => ({
    x: region.left + (region.width * ((i % columns) + 0.5)) / columns,
    y: region.top + region.height * rows[Math.floor(i / columns)],
  }));
}

function isSvgShape(el: Element) {
  return (
    el instanceof SVGGeometryElement || el instanceof SVGTextContentElement
  );
}

function paintOf(el: Element): Paint | null {
  if (el.getAttribute("data-header-tone") === "photo") return "photo";
  const style = getComputedStyle(el);
  return colorLuminance(isSvgShape(el) ? style.fill : style.backgroundColor);
}

function firstPaint(stack: Element[], index: number): Paint | null {
  if (index >= stack.length) return null;
  return paintOf(stack[index]) ?? firstPaint(stack, index + 1);
}

function paintAt(x: number, y: number, header: Element): Paint {
  const stack = document
    .elementsFromPoint(x, y)
    .filter((node) => !header.contains(node));
  const page = colorLuminance(getComputedStyle(document.body).backgroundColor);
  return firstPaint(stack, 0) ?? page ?? 1;
}

export function toneBehind(region: ToneRegion, header: Element): BackdropTone {
  const paints = samplePoints(region).map((point) =>
    paintAt(point.x, point.y, header),
  );
  const solids = paints.filter((paint): paint is number => paint !== "photo");
  if (solids.length * 2 < paints.length) return "photo";
  const average = solids.reduce((sum, value) => sum + value, 0) / solids.length;
  return toneForLuminance(average);
}
