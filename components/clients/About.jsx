"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Poppins, Inter } from "next/font/google";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

const display = Poppins({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });

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
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cream px-[5vw] pb-16 pt-24 text-center font-body md:pt-28 ${display.variable} ${body.variable}`}
    >
      {/* ---------- Heading ---------- */}
      <div className="relative mx-auto mb-10 w-full max-w-2xl md:mb-12">
        <h2
          className="mb-1 font-display font-bold leading-[1.15] tracking-tight text-ink"
          style={{ fontSize: "clamp(1.9rem, 4.6vw, 3rem)" }}
        >
          a school built for the future.
        </h2>
        <p
          className="relative inline-block font-serif italic font-light leading-snug tracking-tight text-coral"
          style={{ fontSize: "clamp(1.3rem, 3.2vw, 1.9rem)" }}
        >
          from classroom to community.
          <span
            ref={stickerRef}
            className="pointer-events-none absolute -right-6 -top-2 inline-block h-6 w-6 rotate-[-10deg] md:-right-7 md:h-7 md:w-7"
          >
            <svg viewBox="0 0 48 48" fill="none" stroke="#FF6B5B" strokeWidth="2.2">
              <path d="M24 4l4.5 14H43l-11.7 8.6L35.8 40 24 31.4 12.2 40l4.5-13.4L5 18h14.5L24 4z" strokeLinejoin="round" />
            </svg>
          </span>
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 634 28"
          fill="none"
          className="mx-auto mt-4 block h-auto w-full max-w-[220px] text-coral"
        >
          <path
            d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* hand-drawn blob */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[30vw] -translate-x-[116.5%] translate-y-[45%]">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <path
            fill="#FFC93C"
            opacity="0.3"
            d="M320 90c40 42 55 108 30 165-25 56-88 92-150 88s-118-46-138-102c-19-56 3-124 52-160 49-37 118-45 160-25 14 7 30 15 46 34z"
          />
        </svg>
      </div>

      {/* ---------- Cards ---------- */}
      <div
        ref={cardsRef}
        className="relative z-[2] mx-auto flex w-full flex-nowrap items-center justify-center gap-4 md:gap-3 lg:gap-2"
      >
        <div className="motion-card__card relative z-[1] h-[38vw] w-[26vw] flex-shrink-0 -rotate-6 overflow-clip rounded-xl border border-ink/10 shadow-[0_8px_30px_rgba(58,46,34,0.18)] md:h-[24vw] md:w-[17vw] lg:h-[20vw] lg:w-[15vw]">
          <div className="h-full w-full overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop"
              loading="lazy"
              width={1000}
              height={1000}
              alt="Students in a classroom"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="motion-card__card relative bottom-[-0.8rem] z-[2] h-[38vw] w-[26vw] flex-shrink-0 rotate-6 overflow-clip rounded-xl border border-ink/10 shadow-[0_8px_30px_rgba(58,46,34,0.18)] md:h-[24vw] md:w-[17vw] lg:bottom-[-1.2rem] lg:h-[20vw] lg:w-[15vw]">
          <div className="h-full w-full overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop"
              loading="lazy"
              width={1000}
              height={1000}
              alt="Students in the library"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="motion-card__card relative bottom-[-0.8rem] z-[3] hidden h-[38vw] w-[26vw] flex-shrink-0 rotate-6 overflow-clip rounded-xl border border-ink/10 shadow-[0_8px_30px_rgba(58,46,34,0.18)] sm:block md:h-[24vw] md:w-[17vw] lg:bottom-[-1.2rem] lg:h-[20vw] lg:w-[15vw]">
          <div className="h-full w-full overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"
              loading="lazy"
              width={1000}
              height={1000}
              alt="Students playing sports"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="motion-card__card relative z-[4] hidden h-[24vw] w-[17vw] flex-shrink-0 rotate-[4deg] overflow-clip rounded-xl border border-ink/10 shadow-[0_8px_30px_rgba(58,46,34,0.18)] md:block lg:h-[20vw] lg:w-[15vw]">
          <div className="h-full w-full overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
              loading="lazy"
              width={1000}
              height={1000}
              alt="Science lab session"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div ref={labelsRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full">
          <div className="motion-card__floating-label pointer-events-auto absolute left-[25%] top-[20%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full rounded-bl-none bg-[#FFC93C] px-3 py-[0.2rem] md:left-[30%] md:top-[31%]">
            <p className="pointer-events-none m-0 font-body font-medium text-ink" style={{ fontSize: "clamp(0.7rem, 1.4vw, 1rem)" }}>
              discipline builds confidence
            </p>
          </div>
          <div className="motion-card__floating-label pointer-events-auto absolute left-[65%] top-[75%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full rounded-bl-none bg-leaf px-3 py-[0.2rem] md:left-[48%] md:top-[69%]">
            <p className="pointer-events-none m-0 font-body font-medium text-ink" style={{ fontSize: "clamp(0.7rem, 1.4vw, 1rem)" }}>
              every child, known by name
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Footer text + CTA ---------- */}
      <div className="relative z-[5] mx-auto mt-10 flex max-w-[600px] flex-col items-center gap-6 px-[2vw] text-center md:mt-12 md:px-0">
        <p
          className="font-body font-normal leading-[1.7] tracking-[-0.2px] text-ink/75"
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
        >
          A close-knit campus where academics, sports, and values grow side by side.
          From smart classrooms to well-equipped labs, we build a foundation strong
          enough for every child to carry forward with confidence.
        </p>

        <a
          href="/about"
          onMouseEnter={handleCtaEnter}
          onMouseLeave={handleCtaLeave}
          className="group flex items-center gap-2.5 rounded-full bg-coral px-7 py-3.5 font-display text-[0.95rem] font-semibold text-cream shadow-[0_8px_20px_-6px_rgba(255,107,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(255,107,91,0.65)]"
        >
          Know More
          <svg ref={ctaIconRef} width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}