import React from "react";
import Hero from "./components/Hero";
import Product from "./components/Product";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import FAQ from "./components/Faq";
import CtaBanner from "./components/CtaBanner";
import { siteConfig, absoluteUrl } from "@/lib/siteConfig";
import { faqsData } from "@/lib/faqs";

export const metadata = {
  title: "CatchyDeals | Printable Holiday Games, Bingo & Canva Templates",
  description:
    "Explore printable Christmas party games, festive bingo bundles, customizable party invitations, and holiday greetings. 100% editable in free Canva with instant download.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CatchyDeals | Printable Holiday Games, Bingo & Canva Templates",
    description:
      "Instant printable Christmas games, bingo bundles, invitations, and holiday cards. Edit in free Canva.",
    url: "/",
  },
};

export default function HomePage() {
  // JSON-LD Structured Data: WebSite, Organization, and FAQPage
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    description: siteConfig.description,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      email: siteConfig.contact.email,
      areaServed: "Worldwide",
      availableLanguage: "en",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.region,
      postalCode: siteConfig.contact.postalCode,
      addressCountry: siteConfig.contact.country,
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.pinterest],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Hero />
      <Product />
      <HowItWorks />
      <Features />
      <FAQ />
      <CtaBanner />
    </main>
  );
}
