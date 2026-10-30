import React from "react";
import Wrapper from "./Wrapper";
import { FaRocket, FaPaintBrush, FaPrint, FaShieldAlt } from "react-icons/fa";

export default function Features() {
  const benefits = [
    {
      title: "Instant Digital Delivery",
      description:
        "No waiting for shipping or postal delays. Receive your downloadable PDF guide and direct Canva template link immediately after checkout.",
      icon: <FaRocket className="w-6 h-6 text-red-700" />,
      badge: "Instant Access",
    },
    {
      title: "100% Free Canva Compatible",
      description:
        "No paid subscriptions needed. All templates are specifically formatted to work with free Canva accounts on desktop, laptop, or mobile.",
      icon: <FaPaintBrush className="w-6 h-6 text-red-700" />,
      badge: "Zero Hidden Costs",
    },
    {
      title: "Print or Share Digitally",
      description:
        "Print unlimited copies at home or via local print shops. Alternatively, download JPG/PNG images to send via email, text, or social media.",
      icon: <FaPrint className="w-6 h-6 text-red-700" />,
      badge: "Flexible Usage",
    },
    {
      title: "Secure Guest Checkout",
      description:
        "No mandatory accounts or passwords. Enter your name and email, pay securely with Razorpay, and access your templates in seconds.",
      icon: <FaShieldAlt className="w-6 h-6 text-red-700" />,
      badge: "256-Bit Encryption",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50/80 border-y border-gray-200/70">
      <Wrapper>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100/80 border border-red-200 px-3 py-1 rounded-full">
            Why Choose CatchyDeals
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
            Simple, Fun & Stress-Free Celebrations
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Everything you need to host unforgettable parties and send warm greetings without the hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}