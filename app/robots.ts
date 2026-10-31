import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { DEMO_MODE } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // A demo is kept out of search results, so nobody takes it for a real
      // cleaning service (DEMO_MODE in lib/business.ts). Otherwise only the
      // page shown after a booking is hidden.
      allow: DEMO_MODE ? undefined : "/",
      disallow: DEMO_MODE ? "/" : ["/success"],
    },
    sitemap: siteUrl + "/sitemap.xml",
  };
}
