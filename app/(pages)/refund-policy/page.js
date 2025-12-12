import Wrapper from "@/app/components/Wrapper";
import React from "react";

export default function page() {
  return (
    <Wrapper>
      <h1 className="text-3xl font-bold mb-4">
        {" "}
        Refund and Cancellation Policy
      </h1>
      <div className="flex flex-col gap-2">
        <p>
          No Refunds on Digital Downloads Due to the nature of digital products,
          which are instantly downloadable and accessible, we generally do not
          offer refunds or cancellations once the purchase is made.
        </p>
        <p>
          <span className="font-bold">Exceptions:</span>The file is technically
          corrupted and we are unable to provide a working replacement.
        </p>
        <p className="mt-4">
          How to Request a Refund If you believe you qualify for an exception,
          please email at<span className="font-semibold">digital.catchydeals@gmail.com</span> or fill up form on contact page
          with your Order ID and a description of the issue.
        </p>
      </div>
    </Wrapper>
  );
}
