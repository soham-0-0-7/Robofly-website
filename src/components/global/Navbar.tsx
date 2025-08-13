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
  asButton?: boolean;
  isMobile?: boolean;
}

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShow(window.scrollY < lastScrollY || window.scrollY < 50);
      setLastScrollY(window.scrollY);
      setCatalogOpen(false); // Close catalog on scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  // Close mobile menu when clicking outside
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

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${show ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "shadow-lg" : ""}
      `}
      style={{
        background: `linear-gradient(135deg, #ffffff 0%, #f8fffe 25%, ${colorPalette.green1} 100%)`,
        borderBottom: `2px solid ${colorPalette.green5}`,
        color: colorPalette.white,
      }}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-4 py-3 ${poppins.className}`}
      >
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3 group">
          <img
            src={imgSrc_h_2}
            alt="Robofly Logo"
            className="h-10 md:h-16 group-hover:scale-110 transition-transform duration-300"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              background: "transparent",
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <NavLink href="/home">Home</NavLink>
          <div className="relative" ref={catalogRef}>
            <button
              className="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:text-green-200 hover:shadow-lg group text-sm sm:text-base flex items-center gap-1"
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: colorPalette.white,
              }}
              onClick={() => setCatalogOpen((open) => !open)}
              type="button"
              aria-haspopup="true"
              aria-expanded={catalogOpen}
            >
              <span className="relative z-10">Catalog</span>
              <FaChevronDown
                className={`ml-1 transition-transform duration-200 ${
                  catalogOpen ? "rotate-180" : ""
                }`}
                size={14}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
            </button>
            {catalogOpen && (
              <div
                className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black/10 z-50"
                style={{ minWidth: 180 }}
              >
                <DropdownLink
                  href="/products"
                  onClick={() => setCatalogOpen(false)}
                >
                  Products
                </DropdownLink>
                <DropdownLink
                  href="/services"
                  onClick={() => setCatalogOpen(false)}
                >
                  Services
                </DropdownLink>
              </div>
            )}
          </div>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/upcoming_services">Upcoming Services</NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden transition-colors p-2 rounded-lg hover:bg-white/20"
          style={{ color: colorPalette.white }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 right-0 w-80 max-w-[90vw] h-full shadow-2xl flex flex-col transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background: `linear-gradient(135deg, #ffffff 0%, #f8fffe 25%, ${colorPalette.green1} 100%)`,
            borderLeft: `2px solid ${colorPalette.green5}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4 border-b border-white/20">
            <button
              className="p-2 rounded-lg transition-colors hover:bg-white/20"
              style={{ color: colorPalette.white }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col p-4 space-y-2 overflow-y-auto">
            <NavLink
              href="/home"
              onClick={() => setMobileOpen(false)}
              isMobile={true}
            >
              Home
            </NavLink>

            {/* Mobile Catalog Dropdown */}
            <div className="flex flex-col">
              <button
                className="flex items-center justify-between w-full px-4 py-3 font-medium rounded-lg transition-colors hover:bg-white/10 text-left"
                style={{ color: colorPalette.white }}
                onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
                type="button"
                aria-haspopup="true"
                aria-expanded={mobileCatalogOpen}
              >
                <span>Catalog</span>
                <FaChevronDown
                  className={`transition-transform duration-200 ${
                    mobileCatalogOpen ? "rotate-180" : ""
                  }`}
                  size={14}
                />
              </button>

              {mobileCatalogOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  <NavLink
                    href="/products"
                    onClick={() => {
                      setMobileCatalogOpen(false);
                      setMobileOpen(false);
                    }}
                    isMobile={true}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    href="/services"
                    onClick={() => {
                      setMobileCatalogOpen(false);
                      setMobileOpen(false);
                    }}
                    isMobile={true}
                  >
                    Services
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              href="/blog"
              onClick={() => setMobileOpen(false)}
              isMobile={true}
            >
              Blog
            </NavLink>
            <NavLink
              href="/contact"
              onClick={() => setMobileOpen(false)}
              isMobile={true}
            >
              Contact
            </NavLink>
            <NavLink
              href="/upcoming_services"
              onClick={() => setMobileOpen(false)}
              isMobile={true}
            >
              Upcoming Services
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Navigation Link Component
function NavLink({
  href,
  children,
  onClick,
  asButton,
  isMobile,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  if (asButton) {
    return (
      <button
        type="button"
        className="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:text-green-200 hover:shadow-lg group text-sm sm:text-base"
        onClick={onClick}
        style={{
          background: "none",
          border: "none",
          outline: "none",
          color: colorPalette.white,
        }}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
    );
  }

  if (isMobile) {
    return (
      <Link
        href={href || "#"}
        onClick={onClick}
        className={`block w-full px-4 py-3 font-medium transition-colors rounded-lg text-left ${
          isActive ? "bg-white/20 text-white" : "hover:bg-white/10 text-white"
        }`}
        tabIndex={0}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href || "#"}
      onClick={onClick}
      className="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:text-green-200 hover:shadow-lg group text-sm sm:text-base"
      style={{ color: colorPalette.white }}
      tabIndex={0}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
      <div
        className={`absolute bottom-0 left-1/2 h-0.5 bg-green-300 transition-all duration-300 transform -translate-x-1/2 ${
          isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
        }`}
      ></div>
    </Link>
  );
}

// Dropdown Link for Catalog
function DropdownLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-5 py-3 transition-colors text-base font-medium rounded-lg hover:bg-green-50"
      style={{
        color: colorPalette.green2,
      }}
    >
      {children}
    </Link>
  );
}
