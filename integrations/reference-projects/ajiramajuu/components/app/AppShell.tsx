"use client";

// Wraps every page. Desktop (lg+): floating glass sidebar and content offset.
// Mobile: content gets bottom padding for the notch tab bar; the menu sheet
// and search sheet are mounted once here and opened by custom events so any
// component (Navbar, buttons) can trigger them without prop drilling.

import { useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import MoreSheet from "./MoreSheet";
import SearchSheet from "./SearchSheet";

export const OPEN_MENU_EVENT = "ajm:open-menu";
export const OPEN_SEARCH_EVENT = "ajm:open-search";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("ajm-sidebar") === "collapsed");
    } catch {
      /* storage unavailable */
    }
    const m = () => setMenuOpen(true);
    const s = () => setSearchOpen(true);
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener(OPEN_MENU_EVENT, m);
    window.addEventListener(OPEN_SEARCH_EVENT, s);
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener(OPEN_MENU_EVENT, m);
      window.removeEventListener(OPEN_SEARCH_EVENT, s);
      window.removeEventListener("keydown", k);
    };
  }, []);

  const toggle = useCallback(() => {
    setCollapsed((c) => {
      try {
        localStorage.setItem("ajm-sidebar", c ? "open" : "collapsed");
      } catch {
        /* ignore */
      }
      return !c;
    });
  }, []);

  return (
    <div style={{ ["--sbw" as string]: collapsed ? "84px" : "272px" }} className="min-h-screen bg-[#F4F0FA]">
      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <div className="pb-[calc(92px_+_env(safe-area-inset-bottom))] transition-[padding] duration-300 lg:pb-0 lg:pl-[calc(var(--sbw)_+_2rem)] lg:pr-4">
        {children}
      </div>
      <BottomNav />
      <MoreSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
