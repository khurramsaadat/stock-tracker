export default function AboutPage() {
  return (
    <section className="container mx-auto py-16 text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-3">About StockTracker</h1>
      <p className="text-white/80 max-w-2xl mx-auto text-sm mb-4">
        <strong>Our Mission:</strong> Empowering investors with AI-driven insights and real-time data.
      </p>
      <p className="text-white/70 max-w-2xl mx-auto text-xs mb-4">
        StockTracker combines live market data with AI-powered company summaries and sentiment analysis, all in a fast, accessible, and privacy-friendly app. Whether you&apos;re a casual investor or a market enthusiast, our tools help you make smarter decisions.
      </p>
      <p className="text-white/60 max-w-2xl mx-auto text-xs">
        <em>Built with Next.js, React, and Tailwind CSS.</em>
      </p>
    </section>
  );
} 