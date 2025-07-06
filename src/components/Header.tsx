"use client";
import Link from 'next/link';
import { FaChartLine, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const navLinks = [
  { href: '/stocks', label: 'Stock Tracker' },
  { href: '/about', label: 'About' },
];

const marketsLinks = [
  { label: 'Stocks: Most Actives', href: '/markets/most-actives' },
  { label: 'Stocks: Gainers', href: '/markets/gainers' },
  { label: 'Stocks: Losers', href: '/markets/losers' },
  { label: 'Trending Tickers', href: '/markets/trending' },
  { label: 'Futures', href: '/markets/futures' },
  { label: 'World Indices', href: '/markets/indices' },
  { label: 'US Treasury Bonds', href: '/markets/treasury-bonds' },
  { label: 'Currencies', href: '/markets/currencies' },
  { label: 'Crypto', href: '/markets/crypto' },
  { label: 'Top ETFs', href: '/markets/etfs' },
  { label: 'Top Mutual Funds', href: '/markets/mutual-funds' },
  { label: 'Options: Highest Open Int.', href: '/markets/options-highest-oi' },
  { label: 'Options: Highest Implied Vol.', href: '/markets/options-highest-iv' },
  { label: 'Sectors', href: '/markets/sectors' },
  { label: 'Basic Materials', href: '/markets/basic-materials' },
  { label: 'Communication Services', href: '/markets/communication-services' },
  { label: 'Consumer Cyclical', href: '/markets/consumer-cyclical' },
  { label: 'Consumer Defensive', href: '/markets/consumer-defensive' },
  { label: 'Energy', href: '/markets/energy' },
  { label: 'Financial Services', href: '/markets/financial-services' },
  { label: 'Healthcare', href: '/markets/healthcare' },
  { label: 'Industrials', href: '/markets/industrials' },
  { label: 'Real Estate', href: '/markets/real-estate' },
  { label: 'Technology', href: '/markets/technology' },
  { label: 'Utilities', href: '/markets/utilities' },
  { label: 'Private Companies', href: '/markets/private-companies' },
];

const enabledMarkets = ['/markets/most-actives']; // Only this link is enabled for now

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [marketsOpen, setMarketsOpen] = useState(false);
  const [marketsMobileOpen, setMarketsMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click or Esc
  useEffect(() => {
    function handle(e: MouseEvent | KeyboardEvent) {
      if (e instanceof KeyboardEvent && e.key === 'Escape') {
        setMenuOpen(false);
        setMarketsOpen(false);
        setMarketsMobileOpen(false);
      }
      if (e instanceof MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
        if (marketsRef.current && !marketsRef.current.contains(e.target as Node)) setMarketsOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('keydown', handle);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-card shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 relative">
        {/* Left: Logo only */}
        <div className="flex items-center min-w-0">
          <Link href="/" className="flex items-center gap-2 text-blue-400 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors hover:text-blue-300" aria-label="Go to home page">
            <FaChartLine className="text-3xl" />
            <span className="text-base font-bold text-white tracking-tight ml-1">StockTracker</span>
          </Link>
        </div>
        {/* Right: Navigation links */}
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-6 text-white font-medium items-center">
            <li className="relative">
              <button
                className={
                  "flex items-center gap-1 px-2 py-1 rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors " +
                  (marketsOpen ? "text-blue-400" : "")
                }
                aria-haspopup="true"
                aria-expanded={marketsOpen}
                aria-controls="markets-menu"
                onClick={() => setMarketsOpen((v) => !v)}
                tabIndex={0}
              >
                Markets <FaChevronDown className="w-3 h-3" />
              </button>
              {marketsOpen && (
                <div
                  ref={marketsRef}
                  id="markets-menu"
                  className="absolute left-0 top-full mt-2 bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-3 flex flex-wrap gap-4 z-50 min-w-[600px]"
                  role="menu"
                  aria-label="Markets submenu"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                    {marketsLinks.map((item) => {
                      const enabled = enabledMarkets.includes(item.href);
                      return enabled ? (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-xs text-black dark:text-white hover:text-blue-400 dark:hover:text-blue-400 px-2 py-1 rounded transition-colors"
                          role="menuitem"
                          tabIndex={0}
                          onClick={() => setMarketsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span
                          key={item.href}
                          className="block text-xs text-neutral-400 px-2 py-1 rounded cursor-not-allowed opacity-60 select-none"
                          role="menuitem"
                          aria-disabled="true"
                          tabIndex={-1}
                        >
                          {item.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </li>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors px-2 py-1">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
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
                <li>
                  <button
                    className="flex items-center gap-1 px-2 py-1 rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors w-full text-left"
                    aria-haspopup="true"
                    aria-expanded={marketsMobileOpen}
                    aria-controls="markets-mobile-menu"
                    onClick={() => setMarketsMobileOpen((v) => !v)}
                  >
                    Markets <FaChevronDown className={marketsMobileOpen ? "rotate-180 transition-transform" : "transition-transform"} />
                  </button>
                  {marketsMobileOpen && (
                    <div
                      id="markets-mobile-menu"
                      className="mt-2 bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-3 flex flex-col gap-1"
                      role="menu"
                      aria-label="Markets submenu"
                    >
                      {marketsLinks.map((item) => {
                        const enabled = enabledMarkets.includes(item.href);
                        return enabled ? (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-xs text-black dark:text-white hover:text-blue-400 dark:hover:text-blue-400 px-2 py-1 rounded transition-colors"
                            role="menuitem"
                            tabIndex={0}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span
                            key={item.href}
                            className="block text-xs text-neutral-400 px-2 py-1 rounded cursor-not-allowed opacity-60 select-none"
                            role="menuitem"
                            aria-disabled="true"
                            tabIndex={-1}
                          >
                            {item.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </li>
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