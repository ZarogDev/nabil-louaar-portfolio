import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site";

// Fixed date: only update when content actually changes.
const SITE_LAST_MODIFIED = new Date("2026-06-22");

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
