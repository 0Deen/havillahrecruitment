import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://nicksrecruitmentagency.com/sitemap.xml",
    host: "https://nicksrecruitmentagency.com",
  };
}
