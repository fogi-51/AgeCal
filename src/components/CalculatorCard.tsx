import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, RotateCcw, AlertCircle, Sparkles, Check } from 'lucide-react';
import { validateDates, toISODateString } from '../utils/ageCalculator';

interface CalculatorCardProps {
  onCalculate: (birthDate: string, targetDate: string) => void;
  onReset: () => void;
  hasCalculated: boolean;
  initialBirthDate?: string;
  initialTargetDate?: string;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  onCalculate,
  onReset,
  hasCalculated,
  initialBirthDate = '',
  initialTargetDate = '',
}) => {
  const getTodayISO = () => toISODateString(new Date());

  const [birthDate, setBirthDate] = useState(initialBirthDate);
  const [targetDate, setTargetDate] = useState(initialTargetDate || getTodayISO());
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<'birth' | 'target' | null>(null);

  // Sync if initial props change
  useEffect(() => {
    if (initialBirthDate) setBirthDate(initialBirthDate);
    if (initialTargetDate) setTargetDate(initialTargetDate);
  }, [initialBirthDate, initialTargetDate]);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const validation = validateDates(birthDate, targetDate);
    if (!validation.isValid) {
      setValidationError(validation.error);
      return;
    }

    setValidationError(null);
    onCalculate(birthDate, targetDate);
  };

  const handleUseToday = () => {
    const today = getTodayISO();
    setTargetDate(today);
    if (validationError) setValidationError(null);
  };

  const handleReset = () => {
    setBirthDate('');
    setTargetDate(getTodayISO());
    setValidationError(null);
    onReset();
  };

  // Global Keyboard shortcuts:
  // - Esc triggers reset
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // If pressing 'Escape', trigger reset action
      if (e.key === 'Escape') {
        // Prevent default browser behavior if needed
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [birthDate, targetDate]);

  // Quick preset helper
  const applyPreset = (presetBirth: string) => {
    setBirthDate(presetBirth);
    const today = getTodayISO();
    setTargetDate(today);
    setValidationError(null);
    onCalculate(presetBirth, today);
  };

  // Handle Enter keydown directly on date inputs
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCalculate();
    }
  };

  return (
    <div
      id="calculator"
      className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-6 sm:p-8 transition-colors relative"
    >
      <form onSubmit={handleCalculate} noValidate className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Field 1: Date of Birth */}
          <div className="space-y-1.5">
            <label
              htmlFor="birth-date"
              className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="birth-date"
                type="date"
                required
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                onFocus={() => setActiveField('birth')}
                onBlur={() => setActiveField(null)}
                onKeyDown={handleInputKeyDown}
                max={targetDate || getTodayISO()}
                placeholder="Select your birth date"
                aria-describedby={validationError ? 'validation-error-msg' : undefined}
                aria-invalid={!!validationError && (!birthDate || validationError.includes('future') || validationError.includes('birth'))}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 font-sans text-base transition-all duration-150 focus:outline-none ${
                  validationError && (!birthDate || validationError.includes('birth'))
                    ? 'border-red-400 dark:border-red-500 ring-2 ring-red-400/20'
                    : activeField === 'birth'
                    ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Select or type your exact date of birth
            </p>
          </div>

          {/* Field 2: Calculate Age As Of */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="target-date"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                Calculate Age As Of
              </label>
              <button
                type="button"
                onClick={handleUseToday}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Use Today
              </button>
            </div>
            <div className="relative">
              <input
                id="target-date"
                type="date"
                value={targetDate}
                onChange={(e) => {
                  setTargetDate(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                onFocus={() => setActiveField('target')}
                onBlur={() => setActiveField(null)}
                onKeyDown={handleInputKeyDown}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 font-sans text-base transition-all duration-150 focus:outline-none ${
                  validationError && validationError.includes('Calculation date')
                    ? 'border-red-400 dark:border-red-500 ring-2 ring-red-400/20'
                    : activeField === 'target'
                    ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Defaults to today, or pick any past/future date
            </p>
          </div>
        </div>

        {/* Inline Error Message */}
        {validationError && (
          <div
            id="validation-error-msg"
            role="alert"
            className="flex items-center gap-2.5 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/80 rounded-xl text-red-700 dark:text-red-300 text-sm animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
            <span className="font-medium">{validationError}</span>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.99] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 group"
          >
            <span>Calculate My Age</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono font-medium rounded-md bg-blue-700/80 border border-blue-400/40 text-blue-100">
              ↵ Enter
            </kbd>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {hasCalculated && (
            <button
              type="button"
              onClick={handleReset}
              className="sm:w-auto flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              title="Reset inputs and clear calculation (Esc)"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                Esc
              </kbd>
            </button>
          )}
        </div>

        {/* Quick Example Presets */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">Quick tests:</span>
            <button
              type="button"
              onClick={() => applyPreset('2000-01-01')}
              className="hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Y2K (Jan 1, 2000)
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => applyPreset('2002-03-14')}
              className="hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              March 14, 2002
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => applyPreset('2004-02-29')}
              className="hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Leap Day (Feb 29, 2004)
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => applyPreset('1990-07-20')}
              className="hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              July 20, 1990
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
