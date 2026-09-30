import React, { useState, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CalculatorCard } from './components/CalculatorCard';
import { ResultDashboard } from './components/ResultDashboard';
import { EducationalSections } from './components/EducationalSections';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';
import { calculateAge, AgeResult } from './utils/ageCalculator';

function AgeCalculatorApp() {
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [savedBirthDate, setSavedBirthDate] = useState<string>('');
  const [savedTargetDate, setSavedTargetDate] = useState<string>('');

  const calculatorRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleCalculate = (birthDateStr: string, targetDateStr: string) => {
    setSavedBirthDate(birthDateStr);
    setSavedTargetDate(targetDateStr);
    const result = calculateAge(birthDateStr, targetDateStr);
    setAgeResult(result);

    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-dashboard');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleReset = () => {
    setAgeResult(null);
    setSavedBirthDate('');
    setSavedTargetDate('');
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Global window listener for Esc key to trigger reset from anywhere
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToFaq = () => {
    const el = document.getElementById('faq');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar
        onScrollToCalculator={scrollToCalculator}
        onScrollToHowItWorks={scrollToHowItWorks}
        onScrollToFaq={scrollToFaq}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        {/* Hero Section */}
        <Hero />

        {/* Calculator Card */}
        <div ref={calculatorRef}>
          <CalculatorCard
            onCalculate={handleCalculate}
            onReset={handleReset}
            hasCalculated={!!ageResult}
            initialBirthDate={savedBirthDate}
            initialTargetDate={savedTargetDate}
          />
        </div>

        {/* Dynamic Result Dashboard */}
        {ageResult && (
          <div ref={resultsRef}>
            <ResultDashboard ageResult={ageResult} onReset={handleReset} />
          </div>
        )}

        {/* Educational Sections */}
        <EducationalSections />

        {/* Accordion FAQ */}
        <FaqAccordion />
      </main>

      <Footer
        onScrollToCalculator={scrollToCalculator}
        onScrollToHowItWorks={scrollToHowItWorks}
        onScrollToFaq={scrollToFaq}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AgeCalculatorApp />
    </ThemeProvider>
  );
}
