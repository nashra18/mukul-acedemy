"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DM_Sans, Fraunces } from "next/font/google";

/* ------------------------------------------------------------------ */
/*  Concept: "Orbit" (warm, minimal)                                   */
/*  A real atom: a proton/neutron nucleus and three classic orbital    */
/*  planes (0°, 60°, 120°) with electrons on them. Headline letters    */
/*  rise in, then grow heavier as your cursor gets close.              */
/*                                                                     */
/*  paper #FBF3E4   ink #2B1B12   terracotta #D9593D                   */
/*  gold #F2B134    sage #7C9A6D  sand #C9A27A                         */
/* ------------------------------------------------------------------ */

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

/* "child's world" shares a line on desktop, stacks on mobile */
const lines: string[][] = [["Where", "a"], ["child\u2019s", "world"], ["begins."]];

const stats = [
  { to: 10000, decimals: 0, suffix: "+", label: "students taught" },
  { to: 37, decimals: 0, suffix: "", label: "years of teaching" },
  { to: 4.5, decimals: 1, suffix: "/5", label: "session rating" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const fv = (w: number) => `"wght" ${Math.round(w)}, "SOFT" 100, "WONK" 1`;

/* ------------------------- Count-up number -------------------------- */
function CountUp({
  to,
  decimals,
  suffix,
  delay,
}: {
  to: number;
  decimals: number;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const format = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = format(to);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / 1600));
      el.textContent = format(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return <span ref={ref}>{format(0)}</span>;
}

/* --------------------------- Atom artwork --------------------------- */
const RX = 430;
const RY = 150;
const ellipsePath = `M ${500 - RX},500 a ${RX},${RY} 0 1,0 ${RX * 2},0 a ${RX},${RY} 0 1,0 -${
  RX * 2
},0`;

/* The classic three-plane atom */
const orbits = [
  { angle: 0, grad: "e0", color: "#F2B134", draw: 0.4, dur: 13, size: 10, reverse: false },
  { angle: 60, grad: "e1", color: "#D9593D", draw: 0.7, dur: 17, size: 9, reverse: true },
  { angle: 120, grad: "e2", color: "#7C9A6D", draw: 1.0, dur: 15, size: 9, reverse: false },
];

/* Nucleus: tightly packed protons (terracotta) and neutrons (sand) */
const nucleons = [
  { x: 0, y: 0, p: true },
  { x: -15, y: -10, p: false },
  { x: 14, y: -12, p: true },
  { x: -13, y: 12, p: true },
  { x: 15, y: 11, p: false },
  { x: 1, y: -22, p: false },
  { x: 0, y: 23, p: true },
  { x: -26, y: 1, p: true },
  { x: 27, y: 0, p: false },
];

function Electron({
  grad,
  color,
  size,
  dur,
  reverse,
  delay,
}: {
  grad: string;
  color: string;
  size: number;
  dur: number;
  reverse: boolean;
  delay: number;
}) {
  const motionProps = {
    dur: `${dur}s`,
    repeatCount: "indefinite",
    path: ellipsePath,
    ...(reverse ? { keyPoints: "1;0", keyTimes: "0;1", calcMode: "linear" } : {}),
  };
  const gap = 0.16; // seconds between trail dots

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {/* short fading trail, drawn first so the electron sits on top */}
      {[4, 3, 2, 1].map((k) => (
        <circle key={k} r={size * (1 - k * 0.16)} fill={color} opacity={0.38 - k * 0.07}>
          <animateMotion {...motionProps} begin={`${-(dur - k * gap)}s`} />
        </circle>
      ))}
      <g>
        <circle r={size * 2} fill={color} opacity="0.14" />
        <circle r={size} fill={`url(#${grad})`} />
        <animateMotion {...motionProps} />
      </g>
    </motion.g>
  );
}

function Atom({ reduce }: { reduce: boolean }) {
  const draw = (delay: number, duration = 2.2) => ({
    initial: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration, delay, ease },
      opacity: { duration: 0.3, delay },
    },
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(105vw,82svh)] w-[min(105vw,82svh)] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        className="h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 220, ease: "linear", repeat: Infinity }}
      >
        <svg viewBox="0 0 1000 1000" className="h-full w-full" fill="none">
          <defs>
            {/* spherical shading for electrons */}
            {[
              ["e0", "#FFE7A3", "#F2B134", "#B97C0E"],
              ["e1", "#FFC0AE", "#D9593D", "#8F2F18"],
              ["e2", "#CFE3C3", "#7C9A6D", "#47603B"],
            ].map(([id, a, b, c]) => (
              <radialGradient key={id} id={id} cx="35%" cy="32%" r="75%">
                <stop offset="0%" stopColor={a} />
                <stop offset="55%" stopColor={b} />
                <stop offset="100%" stopColor={c} />
              </radialGradient>
            ))}
            {/* spherical shading for nucleons */}
            <radialGradient id="proton" cx="35%" cy="32%" r="75%">
              <stop offset="0%" stopColor="#FFC0AE" />
              <stop offset="55%" stopColor="#D9593D" />
              <stop offset="100%" stopColor="#8F2F18" />
            </radialGradient>
            <radialGradient id="neutron" cx="35%" cy="32%" r="75%">
              <stop offset="0%" stopColor="#F5E2C4" />
              <stop offset="55%" stopColor="#C9A27A" />
              <stop offset="100%" stopColor="#8A6A47" />
            </radialGradient>
            <radialGradient id="halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F2B134" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#F2B134" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Faint halo behind the nucleus */}
          <circle cx="500" cy="500" r="120" fill="url(#halo)" />

          {/* Three orbital planes at 0°, 60°, 120° */}
          {orbits.map((o, i) => (
            <g key={i} transform={`rotate(${o.angle} 500 500)`}>
              <motion.ellipse
                cx="500"
                cy="500"
                rx={RX}
                ry={RY}
                stroke="#2B1B12"
                strokeOpacity="0.28"
                strokeWidth="1.25"
                {...draw(o.draw)}
              />
              {!reduce && (
                <Electron
                  grad={o.grad}
                  color={o.color}
                  size={o.size}
                  dur={o.dur}
                  reverse={o.reverse}
                  delay={2.2 + i * 0.2}
                />
              )}
            </g>
          ))}

          {/* Nucleus cluster */}
          <motion.g
            initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            style={{ transformOrigin: "500px 500px" }}
          >
            {nucleons.map((n, i) => (
              <circle
                key={i}
                cx={500 + n.x}
                cy={500 + n.y}
                r="15"
                fill={n.p ? "url(#proton)" : "url(#neutron)"}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

/* ------------------------------ Hero -------------------------------- */
export default function HeroOrbit() {
  const reduceHook = useReducedMotion();
  const reduce = !!reduceHook;
  const letters = useRef<(HTMLSpanElement | null)[]>([]);

  /* Letters grow with the cursor, or wave when idle */
  useEffect(() => {
    const els = letters.current;

    if (reduce) {
      els.forEach((el) => el && (el.style.fontVariationSettings = fv(550)));
      return;
    }

    const current = els.map(() => 150);
    let px = -9999;
    let py = -9999;
    let last = -1e9;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      last = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = (t: number) => {
      const active = t - last < 2200;
      const reach = Math.min(window.innerWidth, 1000) * 0.3;

      els.forEach((el, i) => {
        if (!el) return;
        let target: number;
        if (active) {
          const r = el.getBoundingClientRect();
          const d = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
          const k = Math.max(0, 1 - d / reach);
          target = 250 + 600 * k * k;
        } else {
          target = 520 + 280 * Math.sin(t / 750 + i * 0.5);
        }
        current[i] += (target - current[i]) * 0.07;
        el.style.fontVariationSettings = fv(current[i]);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  let index = 0;

  return (
    <main
      id="home"
      className={`${display.variable} ${body.variable} relative isolate flex h-[100svh] w-full flex-col overflow-hidden bg-[#FBF3E4] bg-[radial-gradient(ellipse_at_50%_42%,#FFF9EC_0%,#FBF3E4_50%,#F4E3C6_100%)] text-[#2B1B12]`}
    >
      {/* Top bar */}
      <motion.header
        {...fade(0.1)}
        className="relative z-10 flex flex-row items-center justify-between gap-6 px-5 pt-5 font-[family-name:var(--font-body)] sm:px-10 sm:pt-7 lg:px-[5%]"
      >
        <span className="text-[16px] font-semibold tracking-tight">
          Mukul Academy
        </span>
        <span className="text-right text-[12px] leading-snug text-[#2B1B12]/60 sm:text-[13px]">
          Affiliated to Sophia Public High School
        </span>
      </motion.header>

      {/* Headline + atom artwork */}
      <section className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-5 sm:px-10">
        <Atom reduce={reduce} />

        <h1
          aria-label="Where a child’s world begins."
          className="relative z-10 text-center font-[family-name:var(--font-display)] text-[length:min(17vw,11svh)] leading-[0.92] tracking-[-0.04em] md:text-[length:min(9.6vw,14.5svh)]"
        >
          {lines.map((words, l) => (
            <span
              key={l}
              aria-hidden
              className={`flex justify-center overflow-y-clip pb-[0.1em] ${
                l === 1
                  ? "flex-col items-center md:flex-row md:gap-[0.22em]"
                  : "flex-row gap-[0.22em]"
              }`}
            >
              {words.map((word) => (
                <span key={word} className="block whitespace-nowrap">
                  {Array.from(word).map((char, c) => {
                    const i = index++;
                    return (
                      <motion.span
                        key={c}
                        ref={(el) => {
                          letters.current[i] = el;
                        }}
                        className="inline-block"
                        initial={{ y: reduce ? 0 : "115%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.1, delay: 0.15 + i * 0.045, ease }}
                        style={{ fontVariationSettings: fv(150) }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </section>

      {/* Message and actions */}
      <motion.div
        {...fade(1.2)}
        className="relative z-10 flex flex-col items-center gap-5 px-5 text-center font-[family-name:var(--font-body)] sm:gap-6 sm:px-10"
      >
        <p className="max-w-[30rem] text-[15px] leading-[1.6] text-[#2B1B12]/70 sm:text-[17px]">
          A warm school where every child is known by name and curiosity
          always has a place.
        </p>

        <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {/* Primary CTA: the loudest element after the headline */}
          <a
            href="#quote"
            className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[#D9593D] px-7 text-[16px] font-semibold text-[#FFF8EA] no-underline shadow-[0_10px_28px_-8px_rgba(217,89,61,0.65)] transition-shadow duration-300 hover:shadow-[0_14px_34px_-8px_rgba(217,89,61,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2B1B12] sm:h-14 sm:px-9 sm:text-[17px]"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full bg-[#2B1B12] transition-transform duration-300 ease-out group-hover:translate-y-0"
            />
            <span className="relative">Request a quote</span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          {/* Secondary action: quiet text link */}
          <a
            href="#contact"
            className="text-[15px] font-semibold text-[#2B1B12] underline decoration-[#2B1B12]/30 decoration-1 underline-offset-[6px] transition-colors duration-300 hover:decoration-[#D9593D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9593D] sm:text-[16px]"
          >
            Contact us
          </a>
        </div>
      </motion.div>

      {/* Facts */}
      <motion.ul
        {...fade(1.4)}
        className="relative z-10 m-0 mt-6 flex list-none flex-row flex-wrap items-baseline justify-center gap-x-7 gap-y-2 border-t border-[#2B1B12]/10 px-5 py-4 font-[family-name:var(--font-body)] sm:mt-7 sm:px-10"
      >
        {stats.map((s, i) => (
          <li key={s.label} className="flex flex-row items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-[18px] font-semibold leading-none tracking-[-0.03em] text-[#2B1B12] sm:text-[22px]">
              <CountUp
                to={s.to}
                decimals={s.decimals}
                suffix={s.suffix}
                delay={1.4 + i * 0.12}
              />
            </span>
            <span className="text-[12px] text-[#2B1B12]/55 sm:text-[13px]">
              {s.label}
            </span>
          </li>
        ))}
      </motion.ul>
    </main>
  );
}