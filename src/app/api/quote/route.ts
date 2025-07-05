import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  const withHistory = searchParams.get('history') === '1';
  if (!symbol) {
    return NextResponse.json({ error: 'Missing symbol' }, { status: 400 });
  }
  const finnhubKey = 'd1kmjhhr01qt8fopbavgd1kmjhhr01qt8fopbb00';
  const alphaKey = 'KI2KP4DLE1866H5Q';
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${finnhubKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 404 });
    }
    if (!data.c) {
      return NextResponse.json({ error: 'No data found for this symbol.' }, { status: 404 });
    }

    let history = null;
    if (withHistory) {
      // Fetch last 30 days of daily prices from Alpha Vantage
      const avUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol.toUpperCase()}&apikey=${alphaKey}`;
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
        // Alpha Vantage error or no data
        history = [];
      }
    }

    return NextResponse.json({
      symbol: symbol.toUpperCase(),
      price: data.c,
      change: data.d,
      changePercent: data.dp,
      high: data.h,
      low: data.l,
      open: data.o,
      prevClose: data.pc,
      history,
    });
  } catch {
    return NextResponse.json({ error: 'Stock not found or API error.' }, { status: 404 });
  }
} 