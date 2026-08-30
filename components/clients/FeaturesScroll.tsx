"use client";
import { motion } from "framer-motion";
const features = [
  {
    title: "35+ Years of Legacy",
    desc: "Trusted by generations of families",
    icon: (
      <path d="M24 4l4.5 14H43l-11.7 8.6L35.8 40 24 31.4 12.2 40l4.5-13.4L5 18h14.5L24 4z" strokeLinejoin="round" />
    ),
  },
  {
    title: "Experienced Faculty",
    desc: "Qualified teachers who truly care",
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
    icon: (
      <path d="M24 5l16 6v9c0 10-7 17.5-16 21-9-3.5-16-11-16-21v-9l16-6z" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: "Smart Classrooms",
    desc: "Digital learning, every subject",
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
    icon: <circle cx="24" cy="24" r="16" />,
  },
  {
    title: "Proven Results",
    desc: "Consistent top board performance",
    icon: (
      <path d="M8 40V24M18 40V14M28 40V20M38 40V8" strokeLinecap="round" />
    ),
  },
  {
    title: "Value-Based Education",
    desc: "Discipline, ethics & confidence",
    icon: (
      <path d="M24 41S6 30.4 6 17.8C6 11.8 10.6 7 16.4 7c3.4 0 6.4 1.7 7.6 4.3C25.2 8.7 28.2 7 31.6 7 37.4 7 42 11.8 42 17.8 42 30.4 24 41 24 41z" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: "Modern Labs & Library",
    desc: "Well-equipped for hands-on learning",
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
    <div className="relative w-full overflow-hidden bg-cream py-10 font-body">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent" />
      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, i) => (
          <div
            key={i}
            className="group flex shrink-0 w-80 items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-[0_3px_10px_-4px_rgba(58,46,34,0.1)] transition-shadow duration-300 hover:shadow-[0_8px_20px_-6px_rgba(58,46,34,0.16)]"
            style={{ border: "1px solid rgba(58,46,34,0.1)" }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: "rgba(58,46,34,0.06)" }}
            >
              <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="#3A2E22" strokeWidth="2.2">
                {item.icon}
              </svg>
            </div>
            <div className="min-w-0">
              <h3
                className="font-display font-semibold text-[1rem] leading-tight truncate"
                style={{ color: "#3A2E22" }}
              >
                {item.title}
              </h3>
              <p className="text-[0.85rem] leading-tight truncate" style={{ color: "rgba(58,46,34,0.6)" }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}