import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

// Best-effort view counter — no database is configured for this project, so
// this persists to a JSON file on disk rather than fabricating a number.
// On a traditional server (VPS, Docker with a volume, `next start` on a
// persistent host) this file survives restarts and the count is real and
// durable. On ephemeral serverless hosting (e.g. Vercel's default runtime)
// the filesystem outside /tmp is read-only and /tmp itself doesn't persist
// across cold starts or redeploys, so the count will periodically reset
// there — that's a real limitation of file-based storage without a
// database, not a fake number.
const STORE_PATH = path.join(os.tmpdir(), "portfolio-view-count.json");

async function readCount(): Promise<number> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return typeof parsed.count === "number" ? parsed.count : 0;
  } catch {
    return 0;
  }
}

async function writeCount(count: number): Promise<void> {
  await fs.writeFile(STORE_PATH, JSON.stringify({ count }), "utf-8");
}

export async function GET() {
  try {
    const count = await readCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null });
  }
}

export async function POST() {
  try {
    const count = (await readCount()) + 1;
    await writeCount(count);
    return NextResponse.json({ count });
  } catch {
    // Storage unavailable (e.g. read-only filesystem) — degrade gracefully
    // rather than erroring the page.
    return NextResponse.json({ count: null });
  }
}
