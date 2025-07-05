"use client";
import Link from 'next/link';
import { FaChartLine, FaBars, FaTimes } from 'react-icons/fa';
import StockSearch from './StockSearch';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/stocks', label: 'Stocks' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click or Esc
  useEffect(() => {
    if (!menuOpen) return;
    function handle(e: MouseEvent | KeyboardEvent) {
      if (e instanceof KeyboardEvent && e.key === 'Escape') setMenuOpen(false);
      if (e instanceof MouseEvent && menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', handle);
    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('keydown', handle);
    };
  }, [menuOpen]);

  const handleSearch = (symbol: string) => {
    if (symbol && symbol.trim()) {
      router.push(`/stocks?symbol=${encodeURIComponent(symbol.trim().toUpperCase())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-card shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 relative">
        {/* Left: Logo + nav links (desktop) */}
        <div className="flex items-center gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-2 text-blue-400 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors hover:text-blue-300" aria-label="Go to home page">
            <FaChartLine className="text-3xl" />
            <span className="hidden sm:inline">StockTracker</span>
          </Link>
          <ul className="hidden md:flex gap-6 text-white font-medium ml-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors px-2 py-1">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Center: Search bar (always visible) */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xl">
            <StockSearch onSearch={handleSearch} />
          </div>
        </div>
        {/* Right: Hamburger menu (mobile only) */}
        <div className="md:hidden flex items-center ml-2">
          <button
            className="text-blue-400 text-2xl p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-900/20"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 flex">
            <div ref={menuRef} className="bg-neutral-900 w-64 h-full p-6 flex flex-col gap-6 shadow-lg animate-slide-in-left" tabIndex={-1} aria-label="Mobile navigation menu">
              <button
                className="self-end text-blue-400 text-2xl p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-900/20"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
              >
                <FaTimes />
              </button>
              <ul className="flex flex-col gap-4 text-white font-medium mt-8">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors px-2 py-1 block" onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 