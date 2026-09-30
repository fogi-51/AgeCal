import React from 'react';
import { Heart, Wind, Moon, Orbit, Milestone } from 'lucide-react';
import { AgeResult, formatFullDate } from '../utils/ageCalculator';

interface LifeMilestonesProps {
  ageResult: AgeResult;
}

export const LifeMilestones: React.FC<LifeMilestonesProps> = ({ ageResult }) => {
  const { stats, totalDays, targetDate } = ageResult;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const isPast10k = targetDate >= stats.day10000Date;
  const isPastBillion = targetDate >= stats.billionthSecondDate;

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs space-y-6">
      <div>
        <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
          Biological & Astronomical Perspective
        </h2>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Life Milestones & Planetary Ages
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Heartbeats */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Approx. Heartbeats</div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              ~{formatNumber(stats.approxHeartbeats)}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Based on ~78 beats per minute
            </div>
          </div>
        </div>

        {/* Metric 2: Breaths */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Approx. Breaths Taken</div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              ~{formatNumber(stats.approxBreaths)}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Based on ~15 breaths per minute
            </div>
          </div>
        </div>

        {/* Metric 3: Sleep */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Time Spent Sleeping</div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              ~{stats.approxSleepYears} Years
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Approx. 1/3 of human life in rest
            </div>
          </div>
        </div>
      </div>

      {/* Planetary Ages */}
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
          <Orbit className="w-4 h-4 text-blue-500" />
          <span>Your Age on Other Planets</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-xs font-medium text-slate-400 dark:text-slate-500">Mercury</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums mt-0.5">
              {stats.planetaryAges.mercury}
            </div>
            <div className="text-[10px] text-slate-400">88 Earth days/yr</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-xs font-medium text-slate-400 dark:text-slate-500">Venus</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums mt-0.5">
              {stats.planetaryAges.venus}
            </div>
            <div className="text-[10px] text-slate-400">225 Earth days/yr</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-xs font-medium text-slate-400 dark:text-slate-500">Mars</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums mt-0.5">
              {stats.planetaryAges.mars}
            </div>
            <div className="text-[10px] text-slate-400">687 Earth days/yr</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-xs font-medium text-slate-400 dark:text-slate-500">Jupiter</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums mt-0.5">
              {stats.planetaryAges.jupiter}
            </div>
            <div className="text-[10px] text-slate-400">11.86 Earth yrs</div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-xs font-medium text-slate-400 dark:text-slate-500">Saturn</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums mt-0.5">
              {stats.planetaryAges.saturn}
            </div>
            <div className="text-[10px] text-slate-400">29.46 Earth yrs</div>
          </div>
        </div>
      </div>

      {/* Rare Golden Milestones */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/30">
          <Milestone className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">10,000 Days Alive: </span>
            <span className="text-slate-600 dark:text-slate-400">
              {formatFullDate(stats.day10000Date)} ({isPast10k ? 'Completed' : 'Upcoming'})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/30">
          <Milestone className="w-4 h-4 text-blue-500 shrink-0" />
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">1 Billionth Second: </span>
            <span className="text-slate-600 dark:text-slate-400">
              {formatFullDate(stats.billionthSecondDate)} ({isPastBillion ? 'Completed' : 'Upcoming (~31.7 yrs)'})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
