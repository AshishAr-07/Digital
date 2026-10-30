import React from "react";
import Wrapper from "./Wrapper";
import Image from "next/image";
import Link from "next/link";
import { FaBolt, FaCheckCircle, FaPrint, FaPalette, FaFilePdf } from "react-icons/fa";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial from-red-50/80 via-white to-white border-b border-gray-100">
      {/* Subtle festive background gradients */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-red-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-amber-50/70 rounded-full blur-3xl pointer-events-none" />

      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Text & CTA Section */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-100/90 border border-red-200 rounded-full w-fit shadow-xs">
              <HiSparkles className="w-4 h-4 text-red-700" />
              <span className="text-xs sm:text-sm font-semibold text-red-800 tracking-wide">
                Instant PDF Downloads · Editable in Free Canva
              </span>
            </div>

            {/* Main Single H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12]">
              Printable Holiday Games &{" "}
              <span className="bg-linear-to-r from-red-700 via-red-600 to-amber-700 bg-clip-text text-transparent">
                Festive Templates
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Make your holiday celebrations unforgettable without shipping delays or party stress. Get instant access to printable Christmas bingo cards, 7-in-1 party game packs, and customizable Canva invitations. Print easily at home or share digitally in minutes!
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-base shadow-lg shadow-red-700/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
              >
                <span>Browse Games & Templates</span>
                <HiArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-red-600 font-semibold text-base transition-all duration-200 cursor-pointer"
              >
                How It Works
              </a>
            </div>

            {/* Transparent Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-200/80">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <FaFilePdf className="text-red-700 shrink-0" />
                <span>Print-Ready PDFs</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <FaPalette className="text-red-700 shrink-0" />
                <span>Free Canva Friendly</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <FaPrint className="text-red-700 shrink-0" />
                <span>Print or Share Online</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <FaCheckCircle className="text-red-700 shrink-0" />
                <span>No Account Needed</span>
              </div>
            </div>
          </div>

          {/* Right Visual Section: Professional Product Bundle Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Product Bundle Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <Image
                  src="/hero-showcase.jpg"
                  alt="CatchyDeals Printable Christmas Holiday Games, Bingo Sheets, and Canva-Editable Invitations Mockup"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Floating Badge 1 - Top Right: Canva Ready */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-gray-200/90 py-2.5 px-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
                  <FaPalette className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">100% Free Canva</p>
                  <p className="text-[10px] text-gray-500">Edit text & colors easily</p>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Left: Print at Home */}
              <div className="absolute -bottom-5 -left-2 sm:left-4 bg-white/95 backdrop-blur-md border border-gray-200/90 py-2.5 px-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                  <FaPrint className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">Instant Print & Play</p>
                  <p className="text-[10px] text-gray-500">Standard A4 / US Letter</p>
                </div>
              </div>

              {/* Floating Badge 3 - Bottom Right: Fast Delivery */}
              <div className="hidden sm:flex absolute -bottom-5 right-4 bg-white/95 backdrop-blur-md border border-gray-200/90 py-2.5 px-3.5 rounded-2xl shadow-xl items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-black">
                  ✓
                </span>
                <span className="text-xs font-bold text-gray-800">
                  Direct Link in Seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
