import TrainingPreview from "@/components/TrainingPreview";
import Link from "next/link";

export default function TrainingSchoolIndex() {
  return (
    <div>
      <div className="bg-navy-900 py-16 text-white">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">Training School</p>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">About the Training Centre</h1>
          <p className="mt-4 max-w-2xl text-sand-100/80">
            A physical training campus with real classrooms and equipment,
            certified instructors, and a full calendar of trade and soft-skill
            courses for candidates preparing to deploy.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/training-school/courses" className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-400">
              View Courses
            </Link>
            <Link href="/book-training" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Book Training
            </Link>
          </div>
        </div>
      </div>
      <TrainingPreview />
    </div>
  );
}
