# CHANGELOG

## 2024-07-04
- Integrated Alpha Vantage for historical price data in src/app/api/quote/route.ts
- Completed Price Chart feature with improved loading, error, and accessibility handling (src/app/stocks/page.tsx, src/components/StockChart.tsx)
- Added Company Summary feature using Wikipedia extraction (src/components/CompanySummary.tsx, src/app/stocks/page.tsx)
- Updated README.md with tech stack and usage
- All features and documentation are ready for push to https://github.com/khurramsaadat/stock-tracker.git

## 2024-07-04
- Completed Stock Search feature as per PRD.md:
  - Implemented accessible search input and button in src/components/StockSearch.tsx
  - Search logic, loading, and error handling in src/app/stocks/page.tsx
  - API integration and error handling in src/app/api/quote/route.ts
- Confirmed all requirements for Stock Search are met.
- Directory and file structure up to date.

## 2025-07-05
- Refactored Header (src/components/Header.tsx):
  - Logo left-aligned (desktop), always visible and centered (mobile), links to home, accessible focus/hover.
  - Navigation links (Home, About, Stocks) left (desktop), hamburger menu (mobile, left slide-in, accessible, closes on outside click/Esc).
  - Search bar always visible and centered, with clear ("X") icon and blue search button.
- Updated StockSearch (src/components/StockSearch.tsx):
  - Added clear ("X") icon button, improved accessibility, blue search button.
- Fixed TypeScript error in layout (src/app/layout.tsx): removed unused stockSearch prop.
- Ran full type check: `npx tsc --noEmit` (no errors).
- Directory and file structure up to date (see below).

### Directory Structure (2025-07-05)
- DOCS/
  - PRD.md
  - INPUTS.md
  - PROGRESS.md
  - CHANGELOG.md
- README.md
- package.json
- package-lock.json
- tailwind.config.js
- tsconfig.json
- next.config.ts
- postcss.config.mjs
- eslint.config.mjs
- src/
  - app/
    - about/
      - page.tsx
    - api/
      - quote/
        - route.ts
    - favicon.ico
    - globals.css
    - layout.tsx
    - page.tsx
    - stocks/
      - page.tsx
  - components/
    - Footer.tsx
    - Header.tsx
    - HeroSection.tsx
    - StockChart.tsx
    - StockSearch.tsx
- public/
  - file.svg
  - globe.svg
  - next.svg
  - vercel.svg
  - window.svg 