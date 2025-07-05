export default function Footer() {
  return (
    <footer className="w-full bg-black text-blue-400 py-4 mt-8 border-t border-background text-center text-sm">
      &copy; {new Date().getFullYear()} StockTracker. All rights reserved.
    </footer>
  );
} 