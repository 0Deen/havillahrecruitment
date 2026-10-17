export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse space-y-4 px-4 py-8" role="status" aria-label="Loading">
      <div className="h-40 rounded-[30px] bg-brand-purple/10" />
      <div className="h-6 w-2/3 rounded-full bg-slate-200" />
      <div className="grid grid-cols-2 gap-3"><div className="h-32 rounded-3xl bg-slate-200" /><div className="h-32 rounded-3xl bg-slate-200" /></div>
    </div>
  );
}
