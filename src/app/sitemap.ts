import type { MetadataRoute } from "next";

const BASE_URL = "https://nabillouaar.fr";

// Fixed date: only update when content actually changes.
const SITE_LAST_MODIFIED = new Date("2026-06-16");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
