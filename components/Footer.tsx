"use client";

import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="nav-logo" style={{ mixBlendMode: "normal" }}>
            Xronuz<span className="dot">.</span>
          </span>
          <p>{t.footer.desc}</p>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h4 className="mono-label">{t.footer.nav}</h4>
            {t.nav.links.map((label, i) => (
              <a key={label} href={["#services", "#projects", "#manifesto", "#process", "#contact"][i]}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <h4 className="mono-label">{t.footer.contacts}</h4>
            <a href="mailto:hello@xronuz.uz">hello@xronuz.uz</a>
            <a href="https://t.me/xronuz" target="_blank" rel="noopener">Telegram</a>
            <a href="https://linkedin.com/company/xronuz" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://github.com/xronuz" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>

      <div className="footer-giant" aria-hidden="true">
        Xronuz
      </div>

      <div className="footer-bottom">
        <span className="mono-dim">© 2026 XRONUZ — {t.footer.rights}</span>
        <span className="mono-dim">41.2995° N — 69.2401° E</span>
        <a href="#top" className="mono-dim" style={{ color: "var(--em)" }}>
          {t.footer.top} ↑
        </a>
      </div>
    </footer>
  );
}
