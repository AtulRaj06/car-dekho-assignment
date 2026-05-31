import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCarImage } from '@/lib/carImages';
import { getSegmentColor, getSegmentLabel } from '@/lib/scoring';
import BackButton from './BackButton';
import ReviewForm from './ReviewForm';

function StarDisplay({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const specs = (car) => [
  {
    group: 'Ownership',
    items: [
      { label: 'Price',        value: `₹${car.price}L`, sub: 'ex-showroom' },
      { label: 'Fuel type',    value: capitalize(car.fuelType) },
      { label: 'Transmission', value: capitalize(car.transmission) },
    ],
  },
  {
    group: 'Performance',
    items: [
      { label: 'Engine',  value: car.engineCC ? `${car.engineCC} cc` : 'Electric' },
      { label: 'Power',   value: `${car.powerBHP} BHP` },
      { label: 'Mileage', value: car.fuelType === 'electric' ? `${car.mileage} km` : `${car.mileage} kmpl`, sub: 'ARAI claimed' },
    ],
  },
  {
    group: 'Space & Safety',
    items: [
      { label: 'Seating',          value: `${car.seatingCapacity} seats` },
      { label: 'Boot space',       value: `${car.bootSpace} L` },
      { label: 'Ground clearance', value: `${car.groundClearance} mm` },
      { label: 'NCAP safety',      value: car.safetyRating > 0 ? `${car.safetyRating} / 5 ★` : 'Not rated' },
    ],
  },
];

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

export default async function CarDetailPage({ params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const car = await prisma.car.findUnique({
    where: { id },
    include: { reviews: { orderBy: { createdAt: 'desc' } } },
  });

  if (!car) notFound();

  const pros = JSON.parse(car.pros);
  const cons = JSON.parse(car.cons);
  const imageUrl = getCarImage(car.make, car.model);
  const gradientClass = getSegmentColor(car.segment);
  const avgRating = car.reviews.length
    ? (car.reviews.reduce((a, r) => a + r.rating, 0) / car.reviews.length).toFixed(1)
    : null;

  const specGroups = specs(car);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">CarAdvisor</span>
          </Link>
          <BackButton className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back
          </BackButton>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />
            <span className="text-white/20 text-[10rem] font-black select-none leading-none">
              {car.make.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`bg-gradient-to-r ${gradientClass} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
                  {getSegmentLabel(car.segment)}
                </span>
                {car.safetyRating > 0 && (
                  <span className="bg-emerald-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {car.safetyRating}★ NCAP
                  </span>
                )}
              </div>
              <p className="text-white/70 text-sm font-medium">{car.make}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {car.model} <span className="font-normal text-white/80">{car.variant}</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs mb-0.5">Starting from</p>
              <p className="text-3xl font-bold text-white">₹{car.price}L</p>
              {avgRating && (
                <div className="flex items-center gap-1.5 justify-end mt-1">
                  <StarDisplay rating={avgRating} />
                  <span className="text-white/70 text-sm">{avgRating} ({car.reviews.length})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Specs */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-5">Specifications</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {specGroups.map((group) => (
              <div key={group.group} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{group.group}</h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {group.items.map((item) => (
                    <div key={item.label} className="px-5 py-3.5 flex items-center justify-between">
                      <span className="text-sm text-slate-500">{item.label}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                        {item.sub && <p className="text-xs text-slate-400">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pros & Cons */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-5">Pros & Cons</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-emerald-800">What we like</h3>
              </div>
              <ul className="divide-y divide-slate-50">
                {pros.map((p, i) => (
                  <li key={i} className="px-5 py-3.5 flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-red-50 border-b border-red-100 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-red-800">Watch outs</h3>
              </div>
              <ul className="divide-y divide-slate-50">
                {cons.map((c, i) => (
                  <li key={i} className="px-5 py-3.5 flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-1.5 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Owner reviews</h2>
              {avgRating && (
                <div className="flex items-center gap-2 mt-1">
                  <StarDisplay rating={avgRating} />
                  <span className="text-sm font-semibold text-slate-700">{avgRating}</span>
                  <span className="text-sm text-slate-400">· {car.reviews.length} review{car.reviews.length !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          {car.reviews.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-10 text-center mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm font-medium">No reviews yet.</p>
              <p className="text-slate-400 text-sm">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {car.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{review.author.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{review.author}</p>
                        <p className="text-xs text-slate-400">
                          {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <StarDisplay rating={review.rating} />
                      <span className="text-sm font-semibold text-slate-700">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Review form */}
          <ReviewForm carId={car.id} />
        </section>

      </div>
    </div>
  );
}
