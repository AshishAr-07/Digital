import React from "react";
import Wrapper from "./Wrapper";
import { FiCheckCircle, FiMousePointer, FiDownload, FiCreditCard } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Pick Your Template",
      description:
        "Select from printable Christmas party games, bingo packs, holiday invitations, or greeting cards tailored for your event.",
      icon: <FiMousePointer className="w-6 h-6 text-red-700" />,
    },
    {
      step: "02",
      title: "Fast Guest Checkout",
      description:
        "No signup or password required. Enter your name and email, and pay securely using Razorpay card, UPI, or net banking.",
      icon: <FiCreditCard className="w-6 h-6 text-red-700" />,
    },
    {
      step: "03",
      title: "Instant Canva & PDF Access",
      description:
        "Receive your order confirmation immediately on screen and via email. Open the direct Canva link or download print-ready PDFs right away.",
      icon: <FiDownload className="w-6 h-6 text-red-700" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white scroll-mt-16">
      <Wrapper>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
            How It Works in 3 Quick Steps
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            From discovering your favorite template to editing in Canva, the entire process takes less than two minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-50/70 border border-gray-200/90 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* Step Number */}
              <span className="text-5xl font-black text-gray-200 absolute top-6 right-6 select-none">
                {item.step}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-gray-200 flex items-center justify-center mb-6">
                {item.icon}
              </div>

              {/* Title & Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2.5">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Banner CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-red-50 border border-red-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-red-700 w-6 h-6 shrink-0" />
            <p className="text-sm text-gray-800 font-medium">
              Need to look up a past purchase? Access your Canva links anytime from{" "}
              <span className="font-bold text-red-700">My Orders</span> using just your email.
            </p>
          </div>
          <a
            href="/orders"
            className="whitespace-nowrap px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Check Orders →
          </a>
        </div>
      </Wrapper>
    </section>
  );
}
