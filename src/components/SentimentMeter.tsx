import React from 'react';

interface SentimentMeterProps {
  changePercent: number;
}

function getSentiment(changePercent: number) {
  if (changePercent > 0.1) return { label: 'Bullish', color: 'green', desc: `Price increased by ${changePercent}% today.` };
  if (changePercent < -0.1) return { label: 'Bearish', color: 'red', desc: `Price decreased by ${Math.abs(changePercent)}% today.` };
  return { label: 'Neutral', color: 'yellow', desc: 'Price was relatively unchanged today.' };
}

export default function SentimentMeter({ changePercent }: SentimentMeterProps) {
  const sentiment = getSentiment(changePercent);
  // Map color to Tailwind
  const colorMap: Record<string, string> = {
    green: '#22c55e',
    red: '#ef4444',
    yellow: '#eab308',
  };
  const gaugeColor = colorMap[sentiment.color] || '#eab308';
  // Clamp value for gauge fill
  const percent = Math.max(-5, Math.min(5, changePercent));
  const fill = ((percent + 5) / 10) * 180; // -5% = 0deg, 0% = 90deg, +5% = 180deg

  return (
    <div className="bg-neutral-900 rounded-lg p-6 mt-6 shadow text-center max-w-md mx-auto" aria-label="Sentiment analysis" role="region">
      <h3 className="text-xl font-bold text-blue-300 mb-4">Market Sentiment</h3>
      <div className="flex flex-col items-center justify-center">
        <svg width="180" height="100" viewBox="0 0 180 100" aria-hidden="true">
          <path
            d="M10,100 A90,90 0 0,1 170,100"
            fill="none"
            stroke="#333"
            strokeWidth="16"
          />
          <path
            d="M10,100 A90,90 0 0,1 170,100"
            fill="none"
            stroke={gaugeColor}
            strokeWidth="16"
            strokeDasharray="180"
            strokeDashoffset={180 - fill}
            style={{ transition: 'stroke-dashoffset 0.5s' }}
          />
        </svg>
        <div className="mt-2 text-2xl font-bold" style={{ color: gaugeColor }}>{sentiment.label}</div>
        <div className="mt-1 text-white/80 text-sm" aria-live="polite">{sentiment.desc}</div>
      </div>
    </div>
  );
} 