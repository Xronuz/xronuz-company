"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function Services() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="section" id="services">
      <div className="section-head">
        <span className="mono-label">01 / {t.services.label}</span>
        <span className="mono-dim">{t.services.hint}</span>
      </div>
      <h2 className="section-title" style={{ marginBottom: "clamp(40px, 6vw, 80px)" }}>
        {t.services.title}
      </h2>

      <div>
        {t.services.items.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={item.title} className={`svc-row ${open ? "open" : ""}`}>
              <div className="svc-fill" aria-hidden="true" />
              <button
                className="svc-head"
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
              >
                <span className="svc-num">0{i + 1}</span>
                <span className="svc-title">{item.title}</span>
                <span className="svc-icon" aria-hidden="true">
                  {open ? "×" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    className="svc-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="svc-body-inner">
                      <span />
                      <div>
                        <p className="svc-desc">{item.desc}</p>
                        <div className="svc-tags">
                          {item.tags.map((tag) => (
                            <span key={tag} className="svc-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
