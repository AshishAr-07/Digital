"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              aria-label="CatchyDeals Digital Store Home"
              className="group flex items-center gap-2"
            >
              <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-red-700 transition-colors">
                CatchyDeals{" "}
                <span className="font-semibold text-red-700">Digital</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2" aria-label="Main navigation">
            <Link
              href="/"
              className="text-gray-700 px-3.5 py-2 rounded-lg font-medium hover:text-red-700 hover:bg-red-50/60 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#catalog"
              className="text-gray-700 px-3.5 py-2 rounded-lg font-medium hover:text-red-700 hover:bg-red-50/60 transition-colors"
            >
              Templates & Games
            </Link>
            <Link
              href="/#how-it-works"
              className="text-gray-700 px-3.5 py-2 rounded-lg font-medium hover:text-red-700 hover:bg-red-50/60 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-gray-700 px-3.5 py-2 rounded-lg font-medium hover:text-red-700 hover:bg-red-50/60 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 px-3.5 py-2 rounded-lg font-medium hover:text-red-700 hover:bg-red-50/60 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop: Orders CTA */}
          <div className="hidden md:flex gap-3 items-center">
            <Link
              href="/orders"
              className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50/70 text-red-700 rounded-xl font-semibold text-sm py-2 px-4 hover:bg-red-700 hover:text-white transition-all duration-200 shadow-xs"
            >
              <span>📦</span>
              <span>My Orders</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/orders"
              className="border border-red-200 bg-red-50 text-red-700 rounded-lg font-semibold text-xs py-1.5 px-3 hover:bg-red-700 hover:text-white transition-colors"
            >
              My Orders
            </Link>
            <button
              type="button"
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-3 pb-5 space-y-1">
            <Link
              onClick={closeMenu}
              href="/"
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-800 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              Home
            </Link>
            <Link
              onClick={closeMenu}
              href="/#catalog"
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-800 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              Templates & Games
            </Link>
            <Link
              onClick={closeMenu}
              href="/#how-it-works"
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-800 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              How It Works
            </Link>
            <Link
              onClick={closeMenu}
              href="/about"
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-800 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              About
            </Link>
            <Link
              onClick={closeMenu}
              href="/contact"
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-800 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              Contact
            </Link>
            <Link
              onClick={closeMenu}
              href="/orders"
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
            >
              📦 My Orders
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;