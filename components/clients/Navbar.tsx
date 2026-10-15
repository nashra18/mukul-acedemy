"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, type Easing } from "framer-motion";
import { LuMenu } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import Menu, { SCHOOL_LOGO, SCHOOL_NAME } from "./Menu";
import { display, body } from "@/fonts/fonts";

const ease: Easing = [0.65, 0, 0.35, 1];

const glassBtn =
  "border border-[#0C4A6E]/15 bg-white/30 backdrop-blur-xl transition-colors duration-200 hover:border-[#0EA5E9]/40 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Scroll down -> whole navbar slides up. Scroll up -> it comes back.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (latest > prev && latest > 80) setHidden(true);
    else if (latest < prev) setHidden(false);
  });

  return (
    <div
      className={`${display.variable} ${body.variable}`}
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease }}
        className={`fixed inset-x-0 top-0 z-40 w-full transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-b border-[#BAE6FD]/70 bg-white/70 shadow-[0_6px_24px_-16px_rgba(12,74,110,0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto grid h-[68px] w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:h-[76px] sm:px-8 lg:px-12">
          {/* Left: menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={`flex h-11 items-center gap-2 justify-self-start rounded-full px-3.5 text-sm font-medium text-[#0C4A6E] sm:px-4 ${glassBtn}`}
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            <LuMenu size={19} strokeWidth={1.8} />
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* Center: logo */}
          <a href="/" aria-label={`${SCHOOL_NAME} home`} className="justify-self-center">
            <img
              src={SCHOOL_LOGO}
              alt={`${SCHOOL_NAME} logo`}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-[0_6px_16px_-6px_rgba(12,74,110,0.45)] sm:h-11 sm:w-11"
            />
          </a>

          {/* Right: Let's talk, transparent glass */}
          <a
            href="/contact"
            className={`justify-self-end rounded-full px-4 py-2.5 text-sm font-medium text-[#0C4A6E] sm:px-5 ${glassBtn}`}
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Let&apos;s talk
          </a>
        </nav>
      </motion.header>

      {/* WhatsApp, bottom right */}
      {!menuOpen && (
        <a
          href="https://wa.me/910000000000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-8px_rgba(37,211,102,0.6)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
        >
          <FaWhatsapp size={28} />
        </a>
      )}

      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}