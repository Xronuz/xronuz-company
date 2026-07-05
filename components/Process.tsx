"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function Process() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-58%"]);
  const barScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  const cards = t.process.steps.map((step, i) => (
    <div key={step.t} className="process-card">
      <span className="process-num">
        0{i + 1} / 0{t.process.steps.length}
      </span>
      <h3>{step.t}</h3>
      <p>{step.d}</p>
    </div>
  ));

  if (!isDesktop) {
    return (
      <section className="section" id="process">
        <div className="section-head">
          <span className="mono-label">03 / {t.process.label}</span>
        </div>
        <h2 className="section-title" style={{ marginBottom: 48 }}>
          {t.process.title}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {cards}
        </div>
      </section>
    );
  }

  return (
    <div className="process-sticky" id="process" ref={ref} style={{ height: "300vh" }}>
      <div className="process-viewport">
        <div className="section-head" style={{ margin: "0 clamp(20px, 5vw, 72px) 40px" }}>
          <span className="mono-label">03 / {t.process.label}</span>
          <span className="mono-dim">SCROLL →</span>
        </div>
        <h2
          className="section-title"
          style={{ margin: "0 clamp(20px, 5vw, 72px) 48px" }}
        >
          {t.process.title}
        </h2>
        <motion.div className="process-track" style={{ x }}>
          {cards}
          <div
            className="process-card"
            style={{
              background: "var(--em)",
              border: "none",
              justifyContent: "center",
            }}
          >
            <h3 style={{ color: "oklch(14% 0.035 170)", margin: 0 }}>
              {t.cta.title1} {t.cta.title2} →
            </h3>
          </div>
        </motion.div>
        <div className="process-bar">
          <motion.div className="process-bar-fill" style={{ scaleX: barScale }} />
        </div>
      </div>
    </div>
  );
}
