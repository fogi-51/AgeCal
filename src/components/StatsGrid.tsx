import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CalendarDays,
  Clock,
  Hourglass,
  Timer,
  Hash,
  Play,
  Pause,
} from 'lucide-react';
import { AgeResult } from '../utils/ageCalculator';

interface StatsGridProps {
  ageResult: AgeResult;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ ageResult }) => {
  const [liveSeconds, setLiveSeconds] = useState(ageResult.totalSeconds);
  const [isLiveActive, setIsLiveActive] = useState(false);

  // Sync when ageResult updates
  useEffect(() => {
    setLiveSeconds(ageResult.totalSeconds);
  }, [ageResult]);

  // Live seconds ticker
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      setLiveSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const stats = [
    {
      label: 'Total Years',
      value: formatNumber(ageResult.years),
      subtext: 'Complete solar cycles around the sun',
      icon: Calendar,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    },
    {
      label: 'Total Months',
      value: formatNumber(ageResult.totalMonths),
      subtext: `Approx. ${formatNumber(ageResult.totalMonths)} lunar cycles`,
      icon: CalendarDays,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/50',
    },
    {
      label: 'Total Weeks',
      value: formatNumber(ageResult.totalWeeks),
      subtext: ageResult.remainingDaysInWeek > 0 ? `+ ${ageResult.remainingDaysInWeek} days` : 'Exact full weeks',
      icon: Hash,
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-50 dark:bg-violet-950/50',
    },
    {
      label: 'Total Days',
      value: formatNumber(ageResult.totalDays),
      subtext: 'Days experienced on Earth',
      icon: Calendar,
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-50 dark:bg-teal-950/50',
    },
    {
      label: 'Total Hours',
      value: formatNumber(ageResult.totalHours),
      subtext: 'Hours of consciousness and sleep',
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    },
    {
      label: 'Total Minutes',
      value: formatNumber(ageResult.totalMinutes),
      subtext: 'Minutes elapsed since birth',
      icon: Hourglass,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/50',
    },
    {
      label: 'Total Seconds',
      value: formatNumber(liveSeconds),
      subtext: isLiveActive ? 'Ticking live every second' : 'Seconds since your birth',
      icon: Timer,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
      isLiveTicking: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            Comprehensive Breakdown
          </h2>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Detailed Life Statistics
          </h3>
        </div>

        {/* Live ticking toggle */}
        <button
          onClick={() => setIsLiveActive(!isLiveActive)}
          className={`self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
            isLiveActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
              : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
          title={isLiveActive ? 'Pause live ticking' : 'Enable live ticking seconds'}
        >
          {isLiveActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isLiveActive ? 'Live Ticker Active' : 'Start Live Seconds'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const isLargeCard = idx === 6; // Total seconds spans 2 cols on lg if desired or stays neat

          return (
            <div
              key={stat.label}
              className={`rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150 group ${
                isLargeCard ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bgColor} ${stat.color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  {stat.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
