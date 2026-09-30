import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Calendar,
  Award,
} from 'lucide-react';
import { AgeResult } from '../utils/ageCalculator';
import { BirthdayCard } from './BirthdayCard';
import { StatsGrid } from './StatsGrid';
import { BirthInformation } from './BirthInformation';
import { LifeMilestones } from './LifeMilestones';
import { AiLifeCapsule } from './AiLifeCapsule';
import { ShareModal } from './ShareModal';

interface ResultDashboardProps {
  ageResult: AgeResult;
  onReset: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ ageResult, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { years, months, days, totalDays } = ageResult;
  const resultText = `${years} Years ${months} Months ${days} Days`;
  const shareSummary = `I am ${years} years, ${months} months and ${days} days old. Calculated with AgeCalc.`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareSummary);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareSummary;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Exact Age - AgeCalc',
          text: shareSummary,
          url: window.location.href,
        });
        return;
      } catch (err: any) {
        // If aborted by user, do nothing; else open fallback modal
        if (err.name !== 'AbortError') {
          setShareModalOpen(true);
        }
      }
    } else {
      setShareModalOpen(true);
    }
  };

  return (
    <section
      id="results-dashboard"
      className="w-full max-w-4xl mx-auto space-y-7 animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      {/* Primary Result Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-b from-white via-blue-50/20 to-slate-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-10 shadow-lg shadow-blue-500/5 text-center space-y-6">
        {/* Subtle accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl pointer-events-none" />

        {/* Section title */}
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
            <Award className="w-4 h-4" />
            <span>Precise Chronological Result</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Your Exact Age
          </h2>
        </div>

        {/* Large Result Display */}
        <div className="relative z-10 py-3">
          <div className="inline-flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            <div className="flex items-baseline gap-1.5">
              <span className="text-blue-600 dark:text-blue-400">{years}</span>
              <span className="text-lg sm:text-2xl font-bold font-sans text-slate-700 dark:text-slate-300">
                {years === 1 ? 'Year' : 'Years'}
              </span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-indigo-600 dark:text-indigo-400">{months}</span>
              <span className="text-lg sm:text-2xl font-bold font-sans text-slate-700 dark:text-slate-300">
                {months === 1 ? 'Month' : 'Months'}
              </span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-teal-600 dark:text-teal-400">{days}</span>
              <span className="text-lg sm:text-2xl font-bold font-sans text-slate-700 dark:text-slate-300">
                {days === 1 ? 'Day' : 'Days'}
              </span>
            </div>
          </div>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
            That is an exact span of <span className="font-semibold text-slate-800 dark:text-slate-200">{totalDays.toLocaleString()} days</span> of life.
          </p>
        </div>

        {/* Action Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm shadow-sm transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Share2 className="w-4 h-4" />
            <span>Share My Age</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
              copied
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Result'}</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Calculate Again</span>
          </button>
        </div>
      </div>

      {/* Birthday Card */}
      <BirthdayCard ageResult={ageResult} />

      {/* Detailed Statistics Grid */}
      <StatsGrid ageResult={ageResult} />

      {/* Chronological Birth Information */}
      <BirthInformation ageResult={ageResult} />

      {/* Life Milestones & Planetary Ages */}
      <LifeMilestones ageResult={ageResult} />

      {/* AI Life Capsule (Historical perspective & era milestones) */}
      <AiLifeCapsule ageResult={ageResult} />

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        ageResult={ageResult}
      />
    </section>
  );
};
