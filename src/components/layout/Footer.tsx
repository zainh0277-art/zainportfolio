'use client';

import { personalInfo } from '@/data/personal';
import { navItems } from '@/data/navigation';
import { scrollToSection } from '@/lib/utils';

export default function Footer() {
  const year = new Date().getFullYear();
  const [firstName, lastName] = personalInfo.name.split(' ');

  return (
    <footer className="bg-[#0a0e3d] border-t border-white/10 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white font-bold text-xl">
          <span className="text-blue-400">&lt;</span>
          {firstName} <span className="text-blue-400">{lastName}</span>
          <span className="text-blue-400">/&gt;</span>
        </div>

        <nav className="flex flex-wrap gap-6 justify-center">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href.replace('#', ''))}
              className="text-gray-400 hover:text-blue-400 text-sm transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <p className="text-gray-500 text-sm">
          © {year} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
