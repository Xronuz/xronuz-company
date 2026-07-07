"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function Process() {
  const { t, lang } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  const x = useMotionValue(0);
  const barScale = useMotionValue(0);
  const { scrollY } = useScroll();
  const dims = useRef({ total: 0, dist: 0 });

  // expensive layout reads (offsetHeight/scrollWidth) are cached here and only
  // refreshed when the document actually resizes — the per-scroll handler below
  // reads a single clean rect, so scrolling never forces synchronous layout
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    dims.current = {
      total: wrap.offsetHeight - window.innerHeight,
      dist: Math.max(0, track.scrollWidth - track.clientWidth),
    };
  }, []);

  const update = useCallback(() => {
    const wrap = wrapRef.current;
    const { total, dist } = dims.current;
    if (!wrap || total <= 0) return;
    const top = wrap.getBoundingClientRect().top;
    // skip while the stage is far off-screen
    if (top > window.innerHeight * 1.5 || top < -total - window.innerHeight) return;
    const p = Math.min(1, Math.max(0, (-top / total - 0.04) / 0.9));
    x.set(-p * dist);
    barScale.set(p);
  }, [x, barScale]);

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const updateMq = () => setIsDesktop(mq.matches);
    updateMq();
    mq.addEventListener("change", updateMq);
    // body ResizeObserver catches every layout shift above the section
    // (services accordion, language switch, font load), keeping cache fresh
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      mq.removeEventListener("change", updateMq);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, update]);

  // re-measure after language/layout switches settle
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      measure();
      update();
    });
    return () => cancelAnimationFrame(id);
  }, [lang, isDesktop, measure, update]);

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
          <span className="mono-label">04 / {t.process.label}</span>
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
    <div className="process-sticky" id="process" ref={wrapRef} style={{ height: "300vh" }}>
      <div className="process-viewport">
        <div className="section-head" style={{ margin: "0 clamp(20px, 5vw, 72px) 40px" }}>
          <span className="mono-label">04 / {t.process.label}</span>
          <span className="mono-dim">SCROLL →</span>
        </div>
        <h2
          className="section-title"
          style={{ margin: "0 clamp(20px, 5vw, 72px) 48px" }}
        >
          {t.process.title}
        </h2>
        <motion.div className="process-track" ref={trackRef} style={{ x }}>
          {cards}
          <div
            className="process-card"
            style={{
              background: "var(--em)",
              border: "none",
              justifyContent: "center",
            }}
          >
            <h3 style={{ color: "var(--on-em)", margin: 0 }}>
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
