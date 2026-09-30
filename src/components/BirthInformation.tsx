import React from 'react';
import { Calendar, Compass, Sparkles, User, Sun } from 'lucide-react';
import { AgeResult, formatFullDate } from '../utils/ageCalculator';

interface BirthInformationProps {
  ageResult: AgeResult;
}

export const BirthInformation: React.FC<BirthInformationProps> = ({ ageResult }) => {
  const {
    birthDate,
    birthDayOfWeek,
    birthYear,
    isBirthLeapYear,
    zodiacSign,
    chineseZodiac,
    generation,
  } = ageResult;

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs">
      <div className="mb-5">
        <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
          Chronological Context
        </h2>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Birth Information & Heritage
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Born On */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>Born On</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {formatFullDate(birthDate)}
          </div>
          <div className="text-xs text-slate-500">
            Day of week: <span className="font-semibold text-slate-700 dark:text-slate-300">{birthDayOfWeek}</span>
          </div>
        </div>

        {/* Card 2: Birth Year & Leap Year */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Birth Year</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {birthYear}
          </div>
          <div className="text-xs text-slate-500">
            {isBirthLeapYear ? 'Leap Year (366 days)' : 'Common Year (365 days)'}
          </div>
        </div>

        {/* Card 3: Western Zodiac Sign */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            <span>Zodiac Sign</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>{zodiacSign.name}</span>
            <span className="text-lg text-indigo-600 dark:text-indigo-400 font-normal">
              {zodiacSign.symbol}
            </span>
          </div>
          <div className="text-xs text-slate-500">
            {zodiacSign.element} Element · {zodiacSign.dateRange}
          </div>
        </div>

        {/* Card 4: Generational Cohort */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-500" />
            <span>Generation</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {generation.name}
          </div>
          <div className="text-xs text-slate-500">
            Cohort born {generation.range}
          </div>
        </div>
      </div>

      {/* Secondary Cultural Detail Bar */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong className="text-slate-800 dark:text-slate-200">Chinese Zodiac:</strong> Year of the {chineseZodiac.animal} ({chineseZodiac.element} · {chineseZodiac.yinYang})
          </span>
        </div>
        <div className="text-slate-500 italic max-w-md">
          {generation.description}
        </div>
      </div>
    </div>
  );
};
