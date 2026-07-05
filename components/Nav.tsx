"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang, LANGS } from "@/lib/i18n";

const SECTION_IDS = ["#services", "#manifesto", "#process", "#contact"];

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="nav">
        <a href="#top" className="nav-logo" onClick={() => setOpen(false)}>
          Xronuz<span className="dot">.</span>
        </a>
        <div className="nav-right">
          <div className="nav-langs">
            {LANGS.map((l) => (
              <button
                key={l}
                className={`nav-lang ${lang === l ? "active" : ""}`}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className={`menu-btn ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <span>{open ? t.nav.close : t.nav.menu}</span>
            <span className="menu-btn-lines" aria-hidden="true">
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
          >
            <div className="menu-grid">
              <div className="menu-links">
                {t.nav.links.map((label, i) => (
                  <motion.div
                    key={`${label}-${i}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.25 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      className="menu-link"
                      href={SECTION_IDS[i]}
                      onClick={() => setOpen(false)}
                    >
                      <span className="menu-link-num">0{i + 1}</span>
                      <span className="menu-link-text">{label}</span>
                      <span className="menu-link-arrow">→</span>
                    </a>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="menu-aside"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="menu-aside-block">
                  <h4 className="mono-label">{t.menu.contact}</h4>
                  <a href="mailto:hello@xronuz.uz">hello@xronuz.uz</a>
                  <a href="https://t.me/xronuz" target="_blank" rel="noopener">
                    t.me/xronuz
                  </a>
                  <p>Tashkent, Uzbekistan</p>
                </div>
                <div className="menu-aside-block">
                  <h4 className="mono-label">{t.menu.language}</h4>
                  <div className="menu-langs">
                    {LANGS.map((l) => (
                      <button
                        key={l}
                        className={`menu-lang ${lang === l ? "active" : ""}`}
                        onClick={() => setLang(l)}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
