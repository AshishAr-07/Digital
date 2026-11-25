"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Wrapper from "@/app/components/Wrapper";
import Features from "@/app/components/Features";

export default function ProductDetailClient({ initialProduct }) {
  const router = useRouter();
  const [product] = useState(initialProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [processingPayment, setProcessingPayment] = useState(false);

  // Guest checkout form
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const currencies = {
    INR: { symbol: "₹", rate: 83.12, name: "Indian Rupee" },
    USD: { symbol: "$", rate: 1, name: "US Dollar" },
    EUR: { symbol: "€", rate: 0.92, name: "Euro" },
    GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
    CAD: { symbol: "C$", rate: 1.36, name: "Canadian Dollar" },
    AUD: { symbol: "A$", rate: 1.53, name: "Australian Dollar" },
  };

  const convertPrice = (price) => {
    const converted = price * currencies[currency].rate;
    return converted.toFixed(2);
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!guestName.trim() || guestName.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters)";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guestEmail.trim() || !emailRegex.test(guestEmail.trim())) {
      errors.email = "Please enter a valid email address";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBuyNow = () => {
    if (!product) return;
    setShowCheckoutModal(true);
  };

  const handleProceedToPayment = async () => {
    if (!validateForm()) return;
    setShowCheckoutModal(false);
    await initiatePayment(guestName.trim(), guestEmail.trim().toLowerCase());
  };

  const initiatePayment = async (name, email) => {
    if (!product) return;
    setProcessingPayment(true);

    try {
      // Create Razorpay order (server fetches price from DB)
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency,
          productId: product._id,
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
        name: "CatchyDeals Digital Store",
        description: product.title,
        image: product.imagesPath?.[0] || "",
        order_id: orderData.orderId,
        prefill: {
          name,
          email,
          contact: "",
        },
        theme: {
          color: "#b91c1c",
        },
        handler: async function (response) {
          // Payment successful — verify on the server
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productId: product._id,
                email,
                name,
                currency,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Redirect to order confirmation
              const orderId = verifyData.data?.orderId;
              router.push(
                `/orders?orderId=${orderId}&email=${encodeURIComponent(email)}&status=success`
              );
            } else {
              throw new Error(verifyData.message || "Payment verification failed");
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

  const discount =
    product.originalPrice && product.originalPrice !== product.salePrice
      ? Math.round(
        ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
      )
      : 0;

  return (
    <>
      {/* Guest Checkout Modal */}
      {showCheckoutModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
        >
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="bg-red-700 p-6 rounded-t-2xl">
              <h2 id="checkout-modal-title" className="text-2xl font-bold text-white">
                🛒 Almost there!
              </h2>
              <p className="text-red-100 mt-1 text-sm">
                Enter your details to receive your purchase
              </p>
            </div>

            {/* Order Summary */}
            <div className="px-6 pt-5 pb-3 bg-gray-50 border-b border-gray-200">
              <div className="flex justify-between items-start text-sm">
                <span className="text-gray-600 line-clamp-1 flex-1 mr-2 font-medium">
                  {product.title}
                </span>
                <span className="font-bold text-gray-900 whitespace-nowrap">
                  {currencies[currency].symbol}
                  {convertPrice(product.salePrice)}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <span>⚡ Instant access delivered to your email</span>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProceedToPayment();
              }}
              className="p-6 space-y-4"
              noValidate
            >
              <div>
                <label
                  htmlFor="guest-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="guest-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                  }}
                  placeholder="Jane Doe"
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-hidden text-sm ${formErrors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                  autoFocus
                />
                {formErrors.name && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="guest-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  id="guest-email"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => {
                    setGuestEmail(e.target.value);
                    if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                  }}
                  placeholder="jane@example.com"
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-hidden text-sm ${formErrors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                />
                {formErrors.email && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-red-700 text-white rounded-xl font-semibold text-sm hover:bg-red-800 transition-colors shadow-md"
                >
                  Pay Now →
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 pt-1">
                🔒 No account required · Secured by Razorpay
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Main Product Container */}
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-md">
              <Image
                src={product.imagesPath?.[selectedImage] || "/hero.webp"}
                alt={`${product.title} - Preview`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.imagesPath?.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {product.imagesPath.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                      ? "border-red-700 shadow-md scale-105"
                      : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Purchase Action */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category / Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                  ⚡ Instant Digital Download
                </span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Canva Template
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                {product.title}
              </h1>

              {/* Pricing & Currency Switcher */}
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 mb-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-4xl font-extrabold text-red-700">
                    {currencies[currency].symbol}
                    {convertPrice(product.salePrice)}
                  </span>
                  {product.originalPrice && product.originalPrice !== product.salePrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {currencies[currency].symbol}
                      {convertPrice(product.originalPrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-sm font-semibold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                      Save {discount}%
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-200 text-sm">
                  <label htmlFor="currency-select" className="text-gray-600 font-medium">
                    Display Currency:
                  </label>
                  <select
                    id="currency-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-700 hover:border-red-500 focus:outline-hidden focus:ring-1 focus:ring-red-500"
                  >
                    {Object.entries(currencies).map(([code, { symbol, name }]) => (
                      <option key={code} value={code}>
                        {symbol} {code} - {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-sm text-gray-700 whitespace-pre-line leading-relaxed mb-6">
                {product.description}
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-4 pt-2">
              <button
                id="buy-now-btn"
                onClick={handleBuyNow}
                disabled={processingPayment}
                className={`w-full bg-red-700 text-white rounded-xl py-4 px-8 font-semibold text-lg hover:bg-red-800 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer shadow-lg shadow-red-700/25 ${processingPayment ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {processingPayment ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "🎉 Buy Now — Instant Download"
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                🔒 No account required · Secured by Razorpay
              </p>

              {/* What's Included */}
              <div className="bg-red-50/60 border border-red-200/80 rounded-xl p-5">
                <h3 className="font-semibold mb-3 flex items-center text-base text-red-900">
                  <svg className="w-5 h-5 mr-2 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  What&apos;s Included
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "Instant digital delivery immediately upon payment",
                    "Direct access to editable Canva template and Google Drive Links",
                    "Lifetime access — use it year after year",
                    "Canva Links works with 100% Free Canva accounts",
                    "Print at home or share digitally via messaging & social media",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <svg className="w-4 h-4 mr-2.5 text-green-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <Features />
    </>
  );
}
