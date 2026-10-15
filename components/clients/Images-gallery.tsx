"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600"] });

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
}

// 6 same-size photos, sourced from Unsplash — 3 per column
const images: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    alt: "Mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    alt: "Forest road",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    alt: "Foggy hills",
  },
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
    alt: "Mountain peak",
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    alt: "Green valley",
  },
  {
    src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    alt: "Sunlit peaks",
  },
];

const leftImages = [images[0], images[2], images[4]];
const rightImages = [images[1], images[3], images[5]];

// First text: always visible, completely static, no animation of any kind.
const baseLines = ["Every frame tells", "a quiet story."];
// Second text: appears below the first once the later images scroll into view.
const extraLines = ["Held together by", "light and patience."];

export default function Imagesgallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<1 | 2>(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only a small vertical parallax difference between the two columns —
      // no horizontal movement at all, kept subtle, and runs the same way
      // on every screen size (nothing here is behind a breakpoint check).
      gsap.to(colLeftRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(colRightRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Tracks scroll progress only, to reveal the second text block below the first.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setStage(self.progress > 0.55 ? 2 : 1);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-neutral-950 ${montserrat.className}`}
    >
      {/* Same 3-column layout at every screen size — nothing switches to a
          different structure on mobile, so the animation behaves identically. */}
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-start gap-3 px-3 sm:gap-8 sm:px-6">
        {/* Left column - vertical scroll only, no left/right drift */}
        <div
          ref={colLeftRef}
          className="flex flex-col gap-4 justify-self-end py-16 sm:gap-8"
        >
          {leftImages.map((img) => (
            <ImageCard key={img.src} image={img} />
          ))}
        </div>

        {/* Center text - sticky and fixed on screen the whole time, at every breakpoint */}
        <div className="sticky top-0 flex h-screen w-[110px] flex-col items-center justify-center gap-2 text-center sm:w-[220px] md:w-[300px]">
          {/* First text: static, no animation/effect of any kind, never moves */}
          <div className="flex flex-col gap-1">
            {baseLines.map((line) => (
              <p
                key={line}
                className="text-sm font-medium leading-snug text-white sm:text-xl md:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Second text: reserved space always exists, so it never shifts the
              first text when it fades in — only opacity/position change, the
              layout never reflows. */}
          <div className="flex h-14 flex-col justify-start gap-1 sm:h-16 md:h-20">
            <motion.div
              animate={{ opacity: stage === 2 ? 1 : 0, y: stage === 2 ? 0 : 12 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-1"
            >
              {extraLines.map((line) => (
                <p
                  key={line}
                  className="text-sm font-medium leading-snug text-white/80 sm:text-xl md:text-2xl"
                >
                  {line}
                </p>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right column - vertical scroll only, subtler drift than left */}
        <div
          ref={colRightRef}
          className="flex flex-col gap-4 justify-self-start py-16 sm:gap-8"
        >
          {rightImages.map((img) => (
            <ImageCard key={img.src} image={img} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageCard({ image }: { image: GalleryImage }) {
  return (
    <div className="h-[30vw] w-[30vw] overflow-hidden rounded-2xl shadow-2xl sm:h-[220px] sm:w-[220px] md:h-[300px] md:w-[300px]">
      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
    </div>
  );
}