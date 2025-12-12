"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";

export function InfiniteMovingCardsDemo() {
  return (
    <div
      className="h-160 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-black dark:text-white">
        What Our Clients Say ?
      </h2>
      <p className="mb-12 max-w-md md:max-w-3xl text-center mx-auto" >Hear from those who have experienced the difference with Eimpika Pharmaceutical. Our clients share their positive experiences and how our quality products and exceptional service have made a significant impact on their health and well-being.</p>
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "I'm very picky about graphics, but the artwork on these greeting cards is just beautiful. High resolution, crisp lines, and very modern. Will definitely be back next year.",
    name: "Alison B.",
    rating: 5,
  },
  {
    quote:
      "I used to stress about ordering cards weeks in advance. This year, I bought a template and printed them at home. Professional results in minutes.",
    name: "Mark Jr.",
    rating: 5,
  },
  {
    quote: "I needed games and greetings for our Christmas Eve party. I found this site, it is awesome i got everything i needed in one place and the kids loved it!",
    name: "Mark Adams",
    rating: 5,
  },

];