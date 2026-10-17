"use client";

// Mobile bottom navigation — the "notch" tab bar from the design reference.
// A dark bar with a circular cut-out that glides under the active tab, with a
// raised circle holding the active icon. Home · Jobs · Destinations · Apply ·
// Contact. APPLY keeps an orange accent even when inactive so it stands out.

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "./Icon";
import { NAV_PRIMARY } from "@/lib/site";

function activeIndex(pathname: string): number {
  if (pathname === "/") return 0;
  if (pathname.startsWith("/jobs")) return 1;
  if (pathname.startsWith("/destinations")) return 2;
  if (pathname.startsWith("/apply")) return 3;
  if (pathname.startsWith("/contact")) return 4;
  return -1;
}

export default function BottomNav() {
  const pathname = usePathname() || "/";
  const idx = activeIndex(pathname);
  const count = NAV_PRIMARY.length;
  const centre = idx >= 0 ? ((idx + 0.5) / count) * 100 : -30; // % along the bar

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 px-3 lg:hidden"
      style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
    >
      <div className="relative mx-auto max-w-md" style={{ filter: "drop-shadow(0 12px 22px rgba(42,15,79,0.38))" }}>
        {/* the bar, with a moving circular notch cut out of its top edge */}
        <div className="ajm-notch-bar h-[68px] rounded-[26px] bg-[#2A0F4F]" style={{ ["--nx" as string]: `${centre}%` }} />

        {/* raised active circle */}
        <span
          aria-hidden="true"
          className="ajm-notch-dot pointer-events-none absolute -top-[26px] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-brand-orange text-[#2A0F4F] shadow-lg"
          style={{ left: `calc(${centre}% - 28px)`, opacity: idx >= 0 ? 1 : 0 }}
        >
          {idx >= 0 && <Icon name={NAV_PRIMARY[idx].icon as IconName} className="h-6 w-6" strokeWidth={2} />}
        </span>

        <ul className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
          {NAV_PRIMARY.map((item, i) => {
            const active = i === idx;
            const isApply = item.href === "/apply";
            return (
              <li key={item.href} className="flex">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group flex min-h-[56px] flex-1 flex-col items-center justify-end gap-0.5 pb-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <span
                    className={`transition-all duration-300 ${active ? "translate-y-3 scale-50 opacity-0" : "opacity-100"} ${
                      isApply ? "text-brand-orange" : "text-white/55 group-active:text-white"
                    }`}
                  >
                    <Icon name={item.icon as IconName} className="h-[22px] w-[22px]" />
                  </span>
                  <span
                    className={`text-[10.5px] leading-none tracking-wide ${
                      active ? "font-bold text-white" : isApply ? "font-semibold text-brand-orange" : "font-medium text-white/55"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
