"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CTA() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section className="section cta" id="contact" ref={ref}>
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-rings" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <span className="mono-label">04 / {t.cta.label}</span>

      <h2 className="cta-title" key={lang}>
        <span className="row">
          <motion.span
            className="row-inner"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            {t.cta.title1}
          </motion.span>
        </span>
        <span className="row">
          <motion.span
            className="row-inner outline-text"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
          >
            {t.cta.title2}
          </motion.span>
        </span>
      </h2>

      <motion.p
        className="cta-sub"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
      >
        {t.cta.sub}
      </motion.p>

      <motion.div
        className="cta-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
      >
        <a href="mailto:hello@xronuz.uz" className="btn-solid">
          <span>{t.cta.btn}</span>
          <span aria-hidden="true">→</span>
        </a>
        <a
          href="https://t.me/xronuz"
          target="_blank"
          rel="noopener"
          className="btn-line"
        >
          <span>Telegram</span>
        </a>
      </motion.div>
    </section>
  );
}
