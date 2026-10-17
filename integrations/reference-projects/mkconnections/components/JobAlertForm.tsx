"use client";

import { useState } from "react";

export function JobAlertForm({ country = "", category = "", keyword = "" }: { country?: string; category?: string; keyword?: string }) {
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, country, category, keyword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Could not save your alert right now.");
    }
  }

  if (status === "success") {
    return <p role="status" className="text-sm text-amber-deep">You're set — we'll let you know when a matching opportunity opens up.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        required
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Email or phone number"
        className="flex-1 rounded-full border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-amber"
      />
      <button type="submit" disabled={status === "loading"} className="rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-amber-deep disabled:opacity-60">
        {status === "loading" ? "Saving…" : "Create Job Alert"}
      </button>
      {status === "error" && <p role="alert" className="text-xs text-amber-deep sm:self-center">{errorMsg}</p>}
    </form>
  );
}
