import Link from 'next/link';
import { FaChartLine } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/stocks', label: 'Stocks' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  return (
    <header className="w-full bg-black border-b border-card shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-2 text-blue-400 text-2xl font-bold">
          <FaChartLine />
          <span>StockTracker</span>
        </div>
        <ul className="flex gap-6 text-white font-medium">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-blue-400 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
} 