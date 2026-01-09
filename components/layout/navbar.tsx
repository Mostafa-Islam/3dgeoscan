"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About us", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Check if we're on the home page
  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navbar is solid if: scrolled OR not on home page
  const isSolid = scrolled || !isHomePage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isSolid ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="3d geoscan logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl">
              <span className="text-orange-500">3D</span>
              <span className={`${isSolid ? "text-gray-900" : "text-white"} font-bold`}> GEOSCAN</span>
            </span>
          </Link>

          {/* desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isSolid
                    ? "text-gray-900 hover:text-gray-700"
                    : "text-white/80 hover:text-white"
                } transition-colors text-sm font-medium`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* contact button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-[#E55C24] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Contact us
            </Link>
          </div>

          {/* mobile menu button */}
          <button
            className={`md:hidden ${isSolid ? "text-gray-900" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md rounded-lg p-4 mt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-white/80 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block mt-4 bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              contact us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}