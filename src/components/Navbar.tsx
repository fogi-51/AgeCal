import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  onScrollToCalculator: () => void;
  onScrollToHowItWorks: () => void;
  onScrollToFaq: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToCalculator,
  onScrollToHowItWorks,
  onScrollToFaq,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group text-xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-blue-700 transition-colors">
            A
          </div>
          <span className="flex items-center">
            AgeCalc
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-0.5 inline-block"></span>
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={onScrollToCalculator}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Calculator
          </button>
          <button
            onClick={onScrollToHowItWorks}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={onScrollToFaq}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="sm:hidden">
            <ThemeToggle compact />
          </div>

          <button
            onClick={onScrollToCalculator}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg shadow-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>New Calculation</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                onScrollToCalculator();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Age Calculator
            </button>
            <button
              onClick={() => {
                onScrollToHowItWorks();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              How It Works & Calendar Arithmetic
            </button>
            <button
              onClick={() => {
                onScrollToFaq();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};
