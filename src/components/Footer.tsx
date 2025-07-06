import Link from 'next/link';
import { FaChartLine, FaXTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 text-white/80 py-8 border-t border-background text-xs">
      <div className="container mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-8 px-4">
        {/* Left: Logo and copyright/socials */}
        <div className="flex flex-col items-start gap-3 min-w-[180px]">
          <div className="flex items-center gap-2 mb-1">
            <FaChartLine className="text-blue-400 text-xl" />
            <span className="font-bold text-base text-white">StockTracker</span>
          </div>
          <div className="text-[11px] text-white/60">&copy; {new Date().getFullYear()} StockTracker.<br />All rights reserved.</div>
          <div className="flex gap-3 mt-2">
            <a href="https://x.com" target="_blank" rel="noopener" aria-label="X" className="hover:text-blue-400"><FaXTwitter className="w-4 h-4" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-blue-400"><FaFacebook className="w-4 h-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-blue-400"><FaLinkedin className="w-4 h-4" /></a>
          </div>
        </div>
        {/* Columns */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold text-white text-xs mb-2">Quick Links</div>
            <ul className="space-y-1">
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/stocks" className="hover:text-blue-400">Stock Tracker</Link></li>
              <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
              <li><Link href="/markets/most-actives" className="hover:text-blue-400">Markets: Most Actives</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white text-xs mb-2">Features</div>
            <ul className="space-y-1">
              <li>Real-time Data</li>
              <li>AI Summaries</li>
              <li>Sentiment Gauge</li>
              <li>Watchlist</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white text-xs mb-2">Resources</div>
            <ul className="space-y-1">
              <li><Link href="/DOCS/CHANGELOG.md" className="hover:text-blue-400">Changelog</Link></li>
              <li><Link href="/DOCS/PROGRESS.md" className="hover:text-blue-400">Progress</Link></li>
              <li><Link href="/DOCS/PRD.md" className="hover:text-blue-400">PRD</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noopener" className="hover:text-blue-400">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 