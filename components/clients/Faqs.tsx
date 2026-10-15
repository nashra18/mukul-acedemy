"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Montserrat, Open_Sans, Playfair_Display } from "next/font/google";
import { ArrowUpRight, Plus } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Theme (same as Hero)                                               */
/*  cream  #F6F0E5   white #FFFFFF   gold #C9A24A                      */
/*  sage  #6B7F6B   ink  #252525                                       */
/* ------------------------------------------------------------------ */

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

const faqs = [
  {
    q: "Which classes does Mukul Academy offer?",
    a: "We teach children from the early years through the primary and middle classes. Each class is kept small, so every child gets personal attention from the teacher.",
  },
  {
    q: "How do I apply for admission?",
    a: "Visit the school office or use the Contact us button on our home page. Fill in the admission form, submit the required documents, and our team will guide you through the next steps.",
  },
  {
    q: "What is the age requirement for each class?",
    a: "The age requirement depends on the class your child is joining. Please contact the school office and we will confirm the exact cut-off for the current session.",
  },
  {
    q: "Which school is the academy affiliated to?",
    a: "Mukul Academy is affiliated to Sophia Public High School. The curriculum follows the same standards, so children move on smoothly to higher classes.",
  },
  {
    q: "What are the school timings?",
    a: "School timings change slightly between summer and winter. The office will share the current timetable when you enquire or at the time of admission.",
  },
  {
    q: "Can parents meet the teachers?",
    a: "Yes. We hold regular parent–teacher meetings, and you are welcome to book a time with a class teacher whenever you want to discuss your child's progress.",
  },
  {
    q: "How do you keep children safe at school?",
    a: "Children are supervised by staff throughout the school day, and only parents or guardians listed with the office can collect a child at dismissal.",
  },
  {
    q: "What do children do besides regular lessons?",
    a: "Alongside classroom learning we make room for art, storytelling, games and group activities, so children grow in confidence as well as in knowledge.",
  },
];

export default function Faqs() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  });

  return (
    <section
      id="faqs"
      className={`${montserrat.variable} ${openSans.variable} ${playfair.variable} relative isolate w-full overflow-hidden bg-[#F6F0E5] text-[#252525]`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-[#C9A24A]/10 blur-3xl"
      />

      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-[8%] lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-24">
          {/* ------------------- Title + description + button ------------------- */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp(0)}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2.4rem,9.5vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.03em] lg:text-[clamp(2.8rem,4.4vw,4.2rem)]">
              <span className="block text-[#252525]">Questions parents</span>
              <span className="block italic text-[#C9A24A]">often ask.</span>
            </h2>

            <span className="mt-8 block h-px w-12 bg-[#C9A24A]" aria-hidden />

            <p className="mt-8 max-w-[420px] font-[family-name:var(--font-open-sans)] text-[15px] leading-[1.9] text-[#252525]/80 sm:text-[16px]">
              Everything you may want to know about admissions, classes and
              daily life at Mukul Academy, answered in one place.
            </p>

            <p className="mt-4 font-[family-name:var(--font-montserrat)] text-[12px] font-medium text-[#6B7F6B]">
              Affiliated to Sophia Public High School
            </p>

            {/* Button: same style as the hero's primary CTA.
                Colors are inline so global `a {}` CSS can't hide the text. */}
            <div className="mt-10 flex flex-col items-start gap-4">
              <motion.a
                href="#contact"
                initial={{ backgroundColor: "#C9A24A", color: "#252525" }}
                whileHover={{
                  y: reduce ? 0 : -1,
                  backgroundColor: "#252525",
                  color: "#FFFFFF",
                }}
                whileTap={{ scale: reduce ? 1 : 0.97 }}
                transition={{ duration: 0.2 }}
                style={{ textDecoration: "none" }}
                className="inline-flex h-11 items-center gap-2 rounded-full px-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7F6B]"
              >
                <span
                  style={{ color: "inherit", lineHeight: 1 }}
                  className="font-[family-name:var(--font-montserrat)] text-[13px] font-semibold sm:text-[14px]"
                >
                  Ask us a question
                </span>
                <ArrowUpRight size={15} color="currentColor" aria-hidden />
              </motion.a>

              <span className="font-[family-name:var(--font-open-sans)] text-[13px] text-[#252525]/70">
                Can&apos;t find your answer? We reply quickly.
              </span>
            </div>
          </motion.div>

          {/* --------------------- FAQ list (dashed between) --------------------- */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp(0.15)}
            className="divide-y divide-dashed divide-[#C9A24A] rounded-[28px] bg-white/70 px-6 py-3 ring-1 ring-[#C9A24A]/25 backdrop-blur-sm sm:px-10 sm:py-4"
          >
            {faqs.map((item, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;

              return (
                <li key={item.q}>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{ background: "transparent", color: "#252525" }}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7F6B] sm:py-8"
                  >
                    <span className="font-[family-name:var(--font-playfair)] text-[18px] leading-[1.35] sm:text-[22px]">
                      {item.q}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-[#C9A24A]/50 transition-colors duration-300 group-hover:bg-[#C9A24A] sm:h-10 sm:w-10 ${
                        isOpen ? "bg-[#C9A24A]" : "bg-white"
                      }`}
                      aria-hidden
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          duration: reduce ? 0 : 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex"
                      >
                        <Plus
                          className={`h-[17px] w-[17px] transition-colors duration-300 group-hover:text-[#252525] ${
                            isOpen ? "text-[#252525]" : "text-[#6B7F6B]"
                          }`}
                        />
                      </motion.span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reduce ? 0 : 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[600px] pb-8 pr-12 font-[family-name:var(--font-open-sans)] text-[15px] leading-[1.9] text-[#252525]/80 sm:text-[16px]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}