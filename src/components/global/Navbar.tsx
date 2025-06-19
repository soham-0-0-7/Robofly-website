'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { colorPalette, imgSrc } from "@/utils/variables";
import { FaBars, FaTimes } from "react-icons/fa";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShow(window.scrollY < lastScrollY || window.scrollY < 50);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${show ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "shadow-lg" : ""}
      `}
      style={{
        background: colorPalette.green1,
        borderBottom: `2px solid ${colorPalette.greenJade}`,
        color: colorPalette.white,
      }}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 py-3 ${poppins.className}`}>
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3 group">
          <img
            src={imgSrc}
            alt="Robofly Logo"
            className="w-10 h-10 border-2"
          />
          <span
            className="text-2xl font-bold tracking-wide transition-colors"
            style={{ color: colorPalette.whiteSoft }}
          >
            Robofly
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/catalog">Catalog</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-greenNeon hover:text-green6 transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FaBars size={26} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-[${colorPalette.green2}] shadow-2xl flex flex-col p-8 gap-6 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          style={{
            background: colorPalette.green2,
            color: colorPalette.white,
            borderLeft: `2px solid ${colorPalette.greenNeon}`,
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="self-end mb-4 text-greenNeon hover:text-green6 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes size={26} />
          </button>
          <NavLink href="/home" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink href="/products" onClick={() => setMobileOpen(false)}>Products</NavLink>
          <NavLink href="/services" onClick={() => setMobileOpen(false)}>Services</NavLink>
          <NavLink href="/catalog" onClick={() => setMobileOpen(false)}>Catalog</NavLink>
          <NavLink href="/blog" onClick={() => setMobileOpen(false)}>Blog</NavLink>
          <NavLink href="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}

// Navigation Link Component
function NavLink({ href, children, onClick }: NavLinkProps & { onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-medium transition-colors duration-200
        hover:bg-[${colorPalette.green6}] hover:text-[${colorPalette.green1}]
        focus:outline-none focus:ring-2 focus:ring-[${colorPalette.greenNeon}]
      `}
      style={{
        color: colorPalette.white,
      }}
    >
      {children}
    </Link>
  );
}