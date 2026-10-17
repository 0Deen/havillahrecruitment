"use client";

import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ChatWidget } from "./ChatWidget";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div className="fixed bottom-28 right-4 z-40 lg:bottom-5 lg:right-5 flex flex-col items-end gap-3">
        {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} />}

        <a
          href={`${siteConfig.whatsappLink}?text=${encodeURIComponent("Hi MK Connection Limited, I'd like to find out more about your opportunities.")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp")}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105"
        >
          <Phone size={24} fill="white" />
        </a>

        <button
          onClick={() => setChatOpen((v) => !v)}
          aria-label="Open MK Connection Limited Assistant"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-amber shadow-lift transition hover:scale-105"
        >
          {chatOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </>
  );
}
