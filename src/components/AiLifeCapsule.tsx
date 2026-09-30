import React, { useState } from 'react';
import { Sparkles, Zap, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { AgeResult, formatFullDate } from '../utils/ageCalculator';

interface AiLifeCapsuleProps {
  ageResult: AgeResult;
}

interface InsightsResponse {
  birthYearEvent: string;
  milestoneReflection: string;
  nostalgiaTrivia: string;
}

export const AiLifeCapsule: React.FC<AiLifeCapsuleProps> = ({ ageResult }) => {
  const [loading, setLoading] = useState(false);
  const [fastMode, setFastMode] = useState(true);
  const [insights, setInsights] = useState<InsightsResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchInsights = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/life-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDate: formatFullDate(ageResult.birthDate),
          ageYears: ageResult.years,
          generation: ageResult.generation.name,
          zodiac: ageResult.zodiacSign.name,
          fastMode,
        }),
      });

      if (!response.ok) {
        throw new Error('API unavailable');
      }

      const data = await response.json();
      setInsights(data);
    } catch {
      // Fallback offline curated historical perspectives
      const year = ageResult.birthYear;
      setInsights({
        birthYearEvent: `During ${year}, significant cultural and technological breakthroughs shaped global communications, music, and science as your generation took root.`,
        milestoneReflection: `At ${ageResult.years} years old, you have traversed ${ageResult.totalDays.toLocaleString()} days of unique personal memories, learning, and character growth.`,
        nostalgiaTrivia: `Growing up within the ${ageResult.generation.name} era, you witnessed the rapid transformation of personal media, community connection, and everyday technology.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20 p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Life Era Capsule</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Historical & Generational Perspective
          </h3>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFastMode(!fastMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              fastMode
                ? 'bg-blue-100/70 border-blue-200 text-blue-700 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300'
                : 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
            }`}
            title="Fast Mode uses low-latency model (gemini-3.1-flash-lite)"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{fastMode ? 'Fast Response' : 'Standard'}</span>
          </button>

          {!insights && (
            <button
              type="button"
              disabled={loading}
              onClick={fetchInsights}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Life Era</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {!insights && !loading && (
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Generate an AI-curated summary of world milestones from your birth year ({ageResult.birthYear}), personalized age reflection, and nostalgic era highlights.
        </p>
      )}

      {insights && (
        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              01. World in {ageResult.birthYear}
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {insights.birthYearEvent}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              02. Age {ageResult.years} Milestone
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {insights.milestoneReflection}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
              03. Generational Nostalgia
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {insights.nostalgiaTrivia}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
