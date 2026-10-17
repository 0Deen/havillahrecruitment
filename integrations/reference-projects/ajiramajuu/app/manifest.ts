import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ajira Majuu — Private Overseas Recruitment Agency in Kenya",
    short_name: "Ajira Majuu",
    description: "Browse overseas jobs, apply without an account, and reach Ajira Majuu in one tap.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F4F0FA",
    theme_color: "#4B1E8C",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: "Apply now", url: "/apply" },
      { name: "Jobs", url: "/jobs" },
      { name: "Contact", url: "/contact" },
    ],
  };
}
