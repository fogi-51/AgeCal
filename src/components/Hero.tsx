import React from 'react';
import { ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-8 pb-4 sm:pt-12 sm:pb-6 text-center px-4 max-w-4xl mx-auto">
      {/* Editorial Trust Kicker */}
      <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400 mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>PRECISION CALENDAR ENGINE</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
        Calculate Your Exact Age
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed" style={{ textWrap: 'balance' }}>
        Find your exact age in years, months, days, weeks, hours and more. Fast, accurate and completely free.
      </p>

      {/* Zero-Pill Trust Row */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          100% Free
        </span>
        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
        <span className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" />
          Instant Results
        </span>
        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
        <span>No Registration</span>
        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
        <span>100% Private (Runs in Browser)</span>
      </div>
    </section>
  );
};
