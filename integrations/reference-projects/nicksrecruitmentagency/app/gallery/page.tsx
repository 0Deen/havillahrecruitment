export default function GalleryPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">Gallery</h1>
      <p className="mt-4 max-w-xl text-navy-700/70">
        Photos from training sessions, graduations, employer visits and departures.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-navy-900/10" />
        ))}
      </div>
    </div>
  );
}
