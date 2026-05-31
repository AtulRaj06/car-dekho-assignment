import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCarImage } from '@/lib/carImages';
import { getSegmentColor } from '@/lib/scoring';

const SEGMENT_META = {
  hatchback:     { title: 'Hatchbacks',    desc: 'Nimble city cars with low running costs.', color: 'from-blue-500 to-blue-700' },
  sedan:         { title: 'Sedans',        desc: 'Comfortable cabin with elegant styling.',  color: 'from-violet-500 to-violet-700' },
  'compact-suv': { title: 'Compact SUVs',  desc: 'SUV stance and ground clearance, hatchback value.', color: 'from-orange-400 to-orange-600' },
  'mid-suv':     { title: 'SUVs',          desc: 'Space, power, and road presence.',         color: 'from-green-500 to-green-700' },
  mpv:           { title: 'MPVs',          desc: 'Maximum space for large families.',         color: 'from-teal-500 to-teal-700' },
  ev:            { title: 'Electric Cars', desc: 'Zero emissions, lowest running cost.',      color: 'from-emerald-400 to-emerald-600' },
};

function StarRow({ rating, count }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-slate-400">{rating} ({count})</span>
    </div>
  );
}

function CarCard({ car }) {
  const gradientClass = getSegmentColor(car.segment);
  const imageUrl = getCarImage(car.make, car.model);

  return (
    <Link
      href={`/cars/${car.id}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-200 transition-all flex flex-col overflow-hidden"
    >
      {/* Image / gradient band */}
      <div className={`h-44 relative overflow-hidden ${imageUrl ? 'bg-slate-100' : `bg-gradient-to-br ${gradientClass}`}`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white/20 text-8xl font-black select-none">
              {car.make.slice(0, 2).toUpperCase()}
            </span>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {car.safetyRating > 0 && (
          <span className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {car.safetyRating}★ NCAP
          </span>
        )}
        <span className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {car.fuelType === 'electric' ? 'Electric' : car.transmission === 'automatic' ? 'Auto' : 'Manual'} · {car.fuelType !== 'electric' && car.fuelType}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{car.make}</p>
          <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
            {car.model}{' '}
            <span className="font-normal text-slate-500 text-base">{car.variant}</span>
          </h3>
          <p className="text-2xl font-bold text-blue-700 mt-1">₹{car.price}L</p>
        </div>

        {/* Quick specs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Mileage', value: car.fuelType === 'electric' ? `${car.mileage}km` : `${car.mileage}kpl` },
            { label: 'Seats',   value: car.seatingCapacity },
            { label: 'Power',   value: `${car.powerBHP}bhp` },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
              <p className="text-xs text-slate-400 mb-0.5">{s.label}</p>
              <p className="text-sm font-bold text-slate-700">{s.value}</p>
            </div>
          ))}
        </div>

        {car.avgRating && (
          <div className="mb-3">
            <StarRow rating={car.avgRating} count={car.reviewCount} />
          </div>
        )}

        {/* Footer link row */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-600">View details</span>
          <svg
            className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default async function SegmentPage({ params }) {
  const { segment } = params;
  const meta = SEGMENT_META[segment];

  if (!meta) notFound();

  const cars = await prisma.car.findMany({
    where: { segment },
    include: { reviews: true },
    orderBy: { price: 'asc' },
  });

  const carsWithRating = cars.map((car) => ({
    ...car,
    avgRating: car.reviews.length
      ? (car.reviews.reduce((a, r) => a + r.rating, 0) / car.reviews.length).toFixed(1)
      : null,
    reviewCount: car.reviews.length,
  }));

  const priceMin = Math.min(...cars.map((c) => c.price));
  const priceMax = Math.max(...cars.map((c) => c.price));

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">CarAdvisor</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            All segments
          </Link>
        </div>
      </nav>

      {/* Header banner */}
      <div className={`bg-gradient-to-br ${meta.color} relative overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="max-w-6xl mx-auto px-6 py-12 relative">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-white/60 text-sm font-medium mb-2 flex items-center gap-1.5">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span>Segments</span>
                <span>›</span>
                <span className="text-white">{meta.title}</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{meta.title}</h1>
              <p className="text-white/70 mt-2 text-lg">{meta.desc}</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{carsWithRating.length}</div>
                <div className="text-white/60 text-sm">cars</div>
              </div>
              {cars.length > 0 && (
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">₹{priceMin}–{priceMax}L</div>
                  <div className="text-white/60 text-sm">price range</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {carsWithRating.length} {meta.title.toLowerCase()} · sorted by price (low to high)
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-800 active:scale-95 transition-all shadow-sm"
          >
            Get personalised ranking
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Car grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {carsWithRating.length === 0 ? (
          <div className="text-center py-24 text-slate-400">No cars found in this segment.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {carsWithRating.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        )}
      </div>

    </div>
  );
}
