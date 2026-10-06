type Rgb = [number, number, number];

function channel(value: number) {
  const s = value / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance([r, g, b]: Rgb) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: number, b: number) {
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function toneForLuminance(value: number) {
  const ink = luminance([31, 38, 27]);
  const cream = luminance([252, 245, 239]);
  return contrast(value, ink) >= contrast(value, cream) ? "light" : "dark";
}

let swatch: CanvasRenderingContext2D | null = null;

function createSwatch() {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return canvas.getContext("2d", { willReadFrequently: true });
}

export function colorLuminance(color: string) {
  swatch ??= createSwatch();
  if (!swatch) return null;
  swatch.clearRect(0, 0, 1, 1);
  swatch.fillStyle = "transparent";
  swatch.fillStyle = color;
  swatch.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = swatch.getImageData(0, 0, 1, 1).data;
  return a < 128 ? null : luminance([r, g, b]);
}
