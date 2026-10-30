"use client";

import { useState } from "react";
import Wrapper from "./Wrapper";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { faqsData } from "@/lib/faqs";

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200 py-2">
    <button
      onClick={onClick}
      className="w-full py-4 text-left flex justify-between items-center gap-4 cursor-pointer group"
      aria-expanded={isOpen}
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-red-700 transition-colors">
        {question}
      </h3>
      <span
        className={`shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-200 ${
          isOpen ? "rotate-180 bg-red-100 text-red-700" : "text-gray-500"
        }`}
      >
        <HiOutlineChevronDown className="w-4 h-4" />
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 pb-4" : "max-h-0"
      }`}
    >
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {answer}
      </p>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-gray-50/60 border-t border-gray-200/80">
      <Wrapper>
        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Left column - Header */}
          <div className="mb-10 lg:mb-0 lg:w-1/3 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100/80 border border-red-200 px-3 py-1 rounded-full">
              <FaRegCircleQuestion className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Have questions about how digital templates, Canva access, or printing work? Here are clear answers to common inquiries.
            </p>
            <div className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800 hover:underline"
              >
                Still have questions? Contact support →
              </a>
            </div>
          </div>

          {/* Right column - FAQ items */}
          <div className="lg:w-2/3 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
            <div className="divide-y divide-gray-100">
              {faqsData.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default FAQ;