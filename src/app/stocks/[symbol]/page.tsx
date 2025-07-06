"use client";
import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import StockChart from "@/components/StockChart";

// Mock data for fallback (add all Most Actives tickers)
const mockData: Record<string, any> = {
  TSLA: {
    symbol: 'TSLA', name: "Tesla, Inc.", price: 315.35, change: -0.30, changePct: -0.10, afterHours: 312.67, afterHoursChange: -2.68, afterHoursChangePct: -0.85, prevClose: 315.65, open: 317.95, bid: "314.96 x 100", ask: "315.44 x 100", dayRange: "312.76 - 318.45", wkRange: "182.00 - 488.54", volume: "58,042,302", avgVolume: "118,500,386", marketCap: "1.016T", pe: "182.28", beta: "2.46", eps: "1.73", earnings: "Jul 21, 2025 - Jul 25, 2025", sector: "Auto Manufacturers / Consumer Cyclical", wkChange: 24.67, target: 306.07, exchange: "NasdaqGS", currency: "USD", atClose: "July 3 at 1:00:00 PM EDT", afterHoursTime: "July 3 at 4:59:58 PM EDT", history: [ { date: '2024-07-01', close: 314.00 }, { date: '2024-07-02', close: 316.00 }, { date: '2024-07-03', close: 315.35 }, ], },
  NVDA: {
    symbol: 'NVDA', name: "NVIDIA Corporation", price: 159.34, change: 2.09, changePct: 1.33, afterHours: 158.00, afterHoursChange: -1.34, afterHoursChangePct: -0.84, prevClose: 157.25, open: 160.00, bid: "158.90 x 100", ask: "159.50 x 100", dayRange: "157.80 - 160.50", wkRange: "120.00 - 180.00", volume: "142,314,000", avgVolume: "239,365,000", marketCap: "3.886T", pe: "51.23", beta: "1.80", eps: "5.12", earnings: "Aug 15, 2025", sector: "Semiconductors / Technology", wkChange: 24.29, target: 170.00, exchange: "NasdaqGS", currency: "USD", atClose: "July 3 at 1:00:00 PM EDT", afterHoursTime: "July 3 at 4:59:58 PM EDT", history: [ { date: '2024-07-01', close: 158.00 }, { date: '2024-07-02', close: 159.00 }, { date: '2024-07-03', close: 159.34 }, ], },
  // ...add all other Most Actives tickers here...
};

export default function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(params);
  const [stock, setStock] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasHoldings, setHasHoldings] = useState(false);
  const [range, setRange] = useState<'1M' | '3M' | '1Y' | 'ALL'>('1M');
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    fetch(`/api/quote?symbol=${encodeURIComponent(symbol)}&history=1`)
      .then(res => res.json())
      .then(data => {
        if (ignore) return;
        if (data.error) {
          if (mockData[symbol.toUpperCase()]) {
            setStock(mockData[symbol.toUpperCase()]);
            setError("Live data unavailable, showing fallback.");
          } else {
            setError("Data unavailable for this symbol.");
            setStock(null);
          }
        } else {
          setStock({ ...data, name: mockData[symbol.toUpperCase()]?.name || symbol, ...mockData[symbol.toUpperCase()] });
        }
      })
      .catch(() => {
        if (ignore) return;
        if (mockData[symbol.toUpperCase()]) {
          setStock(mockData[symbol.toUpperCase()]);
          setError("Live data unavailable, showing fallback.");
        } else {
          setError("Data unavailable for this symbol.");
          setStock(null);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, [symbol]);

  // Helper to filter history by range
  function filterHistory(history: any[], range: string) {
    if (!history) return [];
    const now = new Date();
    let cutoff: Date;
    switch (range) {
      case '1M':
        cutoff = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case '3M':
        cutoff = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case '1Y':
        cutoff = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      case 'ALL':
      default:
        return history;
    }
    return history.filter(h => new Date(h.date) >= cutoff);
  }

  if (loading) {
    return <div className="container mx-auto py-10 pt-24 text-xs text-white/80">Loading...</div>;
  }
  if (!stock) {
    return <div className="container mx-auto py-10 pt-24 text-xs text-red-400">{error || "Data unavailable."}</div>;
  }

  return (
    <div className="container mx-auto py-10 pt-24 text-xs">
      <Link href="/markets/most-actives" className="text-blue-400 hover:underline mb-4 inline-block">&larr; Back to Most Actives</Link>
      {error && <div className="mb-2 text-xs text-yellow-400">{error}</div>}
      {/* Header Section */}
      <div className="mb-2">
        <div className="text-[11px] text-white/60 mb-1">
          {stock.exchange || ""} - {stock.exchange || ""} Real Time Price &bull; {stock.currency || "USD"}
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-white">
            {stock.name} <span className="text-blue-400">({symbol.toUpperCase()})</span>
          </h1>
          <button
            className={`border border-neutral-400 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${isFollowing ? 'bg-blue-400 text-white border-blue-400' : 'bg-black text-white'}`}
            onClick={() => setIsFollowing(f => !f)}
            aria-pressed={isFollowing}
          >
            {isFollowing ? '★ Following' : '☆ Follow'}
          </button>
          <button
            className={`border border-neutral-400 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${hasHoldings ? 'bg-blue-400 text-white border-blue-400' : 'bg-black text-white'}`}
            onClick={() => setHasHoldings(h => !h)}
            aria-pressed={hasHoldings}
          >
            + {hasHoldings ? 'In Holdings' : 'Add holdings'}
          </button>
        </div>
        <hr className="border-neutral-800 mb-2" />
        <div className="flex flex-wrap items-end gap-6 mb-2">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{stock.price?.toFixed(2) ?? "--"}</span>
              <span className={
                (stock.change > 0 ? "text-green-400" : stock.change < 0 ? "text-red-400" : "text-white/80") + " text-xl font-semibold"
              }>
                {stock.change > 0 ? "+" : ""}{stock.change} ({stock.changePct > 0 ? "+" : ""}{stock.changePct}%)
              </span>
            </div>
            <div className="text-[11px] text-white/60">At close: {stock.atClose || "--"}</div>
          </div>
          <div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-white">{stock.afterHours?.toFixed(2) ?? "--"}</span>
              <span className={
                (stock.afterHoursChange > 0 ? "text-green-400" : stock.afterHoursChange < 0 ? "text-red-400" : "text-white/80") + " text-lg font-semibold"
              }>
                {stock.afterHoursChange > 0 ? "+" : ""}{stock.afterHoursChange} ({stock.afterHoursChangePct > 0 ? "+" : ""}{stock.afterHoursChangePct}%)
              </span>
            </div>
            <div className="text-[11px] text-white/60">After hours: {stock.afterHoursTime || "--"}</div>
          </div>
        </div>
      </div>
      {/* Chart and Stats Section */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
        <div className="flex-1 min-w-[300px]">
          {/* Range buttons */}
          <div className="flex gap-2 mb-2">
            {['1M', '3M', '1Y', 'ALL'].map(r => (
              <button
                key={r}
                className={`px-2 py-1 rounded text-xs font-semibold border border-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${range === r ? 'bg-blue-400 text-white border-blue-400' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}
                onClick={() => {
                  setChartLoading(true);
                  setRange(r as any);
                  setTimeout(() => setChartLoading(false), 300); // Simulate loading
                }}
                aria-pressed={range === r}
              >
                {r}
              </button>
            ))}
          </div>
          <StockChart
            history={filterHistory(stock.history, range)}
            loading={chartLoading}
            error={null}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-neutral-900 rounded-lg p-4 mb-4 border border-neutral-800">
        <div><span className="text-white/80">Previous Close:</span> <span className="text-white font-semibold">{stock.prevClose ?? "--"}</span></div>
        <div><span className="text-white/80">Open:</span> <span className="text-white font-semibold">{stock.open ?? "--"}</span></div>
        <div><span className="text-white/80">Bid:</span> <span className="text-white font-semibold">{stock.bid ?? "--"}</span></div>
        <div><span className="text-white/80">Ask:</span> <span className="text-white font-semibold">{stock.ask ?? "--"}</span></div>
        <div><span className="text-white/80">Day's Range:</span> <span className="text-white font-semibold">{stock.dayRange ?? "--"}</span></div>
        <div><span className="text-white/80">52 Week Range:</span> <span className="text-white font-semibold">{stock.wkRange ?? "--"}</span></div>
        <div><span className="text-white/80">Volume:</span> <span className="text-white font-semibold">{stock.volume ?? "--"}</span></div>
        <div><span className="text-white/80">Avg. Volume:</span> <span className="text-white font-semibold">{stock.avgVolume ?? "--"}</span></div>
        <div><span className="text-white/80">Market Cap:</span> <span className="text-white font-semibold">{stock.marketCap ?? "--"}</span></div>
        <div><span className="text-white/80">P/E Ratio (TTM):</span> <span className="text-white font-semibold">{stock.pe ?? "--"}</span></div>
        <div><span className="text-white/80">Beta (5Y):</span> <span className="text-white font-semibold">{stock.beta ?? "--"}</span></div>
        <div><span className="text-white/80">EPS (TTM):</span> <span className="text-white font-semibold">{stock.eps ?? "--"}</span></div>
        <div><span className="text-white/80">Earnings Date:</span> <span className="text-white font-semibold">{stock.earnings ?? "--"}</span></div>
        <div><span className="text-white/80">1y Target Est:</span> <span className="text-white font-semibold">{stock.target ?? "--"}</span></div>
        <div><span className="text-white/80">Sector:</span> <span className="text-white font-semibold">{stock.sector ?? "--"}</span></div>
        <div><span className="text-white/80">52 Wk Change %:</span> <span className={stock.wkChange > 0 ? "text-green-400 font-semibold" : stock.wkChange < 0 ? "text-red-400 font-semibold" : "text-white font-semibold"}>{stock.wkChange > 0 ? "+" : ""}{stock.wkChange ?? "--"}%</span></div>
      </div>
    </div>
  );
} 