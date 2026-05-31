'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const questions = [
  {
    id: 'budget',
    question: "What's your budget?",
    subtitle: 'On-road price, all-in.',
    options: [
      { value: 'under-6',  label: 'Under ₹6L',   desc: 'Entry-level hatchbacks' },
      { value: '6-10',     label: '₹6 – 10L',    desc: 'Premium hatchbacks & compact sedans' },
      { value: '10-15',    label: '₹10 – 15L',   desc: 'Compact SUVs & mid sedans' },
      { value: '15-25',    label: '₹15 – 25L',   desc: 'Mid SUVs, MPVs & EVs' },
      { value: 'above-25', label: 'Above ₹25L',  desc: 'Premium & performance SUVs' },
    ],
  },
  {
    id: 'useCase',
    question: 'How will you mainly use it?',
    subtitle: 'Pick the one that fits your daily reality.',
    options: [
      { value: 'city',      label: 'City commute',          desc: 'Daily office runs, stop-and-go traffic' },
      { value: 'highway',   label: 'Highway travel',        desc: 'Long weekend trips, inter-city journeys' },
      { value: 'family',    label: 'Family trips',          desc: 'School runs, weekend outings, road trips' },
      { value: 'adventure', label: 'Off-road / Adventure',  desc: 'Hills, rough terrain, open roads' },
    ],
  },
  {
    id: 'groupSize',
    question: "Who's this car for?",
    subtitle: 'This helps us match cabin size and seating.',
    options: [
      { value: 'solo',   label: 'Just me',        desc: 'Primary daily driver, solo use' },
      { value: 'couple', label: 'Me & partner',   desc: 'Two people, occasional guests' },
      { value: 'small',  label: 'Small family',   desc: '3–4 people, including kids' },
      { value: 'large',  label: 'Large family',   desc: '5+ people, need 6–7 seats' },
    ],
  },
  {
    id: 'priority',
    question: "What's your top priority?",
    subtitle: "We'll weight your shortlist around this.",
    options: [
      { value: 'fuel',        label: 'Fuel efficiency',  desc: 'Lowest cost per km, best mileage' },
      { value: 'space',       label: 'Cabin space',      desc: 'Big boot, legroom, storage' },
      { value: 'safety',      label: 'Safety',           desc: 'NCAP ratings, airbags, ADAS' },
      { value: 'performance', label: 'Performance',      desc: 'Engine power, driving feel' },
      { value: 'value',       label: 'Value for money',  desc: 'Best specs per rupee spent' },
    ],
  },
  {
    id: 'fuelType',
    question: 'Any fuel preference?',
    subtitle: "Skip if you're open to anything.",
    options: [
      { value: 'any',      label: 'No preference', desc: 'Show me everything' },
      { value: 'petrol',   label: 'Petrol',         desc: 'Widely available, lower upfront cost' },
      { value: 'diesel',   label: 'Diesel',         desc: 'Better highway mileage, higher torque' },
      { value: 'electric', label: 'Electric',       desc: 'Lowest running cost, zero emissions' },
      { value: 'cng',      label: 'CNG / Hybrid',   desc: 'Very low fuel cost, eco-friendly' },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = questions[step];

  function handleSelect(value) {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 220);
    } else {
      router.push(`/results?${new URLSearchParams(updated).toString()}`);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="font-semibold text-slate-900 text-sm">CarAdvisor</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          {/* Step pill indicators */}
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-400 ${
                  i < step
                    ? 'w-5 h-2 bg-blue-600'
                    : i === step
                    ? 'w-7 h-2 bg-blue-600'
                    : 'w-2 h-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}% complete</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full mb-4 border border-blue-100">
                Step {step + 1} of {questions.length}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{current.question}</h1>
              <p className="text-slate-500">{current.subtitle}</p>
            </div>

            <div className="space-y-4">
              {current.options.map((opt) => {
                const isSelected = answers[current.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-sm shadow-blue-100'
                        : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 group-hover:border-blue-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold transition-colors ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                          {opt.label}
                        </div>
                        <div className="text-sm text-slate-500 mt-1">{opt.desc}</div>
                      </div>
                      {isSelected && (
                        <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {step === questions.length - 1 && (
              <p className="text-center text-sm text-slate-400 mt-8">
                Not sure? Pick &quot;No preference&quot; to see all options.
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
