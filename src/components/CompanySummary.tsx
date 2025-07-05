import { useEffect, useState } from 'react';

interface CompanySummaryProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function CompanySummary({ symbol, price, change, changePercent }: CompanySummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    setSummary(null);
    // Wikipedia API: get summary for the company
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(symbol)}`)
      .then(res => {
        if (!res.ok) throw new Error('No summary found');
        return res.json();
      })
      .then(data => {
        if (data.extract) {
          setSummary(data.extract);
        } else {
          setSummary(null);
        }
      })
      .catch(() => {
        setError('No company summary found.');
      })
      .finally(() => setLoading(false));
  }, [symbol]);

  return (
    <div className="bg-neutral-800 rounded-lg p-6 mt-6 shadow text-left max-w-2xl mx-auto" aria-label="Company summary" role="region">
      <h3 className="text-xl font-bold text-blue-300 mb-2">Company Summary</h3>
      <div className="mb-2 text-white">
        <span className="font-semibold">({symbol})</span> Current Price: <span className="text-blue-200">${price}</span>
        <span className={Number(change) >= 0 ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
          {Number(change) >= 0 ? '+' : ''}{change} ({Number(changePercent) >= 0 ? '+' : ''}{changePercent}%)
        </span>
      </div>
      {loading && <div className="text-white/80">Loading company summary…</div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && summary && (
        <p className="text-white/90 mt-2" aria-live="polite">{summary}</p>
      )}
      {!loading && !error && !summary && (
        <p className="text-white/60 mt-2">No summary available for this company.</p>
      )}
    </div>
  );
} 