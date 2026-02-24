"use client";

import { useState } from "react";
import { toBackendUrl } from "@/lib/backend-url";

export default function Home() {
  const [message, setMessage] = useState("");

  async function onClick() {
    setMessage("loading...");

    try {
      const res = await fetch(toBackendUrl("/api/ping"), { method: "POST" });
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage("backend unavailable");
    }
  }

  return (
    <main>
      <div>
        <button onClick={onClick}>Ping</button>
        <div>{message}</div>
      </div>
    </main>
    );
}
