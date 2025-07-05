import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center gap-6 bg-neutral-900 w-full">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">AI-Powered Stock Tracker</h1>
      <p className="text-lg md:text-2xl text-white/80 max-w-2xl mb-6">
        Track your favorite stocks, get AI-powered insights, and stay ahead in the market with real-time data and sentiment analysis.
      </p>
      <Link href="/stocks" className="px-6 py-3 bg-blue-400 text-white rounded-lg font-semibold text-lg shadow hover:bg-blue-500 transition-colors">
        Get Started
      </Link>
    </section>
  );
} 