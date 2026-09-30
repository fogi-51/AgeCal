/**
 * AgeCalc - Dedicated, Reusable and Testable Age Calculation Utility
 *
 * Implements precise calendar arithmetic according to the Gregorian calendar,
 * properly accounting for leap years, February 29 birthdays, varying month lengths,
 * and time-zone-safe date boundaries.
 */

export interface AgeResult {
  // Exact calendar age
  years: number;
  months: number;
  days: number;

  // Total elapsed metrics
  totalMonths: number;
  totalWeeks: number;
  remainingDaysInWeek: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;

  // Next birthday metrics
  isBirthdayToday: boolean;
  nextBirthdayDate: Date;
  nextBirthdayDayOfWeek: string;
  daysUntilNextBirthday: number;
  monthsAndDaysUntilNextBirthday: { months: number; days: number };

  // Birth details
  birthDate: Date;
  targetDate: Date;
  birthDayOfWeek: string;
  birthYear: number;
  isBirthLeapYear: boolean;
  isFeb29Birthday: boolean;

  // Cultural & Astronomical data
  zodiacSign: ZodiacInfo;
  chineseZodiac: ChineseZodiacInfo;
  generation: GenerationInfo;

  // Fun milestones & stats
  stats: {
    approxHeartbeats: number;
    approxBreaths: number;
    approxSleepYears: number;
    billionthSecondDate: Date;
    day10000Date: Date;
    planetaryAges: {
      mercury: number;
      venus: number;
      mars: number;
      jupiter: number;
      saturn: number;
    };
  };
}

export interface ZodiacInfo {
  name: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dateRange: string;
  traits: string[];
}

export interface ChineseZodiacInfo {
  animal: string;
  element: string;
  yinYang: 'Yin' | 'Yang';
}

export interface GenerationInfo {
  name: string;
  range: string;
  description: string;
}

/**
 * Checks if a given year is a Gregorian leap year.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Gets the number of days in a specific month of a given year.
 * @param year Full year (e.g. 2026)
 * @param monthIndex 0-indexed month (0 = Jan, 11 = Dec)
 */
export function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/**
 * Determines Western Zodiac Sign based on month (1-12) and day (1-31).
 */
export function getZodiacSign(month: number, day: number): ZodiacInfo {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { name: 'Aries', symbol: '♈', element: 'Fire', dateRange: 'Mar 21 – Apr 19', traits: ['Dynamic', 'Courageous', 'Pioneering'] };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { name: 'Taurus', symbol: '♉', element: 'Earth', dateRange: 'Apr 20 – May 20', traits: ['Reliable', 'Patient', 'Determined'] };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { name: 'Gemini', symbol: '♊', element: 'Air', dateRange: 'May 21 – Jun 20', traits: ['Curious', 'Adaptable', 'Expressive'] };
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { name: 'Cancer', symbol: '♋', element: 'Water', dateRange: 'Jun 21 – Jul 22', traits: ['Intuitive', 'Loyal', 'Empathetic'] };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { name: 'Leo', symbol: '♌', element: 'Fire', dateRange: 'Jul 23 – Aug 22', traits: ['Confident', 'Generous', 'Charismatic'] };
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { name: 'Virgo', symbol: '♍', element: 'Earth', dateRange: 'Aug 23 – Sep 22', traits: ['Analytical', 'Meticulous', 'Helpful'] };
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { name: 'Libra', symbol: '♎', element: 'Air', dateRange: 'Sep 23 – Oct 22', traits: ['Diplomatic', 'Gracious', 'Harmonious'] };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { name: 'Scorpio', symbol: '♏', element: 'Water', dateRange: 'Oct 23 – Nov 21', traits: ['Passionate', 'Resilient', 'Perceptive'] };
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { name: 'Sagittarius', symbol: '♐', element: 'Fire', dateRange: 'Nov 22 – Dec 21', traits: ['Adventurous', 'Philosophical', 'Optimistic'] };
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { name: 'Capricorn', symbol: '♑', element: 'Earth', dateRange: 'Dec 22 – Jan 19', traits: ['Ambitious', 'Disciplined', 'Strategic'] };
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { name: 'Aquarius', symbol: '♒', element: 'Air', dateRange: 'Jan 20 – Feb 18', traits: ['Innovative', 'Humanitarian', 'Independent'] };
  }
  return { name: 'Pisces', symbol: '♓', element: 'Water', dateRange: 'Feb 19 – Mar 20', traits: ['Imaginative', 'Compassionate', 'Intuitive'] };
}

/**
 * Determines Chinese Zodiac animal and element from the birth year.
 */
export function getChineseZodiac(year: number): ChineseZodiacInfo {
  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  // Base year 1900 was Year of the Rat
  const animalIndex = ((year - 1900) % 12 + 12) % 12;
  const animal = animals[animalIndex];

  // Five elements cycle every 2 years: Metal, Water, Wood, Fire, Earth
  const elementIndex = Math.floor(((year - 1900) % 10 + 10) % 10 / 2);
  const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];
  const element = elements[elementIndex];

  const yinYang = year % 2 === 0 ? 'Yang' : 'Yin';

  return { animal, element, yinYang };
}

/**
 * Determines the generational cohort.
 */
export function getGeneration(year: number): GenerationInfo {
  if (year >= 2025) {
    return { name: 'Generation Beta', range: '2025 – Present', description: 'The nascent generation born into ubiquitously embodied artificial intelligence and emerging spatial computing.' };
  }
  if (year >= 2013) {
    return { name: 'Generation Alpha', range: '2013 – 2024', description: 'The first generation immersed entirely in seamless mobile devices, cloud streaming, and hyper-connected interfaces.' };
  }
  if (year >= 1997) {
    return { name: 'Generation Z', range: '1997 – 2012', description: 'Digital natives renowned for pragmatic creativity, environmental mindfulness, and digital community fluency.' };
  }
  if (year >= 1981) {
    return { name: 'Millennials (Gen Y)', range: '1981 – 1996', description: 'Bridged the analog-to-digital revolution; pioneered social media, tech mobility, and experiential lifestyle.' };
  }
  if (year >= 1965) {
    return { name: 'Generation X', range: '1965 – 1980', description: 'Self-reliant pioneers of modern technology, independent work styles, and cultural resurgence.' };
  }
  if (year >= 1946) {
    return { name: 'Baby Boomers', range: '1946 – 1964', description: 'Influential post-war cohort that drove monumental civic, economic, and institutional growth worldwide.' };
  }
  if (year >= 1928) {
    return { name: 'Silent Generation', range: '1928 – 1945', description: 'Resilient and focused generation that rebuilt global economies and fostered civil rights foundations.' };
  }
  return { name: 'Greatest Generation', range: '1901 – 1927', description: 'Heroic cohort that overcame the Great Depression and preserved freedom through World War II.' };
}

/**
 * Normalizes date to midnight local time for pure calendar calculation.
 */
export function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Validates birth date and target date inputs.
 */
export function validateDates(birthDateStr: string, targetDateStr: string): { isValid: boolean; error: string | null } {
  if (!birthDateStr || birthDateStr.trim() === '') {
    return { isValid: false, error: 'Please select your date of birth.' };
  }

  const birthDate = new Date(birthDateStr + 'T00:00:00');
  if (isNaN(birthDate.getTime())) {
    return { isValid: false, error: 'Please enter a valid date of birth.' };
  }

  const today = normalizeDate(new Date());
  const birthMidnight = normalizeDate(birthDate);

  // If no target date provided, default to today
  const targetDate = targetDateStr ? new Date(targetDateStr + 'T00:00:00') : today;
  if (isNaN(targetDate.getTime())) {
    return { isValid: false, error: 'Please enter a valid calculation date.' };
  }

  const targetMidnight = normalizeDate(targetDate);

  // If calculating against today and birth date is in future:
  if (targetMidnight.getTime() === today.getTime() && birthMidnight.getTime() > today.getTime()) {
    return { isValid: false, error: 'Your date of birth cannot be in the future.' };
  }

  if (targetMidnight.getTime() < birthMidnight.getTime()) {
    return { isValid: false, error: 'Calculation date must be after your date of birth.' };
  }

  return { isValid: true, error: null };
}

/**
 * Main age calculation engine.
 *
 * Implements rigorous calendar arithmetic:
 * - Subtraction of Years, Months, and Days with proper borrowing
 * - Accurate leap year calculation and February 29 birthday handling:
 *   (Convention: on non-leap years, February 29 birthdays occur on March 1, completing 365 calendar days)
 * - Exact total day/week/hour/minute/second counters
 * - Next birthday countdown & celebration detection
 */
export function calculateAge(birthDateInput: Date | string, targetDateInput: Date | string): AgeResult {
  const birthDateObj = typeof birthDateInput === 'string'
    ? new Date(birthDateInput.includes('T') ? birthDateInput : `${birthDateInput}T00:00:00`)
    : birthDateInput;

  const targetDateObj = typeof targetDateInput === 'string'
    ? new Date(targetDateInput.includes('T') ? targetDateInput : `${targetDateInput}T00:00:00`)
    : targetDateInput;

  const bYear = birthDateObj.getFullYear();
  const bMonth = birthDateObj.getMonth(); // 0-indexed
  const bDay = birthDateObj.getDate();

  const tYear = targetDateObj.getFullYear();
  const tMonth = targetDateObj.getMonth(); // 0-indexed
  const tDay = targetDateObj.getDate();

  const isBirthLeap = isLeapYear(bYear);
  const isFeb29 = bMonth === 1 && bDay === 29;

  // 1. Calendar Arithmetic: Years, Months, Days
  let years = tYear - bYear;
  let months = tMonth - bMonth;
  let days = tDay - bDay;

  if (days < 0) {
    months -= 1;
    // Borrow days from the previous month of target date
    const prevMonth = tMonth === 0 ? 11 : tMonth - 1;
    const prevYear = tMonth === 0 ? tYear - 1 : tYear;
    days += getDaysInMonth(prevYear, prevMonth);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // 2. Total Elapsed Metrics
  // We use pure UTC timestamps to avoid Daylight Savings Time (DST) shift anomalies
  const utcBirth = Date.UTC(bYear, bMonth, bDay);
  const utcTarget = Date.UTC(tYear, tMonth, tDay);
  const diffMs = Math.max(0, utcTarget - utcBirth);

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDaysInWeek = totalDays % 7;
  const totalMonths = years * 12 + months;

  // 3. Next Birthday Calculation
  // Determine if today (relative to target) is birthday
  let isBirthdayToday = false;
  let nextBirthdayDate: Date;

  // Handle Feb 29 birthday convention in non-leap years:
  // In a non-leap year, a Feb 29 birth date is celebrated on March 1
  const getBirthdayForYear = (year: number): Date => {
    if (isFeb29 && !isLeapYear(year)) {
      return new Date(year, 2, 1); // March 1st
    }
    return new Date(year, bMonth, bDay);
  };

  const thisYearBirthday = getBirthdayForYear(tYear);
  const utcThisYearBday = Date.UTC(thisYearBirthday.getFullYear(), thisYearBirthday.getMonth(), thisYearBirthday.getDate());

  if (utcTarget === utcThisYearBday) {
    isBirthdayToday = true;
    nextBirthdayDate = thisYearBirthday;
  } else if (utcTarget < utcThisYearBday) {
    nextBirthdayDate = thisYearBirthday;
  } else {
    // Already passed this year, next birthday is in the following year
    nextBirthdayDate = getBirthdayForYear(tYear + 1);
  }

  const utcNextBday = Date.UTC(nextBirthdayDate.getFullYear(), nextBirthdayDate.getMonth(), nextBirthdayDate.getDate());
  const msUntilBday = isBirthdayToday ? 0 : Math.max(0, utcNextBday - utcTarget);
  const daysUntilNextBirthday = Math.ceil(msUntilBday / (1000 * 60 * 60 * 24));

  // Months and days until next birthday breakdown
  let bdayMonths = nextBirthdayDate.getMonth() - tMonth;
  let bdayDays = nextBirthdayDate.getDate() - tDay;
  if (nextBirthdayDate.getFullYear() > tYear) {
    bdayMonths += 12;
  }
  if (bdayDays < 0) {
    bdayMonths -= 1;
    const prevMonth = nextBirthdayDate.getMonth() === 0 ? 11 : nextBirthdayDate.getMonth() - 1;
    const prevYear = nextBirthdayDate.getMonth() === 0 ? nextBirthdayDate.getFullYear() - 1 : nextBirthdayDate.getFullYear();
    bdayDays += getDaysInMonth(prevYear, prevMonth);
  }
  if (bdayMonths < 0) {
    bdayMonths = 0;
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const birthDayOfWeek = daysOfWeek[birthDateObj.getDay()];
  const nextBirthdayDayOfWeek = daysOfWeek[nextBirthdayDate.getDay()];

  // 4. Cultural & Astrological
  const zodiacSign = getZodiacSign(bMonth + 1, bDay);
  const chineseZodiac = getChineseZodiac(bYear);
  const generation = getGeneration(bYear);

  // 5. Fun Milestones & Astronomical
  const approxHeartbeats = Math.round(totalMinutes * 78); // Average resting 78 bpm
  const approxBreaths = Math.round(totalMinutes * 15); // Average 15 breaths per minute
  const approxSleepYears = Number((years / 3).toFixed(1)); // Approx 1/3 of life asleep

  // Billionth second date (1,000,000,000 seconds = ~31.7 years)
  const billionthSecondDate = new Date(birthDateObj.getTime() + 1000000000 * 1000);
  // 10,000 days alive date (~27.38 years)
  const day10000Date = new Date(birthDateObj.getTime() + 10000 * 24 * 60 * 60 * 1000);

  // Planetary ages (relative to Earth orbital periods)
  const planetaryAges = {
    mercury: Number((totalDays / 87.97).toFixed(1)),
    venus: Number((totalDays / 224.7).toFixed(1)),
    mars: Number((totalDays / 686.98).toFixed(1)),
    jupiter: Number((totalDays / 4332.59).toFixed(1)),
    saturn: Number((totalDays / 10759.22).toFixed(2)),
  };

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    remainingDaysInWeek,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    isBirthdayToday,
    nextBirthdayDate,
    nextBirthdayDayOfWeek,
    daysUntilNextBirthday,
    monthsAndDaysUntilNextBirthday: { months: bdayMonths, days: bdayDays },
    birthDate: birthDateObj,
    targetDate: targetDateObj,
    birthDayOfWeek,
    birthYear: bYear,
    isBirthLeapYear: isBirthLeap,
    isFeb29Birthday: isFeb29,
    zodiacSign,
    chineseZodiac,
    generation,
    stats: {
      approxHeartbeats,
      approxBreaths,
      approxSleepYears,
      billionthSecondDate,
      day10000Date,
      planetaryAges,
    },
  };
}

/**
 * Format date nicely for human display
 * e.g., "Thursday, March 14, 2002"
 */
export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format ISO date string YYYY-MM-DD from a Date object
 */
export function toISODateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
