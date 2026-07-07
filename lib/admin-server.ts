import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { cookies } from "next/headers";
import type { LocalizedText, StoredProject } from "./projects";

const FILE = path.join(process.cwd(), "data", "projects.json");
export const ADMIN_COOKIE = "xronuz_admin";

export async function readProjects(): Promise<StoredProject[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function writeProjects(list: StoredProject[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

/* ── auth ─────────────────────────────────────── */

export function tokenFor(password: string): string {
  return crypto.createHash("sha256").update(`xronuz-admin:${password}`).digest("hex");
}

export function adminToken(): string | null {
  const pwd = process.env.ADMIN_PASSWORD;
  return pwd ? tokenFor(pwd) : null;
}

export async function isAuthed(): Promise<boolean> {
  const token = adminToken();
  if (!token) return false;
  const c = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!c || c.length !== token.length) return false;
  return crypto.timingSafeEqual(Buffer.from(c), Buffer.from(token));
}

/* ── validation ───────────────────────────────── */

function isLoc(x: unknown): x is LocalizedText {
  const o = x as LocalizedText;
  return (
    !!o &&
    typeof o.uz === "string" &&
    typeof o.en === "string" &&
    typeof o.ru === "string"
  );
}

function trimLoc(x: LocalizedText, max: number): LocalizedText {
  return {
    uz: x.uz.trim().slice(0, max),
    en: x.en.trim().slice(0, max),
    ru: x.ru.trim().slice(0, max),
  };
}

/** Validates the full replacement list sent by the admin panel. */
export function validateProjects(body: unknown): StoredProject[] | null {
  if (!Array.isArray(body) || body.length > 50) return null;
  const out: StoredProject[] = [];
  for (const raw of body) {
    const p = raw as StoredProject;
    if (
      !p ||
      typeof p.name !== "string" ||
      !p.name.trim() ||
      typeof p.year !== "string" ||
      !isLoc(p.cat) ||
      !isLoc(p.desc) ||
      !p.stat ||
      typeof p.stat.v !== "string" ||
      !isLoc(p.stat.l) ||
      !Array.isArray(p.tags) ||
      !p.tags.every((t) => typeof t === "string")
    ) {
      return null;
    }
    out.push({
      id: typeof p.id === "string" && p.id ? p.id.slice(0, 40) : crypto.randomUUID(),
      name: p.name.trim().slice(0, 60),
      year: p.year.trim().slice(0, 12),
      tags: p.tags
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 6)
        .map((t) => t.slice(0, 28)),
      cat: trimLoc(p.cat, 48),
      desc: trimLoc(p.desc, 480),
      stat: { v: p.stat.v.trim().slice(0, 14), l: trimLoc(p.stat.l, 36) },
    });
  }
  return out;
}
