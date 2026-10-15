"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Montserrat, Open_Sans } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

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

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

// ---- Replace these with your own school photos ----
const slides = [
  {
    title: "Morning Assembly",
    description:
      "Every day begins together on the ground — a shared moment before the day splits into a hundred different classrooms.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Science Lab",
    description:
      "Beakers, questions, and the occasional small explosion. This is where curiosity gets its hands dirty.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Sports Ground",
    description:
      "Dust, whistles, and the roar of the sideline. Friendships are built as fast as the score changes.",
    image:
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Library Corner",
    description:
      "A quieter part of campus, where afternoons disappear between pages and nobody minds the silence.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Annual Fest",
    description:
      "Lights, stage, stitched-together costumes — the one week a year the whole school becomes one big rehearsal.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
  },
];

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
  /** width as % of its column */
  width: string;
  /** shape of the card */
  ratio: string;
  /** horizontal position inside the column */
  align: string;
}

// ---- Replace these with your own campus photos ----
const leftImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    alt: "School building",
    label: "Our Campus",
    width: "w-[96%] sm:w-[66%]",
    ratio: "aspect-[3/4] sm:aspect-[4/5]",
    align: "self-start",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    alt: "Classroom session",
    label: "Classroom Moments",
    width: "w-full sm:w-[80%]",
    ratio: "aspect-[4/5] sm:aspect-square",
    align: "self-end",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    alt: "Teacher and students",
    label: "Guided by Teachers",
    width: "w-[92%] sm:w-[60%]",
    ratio: "aspect-[3/4]",
    align: "self-center",
  },
];

const rightImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    alt: "Students learning",
    label: "Learning Together",
    width: "w-full sm:w-[74%]",
    ratio: "aspect-[3/5] sm:aspect-[3/4]",
    align: "self-end",
  },
  {
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    alt: "Books and study",
    label: "Study Hours",
    width: "w-[94%] sm:w-[62%]",
    ratio: "aspect-[4/5] sm:aspect-[4/3]",
    align: "self-start",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    alt: "Students group",
    label: "Friends for Life",
    width: "w-full sm:w-[76%]",
    ratio: "aspect-[3/4] sm:aspect-[4/5]",
    align: "self-center",
  },
];

// Poora text scroll par word-by-word aata hai.
const titleText =
  "Some days quietly turn into memories that stay with you forever.";
const titleWords = titleText.split(" ");

// Paragraph: appears below the gallery when scrolled into view.
const closingParagraph =
  "Years from now, you may forget the lessons, but never the laughter in the corridors, the friends who waited at the gate, and the teachers who believed in you before you believed in yourself. This is not just a school — it is the place where a child learns to belong.";

const AUTO_PLAY_MS = 7000;

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function StudentLife() {
  /* ---------- Carousel state ---------- */
  const [index, setIndex] = useState(0);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---------- Gallery refs ---------- */
  const galleryRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);

  // Title reveal: scroll progress of the gallery section (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start 70%", "start -60%"],
  });

  // Title exit: images ke end par words ek-ek karke wapas chale jaate hain
  // (jaise aaye the, bas ulte order mein).
  const { scrollYProgress: exitProgress } = useScroll({
    target: galleryRef,
    offset: ["end 100%", "end 50%"],
  });
  // Peeche ka soft blur sabse aakhir mein fade hota hai
  const blurOpacity = useTransform(exitProgress, [0.6, 1], [1, 0]);

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);
  }, []);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  // Dashed ring: continuous rotation.
  useEffect(() => {
    if (!ringRef.current) return;
    const tween = gsap.to(ringRef.current, {
      rotation: 360,
      duration: 24,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
    return () => {
      tween.kill();
    };
  }, []);

  // Gallery: parallax + title scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(colLeftRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(colRightRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, galleryRef);

    // Images/fonts load hone ke baad positions dobara calculate karo
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  const handlePrev = () => {
    goTo(index - 1);
    restartTimer();
  };

  const handleNext = () => {
    goTo(index + 1);
    restartTimer();
  };

  const current = slides[index];
  const prevIndex = (index - 1 + slides.length) % slides.length;
  const nextIndex = (index + 1) % slides.length;

  return (
    // One single background for the whole component
    <div
      className={`${montserrat.variable} ${openSans.variable} w-full overflow-x-clip bg-[#FBF9F4] font-[family-name:var(--font-open-sans)]`}
    >
      {/* ====================================================================
          PART 1 — Student Life carousel
      ==================================================================== */}
      <section className="w-full pb-28 pt-16 sm:pb-44 sm:pt-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-5 text-center sm:px-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 px-4 py-1.5 font-[family-name:var(--font-montserrat)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A6F16]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
            Campus Life
          </span>

          <h2 className="font-[family-name:var(--font-montserrat)] text-[1.9rem] font-bold leading-tight tracking-tight text-[#1B2440] sm:text-[2.75rem]">
            Student Life at Our School
          </h2>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[#4B5165] sm:text-[15px]">
            Beyond timetables and textbooks, this is where the everyday moments
            happen — the ones students actually remember years later.
          </p>
        </div>

        {/* Circle stage: previous | current | next */}
        <div className="relative mx-auto mt-10 h-60 w-full max-w-4xl sm:mt-12 sm:h-72">
          {/* Previous (gone) circle */}
          <button
            onClick={handlePrev}
            aria-label={`Previous: ${slides[prevIndex].title}`}
            className="absolute left-0 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#E7E2D6] opacity-40 transition-opacity duration-300 hover:opacity-60 sm:left-[calc(50%-250px)] sm:h-36 sm:w-36"
          >
            <StackedImages activeIndex={prevIndex} className="grayscale-[30%]" />
          </button>

          {/* Current circle with rotating dashed ring */}
          <div className="absolute left-1/2 top-1/2 flex h-60 w-60 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-72 sm:w-72">
            <div
              ref={ringRef}
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <svg viewBox="0 0 300 300" className="h-full w-full">
                <circle
                  cx="150"
                  cy="150"
                  r="144"
                  fill="none"
                  stroke="#D9A441"
                  strokeWidth="2"
                  strokeDasharray="10 9"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="relative h-[84%] w-[84%] overflow-hidden rounded-full bg-[#E7E2D6] shadow-[0_8px_30px_rgba(27,36,64,0.15)]">
              <StackedImages activeIndex={index} />
            </div>
          </div>

          {/* Next (coming) circle */}
          <button
            onClick={handleNext}
            aria-label={`Next: ${slides[nextIndex].title}`}
            className="absolute right-0 top-1/2 h-28 w-28 -translate-y-1/2 translate-x-1/2 overflow-hidden rounded-full bg-[#E7E2D6] opacity-40 transition-opacity duration-300 hover:opacity-60 sm:left-[calc(50%+250px)] sm:right-auto sm:h-36 sm:w-36 sm:-translate-x-1/2"
          >
            <StackedImages activeIndex={nextIndex} className="grayscale-[30%]" />
          </button>
        </div>

        <div className="mx-auto flex max-w-2xl flex-col items-center px-5 text-center sm:px-6">
          {/* Title + description */}
          <div className="mt-8 min-h-[120px] max-w-md sm:min-h-[104px]">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h3 className="font-[family-name:var(--font-montserrat)] text-lg font-semibold text-[#1B2440] sm:text-xl">
                {current.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6070]">
                {current.description}
              </p>
            </motion.div>
          </div>

          {/* Arrows + progress dots */}
          <div className="mt-8 flex items-center gap-4 sm:mt-10 sm:gap-6">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1B2440]/15 text-[#1B2440] transition-colors hover:border-[#D9A441] hover:text-[#D9A441] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 13L5 8L10 3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  aria-label={`Go to ${s.title}`}
                  onClick={() => {
                    goTo(i);
                    restartTimer();
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-5 bg-[#D9A441]" : "w-1.5 bg-[#1B2440]/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1B2440]/15 text-[#1B2440] transition-colors hover:border-[#D9A441] hover:text-[#D9A441] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PART 2 — Scattered gallery with a pinned text
          (poora text scroll par word-by-word khulta hai)
      ==================================================================== */}
      <section
        ref={galleryRef}
        className="relative min-h-[130vh]"
      >
        {/* Overlay track: poore section jitna lamba. Text sticky rehta hai aur
            track ke end par (images ke upar hi) ruk jata hai. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-40 z-10 sm:bottom-72">
          <div className="sticky top-[38vh] flex justify-center px-4">
            <div className="relative flex flex-col items-center text-center">
              {/* Soft blur behind the text */}
              <motion.div
                aria-hidden
                style={{ opacity: blurOpacity }}
                className="absolute -inset-x-6 -inset-y-6 bg-[#FBF9F4]/30 backdrop-blur-md [-webkit-mask-image:radial-gradient(closest-side,black_35%,transparent_100%)] [mask-image:radial-gradient(closest-side,black_35%,transparent_100%)] sm:-inset-x-12 sm:-inset-y-10"
              />

              <h3 className="relative max-w-[19rem] font-[family-name:var(--font-montserrat)] text-[1.45rem] font-medium leading-tight tracking-tight text-[#1B2440] [text-shadow:0_0_18px_rgba(251,249,244,0.95),0_0_6px_rgba(251,249,244,0.9)] sm:max-w-lg sm:text-3xl md:max-w-xl md:text-4xl">
                {titleWords.map((word, i) => {
                  const n = titleWords.length;
                  const start = (i / n) * 0.8;
                  // exit: ulta order (aakhri word pehle jaata hai)
                  const exitStart = ((n - 1 - i) / n) * 0.8;
                  return (
                    <RevealWord
                      key={`${word}-${i}`}
                      word={word}
                      progress={scrollYProgress}
                      start={start}
                      end={start + 0.2}
                      exitProgress={exitProgress}
                      exitStart={exitStart}
                      exitEnd={exitStart + 0.2}
                      addSpace={i < n - 1}
                    />
                  );
                })}
              </h3>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="mx-auto grid min-h-[130vh] max-w-4xl grid-cols-2 items-stretch gap-2 px-2 sm:gap-6 sm:px-6 md:gap-8">
          {/* Left column */}
          <div
            ref={colLeftRef}
            className="flex flex-col justify-between gap-4 pb-8 pt-4 sm:gap-14 sm:pb-24 sm:pt-12 md:gap-16"
          >
            {leftImages.map((img) => (
              <ImageCard key={img.src} image={img} />
            ))}
          </div>

          {/* Right column — offset lower so the two columns never line up */}
          <div
            ref={colRightRef}
            className="flex flex-col justify-between gap-4 pb-8 pt-16 sm:gap-14 sm:pb-24 sm:pt-36 md:gap-16 md:pt-44"
          >
            {rightImages.map((img) => (
              <ImageCard key={img.src} image={img} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PART 3 — Paragraph revealed on scroll, below the images
      ==================================================================== */}
      <section className="px-6 pb-24 pt-12 sm:pb-32 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <span className="mb-5 h-[2px] w-10 rounded-full bg-[#D9A441]" />
          <p className="font-[family-name:var(--font-montserrat)] text-base font-medium leading-relaxed text-[#1B2440] sm:text-xl sm:leading-relaxed md:text-2xl">
            {closingParagraph}
          </p>
        </motion.div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stacked, instantly cross-fading images                                    */
/* -------------------------------------------------------------------------- */

function StackedImages({
  activeIndex,
  className = "",
}: {
  activeIndex: number;
  className?: string;
}) {
  return (
    <>
      {slides.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt={i === activeIndex ? s.title : ""}
          aria-hidden={i !== activeIndex}
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gallery card                                                              */
/* -------------------------------------------------------------------------- */

function ImageCard({ image }: { image: GalleryImage }) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-xl bg-[#E7E2D6] shadow-[0_18px_40px_rgba(27,36,64,0.18)] sm:rounded-2xl ${image.width} ${image.ratio} ${image.align}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1428]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-2 p-2.5 font-[family-name:var(--font-montserrat)] text-[9px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4 sm:text-xs">
        {image.label}
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Single title word, fades in as the section scrolls                        */
/* -------------------------------------------------------------------------- */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function RevealWord({
  word,
  progress,
  start,
  end,
  exitProgress,
  exitStart,
  exitEnd,
  addSpace,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  exitProgress: MotionValue<number>;
  exitStart: number;
  exitEnd: number;
  addSpace: boolean;
}) {
  // enter (0 -> 1) x exit (1 -> 0), dono scroll se chalte hain
  const visible = useTransform([progress, exitProgress], (latest) => {
    const [p, e] = latest as number[];
    const enter = clamp01((p - start) / (end - start));
    const exit = 1 - clamp01((e - exitStart) / (exitEnd - exitStart));
    return { enter, exit };
  });
  const opacity = useTransform(visible, (v) => v.enter * v.exit);
  const y = useTransform(visible, (v) => 12 * (1 - v.enter) - 12 * (1 - v.exit));

  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {word}
      {addSpace ? "\u00A0" : ""}
    </motion.span>
  );
}