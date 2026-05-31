import Link from 'next/link';

const steps = [
  {
    title: 'Tell us your needs',
    desc: "Budget, use case, who's riding — 5 quick questions, no sign-up.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
  },
  {
    title: 'Get matched',
    desc: 'We score every car against your priorities and rank the best fits.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: 'Compare & decide',
    desc: 'Side-by-side comparison of your shortlist on specs that matter to you.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
];

const segments = [
  { label: 'Hatchback',   slug: 'hatchback',    range: '₹4–12L',  color: 'from-blue-500 to-blue-700',       seats: '5',   cars: 6 },
  { label: 'Sedan',       slug: 'sedan',         range: '₹10–16L', color: 'from-violet-500 to-violet-700',   seats: '5',   cars: 4 },
  { label: 'Compact SUV', slug: 'compact-suv',   range: '₹10–15L', color: 'from-orange-400 to-orange-600',   seats: '5',   cars: 5 },
  { label: 'SUV',         slug: 'mid-suv',       range: '₹18–52L', color: 'from-green-500 to-green-700',     seats: '5–7', cars: 4 },
  { label: 'MPV',         slug: 'mpv',           range: '₹14–21L', color: 'from-teal-500 to-teal-700',       seats: '7',   cars: 3 },
  { label: 'Electric',    slug: 'ev',            range: '₹19–23L', color: 'from-emerald-400 to-emerald-600', seats: '5',   cars: 3 },
];

const stats = [
  { value: '20+', label: 'Cars ranked' },
  { value: '6',   label: 'Segments' },
  { value: '5',   label: 'Questions' },
  { value: '2 min', label: 'Average time' },
];

function Container({ children, className = '' }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAV */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <Container className="py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">CarAdvisor</span>
          </div>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-800 active:scale-95 transition-all shadow-sm"
          >
            Find my car
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </Container>
      </nav>

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative py-28 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full inline-block animate-pulse" />
            20 cars · 6 segments · personalised ranking
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.08] max-w-4xl tracking-tight">
            Find your perfect car.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              In 2 minutes.
            </span>
          </h1>

          <p className="text-lg text-slate-300 mb-10 max-w-xl leading-relaxed">
            Too many options, too many specs. Answer 5 quick questions and we'll score
            every car against your priorities — a confident shortlist, not a wall of filters.
          </p>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-lg px-10 py-5 rounded-xl transition-all shadow-lg shadow-orange-500/25 mb-5"
          >
            Start the quiz
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <p className="text-slate-400 text-sm">5 questions · no sign-up required</p>
        </Container>

        {/* Stats bar */}
        <div className="relative border-t border-white/10">
          <Container className="py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center py-2">
                  <span className="text-2xl font-bold text-white">{s.value}</span>
                  <span className="text-xs text-slate-400 mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white">
        <Container className="py-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How it works</h2>
            <p className="text-slate-500 max-w-xs mx-auto">From confused to confident in three steps.</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative bg-slate-50 rounded-2xl border border-slate-100 p-9 hover:border-blue-100 hover:shadow-lg hover:-translate-y-0.5 transition-all group overflow-hidden"
              >
                {/* Ghost step number */}
                <span className="absolute top-6 right-7 text-6xl font-black text-slate-100 select-none leading-none group-hover:text-blue-50 transition-colors">
                  {i + 1}
                </span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-sm mb-6 group-hover:scale-105 transition-transform relative z-10">
                  {s.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 relative z-10">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SEGMENTS */}
      <section className="bg-slate-50">
        <Container className="py-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Every segment covered</h2>
            <p className="text-slate-500">From city hatchbacks to adventure-ready SUVs.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {segments.map((seg) => (
              <Link
                key={seg.label}
                href={`/segment/${seg.slug}`}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-200 transition-all group block"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${seg.color} mb-5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{seg.label}</div>
                <div className="text-sm text-slate-400 mt-1.5">{seg.range} · {seg.seats} seats</div>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${seg.color}`}>
                    {seg.cars} cars
                  </span>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
        <Container className="relative py-20 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Ready to find your car?</h2>
          <p className="text-blue-200 mb-8 text-lg max-w-sm">Stop comparing spec sheets. Start with your priorities.</p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 bg-white text-blue-700 font-semibold text-lg px-10 py-5 rounded-xl hover:bg-blue-50 active:scale-95 transition-all shadow-xl shadow-blue-900/20"
          >
            Start the quiz
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <p className="text-blue-300/70 text-sm mt-5">Free · No sign-up · Takes 2 minutes</p>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900">
        <Container className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="text-sm font-semibold text-slate-300">CarAdvisor</span>
          </div>
          <p className="text-xs text-slate-500">20 cars · Prices ex-showroom Delhi · Data for illustrative purposes</p>
        </Container>
      </footer>

    </div>
  );
}
