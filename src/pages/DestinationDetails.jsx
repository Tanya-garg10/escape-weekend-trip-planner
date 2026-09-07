import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, Clock, MapPin, Wallet, Calendar, Zap, Heart,
  CheckCircle, ChevronRight,
} from 'lucide-react';
import { destinations } from '../data/destinations';
import Itinerary from '../components/Itinerary';
import Toast from '../components/Toast';

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find((d) => d.id === id);

  const [saved, setSaved] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!destination) return;
    const ids = JSON.parse(localStorage.getItem('savedDestinations') || '[]');
    setSaved(ids.includes(id));
  }, [id, destination]);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-6xl">🗺️</p>
        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Destination not found
        </h2>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-full text-white text-sm font-semibold"
          style={{ background: 'hsl(34,78%,48%)' }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const toggleSave = () => {
    const ids = JSON.parse(localStorage.getItem('savedDestinations') || '[]');
    const next = ids.includes(id) ? ids.filter((s) => s !== id) : [...ids, id];
    localStorage.setItem('savedDestinations', JSON.stringify(next));
    window.dispatchEvent(new Event('savedUpdated'));
    setSaved(!saved);
    setToast({
      message: saved ? 'Removed from saved' : 'Saved to your trips ❤️',
      type: saved ? 'success' : 'heart',
    });
  };

  const matchColor = destination.match >= 90
    ? 'hsl(142,72%,36%)'
    : 'hsl(34,78%,48%)';

  return (
    <div className="min-h-screen" style={{ background: 'hsl(38,30%,96%)' }}>
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        {!imgLoaded && <div className="skeleton absolute inset-0" />}
        <img
          src={destination.heroImage || destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
          onLoad={() => setImgLoaded(true)}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12,24,40,0.4) 0%, rgba(12,24,40,0.2) 40%, rgba(12,24,40,0.75) 100%)',
          }}
        />

        {/* Nav row */}
        <div className="absolute top-0 left-0 right-0 pt-20 px-4 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                style={{ background: 'hsl(34,78%,48%)', color: 'white' }}
              >
                {destination.category}
              </span>
              <div
                className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: matchColor }}
              >
                <Zap size={10} fill="white" /> {destination.match}% Match
              </div>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/75 text-sm">
              <span className="flex items-center gap-1"><MapPin size={13} /> {destination.location}, {destination.country}</span>
              <span className="flex items-center gap-1"><Star size={13} fill="hsl(40,90%,55%)" color="hsl(40,90%,55%)" /> {destination.rating}</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {destination.travelTimeH}h from Delhi</span>
              <span className="flex items-center gap-1"><MapPin size={13} /> {destination.distanceKm} km away</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main col */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 2px 16px hsla(215,35%,12%,0.06)' }}
            >
              <h2 className="text-lg font-bold mb-3" style={{ color: 'hsl(215,35%,12%)', fontFamily: "'Playfair Display', serif" }}>
                About {destination.name}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(215,20%,35%)' }}>
                {destination.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {destination.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: 'hsl(215,20%,95%)', color: 'hsl(215,25%,40%)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 2px 16px hsla(215,35%,12%,0.06)' }}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: 'hsl(215,35%,12%)', fontFamily: "'Playfair Display', serif" }}>
                Things to do
              </h2>
              <div className="space-y-3">
                {destination.activities.map((act) => (
                  <div key={act.title} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'hsl(38,30%,97%)' }}>
                    <span className="text-2xl shrink-0">{act.icon}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'hsl(215,35%,12%)' }}>{act.title}</p>
                      <p className="text-xs" style={{ color: 'hsl(215,15%,55%)' }}>{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 2px 16px hsla(215,35%,12%,0.06)' }}
            >
              <h2 className="text-lg font-bold mb-5" style={{ color: 'hsl(215,35%,12%)', fontFamily: "'Playfair Display', serif" }}>
                2-Day Mini Itinerary
              </h2>
              <Itinerary days={destination.itinerary} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Trip Snapshot card */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 2px 16px hsla(215,35%,12%,0.06)' }}
            >
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: 'hsl(215,15%,55%)' }}>
                Trip Snapshot
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Wallet, label: 'Estimated Budget', value: `₹${destination.price.toLocaleString('en-IN')}` },
                  { icon: Clock, label: 'Travel Time', value: `${destination.travelTimeH} hours` },
                  { icon: Calendar, label: 'Ideal Duration', value: '2 Days' },
                  { icon: Zap, label: 'Match Score', value: `${destination.match}%`, color: matchColor },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center justify-between py-2"
                    style={{ borderBottom: '1px solid hsl(215,20%,94%)' }}>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'hsl(215,15%,55%)' }}>
                      <Icon size={13} />
                      {label}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: color || 'hsl(215,35%,12%)' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={toggleSave}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{
                background: saved ? 'hsla(0,72%,55%,0.1)' : 'hsl(215,20%,96%)',
                color: saved ? 'hsl(0,72%,50%)' : 'hsl(215,35%,25%)',
                border: `1px solid ${saved ? 'hsla(0,72%,55%,0.3)' : 'hsl(215,20%,88%)'}`,
              }}
            >
              <Heart
                size={16}
                fill={saved ? 'hsl(0,72%,55%)' : 'none'}
                color={saved ? 'hsl(0,72%,55%)' : 'hsl(215,35%,25%)'}
              />
              {saved ? 'Saved to trips' : 'Save this escape'}
            </button>

            {/* CTA */}
            <button
              onClick={toggleSave}
              className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{ background: 'hsl(34,78%,48%)' }}
            >
              <CheckCircle size={16} />
              Plan This Escape →
            </button>

            {/* Nearby CTA */}
            <div
              className="p-4 rounded-xl"
              style={{ background: 'hsl(215,35%,12%)', color: 'white' }}
            >
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-2">Explore more</p>
              <Link
                to="/#destinations"
                onClick={() => setTimeout(() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="flex items-center justify-between text-sm font-medium hover:text-white/80 transition-colors"
              >
                <span>See all destinations</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 p-4 flex gap-3"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid hsl(215,20%,92%)',
          zIndex: 40,
        }}
      >
        <button
          onClick={toggleSave}
          className="flex items-center justify-center w-12 h-12 rounded-xl border transition-colors"
          style={{
            borderColor: saved ? 'hsla(0,72%,55%,0.4)' : 'hsl(215,20%,88%)',
            background: saved ? 'hsla(0,72%,55%,0.08)' : 'white',
          }}
          aria-label="Save"
        >
          <Heart
            size={18}
            fill={saved ? 'hsl(0,72%,55%)' : 'none'}
            color={saved ? 'hsl(0,72%,55%)' : 'hsl(215,35%,30%)'}
          />
        </button>
        <button
          className="flex-1 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
          style={{ background: 'hsl(34,78%,48%)' }}
          onClick={toggleSave}
        >
          <CheckCircle size={16} /> Plan This Escape →
        </button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
