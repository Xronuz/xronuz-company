"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useLang } from "@/lib/i18n";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const color = useTransform(
    progress,
    [range[0], range[1]],
    ["oklch(30% 0.03 168)", "oklch(96% 0.008 160)"]
  );
  return (
    <motion.span className="w" style={{ opacity, color }}>
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = t.about.manifesto.split(" ");

  return (
    <section className="section" id="manifesto">
      <div className="section-head">
        <span className="mono-label">02 / {t.about.label}</span>
        <span className="mono-dim">XRONUZ — {new Date().getFullYear()}</span>
      </div>
      <div className="manifesto" ref={ref} key={lang}>
        <p className="manifesto-text">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
