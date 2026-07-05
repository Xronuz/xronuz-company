# Xronuz — Landing Page

**Engineering the Future.** IT & AI kompaniyasi uchun uch tilli (UZ / EN / RU) cinematic landing sahifa.

## Stack

- **Next.js 15** (App Router, static export) + **React 19** + **TypeScript**
- **Three.js / React Three Fiber** — hero'dagi interaktiv 3D partikl sferasi
- **Framer Motion** — kinetik tipografika, seksiya reveal'lari, horizontal scroll
- **Lenis** — butter-smooth scrolling
- OKLCH emerald palitra, film grain, custom cursor, fullscreen menyu

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build (static)

```bash
npm run build    # natija: out/ papkasi
```

`out/` papkasini istalgan static hostingga (Vercel, Netlify, Cloudflare Pages, oddiy nginx) yuklash mumkin.

## Tarkib

- Matnlar: `lib/i18n.tsx` (uz / en / ru lug'atlari)
- Kontaktlar (almashtirish kerak): `hello@xronuz.uz`, `t.me/xronuz`, LinkedIn/GitHub havolalari
- Statistika raqamlari: `lib/i18n.tsx` → `hero.stats`
