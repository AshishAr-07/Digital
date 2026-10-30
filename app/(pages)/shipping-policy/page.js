import Wrapper from "@/app/components/Wrapper";
import React from "react";

export const metadata = {
  title: "Instant Digital Delivery & Shipping Policy | CatchyDeals",
  description:
    "Our products are 100% digital with immediate delivery. Learn how instant PDF download and Canva template links are delivered immediately after checkout.",
  alternates: {
    canonical: "/shipping-policy",
  },
  openGraph: {
    title: "Instant Digital Delivery & Shipping Policy | CatchyDeals",
    description: "Instant delivery policy for digital templates, Canva links, and printable games.",
    url: "/shipping-policy",
  },
};

export default function page() {
  return (
    <Wrapper>
      <h1 className="text-3xl font-bold mb-4">Shipping & Delivery Policy</h1>
     <div className="flex flex-col gap-2">
         <h2 className="text-xl font-semibold">
        For International and Domestic Buyers:
      </h2>
      <p>
        <span className="font-semibold">
          Shipping is not applicable for this business.
        </span>
        Since this website sells purely digital products (Canva templates, PDF
        games, and graphics), no physical goods will be shipped to your address.
      </p>
      <p>
        <span className="font-semibold">Delivery of Services:</span> Upon
        successful payment, you will receive an automated email containing your
        download links. You can also access your files immediately from the
        &ldquo;Order Success&rdquo; page.
      </p>
      <p>If you do not receive your digital delivery within 30 minutes, please contact us at <span className="font-semibold">digital.catchydeals@gmail.com</span> </p>
     </div>
    </Wrapper>
  );
}
