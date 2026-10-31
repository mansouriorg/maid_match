import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The page shown after a booking has nothing for a search engine.
      disallow: ["/success"],
    },
    sitemap: siteUrl + "/sitemap.xml",
  };
}
