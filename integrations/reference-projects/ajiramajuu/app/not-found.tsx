import Link from "next/link";
import Navbar from "@/components/Navbar";
import { WhatsAppLink } from "@/components/app/Bits";
import { generalWhatsAppMessage } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="font-display text-6xl font-bold text-brand-orange">404</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-brand-purple">We couldn’t find that page</h1>
        <p className="mt-2 text-sm text-slate-600">The job or page may have been filled, moved or removed. Browse current jobs or ask our team.</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/jobs" className="btn-primary min-h-[50px]">Browse current jobs</Link>
          <Link href="/destinations" className="btn-secondary min-h-[50px]">Explore destinations</Link>
          <WhatsAppLink message={generalWhatsAppMessage()} label="Ask on WhatsApp" source="404" />
        </div>
      </section>
    </main>
  );
}
