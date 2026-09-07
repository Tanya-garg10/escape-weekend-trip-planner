import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart } from 'lucide-react';
import { destinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import Toast from '../components/Toast';

export default function Saved() {
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('savedDestinations') || '[]');
    setSaved(ids);
  }, []);

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      localStorage.setItem('savedDestinations', JSON.stringify(next));
      window.dispatchEvent(new Event('savedUpdated'));
      setToast({ message: prev.includes(id) ? 'Removed from saved' : 'Saved!', type: prev.includes(id) ? 'success' : 'heart' });
      return next;
    });
  };

  const savedDestinations = destinations.filter((d) => saved.includes(d.id));

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6" style={{ background: 'hsl(38,30%,96%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={18} fill="hsl(0,72%,55%)" color="hsl(0,72%,55%)" />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(34,78%,48%)' }}>
              Your collection
            </p>
          </div>
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(215,35%,12%)' }}
          >
            Saved Escapes
          </h1>
          {savedDestinations.length > 0 && (
            <p className="text-sm mt-1.5" style={{ color: 'hsl(215,15%,55%)' }}>
              {savedDestinations.length} destination{savedDestinations.length !== 1 ? 's' : ''} saved
            </p>
          )}
        </div>

        {savedDestinations.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: 'hsl(215,20%,94%)' }}
            >
              <Compass size={36} style={{ color: 'hsl(215,15%,65%)' }} />
            </div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(215,35%,12%)' }}
            >
              No escapes saved yet.
            </h2>
            <p className="text-sm mb-8 max-w-sm" style={{ color: 'hsl(215,15%,55%)' }}>
              Start exploring and save the places you want to visit. Your dream weekend is one click away.
            </p>
            <Link
              to="/"
              className="px-6 py-3 rounded-full text-white font-semibold text-sm hover:scale-105 transition-transform flex items-center gap-2"
              style={{ background: 'hsl(34,78%,48%)' }}
            >
              <Compass size={16} /> Discover Destinations
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {savedDestinations.map((dest, i) => (
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

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
