import React from 'react';
import { Calendar, Cake, Sparkles, Clock, PartyPopper } from 'lucide-react';
import { AgeResult, formatFullDate } from '../utils/ageCalculator';
import { ConfettiEffect } from './ConfettiEffect';

interface BirthdayCardProps {
  ageResult: AgeResult;
}

export const BirthdayCard: React.FC<BirthdayCardProps> = ({ ageResult }) => {
  const {
    isBirthdayToday,
    nextBirthdayDate,
    nextBirthdayDayOfWeek,
    daysUntilNextBirthday,
    monthsAndDaysUntilNextBirthday,
    isFeb29Birthday,
  } = ageResult;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm transition-all">
      {isBirthdayToday && <ConfettiEffect />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Header Title */}
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              isBirthdayToday
                ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 animate-pulse'
                : 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
            }`}
          >
            {isBirthdayToday ? <PartyPopper className="w-6 h-6" /> : <Cake className="w-5 h-5" />}
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
              {isBirthdayToday ? 'Special Day' : 'Upcoming Event'}
            </h2>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {isBirthdayToday ? '🎉 Happy Birthday!' : 'Your Next Birthday'}
            </h3>
          </div>
        </div>

        {/* Days count badge/callout */}
        <div className="sm:text-right">
          {isBirthdayToday ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Celebrating today!</span>
            </div>
          ) : (
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
                {daysUntilNextBirthday}
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1.5">
                {daysUntilNextBirthday === 1 ? 'day remaining' : 'days remaining'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Details */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Celebration Date</span>
          </div>
          <div className="text-base font-semibold text-slate-800 dark:text-slate-200">
            {formatFullDate(nextBirthdayDate)}
          </div>
          <div className="text-xs text-slate-500">
            Falls on a <span className="font-semibold text-slate-700 dark:text-slate-300">{nextBirthdayDayOfWeek}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Countdown</span>
          </div>
          {isBirthdayToday ? (
            <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
              Today marks the exact anniversary of your birth!
            </div>
          ) : (
            <div className="text-base font-semibold text-slate-800 dark:text-slate-200">
              {monthsAndDaysUntilNextBirthday.months > 0 && (
                <span>
                  {monthsAndDaysUntilNextBirthday.months}{' '}
                  {monthsAndDaysUntilNextBirthday.months === 1 ? 'Month' : 'Months'},{' '}
                </span>
              )}
              <span>
                {monthsAndDaysUntilNextBirthday.days}{' '}
                {monthsAndDaysUntilNextBirthday.days === 1 ? 'Day' : 'Days'} away
              </span>
            </div>
          )}

          {isFeb29Birthday && (
            <div className="text-xs text-slate-500 italic">
              *Born on Leap Day (Feb 29). Standard convention celebrates on March 1 in non-leap years.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
