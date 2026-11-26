import React from "react";
import Wrapper from "./Wrapper";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa6";
import { IoMailOutline, IoLocationOutline, IoCallOutline } from "react-icons/io5";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-gray-300 border-t border-gray-800">
      <Wrapper className="pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group"
              aria-label="CatchyDeals Home"
            >
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
                CatchyDeals <span className="text-red-500">Digital</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Your trusted destination for holiday party games, festive bingo bundles, customizable party invitations, and digital greetings. All designs are ready for instant download and 100% editable in free Canva.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Serving customers in USA, Canada, UK, Australia & worldwide.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-gray-400">
              <span className="inline-flex items-center gap-2">
                <IoMailOutline className="text-red-500 text-base shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </span>
              {/* <span className="inline-flex items-center gap-2">
                <IoCallOutline className="text-red-500 text-base shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </span> */}
              {/* <span className="inline-flex items-center gap-2">
                <IoLocationOutline className="text-red-500 text-base shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </span> */}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <IoIosArrowForward size={12} className="text-red-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalog"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <IoIosArrowForward size={12} className="text-red-500" />
                  Browse Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <IoIosArrowForward size={12} className="text-red-500" />
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-red-400"
                >
                  <IoIosArrowForward size={12} className="text-red-500" />
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Support & Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <IoIosArrowForward size={12} className="text-red-500" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <IoIosArrowForward size={12} className="text-red-500" />
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <IoIosArrowForward size={12} className="text-red-500" />
                  Delivery Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <IoIosArrowForward size={12} className="text-red-500" />
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Trust */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Connect With Us
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Follow our official channels for new holiday template releases and celebration ideas.
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CatchyDeals on Pinterest"
                className="w-9 h-9 rounded-full bg-red-600/90 hover:bg-red-600 flex items-center justify-center text-white transition-transform hover:scale-110"
              >
                <FaPinterest size={16} />
              </a>
            </div>
            <div className="pt-2 text-xs text-gray-400">
              <span className="block font-medium text-gray-300">🔒 Secure Guest Checkout</span>
              <span className="block text-[11px] text-gray-500">Instant access sent to your email</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} CatchyDeals Digital Store. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-gray-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-gray-300 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}