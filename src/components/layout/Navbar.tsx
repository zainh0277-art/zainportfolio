'use client';

import { useState, useEffect } from 'react';
import { cn, scrollToSection } from '@/lib/utils';
import { navItems } from '@/data/navigation';
import { personalInfo } from '@/data/personal';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.replace('#', ''));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToSection(href.replace('#', ''));
  };

  const [firstName, lastName] = personalInfo.name.split(' ');

  // "solid" = white frosted glass with dark text. Active when scrolled,
  // or when the mobile menu is open (so the dropdown stays readable at the top).
  const solid = scrolled || menuOpen;

  const accent = solid ? 'text-blue-600' : 'text-blue-400';
  const barColor = solid ? 'bg-gray-900' : 'bg-white';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        solid
          ? 'bg-white/75 backdrop-blur-xl shadow-sm shadow-gray-900/5 border-b border-gray-200/60'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('#home')}
          className={cn(
            'font-bold text-xl tracking-tight cursor-pointer transition-all duration-300 hover:scale-105',
            solid ? 'text-gray-900' : 'text-white',
          )}
        >
          <span className={accent}>&lt;</span>
          {firstName} <span className={accent}>{lastName}</span>
          <span className={accent}>/&gt;</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'text-sm font-medium transition-colors relative py-1 cursor-pointer',
                  isActive
                    ? solid
                      ? 'text-blue-600'
                      : 'text-blue-300'
                    : solid
                      ? 'text-gray-600 hover:text-gray-900'
                      : 'text-gray-200 hover:text-white',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300',
                    solid ? 'bg-blue-600' : 'bg-blue-300',
                    isActive ? 'w-full' : 'w-0',
                  )}
                />
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick('#contact')}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 cursor-pointer"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={cn('w-6 h-0.5 mb-1.5 transition-all duration-300', barColor, menuOpen && 'rotate-45 translate-y-2')} />
          <div className={cn('w-6 h-0.5 mb-1.5 transition-all duration-300', barColor, menuOpen && 'opacity-0')} />
          <div className={cn('w-6 h-0.5 transition-all duration-300', barColor, menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 bg-white/85 backdrop-blur-xl',
          menuOpen ? 'max-h-96 border-t border-gray-200/60' : 'max-h-0',
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                'text-left text-base font-medium py-2 transition-colors cursor-pointer',
                activeSection === item.href.replace('#', '')
                  ? 'text-blue-600'
                  : 'text-gray-600',
              )}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-5 py-2.5 rounded-full text-center cursor-pointer"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}
