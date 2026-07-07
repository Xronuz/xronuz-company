"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useLang } from "@/lib/i18n";
import { StoredProject, toProjectItem } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

function Cover({ idx, name }: { idx: number; name?: string }) {
  return (
    <>
      <div className="pcover-art" aria-hidden="true" />
      {name && <span className="pcover-name">{name}</span>}
      <span className="pcover-num">0{idx + 1}</span>
    </>
  );
}

export default function Projects() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const [stored, setStored] = useState<StoredProject[] | null>(null);

  // admin-managed list; falls back to the built-in dictionary items
  useEffect(() => {
    let on = true;
    fetch("/api/projects", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (on && Array.isArray(d) && d.length) setStored(d);
      })
      .catch(() => {});
    return () => {
      on = false;
    };
  }, []);

  const items = stored
    ? stored.map((p) => toProjectItem(p, lang))
    : t.projects.items;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 280, damping: 28, mass: 0.6 });
  const py = useSpring(my, { stiffness: 280, damping: 28, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <section className="section" id="projects">
      <div className="section-head">
        <span className="mono-label">02 / {t.projects.label}</span>
        <span className="mono-dim">{t.projects.hint}</span>
      </div>
      <h2 className="section-title" style={{ marginBottom: "clamp(40px, 6vw, 80px)" }}>
        {t.projects.title}
      </h2>

      <div
        className="projects-list"
        key={lang}
        onMouseMove={onMove}
        onMouseLeave={() => setActive(null)}
      >
        {items.map((p, i) => (
          <motion.article
            key={`${p.name}-${i}`}
            className="proj-row"
            onMouseEnter={() => setActive(i)}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 + (i % 3) * 0.07 }}
          >
            <div className={`pcover pcover-${(i % 5) + 1} proj-cover-inline`} aria-hidden="true">
              <Cover idx={i} />
            </div>
            <span className="proj-num">0{i + 1}</span>
            <div className="proj-main">
              <h3 className="proj-name">{p.name}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="proj-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="proj-meta">
              <span className="proj-cat">{p.cat}</span>
              <span className="proj-year">{p.year}</span>
              <span className="proj-stat">
                <b>{p.stat.v}</b>
                {p.stat.l}
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="projects-cta"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      >
        <a href="#contact" className="btn-line">
          <span>{t.projects.all}</span>
          <span aria-hidden="true">→</span>
        </a>
      </motion.div>

      {/* cursor-follow preview — fine pointers only */}
      <motion.div className="proj-preview" style={{ x: px, y: py }} aria-hidden="true">
        <AnimatePresence mode="popLayout">
          {active !== null && items[active] && (
            <motion.div
              key={active}
              className={`pcover pcover-${(active % 5) + 1}`}
              initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.88, rotate: 3 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <Cover idx={active} name={items[active].name} />
              <span className="pcover-view">{t.projects.view} →</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
