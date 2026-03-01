import { useEffect, useRef } from "react";

export interface BeamConfig {
  color1: string;    // hex 6 dígitos, ex: "#ff9a3c"
  color2: string;    // hex 6 dígitos, ex: "#f72585"
  baseY: number;     // posição vertical base (0 = topo, 1 = fundo)
  spread: number;    // amplitude da ondulação relativa à altura do canvas
  speed: number;     // velocidade da animação
  phase: number;     // offset de fase inicial
  opacity: number;   // 0..1
  width?: number;    // extensão extra além de endX, relativa à largura (padrão 0.4)
  startX?: number;   // onde o feixe começa horizontalmente, 0..1 (padrão 0)
  endX?: number;     // onde o feixe termina horizontalmente, 0..1 (padrão 1)
  rotate?: number;   // rotação em graus — positivo = sentido horário (padrão 0)
}

export interface StripeBeamCanvasProps {
  beams?: BeamConfig[];
  fadeLeft?: number;   // largura do fade esquerdo, 0..1 (padrão 0.25). Use 0 para desativar
  fadeColor?: string;  // cor do fade em RGB, ex: "255,255,255" ou "15,23,42"
  className?: string;
}

export const DEFAULT_BEAMS: BeamConfig[] = [
  { color1: "#ff9a3c", color2: "#ff6b35", baseY: 0.22, spread: 0.32, speed: 0.18, phase: 0,   opacity: 0.90 },
  { color1: "#f72585", color2: "#b5179e", baseY: 0.40, spread: 0.35, speed: 0.14, phase: 2.1, opacity: 0.85 },
  { color1: "#7209b7", color2: "#560bad", baseY: 0.58, spread: 0.30, speed: 0.16, phase: 4.2, opacity: 0.80 },
  { color1: "#480ca8", color2: "#3a0ca3", baseY: 0.72, spread: 0.28, speed: 0.12, phase: 1.5, opacity: 0.75 },
  { color1: "#4cc9f0", color2: "#4361ee", baseY: 0.85, spread: 0.25, speed: 0.15, phase: 3.3, opacity: 0.70 },
  { color1: "#ffbe0b", color2: "#fb5607", baseY: 0.30, spread: 0.12, speed: 0.22, phase: 0.8, opacity: 0.50 },
  { color1: "#ff006e", color2: "#8338ec", baseY: 0.50, spread: 0.10, speed: 0.20, phase: 5.0, opacity: 0.45 },
];

// Preset diagonal — igual à Stripe real (rotate + startX/endX)
export const DIAGONAL_BEAMS: BeamConfig[] = DEFAULT_BEAMS.map(b => ({
  ...b,
  rotate: -22,
  startX: 0.05,
  endX: 1.2,
}));

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Ruído suave via senos/cossenos sobrepostos
function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.8 + t * 0.4)        * 0.30 +
    Math.sin(y * 0.6 + t * 0.3)        * 0.20 +
    Math.sin((x + y) * 0.5 + t * 0.5)  * 0.25 +
    Math.cos(x * 1.2 - t * 0.2)        * 0.15 +
    Math.cos(y * 0.9 + t * 0.35)       * 0.10
  );
}

function drawBeam(
  ctx: CanvasRenderingContext2D,
  beam: BeamConfig,
  t: number,
  W: number,
  H: number
): void {
  const {
    color1, color2,
    baseY, spread, speed, phase, opacity,
    width  = 0.4,
    startX = 0,
    endX   = 1,
    rotate = 0,
  } = beam;

  const py = baseY * H;
  const sp = spread * H;

  // Ponto central usado como pivô da rotação
  const pivotX = W * ((startX + Math.min(endX, 1)) / 2);
  const pivotY = py;

  ctx.save();

  if (rotate !== 0) {
    ctx.translate(pivotX, pivotY);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-pivotX, -pivotY);
  }

  // Extensão horizontal real em pixels
  const xStart = W * startX;
  const xEnd   = W * endX + W * width; // endX + extensão extra

  const segments = 10;

  const pts = Array.from({ length: segments + 1 }, (_, i) => {
    const progress = i / segments;
    const x = xStart + progress * (xEnd - xStart);
    return {
      x,
      y: py + noise(progress * 3, baseY * 2, t * speed + phase) * sp,
    };
  });

  const topPts = pts.map(p => ({
    x: p.x,
    y: p.y - sp * 0.5 + noise(p.x * 0.01, 1, t * speed + phase + 10) * sp * 0.3,
  }));
  const botPts = pts.map(p => ({
    x: p.x,
    y: p.y + sp * 0.5 + noise(p.x * 0.01, 2, t * speed + phase + 20) * sp * 0.3,
  }));

  // Gradiente alinhado com a extensão do feixe (fade nas pontas)
  const gradient = ctx.createLinearGradient(xStart, 0, xEnd, 0);
  gradient.addColorStop(0,    hexToRgba(color1, 0));
  gradient.addColorStop(0.12, hexToRgba(color1, 1));
  gradient.addColorStop(0.65, hexToRgba(color2, 1));
  gradient.addColorStop(1,    hexToRgba(color2, 0));

  ctx.beginPath();
  ctx.moveTo(topPts[0].x, topPts[0].y);
  for (let i = 1; i < topPts.length - 1; i++) {
    const mx = (topPts[i].x + topPts[i + 1].x) / 2;
    const my = (topPts[i].y + topPts[i + 1].y) / 2;
    ctx.quadraticCurveTo(topPts[i].x, topPts[i].y, mx, my);
  }
  ctx.lineTo(topPts.at(-1)!.x, topPts.at(-1)!.y);

  for (let i = botPts.length - 1; i >= 1; i--) {
    const mx = (botPts[i].x + botPts[i - 1].x) / 2;
    const my = (botPts[i].y + botPts[i - 1].y) / 2;
    ctx.quadraticCurveTo(botPts[i].x, botPts[i].y, mx, my);
  }
  ctx.lineTo(botPts[0].x, botPts[0].y);
  ctx.closePath();

  ctx.globalAlpha = opacity;
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.restore();
}

export function StripeBeamCanvas({
  beams = DEFAULT_BEAMS,
  fadeLeft = 0.25,
  fadeColor = "255,255,255",
  className = "",
}: StripeBeamCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const timeRef   = useRef<number>(0);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const frame = (timestamp: number) => {
      if (!lastTsRef.current) lastTsRef.current = timestamp;
      timeRef.current += (timestamp - lastTsRef.current) / 1000;
      lastTsRef.current = timestamp;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      beams.forEach(beam => drawBeam(ctx, beam, timeRef.current, W, H));

      // Fade lateral esquerdo
      if (fadeLeft > 0) {
        const fade = ctx.createLinearGradient(0, 0, W * fadeLeft, 0);
        fade.addColorStop(0, `rgba(${fadeColor},1)`);
        fade.addColorStop(1, `rgba(${fadeColor},0)`);
        ctx.fillStyle = fade;
        ctx.fillRect(0, 0, W, H);
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      lastTsRef.current = null;
    };
  }, [beams, fadeLeft, fadeColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
    />
  );
}