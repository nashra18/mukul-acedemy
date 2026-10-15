"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
});

type Leader = {
  name: string;
  role: string;
  image: string;
};

const LEADERS: Leader[] = [
  {
    name: "Ravindra Kumar Gupta",
    role: "Principal",
    image:
      "https://images.unsplash.com/photo-1790105684809-6697eed86bfb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Vijita Gupta",
    role: "Vice Principal",
    image:
      "https://plus.unsplash.com/premium_photo-1709142525186-c2ed619e5632?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const BELIEF_CARDS = [
  {
    title: "What we believe",
    text: "Every student carries a spark worth protecting — our classrooms exist to shelter it, not standardize it.",
  },
  {
    title: "What we aim for",
    text: "Confident, capable learners who leave here ready to build, question, and lead in their own communities.",
  },
  {
    title: "How we get there",
    text: "Small class attention, disciplined routines, and teachers who notice when a child goes quiet.",
  },
];

const TOGGLE_INTERVAL_MS = 4500;

export default function Intro() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const imageWrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lastAnimated = useRef(active);

  const reduceMotion = useReducedMotion();
  const paused = hovered || focused;

  /* Swap animation: skipped on first render (the container's whileInView
     already handles the entrance) and skipped for reduced motion. */
  useLayoutEffect(() => {
    if (!imageWrapRef.current || !nameRef.current) return;
    if (lastAnimated.current === active) return;
    lastAnimated.current = active;

    if (reduceMotion) {
      gsap.set([imageWrapRef.current, nameRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      imageWrapRef.current,
      { opacity: 0, y: 14, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }
    ).fromTo(
      nameRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.3"
    );
    return () => {
      tl.kill();
    };
  }, [active, reduceMotion]);

  /* Auto-rotate: timeout restarts whenever `active` changes (so a dot click
     resets the timer), pauses on hover/keyboard focus, off for reduced motion. */
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setTimeout(() => {
      setActive((prev) => (prev + 1) % LEADERS.length);
    }, TOGGLE_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduceMotion]);

  const leader = LEADERS[active];

  return (
    <MotionConfig reducedMotion="user">
      <section
        className={`${montserrat.variable} ${openSans.variable} relative w-full overflow-hidden bg-[#F6F0E5] px-6 py-16 font-[family-name:var(--font-open-sans)] md:px-12 md:py-24`}
      >
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            {/* Left: welcome message */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A24A]/40 bg-[#C9A24A]/10 px-4 py-1.5 font-[family-name:var(--font-montserrat)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2E211B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9CAF88]" />
                Our Leadership
              </span>

              <h2 className="max-w-lg font-[family-name:var(--font-montserrat)] text-[1.9rem] font-bold leading-tight tracking-tight text-[#2E211B] sm:text-[2.75rem]">
                Welcome from the Principal&apos;s Desk
              </h2>

              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-[#252525]/80 sm:text-base md:max-w-md">
                <p>
                  We believe every child who walks through our gates is already
                  carrying something worth building on — curiosity, honesty, the
                  instinct to ask &quot;why.&quot; Our job is to protect that,
                  not train it out of them.
                </p>
                <p>
                  What we want to do is simple to say and hard to do well: raise
                  learners who can think clearly, speak plainly, and carry
                  themselves with quiet confidence — in an exam hall or a room
                  full of strangers.
                </p>
                <p>
                  If that sounds like the kind of place you&apos;d want for your
                  child, we&apos;d love for you to visit and see it for yourself
                  rather than take our word for it.
                </p>
              </div>

              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-9 inline-block"
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C9A24A] px-7 py-3 font-[family-name:var(--font-montserrat)] text-sm font-semibold text-[#2E211B] transition-colors hover:bg-[#2E211B] hover:text-[#F6F0E5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24A] focus-visible:ring-offset-2"
                >
                  Know more
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: auto-toggling leader card (pauses on hover / keyboard focus) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={(e) => {
                if (e.target.matches(":focus-visible")) setFocused(true);
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setFocused(false);
                }
              }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-t-[999px] rounded-b-3xl border-2 border-dashed border-[#C9A24A]" />
                <div
                  ref={imageWrapRef}
                  className="relative h-72 w-60 md:h-80 md:w-64"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-3xl border-4 border-white bg-[#E7E2D6] shadow-[0_8px_30px_rgba(46,33,27,0.15)]">
                    {LEADERS.map((l, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={l.name}
                        src={l.image}
                        alt={i === active ? l.name : ""}
                        aria-hidden={i !== active}
                        draggable={false}
                        className={`absolute inset-0 h-full w-full object-cover ${
                          i === active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div ref={nameRef} className="mt-6 text-center">
                <p className="font-[family-name:var(--font-montserrat)] text-lg font-semibold text-[#2E211B]">
                  {leader.name}
                </p>
                <p className="text-sm font-medium text-[#2E211B]/70">
                  {leader.role}
                </p>
              </div>

              <div className="mt-3 flex">
                {LEADERS.map((l, i) => (
                  <button
                    key={l.name}
                    aria-label={`Show ${l.name}`}
                    aria-current={i === active}
                    onClick={() => setActive(i)}
                    className="flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24A]"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === active
                          ? "w-5 bg-[#C9A24A]"
                          : "w-1.5 bg-[#2E211B]/25"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Horizontal belief cards */}
          <div className="mt-14">
            <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
              {BELIEF_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  className="min-w-[260px] flex-1 snap-start rounded-2xl bg-white p-6 shadow-[0_18px_40px_rgba(46,33,27,0.10)] md:min-w-0"
                >
                  <span className="block h-1 w-8 rounded-full bg-[#9CAF88]" />
                  <p className="mt-4 font-[family-name:var(--font-montserrat)] text-base font-semibold text-[#2E211B]">
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#252525]/75">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}