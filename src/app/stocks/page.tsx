"use client";
import { useState } from "react";
import StockSearch from "../../components/StockSearch";
import StockChart from "../../components/StockChart";
import CompanySummary from "../../components/CompanySummary";

export default function StocksPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stock, setStock] = useState<any>(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);

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
    } catch (err: any) {
      setError("Stock not found or API error.");
      setChartError("Unable to load chart data.");
    } finally {
      setLoading(false);
      setChartLoading(false);
    }
  };

  return (
    <section className="container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">Stock Tracker</h1>
      <StockSearch onSearch={handleSearch} />
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
          </div>
          <StockChart history={stock.history || []} loading={chartLoading} error={chartError} />
          <CompanySummary
            symbol={stock.symbol}
            price={stock.price}
            change={stock.change}
            changePercent={stock.changePercent}
          />
        </>
      )}
    </section>
  );
} 