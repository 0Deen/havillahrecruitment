const files = ["Candidate Registration Form", "Employer Requirement Form", "Medical Checklist", "Training Calendar"];
export default function DownloadsPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">Downloads</h1>
      <ul className="mt-8 max-w-md divide-y divide-navy-900/10 rounded-2xl border border-navy-900/10">
        {files.map((f) => (
          <li key={f} className="flex items-center justify-between p-4 text-sm">
            <span className="text-navy-900">{f}</span>
            <span className="text-gold-600 font-semibold">PDF</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
