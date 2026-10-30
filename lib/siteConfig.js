// lib/siteConfig.js
// Centralized configuration for SEO, metadata, canonical URLs, and business info

export const siteConfig = {
  name: "CatchyDeals Digital Store",
  shortName: "CatchyDeals",
  description:
    "Discover printable holiday party games, festive bingo packs, Christmas party invitations, and customizable digital greeting cards. 100% editable in free Canva with instant download access.",
  defaultTitle: "CatchyDeals | Digital Templates, Party Games & Invitations",
  titleTemplate: "%s | CatchyDeals Digital Store",
  // Actual production domain with fallbacks for local and preview environments
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://catchydeals.in"),
  contact: {
    email: "digital.catchydeals@gmail.com",
    phone: "+91-8368952040",
    address: "New Delhi, Delhi 110077, India",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110077",
    country: "IN",
  },
  social: {
    facebook: "https://www.facebook.com/catchydeals07/",
    pinterest: "https://in.pinterest.com/Catchydeals07",
  },
  pinterestVerification: "169e23c899062213dbee54d7edea0c0c",
};

export function getSiteUrl() {
  const url = siteConfig.url;
  // Ensure no trailing slash
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function absoluteUrl(path = "") {
  const base = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
