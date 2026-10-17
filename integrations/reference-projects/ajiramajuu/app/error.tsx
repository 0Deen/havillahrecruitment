"use client";
import { WhatsAppLink } from "@/components/app/Bits";
import { generalWhatsAppMessage } from "@/lib/whatsapp";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="font-display text-2xl font-bold text-brand-purple">Something went wrong</h1>
      <p className="mt-2 text-sm text-slate-600">This page didn’t load properly. Try again, or contact our team.</p>
      <div className="mt-6 flex flex-col gap-3">
        <button onClick={reset} className="btn-primary min-h-[50px]">Try again</button>
        <WhatsAppLink message={generalWhatsAppMessage()} label="Message us on WhatsApp" source="error" />
      </div>
    </main>
  );
}
