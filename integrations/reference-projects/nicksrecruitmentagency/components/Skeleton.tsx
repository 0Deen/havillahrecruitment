export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-navy-900/10 ${className}`} />;
}

export function SkeletonCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-navy-900/10 bg-white p-5">
          <Skeleton className="h-36 w-full rounded-xl" />
          <Skeleton className="mt-4 h-4 w-3/4" />
          <Skeleton className="mt-2 h-3 w-1/2" />
          <Skeleton className="mt-4 h-8 w-24 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonPageHeader() {
  return (
    <div className="container-page pt-16 pb-10">
      <Skeleton className="h-5 w-32 rounded-full" />
      <Skeleton className="mt-4 h-10 w-2/3" />
      <Skeleton className="mt-3 h-4 w-1/2" />
    </div>
  );
}
