"use client";

import { useEffect, useState, FormEvent } from "react";
import type { StoredProject, LocalizedText } from "@/lib/projects";

const EMPTY_LOC: LocalizedText = { uz: "", en: "", ru: "" };

function blankProject(): StoredProject {
  return {
    id: crypto.randomUUID(),
    name: "",
    year: String(new Date().getFullYear()),
    tags: [],
    cat: { ...EMPTY_LOC },
    desc: { ...EMPTY_LOC },
    stat: { v: "", l: { ...EMPTY_LOC } },
  };
}

const LANG_LABELS: Record<keyof LocalizedText, string> = {
  uz: "O'zbekcha",
  en: "English",
  ru: "Русский",
};

export default function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [editing, setEditing] = useState<StoredProject | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  useEffect(() => {
    Promise.all([
      fetch("/api/auth").then((r) => r.json()),
      fetch("/api/projects", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([a, list]) => {
        setAuthed(!!a.ok);
        if (Array.isArray(list)) setProjects(list);
      })
      .catch(() => setAuthed(false));
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setPassword("");
    } else {
      const body = await res.json().catch(() => null);
      setLoginError(body?.error ?? "Xatolik yuz berdi");
    }
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
  }

  async function persist(next: StoredProject[]) {
    const prev = projects;
    setProjects(next);
    setStatus("saving");
    const res = await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    if (res.ok) {
      setProjects(await res.json());
      setStatus("idle");
    } else {
      setProjects(prev);
      setStatus("error");
      if (res.status === 401) setAuthed(false);
    }
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= projects.length) return;
    const next = [...projects];
    [next[i], next[j]] = [next[j], next[i]];
    persist(next);
  }

  function remove(id: string) {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    if (!window.confirm(`"${p.name}" loyihasi o'chirilsinmi?`)) return;
    persist(projects.filter((x) => x.id !== id));
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const next = isNew
      ? [...projects, editing]
      : projects.map((p) => (p.id === editing.id ? editing : p));
    persist(next);
    setEditing(null);
    setIsNew(false);
  }

  const set = (patch: Partial<StoredProject>) =>
    setEditing((p) => (p ? { ...p, ...patch } : p));
  const setLoc = (field: "cat" | "desc", l: keyof LocalizedText, v: string) =>
    setEditing((p) => (p ? { ...p, [field]: { ...p[field], [l]: v } } : p));
  const setStatL = (l: keyof LocalizedText, v: string) =>
    setEditing((p) =>
      p ? { ...p, stat: { ...p.stat, l: { ...p.stat.l, [l]: v } } } : p
    );

  if (authed === null) {
    return (
      <div className="admin">
        <p className="mono-dim" style={{ padding: 48 }}>Yuklanmoqda…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="admin admin-center">
        <form className="admin-card admin-login" onSubmit={login}>
          <span className="nav-logo" style={{ mixBlendMode: "normal" }}>
            Xronuz<span className="dot">.</span>
          </span>
          <h1 className="mono-label" style={{ marginTop: 8 }}>Admin panel</h1>
          <input
            type="password"
            className="admin-input"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {loginError && <p className="admin-error">{loginError}</p>}
          <button type="submit" className="btn-solid admin-wide">
            <span>Kirish</span>
          </button>
          <a href="/" className="mono-dim">← Saytga qaytish</a>
        </form>
      </div>
    );
  }

  return (
    <div className="admin">
      <header className="admin-head">
        <span className="nav-logo" style={{ mixBlendMode: "normal" }}>
          Xronuz<span className="dot">.</span>
          <span className="mono-label" style={{ marginLeft: 10 }}>Admin</span>
        </span>
        <div className="admin-head-right">
          {status === "saving" && <span className="mono-dim">Saqlanmoqda…</span>}
          {status === "error" && (
            <span className="admin-error">Saqlashda xatolik</span>
          )}
          <a href="/" className="mono-dim">Sayt ↗</a>
          <button className="btn-line admin-btn-sm" onClick={logout}>
            <span>Chiqish</span>
          </button>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-bar">
          <h1 className="admin-title">Loyihalar ({projects.length})</h1>
          <button
            className="btn-solid admin-btn-sm"
            onClick={() => {
              setEditing(blankProject());
              setIsNew(true);
            }}
          >
            <span>+ Yangi loyiha</span>
          </button>
        </div>

        {editing && (
          <form className="admin-card admin-form" onSubmit={submitForm}>
            <div className="admin-form-head">
              <h2 className="mono-label">
                {isNew ? "Yangi loyiha" : `Tahrirlash — ${editing.name || "…"}`}
              </h2>
              <button
                type="button"
                className="mono-dim"
                onClick={() => {
                  setEditing(null);
                  setIsNew(false);
                }}
              >
                Yopish ×
              </button>
            </div>

            <div className="admin-grid">
              <label className="admin-field">
                <span>Nomi</span>
                <input
                  className="admin-input"
                  value={editing.name}
                  onChange={(e) => set({ name: e.target.value })}
                  required
                  maxLength={60}
                />
              </label>
              <label className="admin-field">
                <span>Yil</span>
                <input
                  className="admin-input"
                  value={editing.year}
                  onChange={(e) => set({ year: e.target.value })}
                  required
                  maxLength={12}
                />
              </label>
              <label className="admin-field">
                <span>Ko'rsatkich qiymati (masalan 1.2M)</span>
                <input
                  className="admin-input"
                  value={editing.stat.v}
                  onChange={(e) =>
                    set({ stat: { ...editing.stat, v: e.target.value } })
                  }
                  maxLength={14}
                />
              </label>
              <label className="admin-field">
                <span>Teglar (vergul bilan)</span>
                <input
                  className="admin-input"
                  value={editing.tags.join(", ")}
                  onChange={(e) =>
                    set({ tags: e.target.value.split(",").map((t) => t.trim()) })
                  }
                />
              </label>
            </div>

            {(Object.keys(LANG_LABELS) as (keyof LocalizedText)[]).map((l) => (
              <fieldset key={l} className="admin-lang">
                <legend className="mono-label">{LANG_LABELS[l]}</legend>
                <div className="admin-grid">
                  <label className="admin-field">
                    <span>Kategoriya</span>
                    <input
                      className="admin-input"
                      value={editing.cat[l]}
                      onChange={(e) => setLoc("cat", l, e.target.value)}
                      required
                      maxLength={48}
                    />
                  </label>
                  <label className="admin-field">
                    <span>Ko'rsatkich izohi</span>
                    <input
                      className="admin-input"
                      value={editing.stat.l[l]}
                      onChange={(e) => setStatL(l, e.target.value)}
                      maxLength={36}
                    />
                  </label>
                </div>
                <label className="admin-field">
                  <span>Tavsif</span>
                  <textarea
                    className="admin-input"
                    rows={3}
                    value={editing.desc[l]}
                    onChange={(e) => setLoc("desc", l, e.target.value)}
                    required
                    maxLength={480}
                  />
                </label>
              </fieldset>
            ))}

            <div className="admin-form-actions">
              <button type="submit" className="btn-solid admin-btn-sm">
                <span>Saqlash</span>
              </button>
            </div>
          </form>
        )}

        <ul className="admin-list">
          {projects.map((p, i) => (
            <li key={p.id} className="admin-card admin-item">
              <span className="mono-label admin-item-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="admin-item-main">
                <strong className="admin-item-name">{p.name}</strong>
                <span className="mono-dim">
                  {p.cat.uz} · {p.year} · {p.stat.v} {p.stat.l.uz}
                </span>
              </div>
              <div className="admin-item-actions">
                <button onClick={() => move(i, -1)} disabled={i === 0} title="Tepaga">↑</button>
                <button onClick={() => move(i, 1)} disabled={i === projects.length - 1} title="Pastga">↓</button>
                <button
                  onClick={() => {
                    setEditing({ ...p, cat: { ...p.cat }, desc: { ...p.desc }, stat: { ...p.stat, l: { ...p.stat.l } }, tags: [...p.tags] });
                    setIsNew(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Tahrirlash
                </button>
                <button className="admin-danger" onClick={() => remove(p.id)}>
                  O'chirish
                </button>
              </div>
            </li>
          ))}
          {projects.length === 0 && (
            <li className="admin-card admin-empty">
              Hozircha loyiha yo'q — "+ Yangi loyiha" bilan qo'shing.
            </li>
          )}
        </ul>
      </main>
    </div>
  );
}
