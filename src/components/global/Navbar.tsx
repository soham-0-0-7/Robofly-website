'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import { colorPalette, imgSrc } from '@/utils/variables';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

interface DropdownLinkProps {
  href: string;
  children: React.ReactNode;
}

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setShow(true);
      } else {
        setShow(false);
      }
      
      // Change navbar background on scroll
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${poppins.className} text-white`}
      style={{
        backgroundColor: isScrolled 
          ? `${colorPalette.green2}f0` // Semi-transparent when scrolled
          : colorPalette.green2,
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(0,0,0,0.12)' 
          : '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
        >
          <div className="relative">
            <Image 
              src={imgSrc} 
              alt="Robofly Logo" 
              width={45} 
              height={45} 
              className="transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300"></div>
          </div>
          <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            ROBOFLY
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/upcoming_services">Upcoming Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          
          {/* Dropdown Menu */}
          <div className="group relative">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-green-200 hover:shadow-lg">
              <span className="font-medium">Catalog</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Content */}
            <div className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div 
                className="rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                style={{ 
                  backgroundColor: `${colorPalette.green2}f8`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                <DropdownLink href="/products">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                  </svg>
                  Products
                </DropdownLink>
                <DropdownLink href="/services">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Services
                </DropdownLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Navigation Link Component
function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:bg-white/10 hover:text-green-200 hover:shadow-lg group"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-300 transition-all duration-300 group-hover:w-3/4 transform -translate-x-1/2"></div>
    </Link>
  );
}

// Dropdown Link Component
function DropdownLink({ href, children }: DropdownLinkProps) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 group"
    >
      <span className="text-green-300 group-hover:text-green-200 transition-colors duration-300">
        {children}
      </span>
    </Link>
  );
}