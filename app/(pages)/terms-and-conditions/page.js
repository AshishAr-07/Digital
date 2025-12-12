import Wrapper from "@/app/components/Wrapper";
import React from "react";

export default function page() {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <Wrapper className="w-full border-2 flex flex-col gap-4 lg:px-12">
          <span className="text-2xl uppercase font-bold">
            Terms And Conditions
          </span>
          <p>
            Acceptance of Terms By purchasing and downloading digital products
            from our website, you agree to be bound by these Terms and
            Conditions.
          </p>
          <span className="text-xl mt-4 font-bold">Nature of Digital Products</span>
          <span className="flex flex-col gap-1">
            <p>Personal Information: Name and email address.</p>
            <p>
              Instant Download: All products are digital files (PDFs containing
              links to Canva templates or direct image downloads). No physical
              product will be shipped.
            </p>
            <p>
              Software Requirements: You confirm that you have the necessary
              software (e.g., a free Canva account, a PDF reader) to access and
              use these files.
            </p>
          </span>

          <span className="text-xl mt-4 font-bold">
            License & Usage (Intellectual Property)
          </span>
          <p>
            When you purchase a product, we grant you a non-exclusive,
            non-transferable, personal-use license.
          </p>

          <span className="flex flex-col gap-1">
            <p>
              You CAN: Use the template to create cards, games, or greetings for
              personal use (e.g., for your family, your own holiday party, or as
              a gift).
            </p>
            <p>
              You CANNOT: Resell, redistribute, or share the original digital
              file or Canva link with others. You cannot claim the design as
              your own or sell the template on other platforms (like Etsy or
              Creative Market).
            </p>
          </span>

          <span className="text-xl mt-4 font-bold">Refunds and Returns</span>
          <p>
            Due to the digital nature of our products, all sales are final. Once
            the files have been sent/downloaded, we cannot offer refunds,
            exchanges, or cancellations. If you have technical issues accessing
            a file, please contact support for assistance.
          </p>

          <span className="text-xl mt-4 font-bold">Third-Party Links (Canva)</span>
          <p>
            Our products utilize Canva.com. We are not affiliated with Canva.
            You acknowledge that your use of the Canva platform is subject to
            Canva&apos;s own Terms of Use.
          </p>

          <span className="text-xl mt-4 font-bold">Limitation of Liability</span>
          <p>
            Our Website shall not be liable for any indirect,
            incidental, or consequential damages arising from the use or
            inability to use our digital products.
          </p>
        </Wrapper>
      </div>
      <div className="py-12"></div>
    </>
  );
}
