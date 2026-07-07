"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang, LANGS } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const SECTION_IDS = ["#services", "#projects", "#manifesto", "#process", "#contact"];

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    // sun — switch to light
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.4" />
      <path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" />
    </svg>
  ) : (
    // moon — switch to dark
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" />
    </svg>
  );
}

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const { theme, toggle, setTheme } = useTheme();
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
          <button
            className="nav-theme"
            onClick={toggle}
            aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            <ThemeIcon dark={theme === "dark"} />
          </button>
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
                <div className="menu-aside-block">
                  <h4 className="mono-label">{t.menu.theme}</h4>
                  <div className="menu-langs">
                    {(["dark", "light"] as const).map((m) => (
                      <button
                        key={m}
                        className={`menu-lang ${theme === m ? "active" : ""}`}
                        onClick={() => setTheme(m)}
                      >
                        {m === "dark" ? "DARK" : "LIGHT"}
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
