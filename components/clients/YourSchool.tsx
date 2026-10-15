"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Montserrat, Open_Sans } from "next/font/google";
import {
  LuSprout,
  LuHeart,
  LuSparkles,
  LuGraduationCap,
  LuLanguages,
  LuUsers,
  LuClock,
} from "react-icons/lu";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

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

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Edit with your real details ---------- */
const SCHOOL_NAME = "Your School";
const TITLE = "Where every dream finds its wings.";

/* Two paragraphs with the title */
const PARAGRAPH_1 =
  "Every child is known by name here. Our teachers guide with care, and every classroom feels like a second home.";
const PARAGRAPH_2 =
  "Academics grow alongside discipline and good values, and parents are always welcome to be part of the journey.";

/* One paragraph below the images */
const BELOW_PARAGRAPH =
  "Small batches, open doors and daily attention mean no child is left behind. Visit our campus and see how little dreams grow here.";

const QUICK_FACTS = [
  { icon: LuGraduationCap, label: "Classes", value: "Nursery – 12" },
  { icon: LuLanguages, label: "Medium", value: "English & Hindi" },
  { icon: LuUsers, label: "Class size", value: "Max 25 students" },
];

const TIMING = "Mon – Sat, 8:00 AM – 2:00 PM";

/* Smaller, evenly sized cards so the section stays compact */
const CARDS = [
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    alt: "Students playing sports on the school ground",
    cls: "hidden sm:block sm:-rotate-[8deg] sm:mt-4 z-[1] sm:h-[17vw] sm:w-[12vw] lg:h-[15vw] lg:w-[10.5vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop",
    alt: "Students reading in the school library",
    cls: "absolute left-0 top-[10vw] -rotate-[6deg] z-[2] h-[40vw] w-[29vw] sm:static sm:left-auto sm:top-auto sm:-rotate-[4deg] sm:mt-2 sm:-ml-[2vw] sm:h-[19vw] sm:w-[13.5vw] lg:h-[17vw] lg:w-[12vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
    alt: "Students attentive in a classroom lesson",
    cls: "absolute left-[27vw] top-0 rotate-0 z-[5] h-[50vw] w-[40vw] sm:static sm:left-auto sm:top-auto sm:-ml-[2vw] sm:h-[21vw] sm:w-[15vw] lg:h-[19vw] lg:w-[13.5vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    alt: "Students working together in a science lab session",
    cls: "absolute left-[62vw] top-[10vw] rotate-[6deg] z-[2] h-[40vw] w-[29vw] sm:static sm:left-auto sm:top-auto sm:rotate-[4deg] sm:mt-2 sm:-ml-[2vw] sm:h-[19vw] sm:w-[13.5vw] lg:h-[17vw] lg:w-[12vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    alt: "Teacher guiding a student at a desk",
    cls: "hidden sm:block sm:rotate-[8deg] sm:mt-4 sm:-ml-[2vw] z-[1] sm:h-[17vw] sm:w-[12vw] lg:h-[15vw] lg:w-[10.5vw]",
  },
];

function WordReveal({
  text,
  play,
  delay = 0,
}: {
  text: string;
  play: boolean;
  delay?: number;
}) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="mr-[0.25em] inline-block overflow-hidden pb-[0.18em] align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: play ? "0%" : "110%" }}
              transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.07 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </>
  );
}

function WordFade({
  text,
  play,
  delay = 0,
  className = "",
}: {
  text: string;
  play: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="mr-[0.28em] inline-block"
            initial={{ opacity: 0, y: 8 }}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: EASE, delay: delay + i * 0.012 }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </p>
  );
}

export default function YourSchool() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLSpanElement>(null);
  const ctaIconRef = useRef<SVGSVGElement>(null);

  const reduceMotion = useReducedMotion();
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  /* Curve: faster. Ends earlier on scroll and uses a snappier spring. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 55%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.4,
  });
  const arcY = useTransform(
    smooth,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["100%", "0%"]
  );

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const attachInertia = (
        selector: string,
        velocityMul: number,
        rotationMul: number
      ) => {
        const els = sectionRef.current?.querySelectorAll<HTMLElement>(selector);
        els?.forEach((el) => {
          let lastX = 0,
            lastY = 0,
            speedX = 0,
            speedY = 0;
          const startRotation = gsap.getProperty(el, "rotation") as number;
          const startX = gsap.getProperty(el, "x") as number;
          const startY = gsap.getProperty(el, "y") as number;

          const onMove = (e: MouseEvent) => {
            speedX = e.clientX - lastX;
            speedY = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
          };
          const onEnter = (e: MouseEvent) => {
            speedX = 0;
            speedY = 0;
            lastX = e.clientX;
            lastY = e.clientY;
          };
          const onLeave = () => {
            gsap.to(el, {
              inertia: {
                x: { velocity: speedX * velocityMul, end: startX },
                y: { velocity: speedY * velocityMul, end: startY },
                rotation: { velocity: speedX * rotationMul, end: startRotation },
              },
            } as gsap.TweenVars);
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
          });
        });
      };

      if (!prefersReduced) {
        attachInertia(".motion-card__card", 20, 1.5);
        attachInertia(".motion-card__floating-label", 25, 2);
      }

      if (stickerRef.current) {
        if (prefersReduced) {
          gsap.set(stickerRef.current, { scale: 1, opacity: 1, rotation: 0 });
        } else {
          gsap.set(stickerRef.current, { scale: 0, opacity: 0, rotation: -30 });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            })
            .to(stickerRef.current, {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 1.7,
              ease: "elastic.out(1, 0.4)",
            });
        }
      }
    }, sectionRef);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  const handleCtaEnter = () => {
    if (reduceMotion || !ctaIconRef.current) return;
    gsap.to(ctaIconRef.current, { x: 3, duration: 0.25, ease: "back.out(3)" });
  };
  const handleCtaLeave = () => {
    if (reduceMotion || !ctaIconRef.current) return;
    gsap.to(ctaIconRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        aria-labelledby="school-heading"
        className={`${montserrat.variable} ${openSans.variable} relative w-full bg-[#2E211B] px-[5vw] pb-12 pt-16 text-center font-[family-name:var(--font-open-sans)] text-[#F6F0E5] sm:pb-16 sm:pt-20`}
      >
        {/* Rising background arc. Do not add overflow-hidden to this section. */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          style={{ y: arcY, bottom: "calc(100% - 1px)" }}
          className="pointer-events-none absolute left-0 h-4 w-full sm:h-6 md:h-9"
        >
          <path d="M0 48 C 480 4, 960 4, 1440 48 Z" fill="#2E211B" />
        </motion.svg>

        {/* ---------- Title + two paragraphs + admission button ---------- */}
        <div ref={headerRef} className="relative mx-auto w-full max-w-3xl">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={
              headerInView
                ? { opacity: 1, letterSpacing: "0.22em" }
                : { opacity: 0, letterSpacing: "0.5em" }
            }
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-3 font-[family-name:var(--font-montserrat)] text-[12px] font-semibold uppercase text-[#C9A24A]"
          >
            {SCHOOL_NAME}
          </motion.p>

          <h2
            id="school-heading"
            className="relative inline-block max-w-2xl font-[family-name:var(--font-montserrat)] font-bold leading-[1.2] tracking-tight text-[#F6F0E5]"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.9rem)" }}
          >
            <WordReveal text={TITLE} play={headerInView} />
            <span
              ref={stickerRef}
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-3 inline-block h-4 w-4 rotate-[-10deg] sm:-right-7 sm:h-6 sm:w-6 md:-right-9 md:h-8 md:w-8"
            >
              <svg viewBox="0 0 48 48" fill="none" stroke="#C9A24A" strokeWidth="2.2">
                <path
                  d="M24 4l4.5 14H43l-11.7 8.6L35.8 40 24 31.4 12.2 40l4.5-13.4L5 18h14.5L24 4z"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="100%"
            viewBox="0 0 634 28"
            fill="none"
            className="mx-auto mt-1 block h-auto w-full max-w-[90px] text-[#C9A24A] sm:max-w-[170px]"
          >
            <path
              d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="mx-auto mt-4 flex max-w-[560px] flex-col gap-3">
            <WordFade
              text={PARAGRAPH_1}
              play={headerInView}
              delay={0.3}
              className="text-[0.9rem] leading-[1.75] text-[#F6F0E5]/80 sm:text-base"
            />
            <WordFade
              text={PARAGRAPH_2}
              play={headerInView}
              delay={0.75}
              className="text-[0.9rem] leading-[1.75] text-[#F6F0E5]/80 sm:text-base"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
            className="mt-6 flex justify-center"
          >
            <Link
              href="/admission"
              onMouseEnter={handleCtaEnter}
              onMouseLeave={handleCtaLeave}
              onFocus={handleCtaEnter}
              onBlur={handleCtaLeave}
              className="group flex items-center justify-center gap-2 rounded-full bg-[#C9A24A] px-7 py-3 font-[family-name:var(--font-montserrat)] text-sm font-semibold text-[#2E211B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F6F0E5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E211B]"
            >
              Admission Details
              <svg
                ref={ctaIconRef}
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ---------- Fan of cards (labels moved further inside the images) ---------- */}
        <div className="relative z-[2] mx-auto mt-8 flex h-[56vw] w-full flex-nowrap items-center justify-center sm:mt-12 sm:h-auto">
          {CARDS.map((c) => (
            <div
              key={c.alt}
              className={`motion-card__card flex-shrink-0 overflow-clip rounded-xl border-[3px] border-[#F6F0E5] shadow-[0_14px_34px_rgba(0,0,0,0.45)] sm:relative sm:rounded-2xl sm:border-[4px] ${c.cls}`}
            >
              <div className="h-full w-full overflow-hidden rounded-lg bg-[#3A2B24]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  alt={c.alt}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}

          <div className="pointer-events-none absolute inset-0 z-10 h-full w-full">
            <div className="motion-card__floating-label pointer-events-auto absolute left-[34%] top-[12%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full rounded-bl-none bg-[#F6F0E5] px-2.5 py-[0.2rem] shadow-lg sm:px-3.5 sm:py-[0.3rem] md:left-[31%] md:top-[18%]">
              <p
                className="pointer-events-none m-0 flex items-center gap-1 font-medium text-[#2E211B] sm:gap-1.5"
                style={{ fontSize: "clamp(0.62rem, 1.2vw, 0.9rem)" }}
              >
                <LuSprout aria-hidden="true" className="shrink-0 text-[#6B8560]" size={13} />
                discipline builds confidence
              </p>
            </div>
            <div className="motion-card__floating-label pointer-events-auto absolute left-[66%] top-[88%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full rounded-bl-none bg-[#F6F0E5] px-2.5 py-[0.2rem] shadow-lg sm:px-3.5 sm:py-[0.3rem] md:left-[68%] md:top-[82%]">
              <p
                className="pointer-events-none m-0 flex items-center gap-1 font-medium text-[#2E211B] sm:gap-1.5"
                style={{ fontSize: "clamp(0.62rem, 1.2vw, 0.9rem)" }}
              >
                <LuHeart aria-hidden="true" className="shrink-0 text-[#6B8560]" size={13} />
                every child, known by name
              </p>
            </div>
            <div className="motion-card__floating-label pointer-events-auto absolute left-[76%] top-[18%] hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full rounded-bl-none bg-[#9CAF88] px-3.5 py-[0.3rem] shadow-lg md:left-[70%] md:top-[14%] md:block">
              <p
                className="pointer-events-none m-0 flex items-center gap-1.5 font-medium text-[#2E211B]"
                style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)" }}
              >
                <LuSparkles aria-hidden="true" className="shrink-0" size={15} />
                dreams start here
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Paragraph below the images ---------- */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-[5] mx-auto mt-8 max-w-[560px] text-[0.9rem] leading-[1.75] text-[#F6F0E5]/75 sm:mt-12 sm:text-base"
        >
          {BELOW_PARAGRAPH}
        </motion.p>

        {/* ---------- Quick strip: stacked rows on mobile, 3 cols on sm, one row on lg ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-[5] mx-auto mt-8 flex max-w-4xl flex-col rounded-3xl border border-[#F6F0E5]/10 bg-[#F6F0E5]/[0.04] px-5 py-2 text-left sm:mt-10 sm:gap-5 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-7 lg:py-4"
        >
          <div className="flex flex-col divide-y divide-[#F6F0E5]/10 sm:grid sm:grid-cols-3 sm:gap-4 sm:divide-y-0 lg:gap-8">
            {QUICK_FACTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex min-w-0 items-center gap-3 py-3 sm:py-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9CAF88]/15 text-[#9CAF88]">
                    <Icon aria-hidden="true" size={16} />
                  </span>
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:block sm:flex-none">
                    <p className="font-[family-name:var(--font-montserrat)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9CAF88]">
                      {item.label}
                    </p>
                    <p className="text-right text-[13px] font-medium leading-snug text-[#F6F0E5] sm:text-left sm:text-sm">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 border-t border-[#F6F0E5]/10 py-3 sm:justify-center sm:pb-0 sm:pt-4 lg:justify-start lg:border-l lg:border-t-0 lg:py-0 lg:pl-6 lg:pt-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9CAF88]/15 text-[#9CAF88]">
              <LuClock aria-hidden="true" size={16} />
            </span>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:block sm:flex-none">
              <p className="font-[family-name:var(--font-montserrat)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9CAF88]">
                Office Timing
              </p>
              <p className="text-right text-[13px] font-medium leading-snug text-[#F6F0E5] sm:text-left sm:text-sm">
                {TIMING}
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}