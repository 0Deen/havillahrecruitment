// Dependency-free stroke icons (24x24). Used by the app-style navigation so
// the shell never depends on an icon package's version or export names.

const PATHS = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  briefcase: "M3 8h18v12H3z M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2 M3 13h18",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18",
  send: "M22 2 11 13 M22 2l-7 20-4-9-9-4z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  menu: "M4 6h16 M4 12h16 M4 18h16",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-4-4",
  x: "M6 6l12 12 M18 6 6 18",
  chat: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5z",
  sparkles: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z",
  route: "M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M18 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M8 17h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7",
  building: "M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16 M14 9h5a1 1 0 0 1 1 1v11 M3 21h18 M8 8h2 M8 12h2 M8 16h2",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M4 5v16",
  help: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7 M12 17h.01",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4",
  users: "M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1 M9.5 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M21 20v-1a4 4 0 0 0-3-3.9 M16 4.1a3.5 3.5 0 0 1 0 6.8",
  mail: "M3 6h18v12H3z M3 7l9 6 9-6",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  right: "M9 6l6 6-6 6",
  left: "M15 6l-6 6 6 6",
  down: "M6 9l6 6 6-6",
  up: "M6 15l6-6 6 6",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  check: "M5 12l4.5 4.5L19 7",
  file: "M7 3h7l5 5v13H7z M14 3v5h5",
  upload: "M12 16V4 M7 9l5-5 5 5 M4 20h16",
  trash: "M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13",
  panel: "M4 5h16v14H4z M9 5v14",
  alert: "M12 3 2 20h20z M12 10v4 M12 17h.01",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2",
  external: "M14 4h6v6 M20 4 10 14 M18 14v6H4V6h6",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.8,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name].split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
}
