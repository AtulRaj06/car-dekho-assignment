import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSegmentColor, getSegmentLabel } from '@/lib/scoring';
import { getCarImage } from '@/lib/carImages';
import BackButton from './BackButton';

function best(values, type = 'high') {
  const nums = values.map((v) => parseFloat(v)).filter((n) => !isNaN(n));
  if (nums.length === 0) return null;
  return type === 'high' ? Math.max(...nums) : Math.min(...nums);
}

function Cell({ value, highlight, unit = '' }) {
  return (
    <td className={`px-4 py-3.5 text-center text-sm border-b border-slate-100 transition-colors ${
      highlight
        ? 'font-bold text-emerald-700 bg-emerald-50'
        : 'text-slate-700'
    }`}>
      {value !== null && value !== undefined
        ? `${value}${unit}`
        : <span className="text-slate-300">—</span>
      }
    </td>
  );
}

function Row({ label, values, unit, bestType = 'high', subtext }) {
  const bestVal = best(values, bestType);
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-4 py-3.5 text-sm font-medium text-slate-500 border-b border-slate-100 bg-slate-50 w-36">
        <div>{label}</div>
        {subtext && <div className="text-xs text-slate-400 font-normal mt-0.5">{subtext}</div>}
      </td>
      {values.map((v, i) => (
        <Cell
          key={i}
          value={v}
          unit={unit}
          highlight={bestVal !== null && parseFloat(v) === bestVal}
        />
      ))}
    </tr>
  );
}

function SectionHeader({ label, colSpan }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-2.5 bg-slate-100 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-500 rounded-full" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        </div>
      </td>
    </tr>
  );
}

export default async function ComparePage({ searchParams }) {
  const rawIds = (searchParams.ids || '').split(',').map((s) => parseInt(s)).filter(Boolean);
  const ids = rawIds.slice(0, 3);

  if (ids.length < 2) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>
        <p className="text-slate-600 font-medium">Select at least 2 cars to compare.</p>
        <Link href="/quiz" className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm">
          Take the quiz
        </Link>
      </div>
    );
  }

  const cars = await prisma.car.findMany({
    where: { id: { in: ids } },
    include: { reviews: true },
  });

  const ordered = ids
    .map((id) => cars.find((c) => c.id === id))
    .filter(Boolean)
    .map((car) => ({
      ...car,
      pros: JSON.parse(car.pros),
      cons: JSON.parse(car.cons),
      imageUrl: getCarImage(car.make, car.model),
      avgRating:
        car.reviews.length
          ? (car.reviews.reduce((a, r) => a + r.rating, 0) / car.reviews.length).toFixed(1)
          : null,
    }));

  const colSpan = ordered.length + 1;

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
          <BackButton className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to results
          </BackButton>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Side-by-side comparison</h1>
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 bg-emerald-100 border border-emerald-300 rounded-sm" />
            Green highlights mark the best value in each row.
          </p>
        </div>

        {/* Car header cards */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `9rem repeat(${ordered.length}, 1fr)` }}>
          <div />
          {ordered.map((car) => {
            const grad = getSegmentColor(car.segment);
            return (
              <div key={car.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className={`h-36 relative overflow-hidden ${car.imageUrl ? 'bg-slate-100' : `bg-gradient-to-br ${grad}`}`}>
                  {car.imageUrl ? (
                    <img
                      src={car.imageUrl}
                      alt={`${car.make} ${car.model}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-white/25 text-5xl font-black select-none">
                      {car.make.slice(0, 2)}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {getSegmentLabel(car.segment)}
                  </span>
                </div>
                <div className="p-4 text-center">
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{car.make}</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{car.model}</div>
                  <div className="text-xs text-slate-500">{car.variant}</div>
                  <div className="text-lg font-bold text-blue-700 mt-1">₹{car.price}L</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {/* Ownership */}
                <SectionHeader label="Ownership" colSpan={colSpan} />
                <Row label="Price" values={ordered.map((c) => c.price)} unit="L" bestType="low" subtext="ex-showroom" />
                <Row label="Fuel type" values={ordered.map((c) => c.fuelType)} />
                <Row label="Transmission" values={ordered.map((c) => c.transmission)} />

                {/* Efficiency */}
                <SectionHeader label="Efficiency" colSpan={colSpan} />
                <Row
                  label="Mileage"
                  values={ordered.map((c) => c.mileage)}
                  unit={ordered[0]?.fuelType === 'electric' ? ' km' : ' kmpl'}
                  subtext="ARAI claimed"
                />

                {/* Performance */}
                <SectionHeader label="Performance" colSpan={colSpan} />
                <Row label="Power" values={ordered.map((c) => c.powerBHP)} unit=" BHP" />
                <Row label="Engine" values={ordered.map((c) => c.engineCC ? `${c.engineCC}cc` : 'Electric')} />

                {/* Space */}
                <SectionHeader label="Space" colSpan={colSpan} />
                <Row label="Seats" values={ordered.map((c) => c.seatingCapacity)} />
                <Row label="Boot" values={ordered.map((c) => c.bootSpace)} unit="L" />
                <Row label="Clearance" values={ordered.map((c) => c.groundClearance)} unit="mm" subtext="ground clearance" />

                {/* Safety */}
                <SectionHeader label="Safety" colSpan={colSpan} />
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-500 border-b border-slate-100 bg-slate-50">
                    NCAP rating
                  </td>
                  {ordered.map((car) => {
                    const bestSafety = best(ordered.map((c) => c.safetyRating), 'high');
                    const isHighlight = car.safetyRating === bestSafety && bestSafety > 0;
                    return (
                      <td key={car.id} className={`px-4 py-3.5 text-center border-b border-slate-100 transition-colors ${isHighlight ? 'bg-emerald-50' : ''}`}>
                        {car.safetyRating > 0 ? (
                          <span className={`text-sm font-bold ${isHighlight ? 'text-emerald-700' : 'text-slate-700'}`}>
                            {car.safetyRating} ★
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">Not rated</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* User rating */}
                <SectionHeader label="User reviews" colSpan={colSpan} />
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-500 border-b border-slate-100 bg-slate-50">Avg. rating</td>
                  {ordered.map((car) => {
                    const bestRating = best(ordered.map((c) => parseFloat(c.avgRating) || 0), 'high');
                    const isHighlight = parseFloat(car.avgRating) === bestRating && bestRating > 0;
                    return (
                      <td key={car.id} className={`px-4 py-3.5 text-center border-b border-slate-100 transition-colors ${isHighlight ? 'bg-emerald-50 font-bold text-emerald-700' : 'text-slate-700'}`}>
                        {car.avgRating ? (
                          <span className="text-sm">{car.avgRating} / 5</span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Pros */}
                <SectionHeader label="Top pros" colSpan={colSpan} />
                <tr>
                  <td className="px-4 py-4 bg-slate-50" />
                  {ordered.map((car) => (
                    <td key={car.id} className="px-4 py-4 border-b border-slate-100 align-top">
                      <ul className="space-y-2">
                        {car.pros.slice(0, 3).map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Cons */}
                <SectionHeader label="Watch outs" colSpan={colSpan} />
                <tr>
                  <td className="px-4 py-4 bg-slate-50" />
                  {ordered.map((car) => (
                    <td key={car.id} className="px-4 py-4 align-top">
                      <ul className="space-y-2">
                        {car.cons.slice(0, 2).map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                            <span className="w-4 h-4 rounded-full bg-red-50 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">✗</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Back to shortlist */}
        <div className="mt-8 text-center">
          <BackButton className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to shortlist
          </BackButton>
        </div>
      </div>
    </div>
  );
}
