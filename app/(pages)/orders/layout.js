// app/(pages)/orders/layout.js
export const metadata = {
  title: "My Orders | CatchyDeals Digital Store",
  description: "View and access your purchased digital templates and games.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function OrdersLayout({ children }) {
  return children;
}
