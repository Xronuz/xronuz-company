import type { Lang, ProjectItem } from "./i18n";

export interface LocalizedText {
  uz: string;
  en: string;
  ru: string;
}

/** Shape persisted in data/projects.json and edited via /admin */
export interface StoredProject {
  id: string;
  name: string;
  year: string;
  tags: string[];
  cat: LocalizedText;
  desc: LocalizedText;
  stat: { v: string; l: LocalizedText };
}

export function toProjectItem(p: StoredProject, lang: Lang): ProjectItem {
  return {
    name: p.name,
    cat: p.cat[lang],
    year: p.year,
    desc: p.desc[lang],
    stat: { v: p.stat.v, l: p.stat.l[lang] },
    tags: p.tags,
  };
}
