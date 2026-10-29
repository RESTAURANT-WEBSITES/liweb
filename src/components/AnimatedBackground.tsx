import { useEffect, useRef } from "react";

/**
 * Always-animated ambient background.
 *
 * A single fixed canvas behind all content that runs continuously:
 * - slow drifting teal gradient blobs,
 * - floating geometric particles with connecting node lines,
 * - soft yellow light trails.
 *
 * Performance rules honoured:
 * - `pointer-events: none`, sits behind everything (z-index -10).
 * - Halts when the tab is hidden and when `prefers-reduced-motion` is set
 *   (draws a single static frame instead).
 * - Caps DPR and particle count; connection checks use a simple grid bucket.
 * - Falls back to a CSS gradient if canvas is unavailable.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // CSS gradient fallback remains visible

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
      hue: 0 | 1; // 0 = teal, 1 = sun
      shape: 0 | 1 | 2; // circle, square, triangle
      spin: number;
    }

    let particles: Particle[] = [];

    const GRID = 140;
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

      const target = Math.min(56, Math.max(28, Math.floor((width * height) / 34000)));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        size: 1.4 + Math.random() * 2.6,
        hue: (Math.random() < 0.28 ? 1 : 0) as 0 | 1,
        shape: Math.floor(Math.random() * 3) as 0 | 1 | 2,
        spin: (Math.random() - 0.5) * 0.01,
      }));
    };

    const blob = (
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
      // Slow-moving abstract teal gradients + soft yellow light
      const w = width;
      const h = height;
      blob(
        w * (0.15 + 0.08 * Math.sin(t * 0.00021)),
        h * (0.2 + 0.1 * Math.cos(t * 0.00017)),
        Math.max(w, h) * 0.5,
        "rgba(12, 82, 86, 0.55)",
        0.5
      );
      blob(
        w * (0.85 + 0.07 * Math.cos(t * 0.00019)),
        h * (0.75 + 0.08 * Math.sin(t * 0.00023)),
        Math.max(w, h) * 0.45,
        "rgba(9, 66, 70, 0.5)",
        0.45
      );
      blob(
        w * (0.55 + 0.12 * Math.sin(t * 0.00013 + 2)),
        h * (0.45 + 0.15 * Math.cos(t * 0.00011 + 1)),
        Math.max(w, h) * 0.3,
        "rgba(255, 223, 89, 0.16)",
        0.5
      );
      blob(
        w * (0.35 + 0.1 * Math.cos(t * 0.00016 + 4)),
        h * (0.85 + 0.05 * Math.sin(t * 0.0002 + 3)),
        Math.max(w, h) * 0.22,
        "rgba(255, 223, 89, 0.1)",
        0.6
      );
    };

    const drawParticle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      if (p.shape !== 0) ctx.rotate(t * p.spin);
      ctx.fillStyle =
        p.hue === 1 ? "rgba(255, 223, 89, 0.5)" : "rgba(190, 235, 235, 0.34)";
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 1;
      const s = p.size;
      ctx.beginPath();
      if (p.shape === 0) {
        ctx.arc(0, 0, s, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 1) {
        ctx.rect(-s, -s, s * 2, s * 2);
        ctx.stroke();
      } else {
        ctx.moveTo(0, -s);
        ctx.lineTo(s, s);
        ctx.lineTo(-s, s);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawLinks = () => {
      buckets.clear();
      for (let i = 0; i < particles.length; i++) {
        const key =
          Math.floor(particles[i].x / GRID) * 4096 +
          Math.floor(particles[i].y / GRID);
        const list = buckets.get(key);
        if (list) list.push(i);
        else buckets.set(key, [i]);
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const bx = Math.floor(a.x / GRID);
        const by = Math.floor(a.y / GRID);
        for (let gx = bx - 1; gx <= bx + 1; gx++) {
          for (let gy = by - 1; gy <= by + 1; gy++) {
            const list = buckets.get(gx * 4096 + gy);
            if (!list) continue;
            for (const j of list) {
              if (j <= i) continue;
              const b = particles[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < GRID * GRID) {
                const alpha = (1 - Math.sqrt(d2) / GRID) * 0.12;
                ctx.strokeStyle = `rgba(180, 225, 225, ${alpha.toFixed(3)})`;
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

    // Soft yellow light trail sweeping across the scene
    const drawTrail = () => {
      const y = height * (0.5 + 0.45 * Math.sin(t * 0.00009));
      const x = width * (0.5 + 0.48 * Math.cos(t * 0.00007 + 1.5));
      const g = ctx.createLinearGradient(x - 260, y - 60, x + 260, y + 60);
      g.addColorStop(0, "rgba(255, 223, 89, 0)");
      g.addColorStop(0.5, "rgba(255, 223, 89, 0.12)");
      g.addColorStop(1, "rgba(255, 223, 89, 0)");
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(t * 0.00005) * 0.5);
      ctx.fillStyle = g;
      ctx.fillRect(-320, -80, 640, 160);
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
        // Static single frame — no continuous animation.
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
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-teal"
      style={{
        background:
          "linear-gradient(140deg, #073638 0%, #0B3032 45%, #073638 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Faint blueprint grid above the canvas, below the content */}
      <div className="grid-overlay absolute inset-0 opacity-60" />
    </div>
  );
}
