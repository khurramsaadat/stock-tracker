import { NextRequest, NextResponse } from 'next/server';

interface StockHistoryEntry {
  date: string;
  close: number;
}

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  history?: StockHistoryEntry[];
  // Add more fields as needed
}

// In-memory cache (symbol -> { data, timestamp })
const cache: Record<string, { data: StockQuote; timestamp: number }> = {};
const CACHE_TTL = 60 * 1000; // 1 minute

// Mock data for fallback (add all Most Actives tickers)
const mockData: Record<string, StockQuote> = {
  TSLA: {
    symbol: 'TSLA', price: 315.35, change: -0.30, changePercent: -0.10, high: 318.45, low: 312.76, open: 317.95, prevClose: 315.65,
    history: [
      { date: '2024-07-01', close: 314.00 },
      { date: '2024-07-02', close: 316.00 },
      { date: '2024-07-03', close: 315.35 },
    ],
  },
  NVDA: {
    symbol: 'NVDA', price: 159.34, change: 2.09, changePercent: 1.33, high: 160.50, low: 157.80, open: 160.00, prevClose: 157.25,
    history: [
      { date: '2024-07-01', close: 158.00 },
      { date: '2024-07-02', close: 159.00 },
      { date: '2024-07-03', close: 159.34 },
    ],
  },
  // ...add all other Most Actives tickers here...
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  const withHistory = searchParams.get('history') === '1';
  if (!symbol) {
    return NextResponse.json({ error: 'Missing symbol' }, { status: 400 });
  }
  const upperSymbol = symbol.toUpperCase();
  const cacheKey = upperSymbol + (withHistory ? ':history' : '');
  // Check cache
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_TTL) {
    return NextResponse.json(cache[cacheKey].data);
  }
  const finnhubKey = 'd1kmjhhr01qt8fopbavgd1kmjhhr01qt8fopbb00';
  const alphaKey = 'KI2KP4DLE1866H5Q';
  // Try Finnhub for quote
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${upperSymbol}&token=${finnhubKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.c) throw new Error('No data from Finnhub');
    let history: StockHistoryEntry[] | undefined = undefined;
    if (withHistory) {
      // Try Alpha Vantage for history
      const avUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${upperSymbol}&apikey=${alphaKey}`;
      const avRes = await fetch(avUrl);
      const avData = await avRes.json();
      const series = avData['Time Series (Daily)'];
      if (series) {
        const dates = Object.keys(series).sort((a, b) => new Date(a) > new Date(b) ? 1 : -1);
        history = dates.slice(-30).map(date => ({
          date: date,
          close: parseFloat(series[date]['4. close'])
        }));
      } else {
        history = [];
      }
    }
    const result = {
      symbol: upperSymbol,
      price: data.c,
      change: data.d,
      changePercent: data.dp,
      high: data.h,
      low: data.l,
      open: data.o,
      prevClose: data.pc,
      history,
    };
    cache[cacheKey] = { data: result, timestamp: Date.now() };
    return NextResponse.json(result);
  } catch {
    // Try Alpha Vantage for quote as fallback
    try {
      const avUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${upperSymbol}&apikey=${alphaKey}`;
      const avRes = await fetch(avUrl);
      const avData = await avRes.json();
      const q = avData['Global Quote'];
      if (q && q['05. price']) {
        let history: StockHistoryEntry[] | undefined = undefined;
        if (withHistory) {
          const histUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${upperSymbol}&apikey=${alphaKey}`;
          const histRes = await fetch(histUrl);
          const histData = await histRes.json();
          const series = histData['Time Series (Daily)'];
          if (series) {
            const dates = Object.keys(series).sort((a, b) => new Date(a) > new Date(b) ? 1 : -1);
            history = dates.slice(-30).map(date => ({
              date: date,
              close: parseFloat(series[date]['4. close'])
            }));
          } else {
            history = [];
          }
        }
        const result = {
          symbol: upperSymbol,
          price: parseFloat(q['05. price']),
          change: parseFloat(q['09. change']),
          changePercent: parseFloat(q['10. change percent']),
          high: parseFloat(q['03. high']),
          low: parseFloat(q['04. low']),
          open: parseFloat(q['02. open']),
          prevClose: parseFloat(q['08. previous close']),
          history,
        };
        cache[cacheKey] = { data: result, timestamp: Date.now() };
        return NextResponse.json(result);
      }
    } catch {}
    // Fallback to mock data
    if (mockData[upperSymbol]) {
      return NextResponse.json(mockData[upperSymbol]);
    }
    return NextResponse.json({ error: 'Stock not found or API error.' }, { status: 404 });
  }
} 