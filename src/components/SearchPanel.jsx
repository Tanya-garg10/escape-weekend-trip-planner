import { useState } from 'react';
import { MapPin, CalendarDays, Wallet2, Sparkles, ArrowRight } from 'lucide-react';

const VIBES = [
  { id: 'Nature', emoji: '🌿', label: 'Nature' },
  { id: 'Adventure', emoji: '🏔️', label: 'Adventure' },
  { id: 'Culture', emoji: '🏛️', label: 'Culture' },
  { id: 'Relax', emoji: '🧘', label: 'Relax' },
  { id: 'Food', emoji: '🍜', label: 'Food' },
  { id: 'Beach', emoji: '🏖️', label: 'Beach' },
];

const AMBER = 'hsl(34,82%,50%)';

export default function SearchPanel({ onSearch }) {
  const [from, setFrom] = useState('Delhi');
  const [when, setWhen] = useState('This Weekend');
  const [budget, setBudget] = useState('');
  const [vibes, setVibes] = useState([]);

  const toggleVibe = (id) =>
    setVibes((v) => v.includes(id) ? v.filter((x) => x !== id) : [...v, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ from, when, budget, vibes });
    setTimeout(() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  const fieldBase = {
    background: 'white',
    borderRadius: '10px',
    padding: '10px 12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: 'hsl(220,30%,10%)',
    border: '1px solid rgba(255,255,255,0.15)',
    width: '100%',
    outline: 'none',
    appearance: 'none',
    cursor: 'pointer',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: '20px',
        padding: '20px',
      }}
    >
      {/* ── Row 1 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* FROM */}
        <label className="flex flex-col gap-1.5">
          <span className="flex items-center gap-1 text-[10px] font-semibold tracking-[0.12em] uppercase pl-1"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            <MapPin size={10} strokeWidth={3} /> From
          </span>
          <div className="relative">
            <select value={from} onChange={(e) => setFrom(e.target.value)} style={fieldBase}>
              <option>Delhi</option>
              <option>Gurgaon</option>
              <option>Noida</option>
              <option>Meerut</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
          </div>
        </label>

        {/* WHEN */}
        <label className="flex flex-col gap-1.5">
          <span className="flex items-center gap-1 text-[10px] font-semibold tracking-[0.12em] uppercase pl-1"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            <CalendarDays size={10} strokeWidth={3} /> When
          </span>
          <div className="relative">
            <select value={when} onChange={(e) => setWhen(e.target.value)} style={fieldBase}>
              <option>This Weekend</option>
              <option>Next Weekend</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
          </div>
        </label>

        {/* BUDGET */}
        <label className="flex flex-col gap-1.5">
          <span className="flex items-center gap-1 text-[10px] font-semibold tracking-[0.12em] uppercase pl-1"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            <Wallet2 size={10} strokeWidth={3} /> Budget
          </span>
          <div className="relative">
            <select value={budget} onChange={(e) => setBudget(e.target.value)} style={fieldBase}>
              <option value="">Any Budget</option>
              <option value="under5k">Under ₹5K</option>
              <option value="5k-10k">₹5K – ₹10K</option>
              <option value="10k-15k">₹10K – ₹15K</option>
              <option value="15k+">₹15K+</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
          </div>
        </label>
      </div>

      {/* ── Vibe chips ── */}
      <div className="mb-5">
        <p className="flex items-center gap-1 text-[10px] font-semibold tracking-[0.12em] uppercase mb-2.5 pl-1"
          style={{ color: 'rgba(255,255,255,0.55)' }}>
          <Sparkles size={10} strokeWidth={3} /> Travel Vibe
        </p>
        <div className="flex flex-wrap gap-2">
          {VIBES.map((v) => {
            const on = vibes.includes(v.id);
            return (
              <button key={v.id} type="button" onClick={() => toggleVibe(v.id)}
                className="px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150"
                style={{
                  background: on ? AMBER : 'rgba(255,255,255,0.13)',
                  color: on ? 'white' : 'rgba(255,255,255,0.82)',
                  border: on ? `1px solid ${AMBER}` : '1px solid rgba(255,255,255,0.18)',
                  transform: on ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: on ? '0 2px 10px hsla(34,82%,50%,0.4)' : 'none',
                }}>
                {v.emoji} {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CTA ── */}
      <button type="submit"
        className="w-full py-3.5 rounded-full text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        style={{ background: AMBER, boxShadow: '0 4px 20px hsla(34,82%,50%,0.5)' }}>
        Find My Escape
        <ArrowRight size={17} strokeWidth={2.5} />
      </button>
    </form>
  );
}
