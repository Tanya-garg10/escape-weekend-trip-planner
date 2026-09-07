import { useState, useEffect, useMemo } from 'react';
import { destinations } from '../data/destinations';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import DestinationCard from '../components/DestinationCard';
import MatchBanner from '../components/MatchBanner';
import HowItWorks from '../components/HowItWorks';
import Toast from '../components/Toast';

// Budget helper
const budgetMatches = (dest, budget) => {
  if (!budget) return true;
  if (budget === 'under5k') return dest.price < 5000;
  if (budget === '5k-10k') return dest.price >= 5000 && dest.price < 10000;
  if (budget === '10k-15k') return dest.price >= 10000 && dest.price < 15000;
  if (budget === '15k+') return dest.price >= 15000;
  return true;
};

const timeMatches = (dest, time) => {
  if (!time) return true;
  if (time === 'under4h') return dest.travelTimeH < 4;
  if (time === 'under6h') return dest.travelTimeH < 6;
  if (time === 'under8h') return dest.travelTimeH < 8;
  return true;
};

// Scoring for match banner
const calcMatch = (dest, search) => {
  if (!search) return dest.match;
  let score = 0;
  if (search.vibes?.includes(dest.vibe)) score += 40;
  if (search.budget === dest.budgetCategory) score += 30;
  const budgetClose =
    (search.budget === 'under5k' && dest.price < 6000) ||
    (search.budget === '5k-10k' && dest.price >= 4000 && dest.price < 11000) ||
    (search.budget === '10k-15k' && dest.price >= 8000 && dest.price < 16000);
  if (budgetClose) score += 15;
  return Math.min(98, dest.match + Math.round(score * 0.15));
};

export default function Home() {
  const [filters, setFilters] = useState({ vibe: [], budget: '', travelTime: '', sort: 'match' });
  const [searchParams, setSearchParams] = useState(null);
  const [matched, setMatched] = useState(null);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('savedDestinations') || '[]');
    setSaved(ids);
  }, []);

  const handleSearch = (params) => {
    setSearchParams(params);
    // Auto-apply vibe and budget from search panel
    setFilters((f) => ({
      ...f,
      vibe: params.vibes?.length ? params.vibes : f.vibe,
      budget: params.budget || f.budget,
    }));
    // Auto match
    const scored = destinations
      .map((d) => ({ dest: d, score: calcMatch(d, params) }))
      .sort((a, b) => b.score - a.score);
    if (scored.length) setMatched({ ...scored[0].dest, match: scored[0].score });
  };

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      localStorage.setItem('savedDestinations', JSON.stringify(next));
      window.dispatchEvent(new Event('savedUpdated'));
      setToast(prev.includes(id)
        ? { message: 'Removed from saved', type: 'success' }
        : { message: 'Saved to your trips ❤️', type: 'heart' });
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = destinations.filter((d) => {
      const vibeOk = !filters.vibe?.length || filters.vibe.includes(d.vibe);
      const budgetOk = budgetMatches(d, filters.budget);
      const timeOk = timeMatches(d, filters.travelTime);
      return vibeOk && budgetOk && timeOk;
    });

    const sort = filters.sort || 'match';
    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === 'distance') list = [...list].sort((a, b) => a.distanceKm - b.distanceKm);
    else list = [...list].sort((a, b) => b.match - a.match); // default: recommended

    return list;
  }, [filters]);

  return (
    <div>
      <Hero onSearch={handleSearch} />

      <section id="destinations" className="scroll-mt-16">
        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Section header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'hsl(34,78%,48%)' }}>
              Curated for you
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(215,35%,12%)' }}
            >
              Your perfect escape awaits.
            </h2>
            <p className="text-sm mt-1.5" style={{ color: 'hsl(215,15%,55%)' }}>
              Curated weekend destinations matched to your preferences.
            </p>
          </div>

          {/* Match banner */}
          {matched && (
            <MatchBanner destination={matched} onDismiss={() => setMatched(null)} />
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-5xl mb-4">🗺️</p>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(215,35%,12%)' }}>
                No destinations match these filters.
              </h3>
              <p className="text-sm mb-6" style={{ color: 'hsl(215,15%,55%)' }}>
                Try widening your filters to discover more options.
              </p>
              <button
                onClick={() => setFilters({ vibe: [], budget: '', travelTime: '', sort: 'match' })}
                className="px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:scale-105 transition-transform"
                style={{ background: 'hsl(34,78%,48%)' }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((dest, i) => (
                <div
                  key={dest.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <DestinationCard
                    destination={dest}
                    isSaved={saved.includes(dest.id)}
                    onToggleSave={toggleSave}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <HowItWorks />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
