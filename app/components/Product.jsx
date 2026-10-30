"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Wrapper from "./Wrapper";
import { FiSearch, FiSliders, FiArrowRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/product");
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const getProductCategory = (item) => {
    const title = (item.title || "").toLowerCase();
    if (title.includes("game") || title.includes("bingo") || title.includes("bundle")) {
      return "games";
    }
    if (title.includes("invitation") || title.includes("invite")) {
      return "invitations";
    }
    if (title.includes("greeting")) {
      return "greetings";
    }
    return "templates";
  };

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "games", label: "Party Games & Bingo" },
    { id: "invitations", label: "Party Invitations" },
    { id: "greetings", label: "Holiday Greetings" },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || getProductCategory(item) === selectedCategory;
      const matchesQuery =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="catalog" className="py-16 md:py-24 bg-white scroll-mt-16">
      <Wrapper>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200/80 px-3 py-1 rounded-full mb-3">
              <HiOutlineSparkles className="w-3.5 h-3.5" />
              <span>Instant Digital Downloads</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Curated Holiday Templates & Games
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-xl">
              All items include instant PDF download access and a direct link to edit effortlessly in your free Canva account.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 self-start md:self-end bg-gray-50 border border-gray-200 p-2 rounded-xl">
            <label
              htmlFor="product-currency"
              className="text-xs font-semibold text-gray-600 whitespace-nowrap pl-1"
            >
              Currency:
            </label>
            <select
              id="product-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-white px-3 py-1.5 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-800 hover:border-red-500 focus:outline-hidden focus:ring-1 focus:ring-red-500 cursor-pointer"
            >
              {Object.entries(currencies).map(([code, { symbol, name }]) => (
                <option key={code} value={code}>
                  {symbol} {code} ({name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-red-700 text-white shadow-md shadow-red-700/20"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] lg:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search templates, games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-hidden text-sm placeholder:text-gray-400 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4 animate-pulse"
              >
                <div className="aspect-4/3 bg-gray-200 rounded-xl" />
                <div className="h-5 bg-gray-200 rounded-md w-3/4" />
                <div className="h-4 bg-gray-200 rounded-md w-full" />
                <div className="h-8 bg-gray-200 rounded-md w-1/3" />
                <div className="h-11 bg-gray-200 rounded-xl w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-200 max-w-lg mx-auto">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-lg font-bold text-red-800 mb-1">Unable to Load Products</h3>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-red-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200 max-w-md mx-auto">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Matching Templates Found</h3>
            <p className="text-gray-600 text-sm mb-4">
              Try adjusting your search query or switching to another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-red-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const discount =
                product.originalPrice && product.originalPrice !== product.salePrice
                  ? Math.round(
                      ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
                    )
                  : 0;

              const categoryKey = getProductCategory(product);
              const categoryLabel =
                categoryKey === "games"
                  ? "Games & Activities"
                  : categoryKey === "invitations"
                  ? "Party Invitation"
                  : "Holiday Greeting";

              const imageSrc =
                product.imagesPath && product.imagesPath[0]
                  ? product.imagesPath[0]
                  : "/hero.webp";

              return (
                <article
                  key={product._id}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300 flex flex-col justify-between"
                >
                  <Link
                    href={`/product/${product._id}`}
                    className="block focus:outline-hidden"
                    aria-label={`View details for ${product.title}`}
                  >
                    {/* Image Container with Badges */}
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50">
                      <Image
                        src={imageSrc}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                        <span className="bg-white/95 backdrop-blur-xs text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs border border-gray-200">
                          {categoryLabel}
                        </span>
                        {discount > 0 && (
                          <span className="bg-green-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug mb-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {product.description}
                      </p>

                      {/* Price Section */}
                      <div className="flex items-baseline gap-2.5 pt-2 border-t border-gray-100">
                        <span className="text-2xl font-extrabold text-red-700">
                          {currencies[currency].symbol}
                          {convertPrice(product.salePrice)}
                        </span>
                        {product.originalPrice &&
                          product.originalPrice !== product.salePrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {currencies[currency].symbol}
                              {convertPrice(product.originalPrice)}
                            </span>
                          )}
                        <span className="ml-auto text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          Canva Ready
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Card Bottom Action */}
                  <div className="px-6 pb-6 pt-0">
                    <Link
                      href={`/product/${product._id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-red-700 group-hover:bg-red-800 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-200 shadow-sm"
                    >
                      <span>View Details & Buy</span>
                      <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Wrapper>
    </section>
  );
}
