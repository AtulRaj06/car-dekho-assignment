'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getScoreColor, getSegmentColor, getSegmentLabel } from '@/lib/scoring';

function StarRating({ rating }) {
  if (!rating) return <span className="text-xs text-slate-400">No rating</span>;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating}</span>
    </div>
  );
}

function ScoreBar({ score }) {
  const color =
    score >= 80 ? 'bg-emerald-500' :
    score >= 60 ? 'bg-blue-500' :
    score >= 40 ? 'bg-amber-500' :
    'bg-slate-400';

  return (
    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-700`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

function CarCard({ car, isSelected, onToggleCompare, compareDisabled }) {
  const gradientClass = getSegmentColor(car.segment);
  const scoreColors = getScoreColor(car.score);

  return (
    <div className={`relative bg-white rounded-2xl border-2 transition-all flex flex-col shadow-sm ${
      isSelected ? 'border-blue-500 shadow-blue-100 shadow-md' : 'border-slate-100 hover:border-slate-200 hover:shadow-md'
    }`}>
      {/* Full-card link — sits above content but below compare button */}
      <Link
        href={`/cars/${car.id}`}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label={`View ${car.make} ${car.model} details`}
      />
      {/* Car image / colour band */}
      <div className={`h-44 rounded-t-xl relative overflow-hidden ${car.imageUrl ? 'bg-slate-100' : `bg-gradient-to-br ${gradientClass}`}`}>
        {car.imageUrl ? (
          <img
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <span className="absolute inset-0 flex items-center justify-center text-white/20 text-8xl font-black select-none">
              {car.make.slice(0, 2).toUpperCase()}
            </span>
          </>
        )}
        {/* Overlay badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {getSegmentLabel(car.segment)}
        </span>
        <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full border ${scoreColors}`}>
          {car.score}%
        </span>
      </div>

      {/* Score bar */}
      <div className="px-5 pt-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-400 font-medium">Match score</span>
          <span className="text-xs font-bold text-slate-600">{car.score}%</span>
        </div>
        <ScoreBar score={car.score} />
      </div>

      {/* Body */}
      <div className="p-5 pt-4 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{car.make}</p>
          <h3 className="text-lg font-bold text-slate-900 leading-snug">{car.model} {car.variant}</h3>
          <p className="text-2xl font-bold text-blue-700 mt-1">₹{car.price}L</p>
        </div>

        {car.highlights.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {car.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Quick specs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Mileage', value: car.fuelType === 'electric' ? `${car.mileage}km` : `${car.mileage}kpl` },
            { label: 'Seats',   value: car.seatingCapacity },
            { label: 'Safety',  value: car.safetyRating > 0 ? `${car.safetyRating}★` : 'N/A' },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
              <p className="text-xs text-slate-400 mb-0.5">{s.label}</p>
              <p className="text-sm font-bold text-slate-700">{s.value}</p>
            </div>
          ))}
        </div>

        {car.avgRating && (
          <div className="mb-4 flex items-center gap-1.5">
            <StarRating rating={car.avgRating} />
            <span className="text-xs text-slate-400">({car.reviews.length} reviews)</span>
          </div>
        )}

        {/* Compare button — z-20 puts it above the card overlay link */}
        <div className="mt-auto relative z-20">
          <button
            onClick={() => onToggleCompare(car.id)}
            disabled={compareDisabled && !isSelected}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isSelected
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                : compareDisabled
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
            }`}
          >
            {isSelected ? '✓ Added to compare' : 'Add to compare'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsClient({ cars, prefs, prefLabels }) {
  const router = useRouter();
  const [compareIds, setCompareIds] = useState([]);

  function toggleCompare(id) {
    setCompareIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  const topCars = cars.slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <span className="font-bold text-slate-900 text-lg">CarAdvisor</span>
          </Link>
          <Link href="/quiz" className="text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Retake quiz
          </Link>
        </div>
      </nav>

      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Your personalised shortlist</h1>
            <p className="text-slate-500 mt-1 text-sm">Ranked by match score · {topCars.length} cars shown</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(prefLabels).map(([key, label]) =>
              prefs[key] !== 'any' ? (
                <span key={key} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100">
                  {label}
                </span>
              ) : null
            )}
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isSelected={compareIds.includes(car.id)}
              onToggleCompare={toggleCompare}
              compareDisabled={compareIds.length >= 3}
            />
          ))}
        </div>
        {cars.length > 10 && (
          <p className="text-center text-sm text-slate-400 mt-8">
            Showing top 10 matches. Retake the quiz to narrow further.
          </p>
        )}
      </div>

      {/* Compare tray */}
      {compareIds.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl shadow-slate-900/40 px-6 py-4 flex items-center gap-4 border border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">{compareIds.length} cars selected</span>
            </div>
            <button
              onClick={() => router.push(`/compare?ids=${compareIds.join(',')}`)}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all shadow-sm"
            >
              Compare now →
            </button>
            <button
              onClick={() => setCompareIds([])}
              className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
