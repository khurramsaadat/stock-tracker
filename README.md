# Stock Tracker App

## Overview
A modern, AI-powered stock tracker web app built with Next.js, React, and Tailwind CSS. Track stocks, view interactive price charts, get AI-generated company summaries, sentiment analysis, and manage a personal watchlist—all in a responsive, accessible, and dark-mode UI.

## Features
- Search for stocks by ticker symbol
- View real-time price and interactive price chart with range selector (1M, 3M, 1Y, All)
- AI-generated company summary (using free AI/NLP APIs)
- Sentiment analysis (rule-based, with future AI/NLP integration)
- Add/remove stocks to a personal watchlist (localStorage persistence)
- Responsive, accessible, and dark mode UI

## Tech Stack
- **Next.js** (App Router) v15.3.5
- **React** 19.1.0
- **TypeScript** 5.8.3
- **Tailwind CSS** v4.1.11
- **Chart.js** v4.5.0 (interactive charts)
- **react-chartjs-2** v5.3.0 (React bindings for Chart.js)
- **react-icons** v5.5.0 (iconography)
- **Node.js** 22+
- **ESLint** v9.30.1 (linting)
- **Prettier** (code formatting)
- **Husky** (pre-push type checks)

## Major Dependencies & Plugins
- [next](https://nextjs.org/) (v15.3.5)
- [react](https://react.dev/) (v19.1.0)
- [react-dom](https://react.dev/) (v19.1.0)
- [typescript](https://www.typescriptlang.org/) (v5.8.3)
- [tailwindcss](https://tailwindcss.com/) (v4.1.11)
- [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss) (v4.1.11)
- [chart.js](https://www.chartjs.org/) (v4.5.0)
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) (v5.3.0)
- [react-icons](https://react-icons.github.io/react-icons/) (v5.5.0)
- [node-fetch](https://www.npmjs.com/package/node-fetch) (v3.3.2)
- [yahoo-finance2](https://github.com/gadicc/node-yahoo-finance2) (v2.13.3)
- [eslint](https://eslint.org/) (v9.30.1)
- [eslint-config-next](https://www.npmjs.com/package/eslint-config-next) (v15.3.5)
- [@types/react](https://www.npmjs.com/package/@types/react) (v19.1.8)
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) (v19.1.6)
- [@types/node](https://www.npmjs.com/package/@types/node) (v20.19.4)
- [prettier](https://prettier.io/)
- [husky](https://typicode.github.io/husky/)

## APIs Used
- [Finnhub](https://finnhub.io/) (free stock data, requires API key)
- [Alpha Vantage](https://www.alphavantage.co/) (free stock data, requires API key)
- [Yahoo Finance](https://finance.yahoo.com/) (via yahoo-finance2, no API key required)
- [Hugging Face Inference API](https://huggingface.co/inference-api) or [Wikipedia](https://en.wikipedia.org/w/api.php) for company summaries (optional)

## Getting Started
1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd stocks
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up API keys:**
   - Get free API keys from [Finnhub](https://finnhub.io/) and/or [Alpha Vantage](https://www.alphavantage.co/).
   - Add them to your environment or directly in the API route as needed.
4. **Run the development server:**
   ```sh
   npm run dev
   ```
## License
This project is for educational and demonstration purposes. See LICENSE file for details.
