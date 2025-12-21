"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Wrapper from "@/app/components/Wrapper";
import Counter from "@/app/components/Counter";
import Features from "@/app/components/Features";
import { InfiniteMovingCardsDemo } from "@/app/components/Testimonials";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const slug = params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [processingPayment, setProcessingPayment] = useState(false);

  const currencies = {
    INR: { symbol: "₹", rate: 83.12, name: "Indian Rupee", razorpay: "INR" },
    USD: { symbol: "$", rate: 1, name: "US Dollar", razorpay: "USD" },
    EUR: { symbol: "€", rate: 0.92, name: "Euro", razorpay: "EUR" },
    GBP: { symbol: "£", rate: 0.79, name: "British Pound", razorpay: "GBP" },
    CAD: { symbol: "C$", rate: 1.36, name: "Canadian Dollar", razorpay: "CAD" },
    AUD: {
      symbol: "A$",
      rate: 1.53,
      name: "Australian Dollar",
      razorpay: "AUD",
    },
  };

  const convertPrice = (price) => {
    const converted = price * currencies[currency].rate;
    return currency === "JPY" ? Math.round(converted) : converted.toFixed(2);
  };

  const getActualPrice = (price) => {
    return price * currencies[currency].rate;
  };

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  const handleBuyNow = async () => {
    if (!isSignedIn) {
      alert("Please sign in to make a purchase");
      return;
    }

    if (!product) return;

    setProcessingPayment(true);

    try {
      const actualAmount = getActualPrice(product.salePrice);
      const razorpayCurrency = currencies[currency].razorpay || currency;

      // Create Razorpay order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: actualAmount,
          currency: razorpayCurrency,
          productId: product._id,
          productTitle: product.title,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }

      // Initialize Razorpay payment
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Digital Products",
        description: product.title,
        image: product.imagesPath?.[0] || "", // Optional: Add product image
        order_id: orderData.orderId,
        prefill: {
          name: user?.fullName || "",
          email: user?.emailAddresses?.[0]?.emailAddress || "",
          contact: "", // Add phone number if available
        },
        theme: {
          color: "#b91c1c", // red-700
        },
        handler: async function (response) {
          // Payment successful, verify and create order
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productId: product._id,
                email: user?.emailAddresses?.[0]?.emailAddress || "",
                name: user?.fullName || "Customer",
                amount: actualAmount,
                currency: razorpayCurrency,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              router.push("/orders");
            } else {
              throw new Error(
                verifyData.message || "Payment verification failed"
              );
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert(
              "Payment verification failed. Please contact support with your payment ID: " +
                response.razorpay_payment_id
            );
          } finally {
            setProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: function () {
            setProcessingPayment(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment: " + error.message);
      setProcessingPayment(false);
    }
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
        {/* Back Button and Currency Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center text-red-700 hover:text-red-800 transition-colors font-medium"
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
            <span className="hidden sm:inline">Back to Products</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label
              htmlFor="currency"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Currency:
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer hover:border-red-500 text-sm sm:text-base"
            >
              {Object.entries(currencies).map(([code, { symbol, name }]) => (
                <option key={code} value={code}>
                  {symbol} {code} - {name}
                </option>
              ))}
            </select>
          </div>
        </div>

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
              <div className="relative">
                {/* Left Arrow */}
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? product.imagesPath.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-3 h-3 text-red-700"
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
                </button>

                {/* Thumbnails Container */}
                <div className="flex gap-4 overflow-x-auto p-4 rounded-2xl border border-gray-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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

                {/* Right Arrow */}
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === product.imagesPath.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                  aria-label="Next image"
                >
                  <svg
                    className="w-3 h-3 text-red-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-900">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl lg:text-5xl font-bold text-red-700">
                  {currencies[currency].symbol}
                  {convertPrice(product.salePrice)}
                </span>
                {product.originalPrice &&
                  product.originalPrice !== product.salePrice && (
                    <span className="text-2xl text-gray-400 line-through">
                      {currencies[currency].symbol}
                      {convertPrice(product.originalPrice)}
                    </span>
                  )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-semibold mb-3">Description</h2>
              <p className="text-gray-600 text-justify text-lg leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Call to Action */}
            <div className="space-y-4 pt-6">
              <button
                onClick={handleBuyNow}
                disabled={processingPayment}
                className={`w-full bg-red-700 text-white rounded-xl py-4 px-8 font-semibold text-lg hover:bg-red-800 hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                  processingPayment ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {processingPayment ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "🎉 Buy Now - Instant Download"
                )}
              </button>

              {!isSignedIn && (
                <p className="text-sm text-center text-gray-600">
                  Please sign in to make a purchase
                </p>
              )}

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
