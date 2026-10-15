"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Easing, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  LuX,
  LuChevronDown,
  LuArrowUpRight,
  LuMail,
  LuPhone,
  LuMapPin,
  LuFacebook,
  LuInstagram,
  LuYoutube,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { display, body } from "@/fonts/fonts";

/* Sky-white palette
   #F8FCFF bg · #F0F9FF panel · #E0F2FE sky-100 · #BAE6FD sky-200
   #0EA5E9 accent · #0369A1 sky-700 · #0C4A6E ink
*/

// Dummy logo. Replace with your real school logo later.
export const SCHOOL_LOGO =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=200&auto=format&fit=crop";
export const SCHOOL_NAME = "M&S School";

const CONTACT = {
  email: "info@mukulsophia.edu",
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  address: "School address line, City, State",
};

const SOCIALS: { label: string; href: string; Icon: IconType }[] = [
  { label: "Facebook", href: "https://facebook.com", Icon: LuFacebook },
  { label: "Instagram", href: "https://instagram.com", Icon: LuInstagram },
  { label: "YouTube", href: "https://youtube.com", Icon: LuYoutube },
  { label: "WhatsApp", href: "https://wa.me/910000000000", Icon: FaWhatsapp },
];

type LinkItem = { label: string; href: string };
type NavItem = { key: string; label: string; href: string; children: LinkItem[] };

const NAV: NavItem[] = [
  { key: "home", label: "Home", href: "/", children: [] },
  {
    key: "about",
    label: "About",
    href: "/about",
    children: [
      { label: "History", href: "/about/history" },
      { label: "Vision & Mission", href: "/about/vision" },
      { label: "Co-Curricular Activities", href: "/about/co-curricular" },
      { label: "Infrastructure", href: "/about/infrastructure" },
    ],
  },
  {
    key: "academics",
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum", href: "/academics/curriculum" },
      { label: "Examination Pattern", href: "/academics/examinations" },
      { label: "Results", href: "/academics/results" },
    ],
  },
  {
    key: "admissions",
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Eligibility", href: "/admissions/eligibility" },
      { label: "How to Apply", href: "/admissions/apply" },
      { label: "Fee Structure", href: "/admissions/fees" },
    ],
  },
  { key: "contact", label: "Contact", href: "/contact", children: [] },
];

const primaryEasing: Easing = [0.83, 0, 0.17, 1];
const secondaryEasing: Easing = [0.65, 0, 0.35, 1];

const glass =
  "border border-[#0C4A6E]/15 bg-white/40 backdrop-blur-xl";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.5 + i * 0.05, ease: secondaryEasing },
  }),
};

type Props = {
  readonly menuOpen: boolean;
  readonly setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Menu({ menuOpen, setMenuOpen }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = () => {
    setMenuOpen(false);
    setOpenKey(null);
  };

  // Lock page scroll and close on Escape while open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpenKey(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, setMenuOpen]);

  if (!mounted) return null;

  // Rendered in a portal so nothing on the page (navbar, logo, buttons) can sit above it
  return createPortal(
    <AnimatePresence>
      {menuOpen && (
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          initial={{ scaleY: 0, borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%" }}
          animate={{
            scaleY: 1,
            borderBottomLeftRadius: "0%",
            borderBottomRightRadius: "0%",
            transition: { duration: 0.7, ease: primaryEasing },
          }}
          exit={{
            scaleY: 0,
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            transition: { delay: 0.2, duration: 0.6, ease: primaryEasing },
          }}
          className={`fixed inset-0 z-[9999] origin-top bg-[#F8FCFF] ${display.variable} ${body.variable}`}
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="flex h-full w-full flex-col"
          >
            {/* ---------- Top bar: only the close control ---------- */}
            <div className="mx-auto flex w-full max-w-7xl items-center px-5 py-4 sm:px-8 lg:px-12">
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className={`flex h-11 items-center gap-2 rounded-full px-3.5 text-sm font-medium text-[#0C4A6E] transition-colors duration-200 hover:border-[#0EA5E9]/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] sm:px-4 ${glass}`}
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                <LuX size={18} strokeWidth={1.8} />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* ---------- Body ---------- */}
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto grid min-h-full max-w-7xl gap-10 px-5 pb-10 pt-4 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:gap-0 lg:px-12 lg:pt-0">
                {/* Left: nav + social icons */}
                <div className="flex flex-col justify-center lg:pr-16">
                  <nav aria-label="Primary">
                    <ul className="border-t border-[#BAE6FD]/80">
                      {NAV.map((item, i) => {
                        const isOpen = openKey === item.key;
                        const hasChildren = item.children.length > 0;
                        const rowClass =
                          "group flex w-full items-center justify-between py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] md:py-5";
                        const labelEl = (
                          <span
                            className="font-semibold tracking-tight text-[#0C4A6E] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#0EA5E9]"
                            style={{
                              fontSize: "clamp(1.5rem, 3.6vw, 2.5rem)",
                              fontFamily: "var(--font-display), sans-serif",
                            }}
                          >
                            {item.label}
                          </span>
                        );

                        return (
                          <motion.li
                            key={item.key}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate="show"
                            className="border-b border-[#BAE6FD]/80"
                          >
                            {hasChildren ? (
                              <button
                                type="button"
                                aria-expanded={isOpen}
                                onClick={() => setOpenKey(isOpen ? null : item.key)}
                                className={rowClass}
                              >
                                {labelEl}
                                <motion.span
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3, ease: secondaryEasing }}
                                  className="text-[#0369A1]"
                                >
                                  <LuChevronDown size={22} strokeWidth={1.6} />
                                </motion.span>
                              </button>
                            ) : (
                              <a href={item.href} onClick={close} className={rowClass}>
                                {labelEl}
                                <LuArrowUpRight
                                  size={20}
                                  strokeWidth={1.6}
                                  className="text-[#0369A1] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                />
                              </a>
                            )}

                            <AnimatePresence initial={false}>
                              {isOpen && hasChildren && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: secondaryEasing }}
                                  className="overflow-hidden"
                                >
                                  <li className="mb-5 ml-1 border-l border-[#BAE6FD] pl-5">
                                    {item.children.map((child) => (
                                      <a
                                        key={child.href}
                                        href={child.href}
                                        onClick={close}
                                        className="block py-1.5 text-[0.95rem] text-[#0C4A6E]/70 transition-colors duration-200 hover:text-[#0EA5E9]"
                                      >
                                        {child.label}
                                      </a>
                                    ))}
                                  </li>
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>

                  {/* Social icons only, below the links */}
                  <motion.div
                    custom={NAV.length}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    className="mt-7 flex items-center gap-3"
                  >
                    {SOCIALS.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0C4A6E]/15 text-[#0C4A6E] transition-colors duration-200 hover:border-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                      >
                        <Icon size={17} />
                      </a>
                    ))}
                  </motion.div>
                </div>

                {/* Right: contact panel */}
                <motion.aside
                  custom={NAV.length + 1}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col justify-center border-t border-[#BAE6FD]/80 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"
                >
                  <h2
                    className="text-lg font-semibold text-[#0C4A6E]"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    Get in touch
                  </h2>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#0C4A6E]/65">
                    For admissions, campus visits or any question, write or call us. Our office team
                    will get back to you.
                  </p>

                  <ul className="mt-6 flex flex-col gap-4 text-[0.95rem]">
                    <li>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="flex items-center gap-3 text-[#0C4A6E] transition-colors hover:text-[#0EA5E9]"
                      >
                        <LuMail size={18} strokeWidth={1.6} className="text-[#0369A1]" />
                        {CONTACT.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={CONTACT.phoneHref}
                        className="flex items-center gap-3 text-[#0C4A6E] transition-colors hover:text-[#0EA5E9]"
                      >
                        <LuPhone size={18} strokeWidth={1.6} className="text-[#0369A1]" />
                        {CONTACT.phone}
                      </a>
                    </li>
                    <li className="flex items-start gap-3 text-[#0C4A6E]">
                      <LuMapPin size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[#0369A1]" />
                      {CONTACT.address}
                    </li>
                  </ul>
                </motion.aside>
              </div>
            </div>

            {/* ---------- Footer ---------- */}
            <div className="border-t border-[#BAE6FD]/80 px-5 py-4 sm:px-8 lg:px-12">
              <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-[#0C4A6E]/60 sm:flex-row">
                <span>
                  &copy; {new Date().getFullYear()} {SCHOOL_NAME}. All rights reserved.
                </span>
                <div className="flex items-center gap-5">
                  <a href="/terms" onClick={close} className="transition-colors hover:text-[#0EA5E9]">
                    Terms &amp; Conditions
                  </a>
                  <a href="/privacy" onClick={close} className="transition-colors hover:text-[#0EA5E9]">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>,
    document.body
  );
}