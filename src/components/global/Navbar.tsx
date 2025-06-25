'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { colorPalette, imgSrc, imgSrc_h } from '@/utils/variables';
import { FaBars, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${show ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled ? 'shadow-lg' : ''}
      `}
      style={{
        background: colorPalette.green1,
        borderBottom: `2px solid ${colorPalette.green5}`,
        color: colorPalette.white,
      }}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 py-3 ${poppins.className}`}>
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3 group">
          <img
            src={imgSrc_h}
            alt="Robofly Logo"
            className="h-12 border-2 rounded-xl group-hover:scale-110 transition-transform duration-300 sm:h-10"
            style={{ borderColor: colorPalette.green5 }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/catalog">Catalog</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/upcoming-services">Upcoming Services</NavLink>
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
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-72 max-w-full h-full shadow-2xl flex flex-col p-8 gap-6 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
          <NavLink href="/home" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink href="/products" onClick={() => setMobileOpen(false)}>Products</NavLink>
          <NavLink href="/services" onClick={() => setMobileOpen(false)}>Services</NavLink>
          <NavLink href="/catalog" onClick={() => setMobileOpen(false)}>Catalog</NavLink>
          <NavLink href="/blog" onClick={() => setMobileOpen(false)}>Blog</NavLink>
          <NavLink href="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink>
          <NavLink href="/upcoming-services" onClick={() => setMobileOpen(false)}>Upcoming Services</NavLink>
        </div>
      </div>
    </nav>
  );
}

// Navigation Link Component
function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:text-green-200 hover:shadow-lg group text-sm sm:text-base"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className={`absolute bottom-0 left-1/2 h-0.5 bg-green-300 transition-all duration-300 transform -translate-x-1/2 ${isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'}`}></div>
    </Link>
  );
}