import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '[WORK]', href: '#work' },
    { name: '[ABOUT]', href: '#about' },
    { name: '[SKILLS]', href: '#skills' },
    { name: '[CONTACT]', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 md:px-8 pt-4 pb-2 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Clean Top-Left Brand Text */}
        <a
          href="#"
          className="pointer-events-auto px-4.5 py-2 rounded-full glass-nav hover:border-white/40 transition-all duration-300 group text-sm font-extrabold tracking-widest text-white uppercase"
        >
          SAMVITHA
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full glass-nav pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Badge / Connect Button */}
        <div className="hidden md:flex items-center gap-3 pointer-events-auto">
          <a
            href="mailto:samvithak7@gmail.com"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#D31820] font-bold text-xs hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden pointer-events-auto p-2.5 rounded-full glass-nav text-white hover:bg-white/10"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto mt-3 mx-auto max-w-sm rounded-2xl glass-card p-5 border border-white/20 shadow-2xl flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wider text-white/90 hover:text-white hover:bg-white/15 transition-all"
            >
              {link.name}
            </a>
          ))}
          <a
            href="mailto:samvithak7@gmail.com"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-xl bg-white text-[#D31820] font-bold text-xs tracking-wider"
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </header>
  );
}
