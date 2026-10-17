"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
      setErrorMsg("Could not subscribe right now. Please try again.");
    }
  }

  return (
    <section className="border-t border-line bg-sand/40 py-16 md:py-20">
      <div className="container-content flex flex-col items-center text-center">
        <h2 className="max-w-lg font-display text-2xl text-ink md:text-3xl">{t("newsletter.title")}</h2>

        {status === "success" ? (
          <p role="status" className="mt-6 text-sm text-amber-deep">Thanks — you're subscribed.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              className="flex-1 rounded-full border border-line bg-white px-5 py-3 text-sm outline-none focus:border-amber"
            />
            <button type="submit" disabled={status === "loading"} className="rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition hover:bg-amber-deep disabled:opacity-60">
              {status === "loading" ? "…" : t("newsletter.cta")}
            </button>
          </form>
        )}
        {status === "error" && <p role="alert" className="mt-3 text-xs text-amber-deep">{errorMsg}</p>}

        <label className="mt-4 flex items-center gap-2 text-xs text-slate">
          <input type="checkbox" defaultChecked className="accent-amber" />
          {t("newsletter.consent")}
        </label>
      </div>
    </section>
  );
}
