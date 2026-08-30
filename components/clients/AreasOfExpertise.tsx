"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { motion, type Variants } from "framer-motion";
import { Poppins, Inter } from "next/font/google";

const display = Poppins({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });

const expertise = [
  {
    number: "01.",
    title: "Best Study Practices",
    para: "Structured lessons, small batch sizes, and regular assessments so every concept is understood, not just memorized.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    alt: "Students focused on studying in a classroom",
  },
  {
    number: "02.",
    title: "Digital Studies",
    para: "Smart classrooms, computer labs, and guided digital literacy so students grow comfortable with technology early on.",
    img: "https://images.unsplash.com/photo-1584697964403-9b25f5b83e5c?q=80&w=1200&auto=format&fit=crop",
    alt: "Students working on computers",
  },
  {
    number: "03.",
    title: "Activities & Drawing",
    para: "Art, craft, and creative sessions built into the week, giving every child space to imagine and express freely.",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    alt: "Children drawing and doing art activities",
  },
  {
    number: "04.",
    title: "Self-Improvement & Public Speaking",
    para: "Debates, assemblies, and presentation practice that build confidence to think on their feet and speak up.",
    img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop",
    alt: "Student speaking in front of a class",
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
      className={`relative w-full bg-cream px-[6vw] pb-20 pt-[30vw] md:pb-24 md:pt-[18vw] ${display.variable} ${body.variable} font-body`}
    >
      {/* ---------- Heading ---------- */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2
          className="font-display font-bold leading-[1.1] tracking-tight text-ink"
          style={{ fontSize: "clamp(2.4rem, 6.5vw, 4.5rem)" }}
        >
          Our Areas of Expertise
        </h2>
        <p
          className="mx-auto mt-5 max-w-xl leading-relaxed text-ink/70"
          style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)" }}
        >
          Four pillars shape everything we teach — strong academics, digital
          confidence, creative expression, and the self-belief to speak up
          and lead.
        </p>
      </motion.div>

      {/* ---------- Divided list ---------- */}
      <div className="mx-auto mt-16 max-w-3xl md:mt-20">
        {expertise.map((item, i) => (
          <motion.div
            key={i}
            variants={rowVariant(i)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.25 }}
            className="border-t py-10 first:border-t md:py-12"
            style={{ borderColor: "rgba(58,46,34,0.15)" }}
          >
            <h3 className="flex items-baseline gap-2 font-display font-semibold leading-snug text-ink">
              <span className="text-coral" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)" }}>
                {item.number}
              </span>
              <span style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)" }}>{item.title}</span>
            </h3>
            <p
              className="mt-3 max-w-xl leading-relaxed text-ink/70"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.1rem)" }}
            >
              {item.para}
            </p>
            <div
              className="mt-5 w-full max-w-md overflow-hidden rounded-xl"
              style={{ aspectRatio: "16/9", border: "1px solid rgba(58,46,34,0.15)" }}
            >
              <img
                src={item.img}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        ))}
        <div className="border-t" style={{ borderColor: "rgba(58,46,34,0.15)" }} />
      </div>

      {/* ---------- CTA ---------- */}
      <div className="mt-14 flex justify-center md:mt-16">
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