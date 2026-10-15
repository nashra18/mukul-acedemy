"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Montserrat, Open_Sans, Playfair_Display } from "next/font/google";
import { ArrowLeft, ArrowRight } from "lucide-react";



const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});


const achievements = [
  {
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=85&w=1200&auto=format&fit=crop",
    title: "37+ years of trusted teaching",
    desc: "Families across generations have trusted us with their children since our very first day.",
  },
  {
    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=85&w=1200&auto=format&fit=crop",
    title: "10,000+ students nurtured",
    desc: "From a nervous first day in class to a confident step into the world.",
  },
  {
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=85&w=1200&auto=format&fit=crop",
    title: "Rated 4.5/5 by parents",
    desc: "Parents rate our sessions highly and keep coming back, year after year.",
  },
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=85&w=1200&auto=format&fit=crop",
    title: "Affiliated to Sophia Public High School",
    desc: "A strong academic partnership that lets our children move on to higher classes smoothly.",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=85&w=1200&auto=format&fit=crop",
    title: "Smart classrooms in every class",
    desc: "Digital learning tools in each classroom, so lessons are seen as well as heard.",
  },
  {
    img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=85&w=1200&auto=format&fit=crop",
    title: "Best school award in the district",
    desc: "Recognised for strong teaching, discipline and care for every child.",
  },
  {
    img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=85&w=1200&auto=format&fit=crop",
    title: "A safe, clean and green campus",
    desc: "Supervised grounds, tree plantation drives and a spotless school every day.",
  },
  {
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=85&w=1200&auto=format&fit=crop",
    title: "Annual scholarships for children",
    desc: "Every year we support deserving children so that no dream stops at the school gate.",
  },
  {
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=85&w=1200&auto=format&fit=crop",
    title: "A dedicated, trained teaching team",
    desc: "Teachers who attend regular training and stay back until every child understands.",
  },
  {
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=85&w=1200&auto=format&fit=crop",
    title: "A library and learning corner",
    desc: "A quiet, well-stocked space where reading becomes a habit and curiosity grows.",
  },
];

export default function Achievements() {
  const reduce = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  });

  const updateArrows = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const slide = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 32 : 360;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const arrowBase =
    "flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7F6B] disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:!bg-[#C9A24A] hover:enabled:!text-[#252525]";

  return (
    <section
      id="achievements"
      className={`${montserrat.variable} ${openSans.variable} ${playfair.variable} relative w-full overflow-hidden bg-white text-[#252525]`}
    >
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-[8%] lg:py-36">
        {/* ------------------- Title + description (centered) ------------------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp(0)}
          className="mx-auto flex max-w-[1100px]  flex-col items-center text-center"
        >
          {/* Title: one line on desktop. Highlighted phrase in gold. */}
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,8.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#252525] sm:text-[clamp(2.4rem,5vw,3.2rem)] lg:whitespace-nowrap lg:text-[clamp(2rem,3.4vw,3.4rem)]">
            Every milestone began as{" "}
            <span className="font-normal italic text-[#C9A24A]">
              a small dream.
            </span>
          </h2>

          {/* Description: small, sans, softer. Highlighted phrase in sage. */}
          <p className="mx-auto mt-7 max-w-[560px] font-[family-name:var(--font-open-sans)] text-[14px] font-normal leading-[1.9] text-[#252525]/65 sm:text-[15px]">
            Thirty-seven years ago this school opened its doors with a handful
            of children and a very big hope. Every award, every classroom and
            every grown-up child on this page is proof of what patience and
            love can build.{" "}
            <span className="font-semibold text-[#6B7F6B]">
              This is everything we have achieved together.
            </span>
          </p>
        </motion.div>

        <div className="mt-12 flex items-center justify-end gap-3 sm:mt-14">
          <button
            type="button"
            onClick={() => slide(-1)}
            disabled={!canPrev}
            aria-label="Previous achievements"
            style={{ backgroundColor: "#6B7F6B", color: "#FFFFFF" }}
            className={arrowBase}
          >
            <ArrowLeft size={18} color="currentColor" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => slide(1)}
            disabled={!canNext}
            aria-label="Next achievements"
            style={{ backgroundColor: "#6B7F6B", color: "#FFFFFF" }}
            className={arrowBase}
          >
            <ArrowRight size={18} color="currentColor" aria-hidden />
          </button>
        </div>

        <div
          ref={scroller}
          onScroll={updateArrows}
          tabIndex={0}
          aria-label="School achievements slider"
          className="mt-6 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6B7F6B] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="contents">
            {achievements.map((item) => (
              <li
                key={item.title}
                className="group flex w-[82%] shrink-0 snap-start flex-col text-center sm:w-[400px]"
              >
                {/* Image (cream box shows if an image fails to load) */}
                <div className="overflow-hidden rounded-[24px] bg-[#F6F0E5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Title: Playfair, semibold, sage, larger */}
                <h3 className="mt-7 font-[family-name:var(--font-playfair)] text-[22px] font-semibold leading-[1.3] text-[#6B7F6B] sm:text-[24px]">
                  {item.title}
                </h3>

                {/* Description: Open Sans, regular, smaller, ink */}
                <p className="mt-3 flex-1 font-[family-name:var(--font-open-sans)] text-[13px] font-normal leading-[1.85] text-[#252525]/65 sm:text-[14px]">
                  {item.desc}
                </p>

                {/* Line below: fully gold, same level on every card */}
                <div className="mt-7 h-px w-full shrink-0 bg-[#C9A24A]" aria-hidden />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}