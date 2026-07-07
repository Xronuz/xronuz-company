import { NextResponse } from "next/server";
import {
  readProjects,
  writeProjects,
  isAuthed,
  validateProjects,
} from "@/lib/admin-server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await readProjects());
}

/** Full-list replacement — the admin panel sends the complete array on every change. */
export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const list = validateProjects(body);
  if (!list) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  await writeProjects(list);
  return NextResponse.json(list);
}
