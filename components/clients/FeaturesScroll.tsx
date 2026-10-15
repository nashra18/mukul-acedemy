"use client";
import { motion } from "framer-motion";

const features = [
  {
    title: "35+ Years of Legacy",
    desc: "Trusted by generations of families",
    color: "#D9A441",
    icon: (
      <path d="M24 4l4.5 14H43l-11.7 8.6L35.8 40 24 31.4 12.2 40l4.5-13.4L5 18h14.5L24 4z" strokeLinejoin="round" />
    ),
  },
  {
    title: "Experienced Faculty",
    desc: "Qualified teachers who truly care",
    color: "#145C77",
    icon: (
      <>
        <path d="M24 6L4 15l20 9 20-9-20-9z" strokeLinejoin="round" />
        <path d="M13 19v9c0 3 5 6 11 6s11-3 11-6v-9" strokeLinecap="round" />
        <path d="M40 16v10" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Safe & Secure Campus",
    desc: "CCTV monitored, gated premises",
    color: "#4E9B6F",
    icon: (
      <path d="M24 5l16 6v9c0 10-7 17.5-16 21-9-3.5-16-11-16-21v-9l16-6z" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: "Smart Classrooms",
    desc: "Digital learning, every subject",
    color: "#2E86AB",
    icon: (
      <>
        <rect x="6" y="10" width="36" height="23" rx="3" strokeLinejoin="round" />
        <path d="M17 41h14M24 33v8" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Holistic Development",
    desc: "Academics, sports & arts together",
    color: "#C75C5C",
    icon: <circle cx="24" cy="24" r="16" />,
  },
  {
    title: "Proven Results",
    desc: "Consistent top board performance",
    color: "#7B6FA6",
    icon: <path d="M8 40V24M18 40V14M28 40V20M38 40V8" strokeLinecap="round" />,
  },
  {
    title: "Value-Based Education",
    desc: "Discipline, ethics & confidence",
    color: "#145C77",
    icon: (
      <path d="M24 41S6 30.4 6 17.8C6 11.8 10.6 7 16.4 7c3.4 0 6.4 1.7 7.6 4.3C25.2 8.7 28.2 7 31.6 7 37.4 7 42 11.8 42 17.8 42 30.4 24 41 24 41z" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: "Modern Labs & Library",
    desc: "Well-equipped for hands-on learning",
    color: "#D9A441",
    icon: (
      <>
        <path d="M18 6h12M20 6v10l-9 18a4 4 0 003.6 5.8h18.8a4 4 0 003.6-5.8L28 16V6" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M15.5 30h17" strokeLinecap="round" />
      </>
    ),
  },
];

export default function FeaturesScroll() {
  const track = [...features, ...features];

  return (
    <section
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden font-body"
      style={{
        background: "#F5F7FA",
        // "--heading": "#12283F",
        // "--muted": "#5B6B7D",
        // "--primary": "#145C77",
      }}
    >
      <div className="relative z-10 mb-12 max-w-xl px-6 text-center">
        <h2
          className="font-display font-bold leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)", color: "var(--heading)" }}
        >
          Why families choose us
        </h2>
        <p className="mt-3 text-base" style={{ color: "var(--muted)" }}>
          A campus built on trust, care, and steady results — year after year.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F5F7FA] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F5F7FA] to-transparent" />

      <motion.div
        className="flex w-max gap-5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, i) => (
          <div
            key={i}
            className="group flex w-80 shrink-0 items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-[0_3px_10px_-4px_rgba(18,40,63,0.1)] transition-shadow duration-300 hover:shadow-[0_8px_20px_-6px_rgba(18,40,63,0.16)]"
            style={{ border: "1px solid rgba(18,40,63,0.08)" }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${item.color}1A` }}
            >
              <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke={item.color} strokeWidth="2.2">
                {item.icon}
              </svg>
            </div>
            <div className="min-w-0">
              <h3
                className="truncate font-display font-semibold leading-tight"
                style={{ fontSize: "1rem", color: "var(--heading)" }}
              >
                {item.title}
              </h3>
              <p className="truncate text-[0.85rem] leading-tight" style={{ color: "var(--muted)" }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}