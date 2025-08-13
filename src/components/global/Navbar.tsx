/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { colorPalette, imgSrc_h_2 } from "@/utils/variables";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isMobile?: boolean;
  isDropdownItem?: boolean;
}

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setShow(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
      setCatalogOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle click outside for desktop catalog
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        catalogRef.current &&
        !catalogRef.current.contains(event.target as Node)
      ) {
        setCatalogOpen(false);
      }
    }

    if (catalogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [catalogOpen]);

  // Handle mobile menu body scroll
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setMobileCatalogOpen(false);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileCatalogOpen(false);
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 overflow-visible
          ${show ? "translate-y-0" : "-translate-y-full"}
          ${isScrolled ? "shadow-lg backdrop-blur-sm" : ""}
        `}
        style={{
          background: `linear-gradient(135deg, #ffffff 0%, #f8fffe 25%, ${colorPalette.green1} 100%)`,
          borderBottom: `2px solid ${colorPalette.green5}`,
          maxWidth: "100vw",
        }}
      >
        <div
          className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${poppins.className}`}
        >
          <div className="flex items-center justify-between h-16 lg:h-20 w-full">
            {/* Logo */}
            <div className="flex-shrink-0 min-w-0">
              <Link href="/home" className="flex items-center group">
                <img
                  src={imgSrc_h_2}
                  alt="Robofly Logo"
                  className="h-8 sm:h-10 lg:h-12 xl:h-14 w-auto group-hover:scale-105 transition-transform duration-300"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-shrink-0">
              <NavLink href="/home">Home</NavLink>

              {/* Desktop Catalog Dropdown */}
              <div className="relative z-50" ref={catalogRef}>
                <button
                  className="flex items-center px-2 xl:px-3 py-2 text-sm xl:text-base font-medium rounded-lg transition-all duration-300 hover:bg-white/10 whitespace-nowrap"
                  style={{ color: colorPalette.white }}
                  onClick={() => setCatalogOpen(!catalogOpen)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setCatalogOpen(!catalogOpen);
                    }
                  }}
                  aria-haspopup="true"
                  aria-expanded={catalogOpen}
                >
                  Catalog
                  <FaChevronDown
                    className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                      catalogOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop Dropdown Menu */}
                {catalogOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[60] overflow-hidden">
                    <div className="py-1">
                      <NavLink
                        href="/products"
                        onClick={() => setCatalogOpen(false)}
                        isDropdownItem={true}
                      >
                        Products
                      </NavLink>
                      <NavLink
                        href="/services"
                        onClick={() => setCatalogOpen(false)}
                        isDropdownItem={true}
                      >
                        Services
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>

              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <NavLink href="/upcoming_services">
                <span className="hidden xl:inline">Upcoming Services</span>
                <span className="xl:hidden">Services</span>
              </NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex-shrink-0">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: colorPalette.white }}
                aria-label="Open main menu"
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, #f8fffe 25%, ${colorPalette.green1} 100%)`,
            }}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <Link
                href="/home"
                onClick={closeMobileMenu}
                className="flex items-center"
              >
                <img
                  src={imgSrc_h_2}
                  alt="Robofly Logo"
                  className="h-8 w-auto"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg transition-colors hover:bg-white/10 flex-shrink-0"
                style={{ color: colorPalette.white }}
                aria-label="Close menu"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col py-4 space-y-1 max-h-full overflow-y-auto">
              <NavLink href="/home" onClick={closeMobileMenu} isMobile={true}>
                Home
              </NavLink>

              {/* Mobile Catalog Section */}
              <div className="px-4">
                <button
                  className="flex items-center justify-between w-full py-3 text-left font-medium transition-colors rounded-lg hover:bg-white/10"
                  style={{ color: "#000000" }}
                  onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
                  aria-expanded={mobileCatalogOpen}
                >
                  Catalog
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
                      mobileCatalogOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile Catalog Items */}
                {mobileCatalogOpen && (
                  <div className="ml-4 mt-2 space-y-1">
                    <NavLink
                      href="/products"
                      onClick={closeMobileMenu}
                      isMobile={true}
                    >
                      Products
                    </NavLink>
                    <NavLink
                      href="/services"
                      onClick={closeMobileMenu}
                      isMobile={true}
                    >
                      Services
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink href="/blog" onClick={closeMobileMenu} isMobile={true}>
                Blog
              </NavLink>
              <NavLink
                href="/contact"
                onClick={closeMobileMenu}
                isMobile={true}
              >
                Contact
              </NavLink>
              <NavLink
                href="/upcoming_services"
                onClick={closeMobileMenu}
                isMobile={true}
              >
                Upcoming Services
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Navigation Link Component
function NavLink({
  href,
  children,
  onClick,
  isMobile,
  isDropdownItem,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  // Dropdown item styling
  if (isDropdownItem) {
    return (
      <Link
        href={href || "#"}
        onClick={onClick}
        className={`block px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 ${
          isActive
            ? "bg-gray-50 text-gray-900 border-l-4 border-green-500"
            : "text-gray-700"
        }`}
      >
        {children}
      </Link>
    );
  }

  // Mobile styling
  if (isMobile) {
    return (
      <Link
        href={href || "#"}
        onClick={onClick}
        className={`block px-4 py-3 text-base font-medium transition-colors rounded-lg mx-4 ${
          isActive ? "bg-white/20" : "hover:bg-white/10"
        }`}
        style={{ color: "#000000" }}
      >
        {children}
      </Link>
    );
  }

  // Desktop styling
  return (
    <Link
      href={href || "#"}
      onClick={onClick}
      className={`relative px-2 xl:px-3 py-2 text-sm xl:text-base font-medium rounded-lg transition-all duration-300 group whitespace-nowrap ${
        isActive ? "bg-white/10" : "hover:bg-white/10"
      }`}
      style={{ color: colorPalette.white }}
    >
      <span className="relative z-10">{children}</span>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-white/60 rounded-full" />
      )}

      {/* Hover indicator */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-white/40 rounded-full transition-all duration-300 ${
          isActive ? "w-0" : "w-0 group-hover:w-3/4"
        }`}
      />
    </Link>
  );
}
