import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBolt,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaPinterest, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

import Wrapper from "@/app/components/Wrapper";
import ContactForm from "@/app/components/ContacForm";

export default function ContactPage() {
  return (
    <>
      {/* Contact Information */}
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
              <FaMapMarkerAlt className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Address</h3>
            <p className="mb-2">
              Rzh-261 gali-08 Raj Nagar-2 ,Palam colony New Delhi, Delhi 110077
            </p>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
              <FaPhoneAlt className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Contact Details</h3>
            <p className="mb-2">Phone: +91-8368952040 </p>
            <p className="mb-2">Email: digital.catchydeals@gmail.com</p>
          </div>

          {/* Connect With Us */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
              <FaBolt className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <Link
                href="https://www.facebook.com/catchydeals07/"
                className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebookF className="h-5 w-5" />
              </Link>
              <Link
                href="https://in.pinterest.com/Catchydeals07"
                className="h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center text-white"
              >
                <span className="sr-only">Pinterest</span>
                <FaPinterest className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>

      {/* Map Section */}
      {/* <Wrapper>
        <iframe
          src="https://www.google.com/maps/embede"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Wrapper> */}
      <ContactForm />
    </>
  );
}
