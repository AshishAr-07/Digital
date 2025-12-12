"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Wrapper from "@/app/components/Wrapper";
import Counter from "@/app/components/Counter";
import Features from "@/app/components/Features";
import { InfiniteMovingCardsDemo } from "@/app/components/Testimonials";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/product?id=${slug}`);
      const data = await response.json();

      if (data.success) {
        setProduct(data.data);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      setError("Error fetching product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    // TODO: Implement payment logic
    console.log("Buy now clicked for:", product._id);
  };

  if (loading) {
    return (
      <Wrapper>
        <div className="text-center py-20">
          <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product...</p>
        </div>
      </Wrapper>
    );
  }

  if (error || !product) {
    return (
      <Wrapper>
        <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-200">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="inline-block bg-red-700 text-white rounded-xl py-3 px-8 hover:bg-red-800 transition-all font-semibold"
          >
            Back to Home
          </button>
        </div>
      </Wrapper>
    );
  }

  const discount =
    product.originalPrice && product.originalPrice !== product.salePrice
      ? Math.round(
          ((product.originalPrice - product.salePrice) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <>
      <Wrapper>
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center text-red-700 hover:text-red-800 mb-8 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-4/3 bg-red-50 rounded-2xl overflow-hidden border-2 border-gray-200">
              {product.imagesPath && product.imagesPath.length > 0 ? (
                <Image
                  src={product.imagesPath[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-8xl">📦</span>
                </div>
              )}

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  SAVE {discount}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.imagesPath && product.imagesPath.length > 1 && (
              <div className="flex gap-4 overflow-x-auto p-4 rounded-2xl border border-gray-200">
                {product.imagesPath.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative shrink-0 w-24 aspect-4/3 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-red-700 ring-1 ring-red-700 ring-opacity-50 scale-105"
                        : "border-gray-300 hover:border-red-500"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-bold text-red-700">
                  ${product.salePrice}
                </span>
                {product.originalPrice &&
                  product.originalPrice !== product.salePrice && (
                    <span className="text-2xl text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-semibold mb-3">Description</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Call to Action */}
            <div className="space-y-4 pt-6">
              <button
                onClick={handleBuyNow}
                className="w-full bg-red-700 text-white rounded-xl py-4 px-8 font-semibold text-lg hover:bg-red-800 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                🎉 Buy Now - Instant Download
              </button>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="font-semibold mb-4 flex items-center text-lg text-red-900">
                  <svg
                    className="w-6 h-6 mr-2 text-red-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  What's Included
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-3 text-green-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Instant digital download</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-3 text-green-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Direct link to editable Canva template</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-3 text-green-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Lifetime access - use it year after year</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-3 text-green-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Works with FREE Canva account</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-3 text-green-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Easy to customize - no design skills needed</span>
                  </li>
                </ul>
              </div>

              {/* <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold mb-2 flex items-center text-blue-900">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  How it works
                </h3>
                <p className="text-sm text-blue-800">
                  After purchase, you'll receive an email with a PDF guide
                  containing a direct link to your Canva template. Click the
                  link, and it will automatically save to your Canva account
                  where you can edit and download it instantly!
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </Wrapper>
      <Counter />
      <Features />
      <InfiniteMovingCardsDemo />
    </>
  );
}
