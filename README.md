# Stock Tracker App

## Overview
A modern, AI-powered stock tracker web app built with Next.js, React, and Tailwind CSS. Track stocks, view interactive price charts, get AI-generated company summaries, sentiment analysis, and manage a personal watchlist—all in a responsive, accessible, and dark-mode UI.

## Features
- Search for stocks by ticker symbol
- View real-time price and 30-day price chart
- AI-generated company summary (using free AI/NLP APIs)
- Sentiment analysis (rule-based, with future AI/NLP integration)
- Add/remove stocks to a personal watchlist (localStorage persistence)
- Responsive, accessible, and dark mode UI

## Tech Stack
- **Next.js** (App Router)
- **React** 19
- **TypeScript**
- **Tailwind CSS** v4
- **Chart.js** v4 (interactive charts)
- **react-chartjs-2** (React bindings for Chart.js)
- **react-icons** (iconography)
- **Node.js** 22+
- **ESLint** (linting)
- **Prettier** (code formatting)
- **Husky** (pre-push type checks)

## Major Dependencies & Plugins
- [next](https://nextjs.org/) (v15.3.5)
- [react](https://react.dev/) (v19)
- [react-dom](https://react.dev/)
- [typescript](https://www.typescriptlang.org/) (v5)
- [tailwindcss](https://tailwindcss.com/) (v4)
- [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss)
- [chart.js](https://www.chartjs.org/) (v4.5.0)
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) (v5.3.0)
- [react-icons](https://react-icons.github.io/react-icons/) (v5.5.0)
- [node-fetch](https://www.npmjs.com/package/node-fetch) (v3.3.2)
- [yahoo-finance2](https://github.com/gadicc/node-yahoo-finance2) (v2.13.3)
- [eslint](https://eslint.org/) (v9)
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
5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## License
This project is for educational and demonstration purposes. See LICENSE file for details.
