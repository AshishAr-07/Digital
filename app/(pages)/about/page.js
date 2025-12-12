import React from "react";
import Wrapper from "@/app/components/Wrapper";

export default function page() {
  return (
    <div className="bg-linear-to-b from-red-50 to-white">
      <Wrapper>
        {/* Our Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-700 flex items-center">
            <span className="text-4xl mr-3">📖</span>
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              Welcome to{" "}
              <span className="font-semibold text-red-700">
                CatchyDeals Digital Store
              </span>
              ! We are a digital design studio dedicated to making the holiday
              season stress-free and full of joy.
            </p>
            <p>
              The idea for this shop started with a simple realization: Holidays
              are magical, but the preparation can be overwhelming. Between
              shipping delays, out-of-stock decorations, and the rush of
              planning parties, the "fun" often gets lost in the "to-do" list.
            </p>
            <p>
              We wanted to change that. By combining creative design with modern
              technology, we created a collection of high-quality digital
              assets—from printable games to editable greeting cards—that you
              can access instantly, anywhere in the world.
            </p>
          </div>
        </div>

        {/* Our Promise Section */}
        <div className="bg-linear-to-br from-red-700 to-red-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
            <span className="text-4xl mr-3">🤝</span>
            Our Promise
          </h2>
          <div className="prose prose-lg max-w-none leading-relaxed space-y-4 text-white/95">
            <p>
              We are a small, passionate team of designers and developers based
              in India, serving customers globally. We believe that technology
              should bring families closer, which is why every product we sell
              is tested for ease of use.
            </p>
            <p>
              Whether you are a tech pro or a first-time Canva user, our
              products are designed to be simple, beautiful, and fun.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12 border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="text-3xl mr-4 mt-1">✨</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Quality First
                </h3>
                <p className="text-gray-600">
                  Every template is professionally designed and tested to ensure
                  it works flawlessly.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-3xl mr-4 mt-1">💰</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Affordable Magic
                </h3>
                <p className="text-gray-600">
                  Premium designs at prices everyone can afford, because joy
                  shouldn't break the bank.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-3xl mr-4 mt-1">🎯</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Customer Focused
                </h3>
                <p className="text-gray-600">
                  Your satisfaction drives everything we do. We're here to make
                  your celebrations special.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-3xl mr-4 mt-1">🌍</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Global Community
                </h3>
                <p className="text-gray-600">
                  Serving families worldwide with instant digital delivery, no
                  matter where you are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
