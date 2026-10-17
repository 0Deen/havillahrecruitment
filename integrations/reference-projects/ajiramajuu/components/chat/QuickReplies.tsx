export const DEFAULT_QUICK_REPLIES = [
  "Find a job",
  "Qatar jobs",
  "How do I apply?",
  "What documents do I need?",
  "Is it safe? Someone asked me for money",
  "Talk to Ajira Majuu",
];

export default function QuickReplies({
  options,
  onSelect,
  disabled,
}: {
  options: string[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  if (options.length === 0) return null;

  return (
    <div className="ajm-rail px-3 pb-2" role="group" aria-label="Suggested replies">
      {options.map((opt) => (
        <button
          key={opt}
          disabled={disabled}
          onClick={() => onSelect(opt)}
          className="min-h-[40px] whitespace-nowrap rounded-full border border-brand-purple/20 bg-white px-4 text-[13px] font-medium text-brand-purple shadow-sm transition active:scale-95 hover:bg-brand-purple hover:text-white disabled:opacity-50"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
