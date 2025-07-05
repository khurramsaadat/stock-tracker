"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import StockChart from "../../components/StockChart";
import CompanySummary from "../../components/CompanySummary";
import SentimentMeter from "../../components/SentimentMeter";
import Watchlist from "../../components/Watchlist";

export default function StocksPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stock, setStock] = useState<{
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    open: number;
    prevClose: number;
    history?: { date: string; close: number }[];
  } | null>(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const handleSearch = async (symbol: string) => {
    setLoading(true);
    setError(null);
    setStock(null);
    setChartLoading(true);
    setChartError(null);
    try {
      const res = await fetch(`/api/quote?symbol=${encodeURIComponent(symbol)}&history=1`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API error');
      setStock(data);
      if (!data.history || data.history.length === 0) {
        setChartError("No historical data available for this symbol.");
      }
    } catch {
      setError("Stock not found or API error.");
      setChartError("Unable to load chart data.");
    } finally {
      setLoading(false);
      setChartLoading(false);
    }
  };

  // Auto-search if symbol is in query string
  useEffect(() => {
    const symbol = searchParams.get('symbol');
    if (symbol) {
      handleSearch(symbol);
    }
  }, [searchParams]);

  return (
    <section className="container mx-auto py-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar: Watchlist (desktop only) */}
        <aside className="hidden md:block md:w-80 flex-shrink-0">
          <Watchlist onSelect={handleSearch} />
        </aside>
        {/* Main content */}
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">Stock Tracker</h1>
          {loading && <p className="text-white/80">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {stock && (
            <>
              <div className="bg-neutral-900 rounded-lg p-6 mt-6 inline-block shadow text-left">
                <h2 className="text-2xl font-bold text-blue-400 mb-2">
                  ({stock.symbol})
                </h2>
                <div className="text-lg text-white mb-1">
                  Current Price: ${stock.price}
                </div>
                <div
                  className={
                    Number(stock.change) >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {Number(stock.change) >= 0 ? "+" : ""}
                  {stock.change} (
                  {Number(stock.changePercent) >= 0 ? "+" : ""}
                  {stock.changePercent}%)
                </div>
                <div className="text-white/70 text-sm mt-2">
                  High: {stock.high} | Low: {stock.low} | Open: {stock.open} | Prev Close: {stock.prevClose}
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg font-semibold shadow hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => {
                    if (typeof Watchlist.addSymbol === 'function') {
                      Watchlist.addSymbol(stock.symbol);
                    }
                  }}
                  aria-label={`Add ${stock.symbol} to watchlist`}
                >
                  Add to Watchlist
                </button>
              </div>
              <SentimentMeter changePercent={stock.changePercent} />
              <StockChart history={stock.history || []} loading={chartLoading} error={chartError} />
              <CompanySummary
                symbol={stock.symbol}
                price={stock.price}
                change={stock.change}
                changePercent={stock.changePercent}
              />
            </>
          )}
          {/* Watchlist for mobile (below main content) */}
          <div className="block md:hidden mt-8">
            <Watchlist onSelect={handleSearch} />
          </div>
        </div>
      </div>
    </section>
  );
} 