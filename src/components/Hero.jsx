import { MapPin, ChevronDown } from 'lucide-react';
import SearchPanel from './SearchPanel';

const STATS = [
  { val: '50+', label: 'Destinations' },
  { val: '4.8★', label: 'Avg rating' },
  { val: '2hr', label: 'To plan a trip' },
];

export default function Hero({ onSearch }) {
  return (
    <section id="discover" className="relative flex flex-col" style={{ minHeight: '100svh' }}>
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85"
          alt="Mountain road winding through autumn forest"
          className="w-full h-full object-cover object-center"
          fetchpriority="high"
        />
        {/* layered gradient: keeps top readable + bottom punchy */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(175deg, rgba(10,18,32,0.72) 0%, rgba(10,18,32,0.38) 55%, rgba(10,18,32,0.70) 100%)' }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-center px-5 pt-28 pb-20">

        {/* badge */}
        <div className="animate-fade-up mb-7" style={{ animationDelay: '0.05s' }}>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full"
            style={{ background: 'hsla(34,82%,50%,0.18)', border: '1px solid hsla(34,82%,60%,0.45)', color: 'hsl(38,95%,72%)' }}>
            <MapPin size={10} strokeWidth={3} />
            Weekend Getaways
          </span>
        </div>

        {/* headline */}
        <h1 className="animate-fade-up text-center text-white leading-[1.02] mb-5"
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.8rem,8vw,6.5rem)', animationDelay: '0.12s' }}>
          Escape the<br />
          <em style={{ color: 'hsl(38,95%,65%)', fontStyle: 'italic' }}>ordinary.</em>
        </h1>

        {/* sub */}
        <p className="animate-fade-up text-center text-white/70 max-w-md leading-relaxed mb-10"
          style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', animationDelay: '0.2s' }}>
          Tell us your vibe, budget and available time.
          <br className="hidden sm:block" />
          We'll find a getaway worth leaving home for.
        </p>

        {/* planner card */}
        <div className="animate-fade-up w-full max-w-3xl" style={{ animationDelay: '0.28s' }}>
          <SearchPanel onSearch={onSearch} />
        </div>

        {/* stat pills */}
        <div className="animate-fade-up flex flex-wrap justify-center gap-4 mt-10" style={{ animationDelay: '0.38s' }}>
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{s.val}</span>
              <span className="text-xs text-white/50">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <button
        onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.18em] uppercase">Explore</span>
        <ChevronDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}
