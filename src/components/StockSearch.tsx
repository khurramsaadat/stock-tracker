'use client';

import { useState } from 'react';

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
      <input
        type="text"
        value={symbol}
        onChange={e => setSymbol(e.target.value)}
        placeholder="Enter stock symbol (e.g. AAPL, TSLA)"
        className="flex-1 px-4 py-2 rounded-lg bg-card text-blue-500 border border-background focus:outline-none focus:ring-2 focus:ring-positive"
        maxLength={8}
        autoFocus
      />
      <button
        type="submit"
        className="px-6 py-2 bg-positive text-blue rounded-lg font-semibold shadow hover:bg-green-500 transition-colors"
      >
        Search
      </button>
    </form>
  );
} 