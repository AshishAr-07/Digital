import Wrapper from "@/app/components/Wrapper";
import React from "react";

export default function page() {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <Wrapper className="w-full border-2 flex flex-col gap-4 lg:px-12">
          <span className="text-2xl uppercase font-bold">Privacy Policy</span>
          <p>
            We value your privacy and are committed to protecting your personal
            data. This policy explains how we collect, use, and safeguard your
            information when you purchase our digital greetings, games, and
            templates.
          </p>
          <span className="text-xl mt-4 font-bold">Information We Collect</span>
          <span className="flex flex-col gap-1">
            <p>Personal Information: Name and email address.</p>
            <p>
              Transaction Data: Details about payments and products purchased
              (Note: We do not store credit card numbers; these are processed
              securely by our payment providers).
            </p>
            <p>
              Technical Data: IP address, browser type, and usage data via
              cookies.
            </p>
          </span>

          <span className="text-xl mt-4 font-bold">
            Customer Support
          </span>
          <p>
          To assist you with accessing your digital templates.
          </p>

          <span className="text-xl mt-4 font-bold">Third-Party Services</span>
          <span className="flex flex-col gap-1">
           <p>Payment Processors: Razorpay to handle transactions.</p>
           <p>Canva: You will be directed to Canva.com to edit your templates. Their use of your data is governed by their own Privacy Policy.</p>
          </span>

          <span className="text-xl mt-4 font-bold">Cookies</span>
          <p>
           We use cookies to improve your shopping experience and analyze website traffic. You can choose to disable cookies through your browser settings, though this may affect site functionality.
          </p>

        </Wrapper>
      </div>
      <div className="py-12"></div>
    </>
  );
}
