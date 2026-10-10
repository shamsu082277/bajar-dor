import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Hind_Siliguri,
} from "next/font/google";

import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CategoryNavbar from "@/components/shared/Navbar";
import Marquee from "@/components/shared/Marquee";
import { Toast } from "@heroui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাজার দর - বাংলাদেশের বাজারদর ও সর্বশেষ খবর",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable}`}
    >
      <body className="font-hind antialiased">
        {/* <Header />
        <CategoryNavbar/> */}
        <div suppressHydrationWarning={false} className="sticky top-0 z-50">
          <Toast.Provider placement="top end" />
          <Header />
          <CategoryNavbar />
        </div>
        <Marquee/>
        {children}
        <Footer />
      </body>
    </html>
  );
}