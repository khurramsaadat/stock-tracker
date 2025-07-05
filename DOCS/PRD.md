# Product Requirements Document (PRD)

## Overview

we are building an Al-Powered Stock Tracker App here in NextJS.
this allows users to track stocks with Al-enhanced insights. 
---

## Features
- Multipage Next.js app
- Header navigation, hero section, footer
- Stock tracking functionality
- Responsive design

## Core Requirements

### 1. Stock Search
- Users can enter a stock ticker symbol (e.g., AAPL, TSLA, MSFT) into an input field.
- A search button triggers the fetch of stock data from a free stock API (e.g., Finnhub, Alpha Vantage, Yahoo Finance, or any free alternative).
- The search should be case-insensitive (e.g., 'aapl' and 'AAPL' are equivalent).
- If the symbol is invalid or not found, display a clear error message to the user.
- The UI must include:
  - An input field for the ticker symbol
  - A search button
- On successful search, display the stock's current price and other relevant data.
- Show a loading indicator while fetching data.
- Handle API/network errors gracefully and inform the user.
- The search should not trigger if the input is empty.
- The search field and button should be accessible (keyboard and screen reader friendly).

### 2. Price Chart
- Display an interactive line chart showing the last 30 days of daily closing prices for the selected stock.
- The chart should update automatically when a new stock is searched.
- Users should be able to hover over the chart to see the exact date and closing price for each data point.
- The chart must visually match the app's dark mode style and be clearly legible.
- If historical data is unavailable for a symbol, display a clear message to the user.
- Show a loading indicator while fetching historical data.
- Handle API/network errors gracefully and inform the user.
- The chart should be accessible (keyboard navigation, screen reader labels for data points).
- Historical data will be fetched from the same free stock API as the current price. If the API does not provide history, inform the user.

### 3. AI Company Summary
- Display a card below the price chart with a 3-4 sentence summary of the company.
- The summary should include:
  - Current price, dollar change, and percentage change (from the latest stock data)
  - A brief overview of what the company does, its main products/services, and its market position
- The summary should be generated on the frontend using a free AI service or API.
  - Recommended: OpenAI's free tier (if available), Hugging Face Inference API, or Wikipedia summary extraction
  - If no free AI service is available, fallback to a static or Wikipedia-based summary
- The summary card should be styled for dark mode and visually distinct from other elements
- Show a loading indicator while generating/fetching the summary
- Handle API/network errors gracefully and inform the user if the summary cannot be generated
- The summary should be accessible and easy to read

### 4. Sentiment Analysis
- Display a sentiment indicator for the selected stock, updating with each search.
- For the MVP, use a rule-based approach:
  - If the recent price change is positive, show "Bullish" sentiment.
  - If the recent price change is negative, show "Bearish" sentiment.
  - If the change is near zero (e.g., within ±0.1%), show "Neutral" sentiment.
- The sentiment should be displayed as a visual meter or gauge (not just text), styled for dark mode.
- Include a brief explanation of why the sentiment is what it is (e.g., "Price increased by 1.2% today").
- The sentiment meter should be accessible (screen reader labels, keyboard navigation if interactive).
- Handle loading and error states gracefully.
- In the future, consider integrating a free AI or NLP API (e.g., Hugging Face Inference API or a news sentiment API) for more advanced sentiment analysis based on news or social data.

### 5. Watchlist
- Users can add or remove stocks to a personal watchlist.
- The watchlist is persisted in browser localStorage and should persist across sessions.
- The watchlist displays ticker symbols and current prices for each stock.
- The list updates in real time as prices change or as stocks are added/removed.
- Users can click a symbol in the watchlist to view its details in the main tracker view.
- The UI should be accessible (keyboard navigation, screen reader support), styled for dark mode, and handle empty states gracefully (e.g., "No stocks in your watchlist yet").
- In the future, consider adding server-side/user account support for syncing the watchlist across devices.

## Technical Requirements
- Use Next.js (App Router) and React for the frontend framework.
- Use TypeScript for type safety throughout the codebase.
- Use Tailwind CSS for styling and layout.
- Use Chart.js (or a similar library) for rendering interactive price charts.
- Fetch stock data from a free stock API (e.g., Finnhub, Alpha Vantage, Yahoo Finance, or any free alternative).
- Use browser localStorage to persist the watchlist across sessions.
- Integrate a free AI/NLP API for company summaries and sentiment analysis if available (e.g., OpenAI free tier, Hugging Face Inference API, Wikipedia extraction).
- Ensure all features are accessible (keyboard navigation, screen reader support, ARIA labels where appropriate).
- Handle loading, error, and empty states gracefully for all data fetches and UI components.
- The app must be fully responsive and work on desktop, tablet, and mobile devices.
- Enforce code quality with ESLint, Prettier, and strict TypeScript settings.
- The app should be easy to deploy to platforms like Vercel.
- Follow best practices for security (e.g., do not expose API keys in the frontend, validate all user input) and performance (e.g., code splitting, image optimization).

## Style Requirements
- The UI must use a modern, clean, dark mode aesthetic throughout.
- Use clear visual hierarchy for headings, cards, and interactive elements.
- Use green for positive price changes and red for negative changes.
- Ensure accessible color contrast for all text and UI elements.
- The sentiment meter should be visually appealing (e.g., gauge, meter, or animated indicator) and not just plain text.
- The UI must be fully responsive and mobile-friendly, adapting to different screen sizes.
- Use consistent spacing, font choices, and iconography (e.g., react-icons) across the app.
- All interactive elements (buttons, inputs, cards) should have clear focus states and be easy to use with keyboard and screen readers.

Style Requirements:
Dark mode interface with a professional financial app aesthetic
Use green for positive changes, red for negative changes
Make the sentiment meter visually appealing(not just text) Build this as a fully functional web app that I could actually use to track stocks.

## Non-functional Requirements
- **Performance:**
  - The app should load quickly and minimize time-to-interactive on all devices.
  - Use efficient data fetching, code splitting, and caching where appropriate.
  - Optimize images and static assets for fast delivery.
- **Accessibility:**
  - The app should meet WCAG 2.1 AA accessibility standards.
  - All interactive elements must be fully keyboard navigable.
  - Provide appropriate ARIA labels and roles for screen readers.
  - Ensure sufficient color contrast and scalable font sizes.
- **Security:**
  - Never expose sensitive API keys or credentials in the frontend code or public repositories.
  - Validate and sanitize all user input on both client and server sides.
  - Use HTTPS for all network requests and deployments.
  - Follow best practices for dependency management and keep packages up to date.
- **Scalability:**
  - The codebase should be modular and easy to extend with new features.
  - The app should be able to support increased user load with minimal changes (cloud deployment ready).
  - Design APIs and data flows to support future enhancements (e.g., user accounts, server-side watchlist, more data sources).

---