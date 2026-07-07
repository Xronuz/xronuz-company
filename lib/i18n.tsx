"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "uz" | "en" | "ru";

export interface ServiceItem {
  title: string;
  desc: string;
  tags: string[];
}

export interface ProjectItem {
  name: string;
  cat: string;
  year: string;
  desc: string;
  stat: { v: string; l: string };
  tags: string[];
}

export interface Dict {
  metaTitle: string;
  nav: { menu: string; close: string; links: [string, string, string, string, string]; cta: string };
  menu: { contact: string; language: string; socials: string; theme: string };
  hero: {
    eyebrow: string;
    l1: string;
    l2: string;
    sub: string;
    cta1: string;
    cta2: string;
    scroll: string;
    stats: { v: string; l: string }[];
  };
  services: { label: string; title: string; hint: string; items: ServiceItem[] };
  projects: { label: string; title: string; hint: string; view: string; all: string; items: ProjectItem[] };
  about: { label: string; manifesto: string };
  process: { label: string; title: string; steps: { t: string; d: string }[] };
  cta: { label: string; title1: string; title2: string; sub: string; btn: string };
  footer: { desc: string; nav: string; contacts: string; rights: string; top: string };
}

const uz: Dict = {
  metaTitle: "Xronuz — Kelajakni yaratamiz | IT & AI",
  nav: {
    menu: "Menyu",
    close: "Yopish",
    links: ["Xizmatlar", "Loyihalar", "Manifest", "Jarayon", "Aloqa"],
    cta: "Loyihani boshlash",
  },
  menu: { contact: "Aloqa", language: "Til", socials: "Ijtimoiy tarmoqlar", theme: "Rejim" },
  hero: {
    eyebrow: "IT & AI STUDIO — TOSHKENT",
    l1: "Kelajakni",
    l2: "yaratamiz",
    sub: "Xronuz — sun'iy intellekt, raqamli platformalar va korporativ tizimlarni loyihalash bo'yicha muhandislik studiyasi.",
    cta1: "Loyihani boshlash",
    cta2: "Xizmatlar",
    scroll: "Pastga",
    stats: [
      { v: "50+", l: "Loyiha" },
      { v: "30+", l: "Mijoz" },
      { v: "5+", l: "Yil tajriba" },
    ],
  },
  services: {
    label: "Xizmatlar",
    title: "Nima qilamiz",
    hint: "Kengaytirish uchun bosing",
    items: [
      { title: "AI yechimlari", desc: "Machine learning modellari, LLM-integratsiyalar, aqlli chatbotlar va biznes jarayonlarini avtomatlashtirish. Ma'lumotlaringizni raqobat ustunligiga aylantiramiz.", tags: ["LLM", "Computer Vision", "Avtomatlashtirish"] },
      { title: "Veb-dasturlash", desc: "Yuqori yuklamaga chidamli platformalar, real-time ilovalar va murakkab veb-tizimlar. Millisekundlar ham biz uchun muhim.", tags: ["Next.js", "Real-time", "Highload"] },
      { title: "Mobil ilovalar", desc: "iOS va Android uchun native sifatdagi ilovalar. App Store va Google Play'da yuqori bahoga loyiq mahsulotlar.", tags: ["iOS", "Android", "Cross-platform"] },
      { title: "ERP & CRM tizimlari", desc: "Kompaniyangiz jarayonlarini yagona tizimga birlashtiruvchi korporativ yechimlar. Xaos o'rniga — aniqlik.", tags: ["Integratsiya", "Analitika", "B2B"] },
      { title: "UI/UX dizayn", desc: "Tadqiqotga asoslangan, konversiyani oshiruvchi va esda qoladigan interfeyslar. Dizayn — bu ko'rinish emas, ishlash usuli.", tags: ["Product Design", "Design System", "Motion"] },
      { title: "Cloud & DevOps", desc: "Avtomatlashtirilgan infratuzilma, CI/CD va 99.9% uptime. Mahsulotingiz har qanday yuklamada barqaror ishlaydi.", tags: ["AWS", "Kubernetes", "CI/CD"] },
      { title: "Kiberxavfsizlik", desc: "Xavfsizlik auditi, penetration testing va raqamli aktivlarni himoya qilish. Xavf yuzaga kelishidan oldin bartaraf etamiz.", tags: ["Pentest", "Audit", "Himoya"] },
      { title: "IT konsalting", desc: "Texnologik strategiya, arxitektura tanlash va raqamli transformatsiya bo'yicha ekspert maslahatlar.", tags: ["Strategiya", "Arxitektura", "Audit"] },
    ],
  },
  projects: {
    label: "Loyihalar",
    title: "Bizning loyihalarimiz",
    hint: "Tanlangan ishlar · 2023 — 2025",
    view: "Loyihani ko'rish",
    all: "Keyingisi — sizning loyihangiz",
    items: [
      { name: "Zamin AI", cat: "AI platforma", year: "2025", desc: "Banklar uchun o'zbek tilida so'zlashuvchi AI yordamchi. RAG arxitekturasi, ovozli qo'ng'iroqlar va CRM integratsiyasi — operatorlar yuki 40% ga kamaydi.", stat: { v: "1.2M", l: "so'rov / oy" }, tags: ["LLM", "RAG", "Fintech"] },
      { name: "Orzu Market", cat: "E-commerce", year: "2024", desc: "Kuniga yuz minglab buyurtmani ko'taradigan highload marketplace. Real-time qidiruv, aqlli tavsiyalar va 300 ms dan tez ochiladigan sahifalar.", stat: { v: "500K+", l: "faol xaridor" }, tags: ["Next.js", "Highload", "Payments"] },
      { name: "Shifo24", cat: "HealthTech", year: "2024", desc: "Telemeditsina platformasi: video-konsultatsiyalar, elektron retseptlar va navbatsiz shifokor qabuli — barchasi bitta ilovada.", stat: { v: "200+", l: "klinika" }, tags: ["Mobile", "WebRTC", "Telemed"] },
      { name: "Sarbon TMS", cat: "Logistika", year: "2023", desc: "Yuk tashish kompaniyalari uchun boshqaruv tizimi: GPS-monitoring, AI asosida marshrut optimizatsiyasi va avtomatik hujjat aylanmasi.", stat: { v: "8K+", l: "transport birligi" }, tags: ["ERP", "GPS", "AI Routing"] },
      { name: "Bilim+", cat: "EdTech", year: "2023", desc: "Maktab va o'quv markazlari uchun LMS: interaktiv darslar, ota-onalar uchun hisobotlar va gamifikatsiyalangan testlar.", stat: { v: "120K", l: "o'quvchi" }, tags: ["LMS", "Mobile", "Gamification"] },
    ],
  },
  about: {
    label: "Manifest",
    manifesto: "Biz trendlarga ergashmaymiz. Ularni belgilaydigan texnologiyani quramiz — O'zbekistonda dunyo uchun yaratilgan AI tizimlar, raqamli platformalar va infratuzilma.",
  },
  process: {
    label: "Jarayon",
    title: "Qanday ishlaymiz",
    steps: [
      { t: "Tahlil", d: "Biznesingiz va foydalanuvchilarni chuqur o'rganamiz. To'g'ri savollar — to'g'ri yechimning yarmi." },
      { t: "Dizayn", d: "Prototip va interfeys kontseptsiyalari. Kod yozilishidan oldin mahsulot jonlanadi." },
      { t: "Dasturlash", d: "Agile sprintlar, toza kod va haftalik demolar. Jarayon to'liq shaffof." },
      { t: "Ishga tushirish", d: "Deploy, monitoring va uzluksiz rivojlantirish. Launch — bu boshlanish xolos." },
    ],
  },
  cta: {
    label: "Aloqa",
    title1: "Imkonsizni",
    title2: "birga quraylik",
    sub: "Loyihangiz haqida yozing — 24 soat ichida javob beramiz.",
    btn: "Loyihani boshlash",
  },
  footer: {
    desc: "IT va AI muhandislik studiyasi. Toshkent, O'zbekiston.",
    nav: "Navigatsiya",
    contacts: "Aloqa",
    rights: "Barcha huquqlar himoyalangan.",
    top: "Tepaga",
  },
};

const en: Dict = {
  metaTitle: "Xronuz — Engineering the Future | IT & AI",
  nav: {
    menu: "Menu",
    close: "Close",
    links: ["Services", "Projects", "Manifesto", "Process", "Contact"],
    cta: "Start a project",
  },
  menu: { contact: "Contact", language: "Language", socials: "Socials", theme: "Theme" },
  hero: {
    eyebrow: "IT & AI STUDIO — TASHKENT",
    l1: "Engineering",
    l2: "the future",
    sub: "Xronuz is an engineering studio crafting artificial intelligence, digital platforms and enterprise systems.",
    cta1: "Start a project",
    cta2: "Services",
    scroll: "Scroll",
    stats: [
      { v: "50+", l: "Projects" },
      { v: "30+", l: "Clients" },
      { v: "5+", l: "Years" },
    ],
  },
  services: {
    label: "Services",
    title: "What we do",
    hint: "Click to expand",
    items: [
      { title: "AI Solutions", desc: "Machine learning models, LLM integrations, intelligent chatbots and business process automation. We turn your data into a competitive edge.", tags: ["LLM", "Computer Vision", "Automation"] },
      { title: "Web Development", desc: "High-load platforms, real-time applications and complex web systems. Milliseconds matter to us.", tags: ["Next.js", "Real-time", "Highload"] },
      { title: "Mobile Apps", desc: "Native-quality applications for iOS and Android. Products worthy of top ratings on the App Store and Google Play.", tags: ["iOS", "Android", "Cross-platform"] },
      { title: "ERP & CRM Systems", desc: "Enterprise solutions that unify your company's processes into one system. Clarity instead of chaos.", tags: ["Integration", "Analytics", "B2B"] },
      { title: "UI/UX Design", desc: "Research-driven, conversion-focused and memorable interfaces. Design is not how it looks — it's how it works.", tags: ["Product Design", "Design System", "Motion"] },
      { title: "Cloud & DevOps", desc: "Automated infrastructure, CI/CD and 99.9% uptime. Your product stays stable under any load.", tags: ["AWS", "Kubernetes", "CI/CD"] },
      { title: "Cybersecurity", desc: "Security audits, penetration testing and digital asset protection. We eliminate threats before they materialize.", tags: ["Pentest", "Audit", "Defense"] },
      { title: "IT Consulting", desc: "Technology strategy, architecture decisions and expert guidance through digital transformation.", tags: ["Strategy", "Architecture", "Audit"] },
    ],
  },
  projects: {
    label: "Projects",
    title: "Selected works",
    hint: "Featured case studies · 2023 — 2025",
    view: "View case",
    all: "Yours could be next",
    items: [
      { name: "Zamin AI", cat: "AI Platform", year: "2025", desc: "An Uzbek-speaking AI assistant for banks. RAG architecture, voice calls and CRM integration — operator workload cut by 40%.", stat: { v: "1.2M", l: "requests / mo" }, tags: ["LLM", "RAG", "Fintech"] },
      { name: "Orzu Market", cat: "E-commerce", year: "2024", desc: "A high-load marketplace handling hundreds of thousands of orders daily. Real-time search, smart recommendations and sub-300 ms pages.", stat: { v: "500K+", l: "active buyers" }, tags: ["Next.js", "Highload", "Payments"] },
      { name: "Shifo24", cat: "HealthTech", year: "2024", desc: "A telemedicine platform: video consultations, e-prescriptions and queue-free doctor appointments — all in one app.", stat: { v: "200+", l: "clinics" }, tags: ["Mobile", "WebRTC", "Telemed"] },
      { name: "Sarbon TMS", cat: "Logistics", year: "2023", desc: "A management system for freight companies: GPS monitoring, AI-driven route optimization and automated document flow.", stat: { v: "8K+", l: "vehicles" }, tags: ["ERP", "GPS", "AI Routing"] },
      { name: "Bilim+", cat: "EdTech", year: "2023", desc: "An LMS for schools and learning centers: interactive lessons, parent reports and gamified assessments.", stat: { v: "120K", l: "students" }, tags: ["LMS", "Mobile", "Gamification"] },
    ],
  },
  about: {
    label: "Manifesto",
    manifesto: "We don't follow trends. We build the technology that defines them — AI systems, digital platforms and infrastructure engineered in Uzbekistan for the world.",
  },
  process: {
    label: "Process",
    title: "How we work",
    steps: [
      { t: "Discovery", d: "We dive deep into your business and users. The right questions are half of the right solution." },
      { t: "Design", d: "Prototypes and interface concepts. The product comes alive before a line of code." },
      { t: "Development", d: "Agile sprints, clean code and weekly demos. The process is fully transparent." },
      { t: "Launch", d: "Deployment, monitoring and continuous evolution. Launch is only the beginning." },
    ],
  },
  cta: {
    label: "Contact",
    title1: "Let's build",
    title2: "the impossible",
    sub: "Tell us about your project — we'll reply within 24 hours.",
    btn: "Start a project",
  },
  footer: {
    desc: "IT & AI engineering studio. Tashkent, Uzbekistan.",
    nav: "Navigation",
    contacts: "Contact",
    rights: "All rights reserved.",
    top: "Back to top",
  },
};

const ru: Dict = {
  metaTitle: "Xronuz — Создаём будущее | IT & AI",
  nav: {
    menu: "Меню",
    close: "Закрыть",
    links: ["Услуги", "Проекты", "Манифест", "Процесс", "Контакты"],
    cta: "Начать проект",
  },
  menu: { contact: "Контакты", language: "Язык", socials: "Соцсети", theme: "Тема" },
  hero: {
    eyebrow: "IT & AI STUDIO — ТАШКЕНТ",
    l1: "Создаём",
    l2: "будущее",
    sub: "Xronuz — инженерная студия, создающая искусственный интеллект, цифровые платформы и корпоративные системы.",
    cta1: "Начать проект",
    cta2: "Услуги",
    scroll: "Вниз",
    stats: [
      { v: "50+", l: "Проектов" },
      { v: "30+", l: "Клиентов" },
      { v: "5+", l: "Лет опыта" },
    ],
  },
  services: {
    label: "Услуги",
    title: "Что мы делаем",
    hint: "Нажмите, чтобы раскрыть",
    items: [
      { title: "AI-решения", desc: "Модели машинного обучения, LLM-интеграции, умные чат-боты и автоматизация бизнес-процессов. Превращаем ваши данные в конкурентное преимущество.", tags: ["LLM", "Computer Vision", "Автоматизация"] },
      { title: "Веб-разработка", desc: "Высоконагруженные платформы, real-time приложения и сложные веб-системы. Для нас важны даже миллисекунды.", tags: ["Next.js", "Real-time", "Highload"] },
      { title: "Мобильные приложения", desc: "Приложения нативного качества для iOS и Android. Продукты, достойные высших оценок в App Store и Google Play.", tags: ["iOS", "Android", "Cross-platform"] },
      { title: "ERP и CRM-системы", desc: "Корпоративные решения, объединяющие процессы компании в единую систему. Ясность вместо хаоса.", tags: ["Интеграция", "Аналитика", "B2B"] },
      { title: "UI/UX-дизайн", desc: "Исследовательский подход, фокус на конверсию и запоминающиеся интерфейсы. Дизайн — это не как выглядит, а как работает.", tags: ["Product Design", "Design System", "Motion"] },
      { title: "Cloud и DevOps", desc: "Автоматизированная инфраструктура, CI/CD и 99.9% uptime. Ваш продукт стабилен под любой нагрузкой.", tags: ["AWS", "Kubernetes", "CI/CD"] },
      { title: "Кибербезопасность", desc: "Аудит безопасности, пентесты и защита цифровых активов. Устраняем угрозы до их появления.", tags: ["Pentest", "Аудит", "Защита"] },
      { title: "IT-консалтинг", desc: "Технологическая стратегия, выбор архитектуры и экспертное сопровождение цифровой трансформации.", tags: ["Стратегия", "Архитектура", "Аудит"] },
    ],
  },
  projects: {
    label: "Проекты",
    title: "Наши проекты",
    hint: "Избранные кейсы · 2023 — 2025",
    view: "Смотреть кейс",
    all: "Следующим будет ваш",
    items: [
      { name: "Zamin AI", cat: "AI-платформа", year: "2025", desc: "AI-ассистент для банков, говорящий на узбекском. RAG-архитектура, голосовые звонки и интеграция с CRM — нагрузка на операторов снижена на 40%.", stat: { v: "1.2M", l: "запросов / мес" }, tags: ["LLM", "RAG", "Fintech"] },
      { name: "Orzu Market", cat: "E-commerce", year: "2024", desc: "Высоконагруженный маркетплейс, обрабатывающий сотни тысяч заказов в день. Real-time поиск, умные рекомендации и страницы быстрее 300 мс.", stat: { v: "500K+", l: "покупателей" }, tags: ["Next.js", "Highload", "Payments"] },
      { name: "Shifo24", cat: "HealthTech", year: "2024", desc: "Платформа телемедицины: видеоконсультации, электронные рецепты и приём врача без очередей — всё в одном приложении.", stat: { v: "200+", l: "клиник" }, tags: ["Mobile", "WebRTC", "Telemed"] },
      { name: "Sarbon TMS", cat: "Логистика", year: "2023", desc: "Система управления для грузоперевозчиков: GPS-мониторинг, AI-оптимизация маршрутов и автоматический документооборот.", stat: { v: "8K+", l: "единиц транспорта" }, tags: ["ERP", "GPS", "AI Routing"] },
      { name: "Bilim+", cat: "EdTech", year: "2023", desc: "LMS для школ и учебных центров: интерактивные уроки, отчёты для родителей и геймифицированные тесты.", stat: { v: "120K", l: "учеников" }, tags: ["LMS", "Mobile", "Gamification"] },
    ],
  },
  about: {
    label: "Манифест",
    manifesto: "Мы не следуем трендам. Мы создаём технологии, которые их определяют — AI-системы, цифровые платформы и инфраструктура, созданные в Узбекистане для всего мира.",
  },
  process: {
    label: "Процесс",
    title: "Как мы работаем",
    steps: [
      { t: "Аналитика", d: "Глубоко изучаем ваш бизнес и пользователей. Правильные вопросы — половина правильного решения." },
      { t: "Дизайн", d: "Прототипы и концепции интерфейса. Продукт оживает до первой строчки кода." },
      { t: "Разработка", d: "Agile-спринты, чистый код и еженедельные демо. Процесс полностью прозрачен." },
      { t: "Запуск", d: "Деплой, мониторинг и непрерывное развитие. Запуск — это только начало." },
    ],
  },
  cta: {
    label: "Контакты",
    title1: "Создадим",
    title2: "невозможное",
    sub: "Расскажите о проекте — ответим в течение 24 часов.",
    btn: "Начать проект",
  },
  footer: {
    desc: "Инженерная студия IT и AI. Ташкент, Узбекистан.",
    nav: "Навигация",
    contacts: "Контакты",
    rights: "Все права защищены.",
    top: "Наверх",
  },
};

export const DICTS: Record<Lang, Dict> = { uz, en, ru };
export const LANGS: Lang[] = ["uz", "en", "ru"];

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LangContext = createContext<LangContextValue>({
  lang: "uz",
  setLang: () => {},
  t: uz,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const saved = localStorage.getItem("xronuz-lang") as Lang | null;
    if (saved && DICTS[saved]) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = DICTS[lang].metaTitle;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("xronuz-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
