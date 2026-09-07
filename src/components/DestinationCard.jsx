import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Clock, MapPin, ArrowRight } from 'lucide-react';

const AMBER = 'hsl(34,82%,50%)';
const INK = 'hsl(220,30%,10%)';

export default function DestinationCard({ destination: d, isSaved, onToggleSave }) {
  const [loaded, setLoaded] = useState(false);
  const [popHeart, setPopHeart] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPopHeart(true);
    onToggleSave(d.id);
    setTimeout(() => setPopHeart(false), 420);
  };

  const matchPct = d.match;
  const matchBg = matchPct >= 90 ? 'hsl(152,52%,36%)' : matchPct >= 85 ? AMBER : 'hsl(220,20%,50%)';

  return (
    <article
      className="group bg-white rounded-[18px] overflow-hidden flex flex-col transition-all duration-300"
      style={{ boxShadow: '0 2px 14px hsla(220,30%,10%,0.07)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 18px 48px hsla(220,30%,10%,0.16)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 14px hsla(220,30%,10%,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden h-48 md:h-[215px]">
        {!loaded && <div className="skeleton absolute inset-0" />}
        <img
          src={d.image}
          alt={d.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s, transform 0.5s' }}
          onLoad={() => setLoaded(true)}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=No+Image'; setLoaded(true); }}
          loading="lazy"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(10,18,32,0.58) 100%)' }} />

        {/* match badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-[5px] rounded-full text-[11px] font-bold text-white"
          style={{ background: matchBg }}>
          ✦ {matchPct}%
        </div>

        {/* heart */}
        <button onClick={handleSave}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-90"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)' }}
          aria-label={isSaved ? 'Remove from saved' : 'Save'}>
          <Heart size={14} strokeWidth={2.5}
            fill={isSaved ? 'hsl(0,70%,56%)' : 'none'}
            color={isSaved ? 'hsl(0,70%,56%)' : 'hsl(220,10%,55%)'}
            className={popHeart ? 'animate-heart' : ''} />
        </button>

        {/* location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/85 text-xs font-medium">
          <MapPin size={10} strokeWidth={2.5} /> {d.location}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-4 flex flex-col flex-1">
        {/* category + rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-md"
            style={{ background: 'hsla(34,82%,50%,0.10)', color: 'hsl(34,75%,38%)' }}>
            {d.category}
          </span>
          <div className="flex items-center gap-1 text-[13px] font-semibold" style={{ color: 'hsl(40,85%,38%)' }}>
            <Star size={12} fill="hsl(40,90%,50%)" color="hsl(40,90%,50%)" strokeWidth={0} />
            {d.rating}
          </div>
        </div>

        {/* name */}
        <h3 className="font-bold leading-snug mb-1.5" style={{ fontSize: '17px', color: INK, fontFamily: "'DM Serif Display', serif" }}>
          {d.name}
        </h3>

        {/* desc */}
        <p className="text-[13px] line-clamp-2 leading-relaxed mb-3 flex-1" style={{ color: 'hsl(220,12%,48%)' }}>
          {d.description}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {d.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'hsl(220,15%,95%)', color: 'hsl(220,18%,42%)' }}>
              {t}
            </span>
          ))}
        </div>

        {/* stats */}
        <div className="flex items-center gap-3 text-[12px] py-3 mb-3"
          style={{ borderTop: '1px solid hsl(220,15%,94%)', color: 'hsl(220,10%,58%)' }}>
          <span className="flex items-center gap-1"><Clock size={11} /> {d.travelTimeH}h</span>
          <span className="flex items-center gap-1"><MapPin size={11} /> {d.distanceKm} km</span>
        </div>

        {/* price + cta */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium" style={{ color: 'hsl(220,10%,58%)' }}>Starting from</p>
            <p className="text-[17px] font-bold" style={{ color: INK }}>₹{d.price.toLocaleString('en-IN')}</p>
          </div>
          <Link to={`/destination/${d.id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-95 group/cta"
            style={{ background: INK }}>
            Explore
            <ArrowRight size={13} strokeWidth={2.5}
              className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
