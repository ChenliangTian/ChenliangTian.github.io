"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";

/* ──────────────────────────────────────────────────────────────────────────
 * DecoherenceLab — an interactive visualization of pure dephasing.
 *
 * Physics (consistent across all three panels):
 *   coherence      C(t) = exp(-(noise · t) / T2)
 *   member phase   φ_i  = φ_uniform + z_i · σ(t),   σ(t) = sqrt(2 · noise · t / T2)
 *   so that the ensemble average  ⟨e^{iφ}⟩  has magnitude  e^{-σ²/2} = C(t)
 *   density matrix ρ = [[½, ½C], [½C, ½]]
 *
 * φ_uniform (a *controlled* phase shift) rotates every member together — the
 * average vector turns but keeps its length. Decoherence (t, noise) spreads the
 * members apart — the average vector shrinks. That contrast is the whole point.
 * ────────────────────────────────────────────────────────────────────────── */

const MAX_N = 160;
const T_MAX = 6;

// Deterministic standard-normal samples (stable across renders / N changes).
function makeGaussians(n: number, seed: number): number[] {
  let s = seed >>> 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const u1 = Math.max(rand(), 1e-9);
    const u2 = rand();
    out.push(Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2));
  }
  return out;
}

type Palette = {
  ink: string;
  faint: string;
  fainter: string;
  grid: string;
  accent: string;
  accentSoft: string;
  panelBg: string;
};

function regimeLabel(sigma: number): string {
  if (sigma < 0.25) return "Aligned phases";
  if (sigma < 1.1) return "Phase drift";
  return "Randomized phases";
}

export function DecoherenceLab() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState(0);
  const [T2, setT2] = useState(1.5);
  const [noise, setNoise] = useState(1);
  const [N, setN] = useState(40);
  const [speed, setSpeed] = useState(1);
  const [uniform, setUniform] = useState(0);
  const [playing, setPlaying] = useState(false);

  const waveRef = useRef<HTMLCanvasElement>(null);
  const phasorRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const z = useMemo(() => makeGaussians(MAX_N, 20260530), []);

  useEffect(() => setMounted(true), []);

  // Measure width for canvas backing-store sizing.
  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted]);

  // Animation loop.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last: number | null = null;
    const loop = (ts: number) => {
      if (last == null) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
      setT((prev) => {
        const nt = prev + dt * speed;
        if (nt >= T_MAX) {
          setPlaying(false);
          return T_MAX;
        }
        return nt;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed]);

  const palette: Palette = useMemo(
    () =>
      dark
        ? {
            ink: "#F2EBD8",
            faint: "rgba(242,235,216,0.55)",
            fainter: "rgba(242,235,216,0.16)",
            grid: "rgba(242,235,216,0.12)",
            accent: "#D0685A",
            accentSoft: "rgba(208,104,90,0.85)",
            panelBg: "#211D1A",
          }
        : {
            ink: "#1C1A17",
            faint: "rgba(28,26,23,0.5)",
            fainter: "rgba(28,26,23,0.14)",
            grid: "rgba(28,26,23,0.1)",
            accent: "#B83A26",
            accentSoft: "rgba(184,58,38,0.85)",
            panelBg: "#FAF6EE",
          },
    [dark]
  );

  // Derived quantities.
  const sigma = Math.sqrt((2 * noise * t) / T2);
  const C = Math.exp(-(noise * t) / T2);
  const rho01 = 0.5 * C;

  const phases = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < N; i++) arr.push(uniform + z[i] * sigma);
    return arr;
  }, [N, uniform, sigma, z]);

  // ── Wave panel ────────────────────────────────────────────────────────────
  const drawWave = useCallback(() => {
    const cv = waveRef.current;
    if (!cv || width === 0) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = width;
    const cssH = 260;
    cv.width = Math.round(cssW * dpr);
    cv.height = Math.round(cssH * dpr);
    cv.style.height = `${cssH}px`;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const padX = 18;
    const x0 = padX;
    const x1 = cssW - padX;
    const k = (2 * Math.PI * 3.0) / (x1 - x0); // ~3 wavelengths across
    const midY = cssH * 0.42;
    const amp = cssH * 0.13;

    // propagation axis
    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, midY);
    ctx.lineTo(x1, midY);
    ctx.stroke();

    // individual ensemble wavelets (faint, overlaid)
    const shown = Math.min(N, 60);
    ctx.lineWidth = 1;
    ctx.strokeStyle = palette.fainter;
    for (let i = 0; i < shown; i++) {
      const ph = phases[i];
      ctx.beginPath();
      for (let px = x0; px <= x1; px += 3) {
        const y = midY - amp * Math.sin(k * (px - x0) + ph);
        if (px === x0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();
    }

    // coherent average wave (bold) — amplitude = C(t)
    const avgY = cssH * 0.8;
    const avgAmp = cssH * 0.13 * C;
    ctx.strokeStyle = palette.grid;
    ctx.beginPath();
    ctx.moveTo(x0, avgY);
    ctx.lineTo(x1, avgY);
    ctx.stroke();

    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = x0; px <= x1; px += 2) {
      const y = avgY - avgAmp * Math.sin(k * (px - x0) + uniform);
      if (px === x0) ctx.moveTo(px, y);
      else ctx.lineTo(px, y);
    }
    ctx.stroke();
  }, [width, palette, phases, C, uniform, N]);

  // ── Phasor panel ───────────────────────────────────────────────────────────
  const drawPhasor = useCallback(() => {
    const cv = phasorRef.current;
    if (!cv || width === 0) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = width;
    const cssH = 260;
    cv.width = Math.round(cssW * dpr);
    cv.height = Math.round(cssH * dpr);
    cv.style.height = `${cssH}px`;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const cx = cssW / 2;
    const cy = cssH / 2 + 6;
    const R = Math.min(cssW, cssH) * 0.36;

    // unit circle
    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * Math.PI);
    ctx.stroke();
    // crosshair
    ctx.beginPath();
    ctx.moveTo(cx - R, cy);
    ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R);
    ctx.lineTo(cx, cy + R);
    ctx.stroke();

    // individual phasors (faint)
    ctx.strokeStyle = palette.fainter;
    ctx.lineWidth = 1;
    for (let i = 0; i < N; i++) {
      const ph = phases[i];
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(ph), cy - R * Math.sin(ph));
      ctx.stroke();
    }

    // resultant (bold) — length = C(t), angle = uniform
    const rx = cx + R * C * Math.cos(uniform);
    const ry = cy - R * C * Math.sin(uniform);
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(rx, ry);
    ctx.stroke();
    // arrowhead
    const ang = Math.atan2(ry - cy, rx - cx);
    const ah = 8;
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx - ah * Math.cos(ang - 0.4), ry - ah * Math.sin(ang - 0.4));
    ctx.lineTo(rx - ah * Math.cos(ang + 0.4), ry - ah * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fillStyle = palette.accent;
    ctx.fill();
  }, [width, palette, phases, C, uniform, N]);

  useEffect(() => {
    if (!mounted) return;
    drawWave();
    drawPhasor();
  }, [mounted, drawWave, drawPhasor]);

  const reset = () => {
    setPlaying(false);
    setT(0);
    setUniform(0);
  };

  const fmt = (v: number) => v.toFixed(3);

  return (
    <div ref={wrapRef} className="not-prose my-8 w-full">
      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
        {/* Wave */}
        <div className="bg-cream dark:bg-brown p-4">
          <p className="mb-2 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-terracotta">
            Phase Ensemble
          </p>
          <canvas ref={waveRef} className="w-full" style={{ height: 260 }} />
          <p className="mt-2 text-xs text-taupe leading-snug">
            <span className="font-semibold text-foreground">{regimeLabel(sigma)}.</span> Top: many
            copies of the state, overlaid. Bottom (bold): their coherent average — its amplitude{" "}
            <em>is</em> the coherence.
          </p>
        </div>
        {/* Phasor */}
        <div className="bg-cream dark:bg-brown p-4">
          <p className="mb-2 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-terracotta">
            Coherence Vector
          </p>
          <canvas ref={phasorRef} className="w-full" style={{ height: 260 }} />
          <p className="mt-2 text-xs text-taupe leading-snug">
            Each thin arrow is one copy&rsquo;s phase. The bold arrow is their average —{" "}
            <span className="font-semibold text-foreground">
              |⟨e<sup>iφ</sup>⟩| = {C.toFixed(3)}
            </span>{" "}
            (remaining coherence).
          </p>
        </div>
        {/* Density matrix + explanation */}
        <div className="bg-cream dark:bg-brown p-4 flex flex-col">
          <p className="mb-2 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-terracotta">
            Density Matrix ρ(t)
          </p>
          <div className="flex items-center gap-3">
            <span className="font-display text-4xl text-foreground/30 leading-none">(</span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-base">
              <span className="text-foreground/70">{fmt(0.5)}</span>
              <span className="font-bold text-terracotta">{fmt(rho01)}</span>
              <span className="font-bold text-terracotta">{fmt(rho01)}</span>
              <span className="text-foreground/70">{fmt(0.5)}</span>
            </div>
            <span className="font-display text-4xl text-foreground/30 leading-none">)</span>
          </div>
          <p className="mt-3 text-xs text-taupe leading-relaxed">
            Diagonal fixed at ½. Off-diagonal{" "}
            <span className="text-terracotta font-semibold">ρ₀₁ = ½·e^(−t/T₂)</span> ={" "}
            {fmt(rho01)}.
            {C < 0.05 && (
              <span className="block mt-1 font-bold uppercase tracking-[0.14em] text-[0.625rem] text-terracotta">
                → Classical mixture limit
              </span>
            )}
          </p>
          <hr className="my-3 border-0 border-t border-foreground/10" />
          <p className="text-xs text-foreground/75 leading-relaxed">
            <span className="font-semibold text-foreground">A controlled phase shift</span> moves
            every copy together — the average vector turns but keeps its length.{" "}
            <span className="font-semibold text-foreground">Decoherence</span> makes each copy
            acquire a different, unknown phase; averaging over them shrinks the off-diagonal terms
            toward zero.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-px border border-t-0 border-foreground/15 bg-cream dark:bg-brown p-4">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            onClick={() => {
              if (t >= T_MAX) setT(0);
              setPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cream bg-brown dark:bg-cream dark:text-brown px-4 py-2 transition-transform hover:scale-105"
          >
            {playing ? "❚❚ Pause" : "▶ Play"}
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground border-b-2 border-foreground pb-0.5 transition-colors hover:text-terracotta hover:border-terracotta"
          >
            ↺ Reset
          </button>
          <span className="ml-auto text-[0.625rem] font-bold uppercase tracking-[0.18em] text-taupe">
            Coherence C(t) = {fmt(C)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          <Slider label="Time t" value={t} min={0} max={T_MAX} step={0.02} onChange={setT} display={t.toFixed(2)} />
          <Slider label="Coherence time T₂" value={T2} min={0.4} max={3} step={0.05} onChange={setT2} display={T2.toFixed(2)} />
          <Slider label="Phase noise" value={noise} min={0.2} max={2.5} step={0.05} onChange={setNoise} display={noise.toFixed(2)} />
          <Slider label="Ensemble members N" value={N} min={4} max={MAX_N} step={1} onChange={(v) => setN(Math.round(v))} display={String(N)} />
          <Slider label="Animation speed" value={speed} min={0.25} max={3} step={0.05} onChange={setSpeed} display={speed.toFixed(2) + "×"} />
          <Slider label="Controlled phase shift φ" value={uniform} min={-Math.PI} max={Math.PI} step={0.02} onChange={setUniform} display={(uniform / Math.PI).toFixed(2) + "π"} />
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-taupe">{label}</span>
        <span className="font-mono text-xs text-foreground/80">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-terracotta cursor-pointer"
      />
    </label>
  );
}
