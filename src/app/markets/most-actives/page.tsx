import React from "react";
import Link from "next/link";

const data = [
  { symbol: "LCID", name: "Lucid Group, Inc.", price: 2.16, change: 0.11, changePct: 5.37, volume: "200.07M", avgVol: "129.557M", marketCap: "6.589B", pe: "--", wkChange: -31.65 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 159.34, change: 2.09, changePct: 1.33, volume: "142.314M", avgVol: "239.365M", marketCap: "3.886T", pe: "51.23", wkChange: 24.29 },
  { symbol: "INTC", name: "Intel Corporation", price: 22.49, change: 0.61, changePct: 2.79, volume: "60.704M", avgVol: "88.713M", marketCap: "98.101B", pe: "--", wkChange: -33.83 },
  { symbol: "F", name: "Ford Motor Company", price: 11.81, change: 0.04, changePct: 0.34, volume: "60.311M", avgVol: "111.801M", marketCap: "46.963B", pe: "9.45", wkChange: -9.01 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 315.35, change: -0.30, changePct: -0.10, volume: "58.042M", avgVol: "118.5M", marketCap: "1.016T", pe: "182.28", wkChange: 24.67 },
  { symbol: "HOOD", name: "Robinhood Markets, Inc.", price: 94.40, change: -3.58, changePct: -3.65, volume: "56.374M", avgVol: "44.958M", marketCap: "83.301B", pe: "53.94", wkChange: 327.34 },
  { symbol: "WULF", name: "TeraWulf Inc.", price: 5.26, change: 0.22, changePct: 4.37, volume: "53.226M", avgVol: "43.252M", marketCap: "2.049B", pe: "--", wkChange: -3.84 },
  { symbol: "CIFR", name: "Cipher Mining Inc.", price: 6.05, change: 0.37, changePct: 6.51, volume: "47.639M", avgVol: "24.508M", marketCap: "2.246B", pe: "--", wkChange: 30.95 },
  { symbol: "SOFI", name: "SoFi Technologies, Inc.", price: 18.57, change: 0.45, changePct: 2.48, volume: "44.098M", avgVol: "66.622M", marketCap: "20.527B", pe: "43.19", wkChange: 192.44 },
  { symbol: "IREN", name: "IREN Limited", price: 16.82, change: 1.16, changePct: 7.41, volume: "42.478M", avgVol: "18.633M", marketCap: "4.068B", pe: "--", wkChange: 14.97 },
  { symbol: "PLTR", name: "Palantir Technologies Inc.", price: 134.36, change: 2.24, changePct: 1.70, volume: "41.812M", avgVol: "97.535M", marketCap: "317.077B", pe: "584.17", wkChange: 385.05 },
  { symbol: "BMNR", name: "Bitmine Immersion Tech.", price: 135.00, change: 76.50, changePct: 130.77, volume: "36.104M", avgVol: "11.09M", marketCap: "818.545M", pe: "--", wkChange: 1641.94 },
  { symbol: "AAPL", name: "Apple Inc.", price: 213.55, change: 1.11, changePct: 0.52, volume: "34.697M", avgVol: "62.011M", marketCap: "3.19T", pe: "33.21", wkChange: -6.26 },
  { symbol: "RGTI", name: "Rigetti Computing, Inc.", price: 13.45, change: 0.37, changePct: 2.83, volume: "34.467M", avgVol: "48.843M", marketCap: "4.341B", pe: "--", wkChange: 1193.27 },
  { symbol: "RUN", name: "Sunrun Inc.", price: 10.50, change: 1.51, changePct: 16.80, volume: "33.499M", avgVol: "22.714M", marketCap: "2.399B", pe: "--", wkChange: -17.00 },
  { symbol: "CNC", name: "Centene Corporation", price: 33.31, change: -0.47, changePct: -1.39, volume: "32.984M", avgVol: "7.039M", marketCap: "16.575B", pe: "4.91", wkChange: -49.68 },
  { symbol: "BTG", name: "B2Gold Corp.", price: 3.66, change: 0.00, changePct: 0.00, volume: "32.565M", avgVol: "52.714M", marketCap: "4.857B", pe: "--", wkChange: 32.13 },
  { symbol: "NU", name: "Nu Holdings Ltd.", price: 13.60, change: 0.11, changePct: 0.82, volume: "32.596M", avgVol: "61.188M", marketCap: "65.612B", pe: "30.91", wkChange: 5.92 },
  { symbol: "MARA", name: "MARA Holdings, Inc.", price: 17.66, change: -0.14, changePct: -0.79, volume: "32.143M", avgVol: "44.768M", marketCap: "6.215B", pe: "--", wkChange: -9.44 },
  { symbol: "AAL", name: "American Airlines Group", price: 11.69, change: 0.06, changePct: 0.52, volume: "30.238M", avgVol: "60.367M", marketCap: "7.71B", pe: "11.69", wkChange: 6.95 },
  { symbol: "DDOG", name: "Datadog, Inc.", price: 155.15, change: 20.14, changePct: 14.92, volume: "29.997M", avgVol: "5.301M", marketCap: "53.582B", pe: "330.11", wkChange: 17.18 },
  { symbol: "QBTS", name: "D-Wave Quantum Inc.", price: 16.79, change: 0.81, changePct: 5.07, volume: "29.877M", avgVol: "66.337M", marketCap: "5.246B", pe: "--", wkChange: 1254.03 },
  { symbol: "AMZN", name: "Amazon.com, Inc.", price: 223.41, change: 3.49, changePct: 1.59, volume: "29.295M", avgVol: "47.654M", marketCap: "2.37T", pe: "36.39", wkChange: 12.10 },
  { symbol: "OSCR", name: "Oscar Health, Inc.", price: 16.47, change: -0.15, changePct: -0.90, volume: "29.008M", avgVol: "13.534M", marketCap: "4.195B", pe: "41.17", wkChange: 2.11 },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 137.91, change: -0.61, changePct: -0.44, volume: "28.332M", avgVol: "47.299M", marketCap: "223.607B", pe: "100.66", wkChange: -22.82 },
];

export default function MostActivesPage() {
  return (
    <div className="container mx-auto py-10 pt-30">
     <h2 className="text-xl font-bold text-blue-300 mb-6">Stocks - Most Actives</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-800 rounded-lg text-xs">
          <thead>
            <tr className="bg-neutral-900 text-white">
              <th className="px-2 py-2 font-semibold">Symbol</th>
              <th className="px-2 py-2 font-semibold">Name</th>
              <th className="px-2 py-2 font-semibold">Price</th>
              <th className="px-2 py-2 font-semibold">Change</th>
              <th className="px-2 py-2 font-semibold">% Change</th>
              <th className="px-2 py-2 font-semibold">Volume</th>
              <th className="px-2 py-2 font-semibold">Avg Vol (3M)</th>
              <th className="px-2 py-2 font-semibold">Market Cap</th>
              <th className="px-2 py-2 font-semibold">P/E Ratio (TTM)</th>
              <th className="px-2 py-2 font-semibold">52 Wk Change %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.symbol} className="border-b border-neutral-800 hover:bg-neutral-800">
                <td className="px-2 py-1 font-bold whitespace-nowrap">
                  <Link
                    href={`/stocks/${row.symbol}`}
                    className="text-blue-400 hover:underline focus:underline focus:outline-none"
                  >
                    {row.symbol}
                  </Link>
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-white/90">{row.name}</td>
                <td className="px-2 py-1 text-white text-right">{row.price.toFixed(2)}</td>
                <td className={
                  "px-2 py-1 text-right " +
                  (row.change > 0 ? "text-green-400" : row.change < 0 ? "text-red-400" : "text-white/80")
                }>
                  {row.change > 0 ? "+" : ""}{row.change.toFixed(2)}
                </td>
                <td className={
                  "px-2 py-1 text-right " +
                  (row.changePct > 0 ? "text-green-400" : row.changePct < 0 ? "text-red-400" : "text-white/80")
                }>
                  {row.changePct > 0 ? "+" : ""}{row.changePct.toFixed(2)}%
                </td>
                <td className="px-2 py-1 text-white/80 text-right">{row.volume}</td>
                <td className="px-2 py-1 text-white/80 text-right">{row.avgVol}</td>
                <td className="px-2 py-1 text-white/80 text-right">{row.marketCap}</td>
                <td className="px-2 py-1 text-white/80 text-right">{row.pe}</td>
                <td className={
                  "px-2 py-1 text-right " +
                  (row.wkChange > 0 ? "text-green-400" : row.wkChange < 0 ? "text-red-400" : "text-white/80")
                }>
                  {row.wkChange > 0 ? "+" : ""}{row.wkChange.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 