import React, { useState } from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToCalculator: () => void;
  onScrollToHowItWorks: () => void;
  onScrollToFaq: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToCalculator,
  onScrollToHowItWorks,
  onScrollToFaq,
}) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                A
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                AgeCalc
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Simple. Accurate. Free.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
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
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Your calculations are performed locally in your browser. No account is required.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>© 2026 AgeCalc. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Simple Legal Modal */}
      {modalType && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
              {modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed max-h-60 overflow-y-auto">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    AgeCalc is built with user privacy as a cornerstone principle. All chronological and calendar calculations are executed client-side directly within your browser.
                  </p>
                  <p>
                    We do not store, track, or transmit your date of birth or calculation inputs to any third-party marketing databases or profile brokers.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    AgeCalc provides exact chronological date calculations for educational, personal, and informational purposes.
                  </p>
                  <p>
                    While our Gregorian calendar arithmetic adheres to global time standards and leap year conventions, official legal and government document determinations should be verified with the issuing regulatory authority.
                  </p>
                </>
              )}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
