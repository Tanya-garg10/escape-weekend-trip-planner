import { SlidersHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';
import { useFilters } from '../hooks/useFilters';

const VIBES = ['Nature', 'Adventure', 'Beach', 'Culture', 'Relax'];
const BUDGETS = [
  { label: 'Under ₹5K', value: 'under5k' },
  { label: '₹5K–₹10K', value: '5k-10k' },
  { label: '₹10K–₹15K', value: '10k-15k' },
  { label: '₹15K+', value: '15k+' },
];
const TIMES = [
  { label: 'Under 4h', value: 'under4h' },
  { label: 'Under 6h', value: 'under6h' },
  { label: 'Under 8h', value: 'under8h' },
];
const SORTS = [
  { label: 'Recommended', value: 'match' },
  { label: 'Price: Low', value: 'price_asc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Distance', value: 'distance' },
];

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 min-w-max px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
      style={{
        background: active ? 'hsl(34,78%,48%)' : 'white',
        color: active ? 'white' : 'hsl(215,35%,32%)',
        border: active ? '1px solid hsl(34,78%,48%)' : '1px solid hsl(215,15%,88%)',
        transform: active ? 'scale(1.04)' : 'scale(1)',
        boxShadow: active ? '0 2px 8px hsla(34,78%,48%,0.3)' : 'none',
      }}
    >
      {label}
    </button>
  );
}

export default function FilterBar({ filters, setFilters }) {
  const toggle = (key, value) => {
    const cur = filters[key];
    setFilters({ ...filters, [key]: cur === value ? '' : value });
  };

  const toggleVibe = (v) => {
    const cur = filters.vibe || [];
    setFilters({
      ...filters,
      vibe: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v],
    });
  };

  return (
    <div className="sticky top-16 z-40 bg-[hsl(38,30%,96%)] border-b border-[hsl(38,20%,90%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[hsl(38,30%,96%)] to-transparent z-10 pointer-events-none" />
        <div className="flex flex-nowrap items-center gap-3 overflow-x-auto pb-1 scrollbar-none [scrollbar-width:none] pr-12 relative z-20">
          <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide pr-3 text-[hsl(215,15%,55%)] border-r border-[hsl(215,15%,85%)]">
            <SlidersHorizontal size={13} />
            Filter
          </div>
          <Chip label="All Vibes" active={!filters.vibe?.length} onClick={() => setFilters({ ...filters, vibe: [] })} />
          {VIBES.map((v) => (
            <Chip key={v} label={v} active={filters.vibe?.includes(v)} onClick={() => toggleVibe(v)} />
          ))}
          <div className="shrink-0 w-px h-5 bg-gray-200 mx-1" />
          <Chip label="Any Budget" active={!filters.budget} onClick={() => toggle('budget', '')} />
          {BUDGETS.map((b) => (
            <Chip key={b.value} label={b.label} active={filters.budget === b.value} onClick={() => toggle('budget', b.value)} />
          ))}
          <div className="shrink-0 w-px h-5 bg-gray-200 mx-1" />
          <Chip label="Any Time" active={!filters.travelTime} onClick={() => toggle('travelTime', '')} />
          {TIMES.map((t) => (
            <Chip key={t.value} label={t.label} active={filters.travelTime === t.value} onClick={() => toggle('travelTime', t.value)} />
          ))}
          <div className="shrink-0 w-px h-5 bg-gray-200 mx-1" />
          {SORTS.map((s) => (
            <Chip key={s.value} label={`↕ ${s.label}`} active={filters.sort === s.value} onClick={() => toggle('sort', s.value)} />
          ))}
          <div className="w-4 flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
}
