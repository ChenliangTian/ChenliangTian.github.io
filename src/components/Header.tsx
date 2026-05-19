'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'CV', href: '/cv' },
  { name: 'Logs', href: '/log' },
  { name: 'Life', href: '/life' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header suppressHydrationWarning={true} className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-sm dark:bg-brown/90 transition-colors duration-300">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold tracking-tight text-brown dark:text-cream font-heading hover:scale-105 transition-transform"
        >
          Chenliang<span className="text-pastel-pink">@WashU</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base lg:text-lg font-medium text-brown/80 hover:text-brown dark:text-cream/80 dark:hover:text-cream transition-colors font-heading"
            >
              {item.name}
            </Link>
          ))}
          <div className="pl-4 border-l-2 border-brown/10 dark:border-cream/10">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-brown dark:text-cream hover:bg-brown/10 dark:hover:bg-cream/10 transition-colors"
            aria-label="Toggle menu"
            suppressHydrationWarning={true}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" suppressHydrationWarning={true} />
            ) : (
              <Menu className="h-6 w-6" suppressHydrationWarning={true} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-brown/10 dark:border-cream/10 bg-cream/95 dark:bg-brown/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-lg font-medium text-brown/80 hover:text-brown dark:text-cream/80 dark:hover:text-cream hover:bg-brown/5 dark:hover:bg-cream/5 rounded-lg transition-colors font-heading"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
