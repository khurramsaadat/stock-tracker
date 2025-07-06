import Link from 'next/link';
import { FaChartLine } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 text-center gap-6 bg-neutral-900 w-full overflow-hidden">
      {/* Large background logo */}
      <FaChartLine className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 opacity-5 pointer-events-none z-0" style={{ fontSize: '40vw', minWidth: 400, minHeight: 400 }} />
      <div className="relative z-10 flex flex-col items-center gap-2 w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-400 mb-6">Stock Tracker</h1>
        <div className="w-full max-w-xl mx-auto mb-4">
          {/* Search bar placeholder (if you want to move the actual search bar here, import and use it) */}
        </div>
        <FaChartLine className="text-blue-400 text-4xl mb-2" />
        <h2 className="text-xl md:text-3xl font-bold text-blue-400 mb-2">Smarter Stock Tracking, Powered by AI</h2>
        <p className="text-sm md:text-lg text-white/80 max-w-2xl mb-2">
          Get real-time prices, AI-generated company insights, and sentiment analysis—all in a beautiful, modern dashboard. Build your personal watchlist and stay ahead of the market.
        </p>
        <ul className="flex flex-wrap justify-center gap-3 text-xs text-white/60 mb-4">
          <li>Real-time Data</li>
          <li>AI Summaries</li>
          <li>Sentiment Gauge</li>
          <li>Watchlist</li>
        </ul>
        <Link href="/stocks" className="px-6 py-2 bg-blue-400 text-white rounded-lg font-semibold text-sm shadow hover:bg-blue-500 transition-colors">
          Get Started
        </Link>
      </div>
    </section>
  );
} 