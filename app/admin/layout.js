// app/admin/layout.js
export const metadata = {
  title: "Admin Dashboard | CatchyDeals",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }) {
  return children;
}
