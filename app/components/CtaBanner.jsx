import React from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

export default function CtaBanner() {
  return (
    <section className="py-16 md:py-20 bg-linear-to-br from-red-800 via-red-700 to-amber-900 text-white relative overflow-hidden">
      {/* Decorative festive circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-2xl pointer-events-none" />

      <Wrapper>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block text-xs uppercase tracking-widest font-bold bg-white/15 px-3.5 py-1 rounded-full text-red-100 border border-white/20">
            Instant Digital Access
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to Celebrate with Festive Games & Invitations?
          </h2>
          <p className="text-base sm:text-lg text-red-100 max-w-2xl mx-auto leading-relaxed">
            Download your party templates today. Customize colors, dates, and text in minutes with your free Canva account. No waiting for shipping!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href="#catalog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-red-700 hover:bg-red-50 font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Explore All Templates</span>
              <HiArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-transparent border-2 border-white/80 hover:bg-white/10 text-white font-semibold text-base transition-all duration-200"
            >
              Have a Question?
            </Link>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
