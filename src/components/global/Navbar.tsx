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
}

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
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
            className="h-16 group-hover:scale-110 transition-transform duration-300 sm:h-14"
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
              style={{ background: "none", border: "none", outline: "none" }}
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
                <DropdownLink href="/products">Products</DropdownLink>
                <DropdownLink href="/services">Services</DropdownLink>
              </div>
            )}
          </div>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/upcoming_services">Upcoming Services</NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-green5 hover:text-green6 transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FaBars size={26} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-72 max-w-full h-full shadow-2xl flex flex-col p-8 gap-6 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background: colorPalette.green2,
            color: colorPalette.white,
            borderLeft: `2px solid ${colorPalette.green5}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="self-end mb-4 text-green5 hover:text-green6 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes size={26} />
          </button>
          <NavLink href="/home" onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <div className="flex flex-col">
            <button
              className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg hover:text-green-200 transition-colors"
              onClick={() => setCatalogOpen((open) => !open)}
              type="button"
              aria-haspopup="true"
              aria-expanded={catalogOpen}
            >
              <span>Catalog</span>
              <FaChevronDown
                className={`transition-transform duration-200 ${
                  catalogOpen ? "rotate-180" : ""
                }`}
                size={14}
              />
            </button>
            {catalogOpen && (
              <div className="flex flex-col ml-4 mt-1">
                <NavLink
                  href="/products"
                  onClick={() => {
                    setMobileOpen(false);
                    setCatalogOpen(false);
                  }}
                >
                  Products
                </NavLink>
                <NavLink
                  href="/services"
                  onClick={() => {
                    setMobileOpen(false);
                    setCatalogOpen(false);
                  }}
                >
                  Services
                </NavLink>
              </div>
            )}
          </div>
          <NavLink href="/blog" onClick={() => setMobileOpen(false)}>
            Blog
          </NavLink>
          <NavLink href="/contact" onClick={() => setMobileOpen(false)}>
            Contact
          </NavLink>
          <NavLink
            href="/upcoming-services"
            onClick={() => setMobileOpen(false)}
          >
            Upcoming Services
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

// Navigation Link Component
function NavLink({ href, children, onClick, asButton }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  if (asButton) {
    return (
      <button
        type="button"
        className="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:text-green-200 hover:shadow-lg group text-sm sm:text-base"
        onClick={onClick}
        style={{ background: "none", border: "none", outline: "none" }}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
    );
  }

  return (
    <Link
      href={href || "#"}
      onClick={onClick}
      className="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:text-green-200 hover:shadow-lg group text-sm sm:text-base"
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
      className="block px-5 py-3 transition-colors text-base font-medium rounded-lg"
      style={{
        color: colorPalette.green2,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colorPalette.green4;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </Link>
  );
}
