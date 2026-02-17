import { NextResponse } from "next/server";
import fs from "fs/promises";

export async function POST(req: Request) {
  const { filename, data } = await req.json();
  if (!data) return NextResponse.json({ error: "no data" }, { status: 400 });

  const m = (data as string).match(/^data:(.+);base64,(.+)$/);
  if (!m) return NextResponse.json({ error: "invalid data url" }, { status: 400 });

  const mime = m[1]; // e.g. image/png
  const b64 = m[2];
  const ext = mime.split("/")[1] ?? "bin";
  const name = filename ?? `upload-${Date.now()}.${ext}`;
  await fs.mkdir("public/uploads", { recursive: true });
  const outPath = `public/uploads/${name}`;
  await fs.writeFile(outPath, Buffer.from(b64, "base64"));
  return NextResponse.json({ url: `/uploads/${name}` });
}