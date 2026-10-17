export default function VideosPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">Videos</h1>
      <p className="mt-4 max-w-xl text-navy-700/70">
        Facility tours, training demonstrations and candidate departure stories.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-video rounded-xl bg-navy-900/10" />
        ))}
      </div>
    </div>
  );
}
