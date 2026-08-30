"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function SchoolHero() {
  const doodleRefs = useRef([]);
  const ctaIconRefs = useRef([]);
  const photoWrapRef = useRef(null);
  const glowRefs = useRef([]);

  doodleRefs.current = [];
  ctaIconRefs.current = [];
  glowRefs.current = [];

  const addDoodleRef = (el) => {
    if (el && !doodleRefs.current.includes(el)) doodleRefs.current.push(el);
  };
  const addCtaRef = (el) => {
    if (el && !ctaIconRefs.current.includes(el)) ctaIconRefs.current.push(el);
  };
  const addGlowRef = (el) => {
    if (el && !glowRefs.current.includes(el)) glowRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      doodleRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -12 : 10,
          rotate: i % 2 === 0 ? 5 : -6,
          duration: 3.2 + i * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.18,
        });
      });

      if (photoWrapRef.current) {
        gsap.to(photoWrapRef.current, {
          scale: 1.035,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      glowRefs.current.forEach((el, i) => {
        gsap.to(el, {
          scale: 1.18,
          opacity: 0.55,
          duration: 4.5 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleCtaEnter = (i) => {
    const el = ctaIconRefs.current[i];
    if (el) gsap.to(el, { x: 3, duration: 0.25, ease: "back.out(3)" });
  };
  const handleCtaLeave = (i) => {
    const el = ctaIconRefs.current[i];
    if (el) gsap.to(el, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  const headerVariant1 = {
    initial: { y: "100%" },
    animate: { y: 0, transition: { duration: 1.1, delay: 0.1, ease: [0.25, 1, 0.5, 1] } },
  };
  const headerVariant2 = {
    initial: { y: "100%" },
    animate: { y: 0, transition: { duration: 1.1, delay: 0.24, ease: [0.25, 1, 0.5, 1] } },
  };
  const appear = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.5, ease: [0.65, 0, 0.35, 1] } },
  };
  const appearImage = {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.9, delay: 0.4, ease: [0.65, 0, 0.35, 1] } },
  };
  const appearCopy = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.7, ease: [0.65, 0, 0.35, 1] } },
  };

  const doodles = [
    {
      pos: "top-[6%] left-[4%]",
      color: "#4FB6C9",
      size: "h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11",
      paths: (
        <>
          <path d="M6 12c5-3 11-3 15 1v22c-4-4-10-4-15-1V12z" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M42 12c-5-3-11-3-15 1v22c4-4 10-4 15-1V12z" strokeLinejoin="round" strokeLinecap="round" />
        </>
      ),
    },
    {
      pos: "top-[12%] right-[6%]",
      color: "#FFC93C",
      size: "h-9 w-9 sm:h-11 sm:w-11 md:h-14 md:w-14",
      paths: (
        <>
          <path d="M24 6a12 12 0 00-7 21.8c1.3 1 2 2.5 2 4.2v1h10v-1c0-1.7.7-3.2 2-4.2A12 12 0 0024 6z" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M20 38h8M21.5 41.5h5" strokeLinecap="round" />
        </>
      ),
    },
    {
      pos: "top-[42%] left-[2%]",
      color: "#B48FD9",
      size: "h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12",
      paths: (
        <>
          <path d="M24 10L4 19l20 9 20-9-20-9z" strokeLinejoin="round" />
          <path d="M13 23v9c0 3 5 6 11 6s11-3 11-6v-9" strokeLinecap="round" />
          <path d="M40 20v10" strokeLinecap="round" />
        </>
      ),
    },
    {
      pos: "top-[38%] right-[3%]",
      color: "#8FBF5C",
      size: "h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11",
      paths: <path d="M6 24L42 8 27 42l-4-14-8-4z" strokeLinejoin="round" strokeLinecap="round" />,
    },
    {
      pos: "bottom-[14%] left-[6%]",
      color: "#FF6B5B",
      size: "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10",
      paths: (
        <>
          <path d="M31 8l9 9-19 19-11 2 2-11 19-19z" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M27 12l9 9" strokeLinecap="round" />
        </>
      ),
    },
    {
      pos: "bottom-[10%] right-[7%]",
      color: "#4FB6C9",
      size: "h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10",
      paths: (
        <>
          <circle cx="24" cy="24" r="16" />
          <path d="M17 24l5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
    {
      pos: "top-[24%] left-[14%]",
      color: "#FFC93C",
      size: "h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8",
      paths: <path d="M24 4l4.5 14H43l-11.7 8.6L35.8 40 24 31.4 12.2 40l4.5-13.4L5 18h14.5L24 4z" strokeLinejoin="round" />,
    },
    {
      pos: "top-[30%] right-[15%]",
      color: "#B48FD9",
      size: "h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8",
      paths: <path d="M24 6c-8 6-8 14 0 20 8-6 8-14 0-20zM24 26v18" strokeLinecap="round" strokeLinejoin="round" />,
    },
    {
      pos: "top-[4%] right-[24%]",
      color: "#8FBF5C",
      size: "h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8",
      paths: <path d="M24 8v8m0 16v8m16-16h-8m-16 0H8" strokeLinecap="round" />,
    },
    {
      pos: "bottom-[6%] left-[20%]",
      color: "#FF6B5B",
      size: "h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8",
      paths: <path d="M12 30c4-14 20-14 24 0M14 30h20l-2 8H16l-2-8z" strokeLinecap="round" strokeLinejoin="round" />,
    },
    {
      pos: "top-[55%] left-[10%]",
      color: "#3A2E22",
      size: "h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9",
      paths: <path d="M8 40c6-16 26-16 32 0M14 16h20v10a10 10 0 01-20 0V16z" strokeLinecap="round" strokeLinejoin="round" />,
    },
    {
      pos: "bottom-[26%] right-[18%]",
      color: "#FFC93C",
      size: "h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9",
      paths: (
        <>
          <rect x="8" y="10" width="32" height="24" rx="3" strokeLinejoin="round" />
          <path d="M8 16h32M16 10v-4M32 10v-4" strokeLinecap="round" />
        </>
      ),
    },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-[6vw] py-16 font-body text-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,46,34,0.08) 1.4px, transparent 1.4px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div
        ref={addGlowRef}
        className="pointer-events-none absolute -left-[8%] top-[6%] h-[38vw] w-[38vw] max-h-[420px] max-w-[420px] rounded-full opacity-30"
        style={{ background: "#FF6B5B", filter: "blur(90px)" }}
      />
      <div
        ref={addGlowRef}
        className="pointer-events-none absolute right-[2%] top-[30%] h-[30vw] w-[30vw] max-h-[340px] max-w-[340px] rounded-full opacity-30"
        style={{ background: "#4FB6C9", filter: "blur(90px)" }}
      />
      <div
        ref={addGlowRef}
        className="pointer-events-none absolute bottom-[2%] left-[30%] h-[26vw] w-[26vw] max-h-[300px] max-w-[300px] rounded-full opacity-25"
        style={{ background: "#FFC93C", filter: "blur(90px)" }}
      />

      {doodles.map((d, i) => (
        <svg
          key={i}
          ref={addDoodleRef}
          className={`pointer-events-none absolute ${d.pos} ${d.size}`}
          viewBox="0 0 48 48"
          fill="none"
          stroke={d.color}
          strokeWidth="1.8"
        >
          {d.paths}
        </svg>
      ))}

      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <div className="overflow-hidden">
            <motion.h1
              variants={headerVariant1}
              initial="initial"
              animate="animate"
              className="font-display font-bold leading-[1.1]"
              style={{ fontSize: "clamp(2.4rem, 10vw, 4.8rem)" }}
            >
              Mukul Academy &amp;
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={headerVariant2}
              initial="initial"
              animate="animate"
              className="font-display font-bold leading-[1.1] text-coral"
              style={{ fontSize: "clamp(2.4rem, 10vw, 4.8rem)" }}
            >
              Sophia Public High School
            </motion.h1>
          </div>
        </div>

        <motion.div
          variants={appear}
          initial="initial"
          animate="animate"
          className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-2 md:mt-5"
        >
          <span
            className="flex items-center gap-2 font-display font-medium tracking-tight text-sky"
            style={{ fontSize: "clamp(1.05rem, 3.4vw, 1.3rem)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M12 3l1.6 5h5.2l-4.2 3.1 1.6 5L12 12.9 7.8 16l1.6-5L5.2 8h5.2L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            best learning
          </span>
          <span
            className="flex items-center gap-2 font-display font-medium tracking-tight text-leaf"
            style={{ fontSize: "clamp(1.05rem, 3.4vw, 1.3rem)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M12 21s-7-4.4-9.5-8.8C.6 8.4 3 4.8 6.6 4.8c2 0 3.4 1.1 5.4 3 2-1.9 3.4-3 5.4-3 3.6 0 6 3.6 4.1 7.4C19 16.6 12 21 12 21z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            best environment
          </span>
        </motion.div>

        {/* ---------- Photo (16:9, full width, no badge/spin) ---------- */}
        <motion.div
          variants={appearImage}
          initial="initial"
          animate="animate"
          className="mt-12 w-full max-w-xl"
        >
          <div ref={photoWrapRef} className="relative">
            <div
              className="relative w-full overflow-hidden shadow-lg"
              style={{ borderRadius: "28px", aspectRatio: "16/9" }}
            >
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
                alt="Students learning together at school"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* ---------- Copy + CTAs ---------- */}
        <motion.div
          variants={appearCopy}
          initial="initial"
          animate="animate"
          className="mt-10 flex flex-col items-center gap-9 text-center"
        >
          <p
            className="max-w-md leading-relaxed text-ink/80"
            style={{ fontSize: "clamp(1rem, 3.6vw, 1.15rem)" }}
          >
            A close-knit school where curiosity is encouraged and every child is known by name.
            <br />
            Small classes, caring teachers, and a campus built for both learning and play.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/about"
              onMouseEnter={() => handleCtaEnter(0)}
              onMouseLeave={() => handleCtaLeave(0)}
              className="group flex items-center gap-2.5 rounded-full bg-coral px-7 py-3.5 font-display text-[0.95rem] font-semibold text-cream shadow-[0_8px_20px_-6px_rgba(255,107,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(255,107,91,0.65)]"
            >
              Explore School
              <svg ref={addCtaRef} width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/contact"
              onMouseEnter={() => handleCtaEnter(1)}
              onMouseLeave={() => handleCtaLeave(1)}
              className="group flex items-center gap-2.5 rounded-full border-2 border-ink px-7 py-3.5 font-display text-[0.95rem] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-cream"
            >
              Contact Us
              <svg ref={addCtaRef} width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}