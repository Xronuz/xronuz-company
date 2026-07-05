"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";

const EmeraldScene = dynamic(() => import("./three/EmeraldScene"), {
  ssr: false,
});

const EASE = [0.16, 1, 0.3, 1] as const;
const BASE_DELAY = 1.9; // after preloader

export default function Hero() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-canvas" style={{ y: yCanvas }}>
        <EmeraldScene />
      </motion.div>

      <div className="hero-chrome mono-dim">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: BASE_DELAY + 0.5, duration: 0.8 }}
        >
          [ 41.2995° N — 69.2401° E ]
        </motion.span>
        <motion.span
          className="chrome-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: BASE_DELAY + 0.6, duration: 0.8 }}
        >
          AI / WEB / MOBILE / CLOUD — EST. 2021
        </motion.span>
      </div>

      <motion.div className="hero-body" style={{ y: yTitle, opacity }}>
        <motion.p
          className="mono-label"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: BASE_DELAY, duration: 0.7, ease: EASE }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="hero-title" key={lang}>
          <span className="row">
            <motion.span
              className="row-inner"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{ delay: BASE_DELAY + 0.08, duration: 1, ease: EASE }}
            >
              {t.hero.l1}
              <span className="hero-star" aria-hidden="true">✦</span>
            </motion.span>
          </span>
          <span className="row">
            <motion.span
              className="row-inner"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{ delay: BASE_DELAY + 0.2, duration: 1, ease: EASE }}
            >
              <span className="outline-text">{t.hero.l2}</span>
            </motion.span>
          </span>
        </h1>

        <div className="hero-bottom">
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE_DELAY + 0.45, duration: 0.8, ease: EASE }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE_DELAY + 0.55, duration: 0.8, ease: EASE }}
          >
            <a href="#contact" className="btn-solid">
              <span>{t.hero.cta1}</span>
              <span aria-hidden="true">→</span>
            </a>
            <a href="#services" className="btn-line">
              <span>{t.hero.cta2}</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: BASE_DELAY + 0.75, duration: 0.9 }}
        >
          {t.hero.stats.map((s) => (
            <div key={s.l}>
              <div className="hstat-v">{s.v}</div>
              <div className="hstat-l">{s.l}</div>
            </div>
          ))}
          <div style={{ marginLeft: "auto", alignSelf: "center" }}>
            <div className="scroll-cue">
              <span className="mono-dim">{t.hero.scroll}</span>
              <span className="scroll-cue-line" aria-hidden="true"></span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
