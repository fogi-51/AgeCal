import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How old am I?',
    answer:
      'Your age is the exact amount of time that has elapsed since your moment of birth. Simply select your birth date above and AgeCalc will instantly display your exact age in years, months, days, hours, and seconds.',
  },
  {
    id: 'faq-2',
    question: 'How is age calculated?',
    answer:
      'AgeCalc uses strict calendar arithmetic rather than dividing total days by 365.25. It computes the calendar years, accounts for varying month lengths (28, 29, 30, or 31 days), and properly borrows days when the target day is earlier in the month than the birth day.',
  },
  {
    id: 'faq-3',
    question: 'Can I calculate my age on a specific date?',
    answer:
      'Yes! By changing the "Calculate Age As Of" input, you can find out how old you were on a historical date (such as graduation or a wedding) or how old you will be on a future milestone.',
  },
  {
    id: 'faq-4',
    question: 'Does the calculator handle leap years and February 29?',
    answer:
      'Yes, the algorithm rigorously detects leap years (years divisible by 4, except century years unless divisible by 400). If you were born on February 29, the calculator tracks your leap year anniversaries and uses the standardized calendar convention celebrating on March 1st during common years.',
  },
  {
    id: 'faq-5',
    question: 'How many days old am I?',
    answer:
      'AgeCalc converts your total elapsed time into an exact count of days lived. Look at the "Total Days" card in the detailed life statistics section after calculating.',
  },
  {
    id: 'faq-6',
    question: 'How many months old am I?',
    answer:
      'The "Total Months" card reveals the full number of calendar months lived since your birth date, combining completed years times 12 plus remaining elapsed months.',
  },
  {
    id: 'faq-7',
    question: 'How many days are left until my next birthday?',
    answer:
      'The "Your Next Birthday" card automatically projects your upcoming celebration date, tells you what day of the week it falls on, and provides an exact countdown in remaining days, months, and days.',
  },
  {
    id: 'faq-8',
    question: "Can I calculate someone else's age?",
    answer:
      'Absolutely. You can calculate the age of your children, pets, parents, historic events, or relationship anniversaries by simply picking their inception or birth date.',
  },
  {
    id: 'faq-9',
    question: 'Is AgeCalc free?',
    answer:
      'Yes, AgeCalc is 100% free with no hidden fees, no subscriptions, and no paywalls. All calculations and features are completely available to everyone.',
  },
  {
    id: 'faq-10',
    question: 'Do I need to create an account?',
    answer:
      'No registration, email, or account creation is required. AgeCalc runs locally and privately inside your web browser without storing or transmitting personal data.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Everything you need to know about exact age calculations and calendar conventions.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = !!openIds[faq.id];
          return (
            <div
              key={faq.id}
              className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`answer-${faq.id}`}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`answer-${faq.id}`}
                  className="px-4 sm:px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 animate-in fade-in duration-150"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
