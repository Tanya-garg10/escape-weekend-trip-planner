import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, X } from 'lucide-react';

const AMBER = 'hsl(34,82%,50%)';

export default function MatchBanner({ destination, onDismiss }) {
  const [gone, setGone] = useState(false);
  if (!destination || gone) return null;

  const dismiss = () => { setGone(true); onDismiss?.(); };

  const pct = destination.match;
  const color = pct >= 90 ? 'hsl(152,58%,36%)' : AMBER;

  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 animate-scale-in"
      style={{ background: 'hsl(220,30%,10%)', boxShadow: '0 8px 40px hsla(220,30%,10%,0.25)' }}>

      {/* blurred bg image */}
      <div className="absolute inset-0 opacity-15">
        <img src={destination.image} alt="" className="w-full h-full object-cover" aria-hidden />
      </div>
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, hsla(220,30%,8%,0.94) 0%, hsla(220,30%,14%,0.75) 100%)' }} />

      <div className="relative z-10 p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">

        {/* icon */}
        <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'hsla(34,82%,50%,0.18)', border: '1px solid hsla(34,82%,50%,0.35)' }}>
          <Sparkles size={24} style={{ color: AMBER }} />
        </div>

        {/* text */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-1.5"
            style={{ color: 'hsl(38,95%,65%)' }}>
            ✨ Your Escape Match
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            {destination.name}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">
            Your <span className="text-white/85 font-medium">{destination.vibe}</span> vibe,
            {destination.travelTimeH}h travel time, and budget make this your strongest match.
          </p>

          {/* progress bar */}
          <div className="mt-3.5 flex items-center gap-3">
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full animate-progress"
                style={{ width: `${pct}%`, background: color, animationDuration: '1.2s', animationDelay: '0.2s' }} />
            </div>
            <span className="text-sm font-bold shrink-0" style={{ color }}>{pct}% match</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <Link to={`/destination/${destination.id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
            style={{ background: AMBER, boxShadow: '0 3px 14px hsla(34,82%,50%,0.45)' }}>
            Explore <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
          <button onClick={dismiss} aria-label="Dismiss"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all">
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
