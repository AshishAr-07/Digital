import React from "react";
import Hero from "./components/Hero";
import FAQ from "./components/Faq";
import Features from "./components/Features";
import { InfiniteMovingCardsDemo } from "./components/Testimonials";
import Counter from "./components/Counter";
import Product from "./components/Product";

export default function Page() {
  return (
    <>
      <Hero />
      <Product />
      <Features />
      <FAQ />
      <InfiniteMovingCardsDemo />
    </>
  );
}
