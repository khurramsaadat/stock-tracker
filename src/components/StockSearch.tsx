'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function StockSearch({ onSearch }: { onSearch: (symbol: string) => void }) {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSearch(symbol.trim().toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl mx-auto mb-8">
      <label htmlFor="stock-symbol" className="sr-only">Stock Symbol</label>
      <div className="relative flex-1 w-full">
        <input
          id="stock-symbol"
          type="text"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g. AAPL, TSLA)"
          className="flex-1 px-4 py-2 rounded-lg bg-card text-blue-500 border border-background focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10"
          maxLength={8}
          autoFocus
          aria-label="Stock symbol"
        />
        {symbol && (
          <button
            type="button"
            onClick={() => setSymbol('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            aria-label="Clear stock symbol"
          >
            <FaTimes />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-400 text-white rounded-lg font-semibold shadow hover:bg-blue-500 transition-colors"
      >
        Search
      </button>
    </form>
  );
} 