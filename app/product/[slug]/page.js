// app/product/[slug]/page.js
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { dbConnect } from "@/db/config";
import Product from "@/models/product.models";
import { absoluteUrl } from "@/lib/siteConfig";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!mongoose.Types.ObjectId.isValid(slug)) {
    return {
      title: "Product Not Found",
      description: "The requested digital product could not be found.",
      robots: { index: false },
    };
  }

  try {
    await dbConnect();
    const product = await Product.findById(slug).select("-canvaUrl");

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested digital product could not be found.",
        robots: { index: false },
      };
    }

    const cleanDescription = product.description
      ? product.description.replace(/\s+/g, " ").slice(0, 160).trim()
      : "Downloadable digital template with instant access.";

    const ogImage = product.imagesPath?.[0]
      ? absoluteUrl(product.imagesPath[0])
      : absoluteUrl("/hero.webp");

    return {
      title: product.title,
      description: cleanDescription,
      alternates: {
        canonical: `/product/${slug}`,
      },
      openGraph: {
        title: `${product.title} | CatchyDeals`,
        description: cleanDescription,
        url: `/product/${slug}`,
        type: "website",
        images: [
          {
            url: ogImage,
            width: 800,
            height: 600,
            alt: product.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: cleanDescription,
        images: [ogImage],
      },
    };
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return {
      title: "Digital Product",
      description: "Customizable digital template with instant Canva access.",
    };
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  if (!mongoose.Types.ObjectId.isValid(slug)) {
    notFound();
  }

  await dbConnect();
  const productDoc = await Product.findById(slug).select("-canvaUrl").lean();

  if (!productDoc) {
    notFound();
  }

  // Convert MongoDB document to plain JSON
  const product = JSON.parse(JSON.stringify(productDoc));

  // JSON-LD Structured Data: Product and Offer
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: (product.imagesPath || []).map((img) => absoluteUrl(img)),
    sku: product._id,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/product/${product._id}`),
      priceCurrency: "USD",
      price: product.salePrice,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "CatchyDeals Digital Store",
      },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient initialProduct={product} />
    </main>
  );
}
