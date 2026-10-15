"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Poppins, Inter } from "next/font/google";
import { LuSprout, LuHeart, LuSparkles } from "react-icons/lu";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

const display = Poppins({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });

/* Mobile (<640px): 3 cards, absolutely placed so they overlap as a big fan.
   sm and up: normal flex row with 5 cards. */
const CARDS = [
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    alt: "Students playing sports",
    cls: "hidden sm:block sm:-rotate-[12deg] sm:mt-8 lg:mt-10 z-[1] sm:h-[22vw] sm:w-[16vw] lg:h-[17vw] lg:w-[12.5vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop",
    alt: "Students in the library",
    cls: "absolute left-[-5vw] top-[14vw] -rotate-[8deg] z-[2] h-[52vw] w-[38vw] sm:static sm:left-auto sm:top-auto sm:-rotate-[6deg] sm:mt-5 sm:-ml-[3vw] sm:h-[28vw] sm:w-[20vw] lg:h-[20vw] lg:w-[14.5vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
    alt: "Students in a classroom",
    cls: "absolute left-[16vw] top-0 rotate-0 z-[5] h-[80vw] w-[58vw] sm:static sm:left-auto sm:top-auto sm:-mt-2 sm:-ml-[3vw] sm:h-[35vw] sm:w-[25vw] lg:h-[25vw] lg:w-[17.5vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    alt: "Science lab session",
    cls: "absolute left-[57vw] top-[14vw] rotate-[8deg] z-[2] h-[52vw] w-[38vw] sm:static sm:left-auto sm:top-auto sm:rotate-[6deg] sm:mt-5 sm:-ml-[3vw] sm:h-[28vw] sm:w-[20vw] lg:h-[20vw] lg:w-[14.5vw]",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    alt: "Teacher guiding a student",
    cls: "hidden sm:block sm:rotate-[12deg] sm:mt-8 lg:mt-10 sm:-ml-[3vw] z-[1] sm:h-[22vw] sm:w-[16vw] lg:h-[17vw] lg:w-[12.5vw]",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const labelsRef = useRef(null);
  const stickerRef = useRef(null);
  const ctaIconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll(".motion-card__card");
      cards.forEach((card) => {
        let lastX = 0, lastY = 0, speedX = 0, speedY = 0;
        const startRotation = gsap.getProperty(card, "rotation");
        const startX = gsap.getProperty(card, "x");
        const startY = gsap.getProperty(card, "y");

        const onMove = (e) => {
          speedX = e.clientX - lastX;
          speedY = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
        };
        const onEnter = (e) => {
          speedX = 0; speedY = 0;
          lastX = e.clientX; lastY = e.clientY;
        };
        const onLeave = () => {
          gsap.to(card, {
            inertia: {
              x: { velocity: speedX * 20, end: startX },
              y: { velocity: speedY * 20, end: startY },
              rotation: { velocity: speedX * 1.5, end: startRotation },
            },
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });

      const labels = document.querySelectorAll(".motion-card__floating-label");
      labels.forEach((label) => {
        let lastX = 0, lastY = 0, speedX = 0, speedY = 0;
        const startRotation = gsap.getProperty(label, "rotation");
        const startX = gsap.getProperty(label, "x");
        const startY = gsap.getProperty(label, "y");

        const onMove = (e) => {
          speedX = e.clientX - lastX;
          speedY = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
        };
        const onEnter = (e) => {
          speedX = 0; speedY = 0;
          lastX = e.clientX; lastY = e.clientY;
        };
        const onLeave = () => {
          gsap.to(label, {
            inertia: {
              x: { velocity: speedX * 25, end: startX },
              y: { velocity: speedY * 25, end: startY },
              rotation: { velocity: speedX * 2, end: startRotation },
            },
          });
        };

        label.addEventListener("mousemove", onMove);
        label.addEventListener("mouseenter", onEnter);
        label.addEventListener("mouseleave", onLeave);
      });

      if (stickerRef.current) {
        gsap.set(stickerRef.current, { scale: 0, opacity: 0, rotation: -30 });
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }).to(stickerRef.current, {
          scale: 1, opacity: 1, rotation: 0, duration: 1.7, ease: "elastic.out(1, 0.4)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaEnter = () => {
    if (ctaIconRef.current) gsap.to(ctaIconRef.current, { x: 3, duration: 0.25, ease: "back.out(3)" });
  };
  const handleCtaLeave = () => {
    if (ctaIconRef.current) gsap.to(ctaIconRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section
      ref={sectionRef}
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#F8FCFF] to-white px-[5vw] pb-12 pt-14 text-center sm:min-h-screen sm:pb-16 sm:pt-24 md:pt-28 ${display.variable} ${body.variable}`}
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      {/* ---------- Title + Description ---------- */}
      <div className="relative mx-auto mb-6 w-full max-w-2xl sm:mb-12 md:mb-16">
        <h2
          className="relative inline-block font-bold leading-[1.2] tracking-tight text-[#0C4A6E]"
          style={{ fontSize: "clamp(1.35rem, 5vw, 3rem)", fontFamily: "var(--font-display), sans-serif" }}
        >
          where little dreams learn to fly.
          <span
            ref={stickerRef}
            className="pointer-events-none absolute -right-4 -top-2 inline-block h-4 w-4 rotate-[-10deg] sm:-right-7 sm:-top-3 sm:h-6 sm:w-6 md:-right-9 md:h-8 md:w-8"
          >
            <svg viewBox="0 0 48 48" fill="none" stroke="#0EA5E9" strokeWidth="2.2">
              <path d="M24 4l4.5 14H43l-11.7 8.6L35.8 40 24 31.4 12.2 40l4.5-13.4L5 18h14.5L24 4z" strokeLinejoin="round" />
            </svg>
          </span>
        </h2>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 634 28"
          fill="none"
          className="mx-auto mt-2 block h-auto w-full max-w-[100px] text-[#38BDF8] sm:mt-3 sm:max-w-[220px]"
        >
          <path
            d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p
          className="mx-auto mt-3 max-w-[560px] font-normal leading-[1.6] tracking-[-0.1px] text-[#0C4A6E]/70 sm:mt-6"
          style={{ fontSize: "clamp(0.8rem, 1.6vw, 1.15rem)" }}
        >
          Every morning, a small hand holds a big dream. Here, teachers become
          guides, friends become family, and every lesson, on the field, in the
          lab, in the library, teaches your child to believe in themselves.
        </p>
      </div>

      {/* soft sky blobs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vw] -translate-x-[116.5%] translate-y-[45%] sm:h-[30vw]">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <path
            fill="#BAE6FD"
            opacity="0.35"
            d="M320 90c40 42 55 108 30 165-25 56-88 92-150 88s-118-46-138-102c-19-56 3-124 52-160 49-37 118-45 160-25 14 7 30 15 46 34z"
          />
        </svg>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[48vw] translate-x-[60%] -translate-y-[10%] sm:h-[24vw]">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <path
            fill="#E0F2FE"
            opacity="0.6"
            d="M320 90c40 42 55 108 30 165-25 56-88 92-150 88s-118-46-138-102c-19-56 3-124 52-160 49-37 118-45 160-25 14 7 30 15 46 34z"
          />
        </svg>
      </div>

      {/* ---------- Cards ---------- */}
      <div
        ref={cardsRef}
        className="relative z-[2] mx-auto flex h-[88vw] w-full flex-nowrap items-center justify-center sm:h-auto"
      >
        {CARDS.map((c) => (
          <div
            key={c.alt}
            className={`motion-card__card flex-shrink-0 overflow-clip rounded-xl border-[3px] border-white shadow-[0_10px_30px_rgba(12,74,110,0.2)] sm:relative sm:rounded-2xl sm:border-[5px] ${c.cls}`}
          >
            <div className="h-full w-full overflow-hidden rounded-lg">
              <img
                src={c.src}
                loading="lazy"
                width={1000}
                height={1000}
                alt={c.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}

        <div ref={labelsRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full">
          <div className="motion-card__floating-label pointer-events-auto absolute left-[32%] top-[2%] text-gray-500 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full rounded-bl-none bg-white px-2.5 py-[0.2rem] shadow-lg sm:px-3.5 sm:py-[0.3rem] md:left-[26%] md:top-[14%]">
            <p
              className="pointer-events-none m-0 flex items-center gap-1 font-medium text-white sm:gap-1.5"
              style={{ fontSize: "clamp(0.62rem, 1.4vw, 1rem)" }}
            >
              <LuSprout className="shrink-0" size={13} />
              discipline builds confidence
            </p>
          </div>
          <div className="motion-card__floating-label pointer-events-auto absolute left-[66%] top-[97%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full rounded-bl-none bg-white px-2.5 py-[0.2rem] shadow-lg sm:px-3.5 sm:py-[0.3rem] md:left-[74%] md:top-[88%]">
            <p
              className="pointer-events-none m-0 flex items-center gap-1 font-medium text-[#0C4A6E] sm:gap-1.5"
              style={{ fontSize: "clamp(0.62rem, 1.4vw, 1rem)" }}
            >
              <LuHeart className="shrink-0 text-[#0EA5E9]" size={13} />
              every child, known by name
            </p>
          </div>
          <div className="motion-card__floating-label pointer-events-auto absolute left-[80%] top-[10%] hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full rounded-bl-none bg-[#E0F2FE] px-3.5 py-[0.3rem] shadow-lg md:left-[76%] md:top-[12%] md:block">
            <p
              className="pointer-events-none m-0 flex items-center gap-1.5 font-medium text-[#0C4A6E]"
              style={{ fontSize: "clamp(0.7rem, 1.4vw, 1rem)" }}
            >
              <LuSparkles className="shrink-0 text-[#0EA5E9]" size={16} />
              dreams start here
            </p>
          </div>
        </div>
      </div>

      {/* ---------- CTA ---------- */}
      <div className="relative z-[5] mx-auto mt-8 flex flex-col items-center sm:mt-12 md:mt-16">
        <a
          href="/about"
          onMouseEnter={handleCtaEnter}
          onMouseLeave={handleCtaLeave}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_10px_24px_-6px_rgba(14,165,233,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-6px_rgba(14,165,233,0.75)] sm:gap-2.5 sm:px-8 sm:py-4 sm:text-[0.95rem]"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          Come, meet our family
          <svg ref={ctaIconRef} width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}