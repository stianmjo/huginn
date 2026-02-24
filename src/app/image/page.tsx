"use client";
import { useState } from "react";
import { toBackendUrl } from "@/lib/backend-url";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    const dataUrl: string = await new Promise((res) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.readAsDataURL(file);
    });
    const resp = await fetch(toBackendUrl("/api/upload"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, data: dataUrl }),
    });
    const json = await resp.json();
    if (json?.url) {
      setUrl(toBackendUrl(json.url));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button type="submit">
        <img src={"/file.svg"} className="size-20"/>
      </button>
      {url && <img src={url} alt="uploaded" style={{ maxWidth: 300 }} />}
    </form>
  );
}