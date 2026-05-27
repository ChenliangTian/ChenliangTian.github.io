'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
    <header
      suppressHydrationWarning={true}
      className="sticky top-0 z-50 w-full bg-nav border-b border-foreground/10"
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
        {/* Logo — editorial wordmark */}
        <Link
          href="/"
          className="font-display font-normal text-2xl md:text-3xl tracking-tight text-foreground transition-colors hover:text-terracotta"
          aria-label="Home"
        >
          Chenliang Tian<span className="text-terracotta">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs lg:text-sm font-bold uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:text-terracotta"
            >
              {item.name}
            </Link>
          ))}
          <div className="pl-6 border-l border-foreground/15">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground hover:text-terracotta transition-colors"
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
        <nav className="md:hidden border-t border-foreground/10 bg-nav">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-sm font-bold uppercase tracking-[0.18em] text-foreground/85 hover:text-terracotta border-b border-foreground/10 last:border-b-0 transition-colors"
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
