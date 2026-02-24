import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT) || 8080;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = process.env.UPLOAD_DIR || path.join(__dirname, "uploads");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json({ limit: "25mb" }));
app.use("/uploads", express.static(uploadsDir));

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/api/ping", (_req, res) => {
  res.status(200).json({ ok: true, message: "pong", source: "backend" });
});

app.post("/api/ping", (_req, res) => {
  res.status(200).json({ ok: true, message: "pong", source: "backend" });
});

app.post("/api/upload", async (req, res) => {
  const { filename, data } = req.body ?? {};

  if (!data || typeof data !== "string") {
    return res.status(400).json({ error: "no data" });
  }

  const match = data.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    return res.status(400).json({ error: "invalid data url" });
  }

  const mime = match[1];
  const b64 = match[2];
  const ext = mime.split("/")[1] ?? "bin";
  const safeFilename = typeof filename === "string" ? path.basename(filename) : "";
  const name = safeFilename || `upload-${Date.now()}.${ext}`;

  await fs.mkdir(uploadsDir, { recursive: true });
  const outPath = path.join(uploadsDir, name);
  await fs.writeFile(outPath, Buffer.from(b64, "base64"));

  return res.status(200).json({ url: `/uploads/${name}` });
});

app.listen(port, () => {
  console.log(`backend listening on ${port}`);
});