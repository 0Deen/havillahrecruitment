import clsx from "clsx";
import Link from "next/link";
import { ChatMessage, ChatAction } from "@/lib/types";
import Icon from "@/components/app/Icon";

function ActionButton({ a, onNavigate }: { a: ChatAction; onNavigate?: () => void }) {
  const cls = clsx(
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-4 text-[13px] font-semibold transition active:scale-95",
    a.kind === "whatsapp" && "bg-[#25D366] text-white",
    (a.kind === "primary") && "bg-brand-purple text-white",
    (a.kind === "call" || a.kind === "email") && "bg-brand-orange/20 text-brand-purple",
    (!a.kind || a.kind === "secondary") && "border border-brand-purple/25 bg-white text-brand-purple"
  );
  const icon = a.kind === "whatsapp" ? "chat" : a.kind === "call" ? "phone" : a.kind === "email" ? "mail" : "arrow";
  if (a.external || a.href.startsWith("http") || a.href.startsWith("tel:") || a.href.startsWith("mailto:")) {
    return (
      <a href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>
        <Icon name={icon} className="h-4 w-4" /> {a.label}
      </a>
    );
  }
  return (
    <Link href={a.href} onClick={onNavigate} className={cls}>
      {a.label} <Icon name={icon} className="h-4 w-4" />
    </Link>
  );
}

export default function MessageBubble({ message, onNavigate }: { message: ChatMessage; onNavigate?: () => void }) {
  const isUser = message.role === "user";

  return (
    <div className={clsx("flex flex-col", isUser ? "items-end" : "items-start")}>
      <div
        className={clsx(
          "max-w-[88%] whitespace-pre-line rounded-[20px] px-4 py-3 text-[14.5px] leading-relaxed shadow-sm",
          isUser ? "rounded-br-md bg-brand-purple text-white" : "rounded-bl-md border border-brand-purple/10 bg-white text-slate-800"
        )}
      >
        {message.content}
        {message.timestamp && (
          <div className={clsx("mt-1 text-[10px]", isUser ? "text-white/60" : "text-slate-400")}>{message.timestamp}</div>
        )}
      </div>
      {!isUser && message.actions && message.actions.length > 0 && (
        <div className="mt-2 flex max-w-[92%] flex-wrap gap-2">
          {message.actions.map((a) => (
            <ActionButton key={a.label + a.href} a={a} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}
