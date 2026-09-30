import React from 'react';
import { BookOpen, Calculator, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export const EducationalSections: React.FC = () => {
  return (
    <section id="how-it-works" className="w-full max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge & Precision</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          How AgeCalc Computes Exact Time
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Understanding the difference between naive division and true Gregorian calendar arithmetic.
        </p>
      </div>

      {/* Grid of 4 Educational Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. What Is an Age Calculator? */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            What Is an Age Calculator?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            An age calculator is a specialized chronological utility that determines the precise elapsed time between an individual’s date of birth and a specified target date. Unlike rough mental estimates, it breaks down your life journey into exact years, months, days, hours, and seconds.
          </p>
        </div>

        {/* 2. How Does an Age Calculator Work? */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            How Does Calendar Arithmetic Work?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Many basic calculators produce errors by dividing total days by 365 or 365.25. AgeCalc performs true calendar subtraction. It borrows days according to the specific month lengths in the Gregorian calendar, respects leap years (such as February 29), and accounts for year-end roll-overs.
          </p>
        </div>

        {/* 3. How to Calculate Your Age */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            How to Calculate in 3 Simple Steps
          </h3>
          <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <span>Select your date of birth using the date picker.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <span>Keep "Calculate Age As Of" set to today, or choose any past or future date.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <span>Click "Calculate My Age" to view your exact age and life milestones.</span>
            </li>
          </ul>
        </div>

        {/* 4. Why Use an Exact Age Calculator? */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            04
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Why Exact Precision Matters
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Exact day and month precision is vital for official paperwork, visa and immigration requirements, school admissions, insurance underwriting, retirement planning, medical dosing, and celebrating milestone birthdays like your 10,000th day alive.
          </p>
        </div>
      </div>
    </section>
  );
};
