"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { motion, type Variants } from "framer-motion";
import { Poppins, Inter } from "next/font/google";
import { LuGraduationCap, LuLaptop, LuBrush, LuMegaphone } from "react-icons/lu";

const display = Poppins({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });

/* Sky-white palette
   bg       #F8FCFF
   sky-100  #E0F2FE
   sky-200  #BAE6FD
   sky-400  #38BDF8
   sky-500  #0EA5E9  (accent / CTA)
   sky-900  #0C4A6E  (ink)
*/

// Tilt applies only from md and up. On phones the images stay straight.
const expertise = [
  {
    number: "01",
    tag: "Academics",
    title: "Learning that stays with them",
    para: "Small batches, patient teachers, and regular check-ins, so every concept is truly understood and not just memorized for the exam.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    alt: "Students focused on studying in a classroom",
    Icon: LuGraduationCap,
    tilt: "md:-rotate-[3deg]",
  },
  {
    number: "02",
    tag: "Digital Studies",
    title: "Ready for tomorrow, without fear",
    para: "Smart classrooms and guided computer labs that help your child meet technology with curiosity and confidence, from the very first day.",
    img: "https://images.unsplash.com/photo-1584697964403-9b25f5b83e5c?q=80&w=1200&auto=format&fit=crop",
    alt: "Students working on computers",
    Icon: LuLaptop,
    tilt: "md:rotate-[3deg]",
  },
  {
    number: "03",
    tag: "Art & Activities",
    title: "A safe place to imagine",
    para: "Drawing, craft, and creative sessions woven into every week, so each child can dream out loud and express who they are.",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    alt: "Children drawing and doing art activities",
    Icon: LuBrush,
    tilt: "md:-rotate-[3deg]",
  },
  {
    number: "04",
    tag: "Public Speaking",
    title: "From quiet whispers to brave voices",
    para: "Debates, assemblies, and presentation practice that help shy children find their voice and stand tall in front of everyone.",
    img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop",
    alt: "Student speaking in front of a class",
    Icon: LuMegaphone,
    tilt: "md:rotate-[3deg]",
  },
];

const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] as const },
  },
};

const rowVariant = (i: number): Variants => ({
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.05 * i, ease: [0.65, 0, 0.35, 1] as const },
  },
});

export default function AreasOfExpertise() {
  const ctaIconRef = useRef(null);

  const handleCtaEnter = () => {
    if (ctaIconRef.current) gsap.to(ctaIconRef.current, { x: 3, duration: 0.25, ease: "back.out(3)" });
  };
  const handleCtaLeave = () => {
    if (ctaIconRef.current) gsap.to(ctaIconRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section
      className={`relative w-full overflow-hidden bg-gradient-to-b from-white via-[#F8FCFF] to-white px-[6vw] pb-[20vw] pt-[20vw] md:pb-28 md:pt-28 ${display.variable} ${body.variable}`}
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      {/* soft sky blobs */}
      <div className="pointer-events-none absolute -left-[10vw] top-[30%] z-0 h-[60vw] opacity-40 md:h-[40vw]">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <path
            fill="#BAE6FD"
            d="M320 90c40 42 55 108 30 165-25 56-88 92-150 88s-118-46-138-102c-19-56 3-124 52-160 49-37 118-45 160-25 14 7 30 15 46 34z"
          />
        </svg>
      </div>
      <div className="pointer-events-none absolute -right-[10vw] bottom-[10%] z-0 h-[50vw] opacity-60 md:h-[34vw]">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <path
            fill="#E0F2FE"
            d="M320 90c40 42 55 108 30 165-25 56-88 92-150 88s-118-46-138-102c-19-56 3-124 52-160 49-37 118-45 160-25 14 7 30 15 46 34z"
          />
        </svg>
      </div>

      {/* ---------- Heading ---------- */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-[2] mx-auto max-w-3xl text-center"
      >
        <span className="mb-4 inline-block rounded-full bg-[#E0F2FE] px-4 py-1.5 text-xs font-medium tracking-wide text-[#0369A1] sm:text-sm">
          What we nurture
        </span>
        <h2
          className="font-bold leading-[1.15] tracking-tight text-[#0C4A6E]"
          style={{ fontSize: "clamp(1.8rem, 6vw, 3.5rem)", fontFamily: "var(--font-display), sans-serif" }}
        >
          Four pillars, one beautiful childhood.
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl leading-relaxed text-[#0C4A6E]/70 sm:mt-5"
          style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}
        >
          Strong academics, digital confidence, creative expression, and the
          courage to speak up. Everything we teach grows from these four.
        </p>
      </motion.div>

      {/* ---------- Rows: image left, description right ---------- */}
      <div className="relative z-[2] mx-auto mt-[14vw] flex max-w-5xl flex-col gap-[20vw] md:mt-20 md:gap-24">
        {expertise.map((item, i) => (
          <motion.div
            key={i}
            variants={rowVariant(i)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="grid items-center gap-7 md:grid-cols-2 md:gap-14"
          >
            {/* Image (left) */}
            <div
              className={`overflow-hidden rounded-2xl border-[4px] border-white shadow-[0_12px_36px_rgba(12,74,110,0.18)] transition-transform duration-500 md:border-[6px] md:hover:rotate-0 ${item.tilt}`}
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={item.img}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Text (right) */}
            <div className="text-left">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E0F2FE] text-[#0EA5E9] ring-1 ring-[#BAE6FD] md:h-12 md:w-12">
                  <item.Icon size={22} strokeWidth={1.8} />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#0369A1]">
                  {item.number} · {item.tag}
                </span>
              </div>
              <h3
                className="font-semibold leading-snug text-[#0C4A6E]"
                style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.9rem)", fontFamily: "var(--font-display), sans-serif" }}
              >
                {item.title}
              </h3>
              <p
                className="mt-3 max-w-md leading-relaxed text-[#0C4A6E]/70"
                style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.08rem)" }}
              >
                {item.para}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------- CTA ---------- */}
      <div className="relative z-[2] mt-[16vw] flex justify-center md:mt-24">
        <a
          href="/about"
          onMouseEnter={handleCtaEnter}
          onMouseLeave={handleCtaLeave}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(14,165,233,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-6px_rgba(14,165,233,0.75)] sm:gap-2.5 sm:px-8 sm:py-4 sm:text-[0.95rem]"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          See how we teach
          <svg ref={ctaIconRef} width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}