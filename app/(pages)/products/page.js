import Product from "@/app/components/Product";
import React from "react";

export const metadata = {
  title: "Digital Products & Holiday Templates Collection",
  description:
    "Explore our complete catalog of festive printable party games, Christmas bingo packs, party invitations, and holiday greeting cards. Editable in Canva with instant download.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Digital Products & Holiday Templates Collection | CatchyDeals",
    description:
      "Explore printable party games, Christmas bingo, invitations, and holiday cards with instant Canva access.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <main className="py-8">
      <Product />
    </main>
  );
}
