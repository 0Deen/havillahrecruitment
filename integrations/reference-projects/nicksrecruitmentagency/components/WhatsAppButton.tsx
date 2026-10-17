"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254746030545?text=Hello%20Nicks%20Recruitment%20Agency%2C%20I%20would%20like%20to%20know%20more%20about%20your%20job%20opportunities."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:scale-105 hover:bg-emerald-700"
    >
      <MessageCircle />
    </a>
  );
}
