"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  async function onClick() {
    setMessage("loading...");
    const res = await fetch("/api/ping", { method: "POST" });
    const data = await res.json();
    setMessage(data.message);
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
