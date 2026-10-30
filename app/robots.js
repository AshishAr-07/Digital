// app/robots.js
import { absoluteUrl } from "@/lib/siteConfig";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/admin/*",
          "/api/",
          "/api/*",
          "/orders",
          "/orders/",
          "/orders/*",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
