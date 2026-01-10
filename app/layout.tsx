'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollIndicator from "@/components/layout/scroll-indicator";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "3DGEOSCAN - professional 3d geospatial scanning",
  description: "professional 3d geospatial scanning solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html lang="en" className={isHomePage ? "snap-y snap-mandatory scroll-smooth" : "scroll-smooth"}>
      <body className={`${inter.className} overflow-y-scroll`}>
        <Navbar />
        <ScrollIndicator />
        <main className=" w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}