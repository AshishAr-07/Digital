import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import { urbanist } from "./font";
import Footer from "./components/Footer";
import Icon from "./components/Icon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CatchyDeals | Digital Store",
  description: "We are committed to your holiday cheer by offering a wide range of high-quality digital templates and games at affordable prices. Explore our collection and find the perfect digital products to make your celebrations unforgettable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} antialiased`}
      >
        <ClerkProvider>
          <Icon/>
          <Navbar/>
          {children}
          <Footer/>
          </ClerkProvider>
      </body>
    </html>
  );
}
