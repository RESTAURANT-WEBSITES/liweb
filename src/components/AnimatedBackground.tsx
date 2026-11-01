import { useEffect, useRef } from "react";

/**
 * Ambient Animated Background for LIWEB Solutions.
 * - Deep teal brand base: #073638 / #0B3032
 * - Controlled particle count and speed for a sophisticated, non-distracting visual environment
 * - Soft slow-moving yellow ambient light trails and subtle constellation links
 * - GPU-friendly, respects prefers-reduced-motion, pauses when page is hidden
 * - Fixed -z-10, pointer-events-none, strictly behind all interactive content
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let t = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: 0 | 1; // 0 = secondary teal/text, 1 = signature yellow
      shape: 0 | 1; // 0 = circle, 1 = delicate geometric diamond
      spin: number;
    }

    let particles: Particle[] = [];
    const GRID = 160;
    const buckets = new Map<number, number[]>();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Controlled, elegant particle density (24 to 34 particles)
      const target = Math.min(34, Math.max(22, Math.floor((width * height) / 45000)));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: 1.2 + Math.random() * 1.8,
        hue: (Math.random() < 0.25 ? 1 : 0) as 0 | 1,
        shape: (Math.random() < 0.6 ? 0 : 1) as 0 | 1,
        spin: (Math.random() - 0.5) * 0.008,
      }));
    };

    const drawBlob = (
      cx: number,
      cy: number,
      r: number,
      color: string,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "transparent");
      ctx.globalAlpha = alpha;
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      ctx.globalAlpha = 1;
    };

    const drawBlobs = () => {
      // Soft ambient teal gradients and gentle yellow atmospheric lighting
      const w = width;
      const h = height;
      const baseR = Math.max(w, h);

      // Deep teal atmospheric illumination
      drawBlob(
        w * (0.2 + 0.07 * Math.sin(t * 0.00015)),
        h * (0.25 + 0.08 * Math.cos(t * 0.00012)),
        baseR * 0.5,
        "rgba(11, 48, 50, 0.65)",
        0.45
      );
      drawBlob(
        w * (0.8 + 0.06 * Math.cos(t * 0.00014)),
        h * (0.7 + 0.07 * Math.sin(t * 0.00018)),
        baseR * 0.45,
        "rgba(7, 54, 56, 0.6)",
        0.45
      );

      // Restrained signature yellow ambient warmth
      drawBlob(
        w * (0.5 + 0.1 * Math.sin(t * 0.0001 + 2)),
        h * (0.4 + 0.1 * Math.cos(t * 0.00008 + 1)),
        baseR * 0.26,
        "rgba(255, 223, 89, 0.12)",
        0.4
      );
    };

    const drawParticle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      if (p.shape !== 0) ctx.rotate(t * p.spin);
      ctx.fillStyle =
        p.hue === 1
          ? "rgba(255, 223, 89, 0.45)"
          : "rgba(175, 194, 190, 0.28)";
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 1;
      const s = p.size;
      ctx.beginPath();
      if (p.shape === 0) {
        ctx.arc(0, 0, s, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.moveTo(0, -s);
        ctx.lineTo(s, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s, 0);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawLinks = () => {
      buckets.clear();
      for (const [i, p] of particles.entries()) {
        const key =
          Math.floor(p.x / GRID) * 4096 + Math.floor(p.y / GRID);
        const list = buckets.get(key);
        if (list) list.push(i);
        else buckets.set(key, [i]);
      }
      ctx.lineWidth = 0.75;
      for (const [i, a] of particles.entries()) {
        const bx = Math.floor(a.x / GRID);
        const by = Math.floor(a.y / GRID);
        for (let gx = bx - 1; gx <= bx + 1; gx++) {
          for (let gy = by - 1; gy <= by + 1; gy++) {
            const list = buckets.get(gx * 4096 + gy);
            if (!list) continue;
            for (const j of list) {
              if (j <= i) continue;
              const b = particles[j];
              if (!b) continue;
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < GRID * GRID) {
                const alpha = (1 - Math.sqrt(d2) / GRID) * 0.08;
                ctx.strokeStyle = `rgba(175, 194, 190, ${alpha.toFixed(3)})`;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
          }
        }
      }
    };

    // Slow-moving yellow ambient light trail
    const drawTrail = () => {
      const y = height * (0.5 + 0.4 * Math.sin(t * 0.00007));
      const x = width * (0.5 + 0.42 * Math.cos(t * 0.00006 + 1.2));
      const g = ctx.createLinearGradient(x - 220, y - 50, x + 220, y + 50);
      g.addColorStop(0, "rgba(255, 223, 89, 0)");
      g.addColorStop(0.5, "rgba(255, 223, 89, 0.08)");
      g.addColorStop(1, "rgba(255, 223, 89, 0)");
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(t * 0.00004) * 0.4);
      ctx.fillStyle = g;
      ctx.fillRect(-260, -70, 520, 140);
      ctx.restore();
    };

    const step = () => {
      t += 16.7;
      ctx.clearRect(0, 0, width, height);
      drawBlobs();
      drawTrail();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }
      drawLinks();
      for (const p of particles) drawParticle(p);
    };

    const loop = () => {
      if (!running) return;
      step();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      running = true;
      if (reducedMotion) {
        step();
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      if (document.hidden || reducedMotion) stop();
      else start();
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #0B3032 0%, #073638 60%, #052527 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="grid-overlay absolute inset-0 opacity-50" />
    </div>
  );
}