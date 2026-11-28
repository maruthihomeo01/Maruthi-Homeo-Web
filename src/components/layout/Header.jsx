import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../context';
import BrandLogo from '../common/BrandLogo';

export default function Header() {
  const { activePage, navigateTo } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastScrollY.current;

        if (currentY < 60) {
          setIsVisible(true);
        } else if (diff > 6 && !mobileMenuOpen) {
          setIsVisible(false);
        } else if (diff < -6) {
          setIsVisible(true);
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-alabaster/95 backdrop-blur border-b border-sand transition-all duration-300 ease-in-out ${isVisible || mobileMenuOpen
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          aria-label="Maruthi Homoeo Home"
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none transition-transform hover:scale-[1.01]"
        >
          <BrandLogo variant="dark" size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted" aria-label="Primary Navigation">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`nav-link py-1 hover:text-saffron-600 transition-colors cursor-pointer ${isActive ? 'active text-sage-700 font-semibold border-b-2 border-saffron-500' : ''
                  }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Enquire / Order Medicines
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-sand text-ink hover:bg-sage-50 focus:outline-none"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sand bg-alabaster px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`mobile-nav-link w-full text-left block px-3 py-2 rounded-lg text-sm font-medium cursor-pointer ${isActive ? 'bg-saffron-50 text-saffron-600 border-l-4 border-saffron-500 font-semibold' : 'text-ink hover:bg-sage-50'
                  }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full text-center bg-saffron-500 hover:bg-saffron-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Enquire / Order Medicines
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
