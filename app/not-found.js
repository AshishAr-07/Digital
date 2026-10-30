import Link from "next/link";
import Wrapper from "./components/Wrapper";

export const metadata = {
  title: "404 - Page Not Found | CatchyDeals Digital Store",
  description: "The page or digital template you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <Wrapper className="py-24">
      <div className="max-w-lg mx-auto text-center bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-sm">
        <span className="text-6xl mb-4 block" role="img" aria-label="Not found">
          📦
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The digital template or page you are looking for may have been moved or is no longer available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="border-2 border-red-700 text-red-700 hover:bg-red-50 font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
