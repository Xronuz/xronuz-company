"use client";

import { useLang } from "@/lib/i18n";

export default function Marquee() {
  const { t } = useLang();
  const names = t.services.items.map((s) => s.title);

  const strip = (
    <div className="marquee-item" aria-hidden="true">
      {names.map((n) => (
        <span key={n} style={{ display: "inline-flex", alignItems: "center", gap: 48 }}>
          {n} <span className="sep">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-band">
      <div className="marquee-track">
        {strip}
        {strip}
      </div>
    </div>
  );
}
