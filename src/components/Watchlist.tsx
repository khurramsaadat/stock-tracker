import React, { useEffect, useState } from 'react';

interface WatchlistProps {
  onSelect: (symbol: string) => void;
}

interface StockData {
  symbol: string;
  price: number | null;
  change: number | null;
  loading: boolean;
  error: string | null;
}

const WATCHLIST_KEY = 'stockTrackerWatchlist';

// Attach addSymbol as a static method to the Watchlist component
interface WatchlistComponent extends React.FC<WatchlistProps> {
  addSymbol?: (symbol: string) => void;
}

const DEFAULT_WATCHLIST = ["TSLA", "AAPL", "NVDA", "MSFT"];

const WatchlistComp: WatchlistComponent = function Watchlist({ onSelect }: WatchlistProps) {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [stocks, setStocks] = useState<Record<string, StockData>>({});
  // Hydration flag to avoid SSR/CSR mismatch
  const [hydrated, setHydrated] = useState(false);

  // On mount, load from localStorage or preload default
  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // If stored is empty array, keep as empty (user cleared list)
      setSymbols(Array.isArray(parsed) ? parsed : []);
    } else {
      setSymbols(DEFAULT_WATCHLIST);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(DEFAULT_WATCHLIST));
    }
    setHydrated(true);
  }, []);

  // Fetch current price for each symbol
  useEffect(() => {
    symbols.forEach(symbol => {
      setStocks(prev => ({
        ...prev,
        [symbol]: { symbol, price: null, change: null, loading: true, error: null },
      }));
      fetch(`/api/quote?symbol=${encodeURIComponent(symbol)}`)
        .then(res => res.json())
        .then(data => {
          setStocks(prev => ({
            ...prev,
            [symbol]: {
              symbol,
              price: data.price ?? null,
              change: data.change ?? null,
              loading: false,
              error: data.error || null,
            },
          }));
        })
        .catch(() => {
          setStocks(prev => ({
            ...prev,
            [symbol]: {
              symbol,
              price: null,
              change: null,
              loading: false,
              error: 'API error',
            },
          }));
        });
    });
  }, [symbols]);

  // Remove symbol from watchlist
  const removeSymbol = (symbol: string) => {
    const updated = symbols.filter(s => s !== symbol);
    setSymbols(updated);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  };

  // Add symbol to watchlist (exported for parent usage)
  WatchlistComp.addSymbol = (symbol: string) => {
    symbol = symbol.toUpperCase();
    setSymbols(prev => {
      if (prev.includes(symbol)) return prev;
      const updated = [...prev, symbol];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Reset watchlist to default stocks
  const resetWatchlist = () => {
    setSymbols(DEFAULT_WATCHLIST);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(DEFAULT_WATCHLIST));
  };

  return (
    <div className="bg-neutral-900 rounded-lg p-6 mt-6 shadow max-w-md mx-auto" aria-label="Watchlist" role="region">
      <h3 className="text-xl font-bold text-blue-300 mb-4">Watchlist</h3>
      {!hydrated ? (
        <div className="text-white/60 text-center">Loading…</div>
      ) : symbols.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-white/60 text-center">No stocks in your watchlist yet.</div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={resetWatchlist}
            aria-label="Load default stocks into watchlist"
          >
            Load Defaults
          </button>
          <span className="text-xs text-white/40 mt-1 text-center">
            Defaults: <span className="tracking-wider font-mono">TSLA, AAPL, NVDA, MSFT</span>
          </span>
        </div>
      ) : (
        <ul className="divide-y divide-neutral-800">
          {symbols.map(symbol => {
            const stock = stocks[symbol];
            if (!stock) {
              // Show loading or placeholder while fetching
              return (
                <li key={symbol} className="flex items-center justify-between py-2">
                  <span className="text-blue-400 font-semibold">{symbol}</span>
                  <span className="text-white/60 ml-2">Loading…</span>
                  <button
                    className="ml-4 text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                    onClick={() => removeSymbol(symbol)}
                    aria-label={`Remove ${symbol} from watchlist`}
                  >
                    &times;
                  </button>
                </li>
              );
            }
            return (
              <li key={symbol} className="flex items-center justify-between py-2">
                <button
                  className="text-blue-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
                  onClick={() => onSelect(symbol)}
                  aria-label={`View details for ${symbol}`}
                >
                  {symbol}
                </button>
                {stock?.loading ? (
                  <span className="text-white/60 ml-2">Loading…</span>
                ) : stock?.error ? (
                  <span className="text-red-400 ml-2">{stock.error}</span>
                ) : (
                  <span className={
                    stock.change && stock.change > 0
                      ? 'text-green-400 ml-2'
                      : stock.change && stock.change < 0
                      ? 'text-red-400 ml-2'
                      : 'text-white/80 ml-2'
                  }>
                    ${stock.price} {stock.change !== null && (
                      <>
                        ({stock.change > 0 ? '+' : ''}{stock.change})
                      </>
                    )}
                  </span>
                )}
                <button
                  className="ml-4 text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                  onClick={() => removeSymbol(symbol)}
                  aria-label={`Remove ${symbol} from watchlist`}
                >
                  &times;
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default WatchlistComp; 