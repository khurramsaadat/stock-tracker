import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface StockChartProps {
  history: any[];
  loading?: boolean;
  error?: string | null;
}

export default function StockChart({ history, loading, error }: StockChartProps) {
  if (loading) {
    return (
      <div className="bg-neutral-900 rounded-lg p-4 mt-6 shadow text-center" aria-busy="true" aria-live="polite">
        <span className="text-white/80">Loading chart…</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-neutral-900 rounded-lg p-4 mt-6 shadow text-center" role="alert">
        <span className="text-red-400">{error}</span>
      </div>
    );
  }
  if (!history || history.length === 0) {
    return (
      <div className="bg-neutral-900 rounded-lg p-4 mt-6 shadow text-center" role="status">
        <span className="text-white/80">No historical data to display.</span>
      </div>
    );
  }
  const labels = history.map((d) => d.date.split('T')[0]);
  const data = {
    labels,
    datasets: [
      {
        label: 'Close Price',
        data: history.map((d) => d.close),
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96,165,250,0.2)',
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#fff' } },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: '#333' } },
      y: { ticks: { color: '#fff' }, grid: { color: '#333' } },
    },
  };
  return (
    <div className="bg-neutral-900 rounded-lg p-4 mt-6 shadow" aria-label="Stock price chart" role="region">
      <Line data={data} options={options} height={300} fallbackContent={<span>Chart unavailable. Data: {JSON.stringify(data)}</span>} />
    </div>
  );
} 