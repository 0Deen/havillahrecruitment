import Image from "next/image";
import Link from "next/link";
import images from "@/data/combined-image-catalogue.json";

export const metadata = {
  title: "Job Categories & Career Gallery | Havillah Recruitment Agency",
  description: "Explore career sectors and job-category imagery from Havillah's consolidated recruitment project catalogue.",
};

export default function JobGalleryPage() {
  return (
    <main className="gallery-page">
      <section className="gallery-shell">
        <Link href="/" className="gallery-back">← Back to Havillah</Link>
        <div className="gallery-intro">
          <p className="gallery-kicker">Explore career sectors</p>
          <h1>A wider world of work.</h1>
          <p>Browse job and industry imagery consolidated from the supplied recruitment projects. Images represent career categories, not confirmation that a specific vacancy is currently open. Contact Havillah to verify current opportunities and requirements.</p>
        </div>
        <div className="career-gallery-grid">
          {images.map((item, index) => (
            <article key={item.file} className="career-gallery-card">
              <div className="career-gallery-image">
                <Image src={item.file} alt={`${item.label} career category`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
              </div>
              <div className="career-gallery-content">
                <h2>{item.label || "Career category"}</h2>
                <p>Career sector {String(index + 1).padStart(2, "0")}</p>
                <Link href="/apply">Ask about opportunities ↗</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="gallery-cta">
          <h2>Looking for a specific role?</h2>
          <p>Send an application enquiry with your preferred role and destination. The team must confirm whether a matching, active vacancy is available.</p>
          <Link href="/apply">Start an application enquiry</Link>
        </div>
      </section>
    </main>
  );
}
