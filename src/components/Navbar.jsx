import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Compass, Heart, Menu, X } from 'lucide-react';

const AMBER = 'hsl(34,82%,50%)';
const INK = 'hsl(220,30%,10%)';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const sync = () => {
      const ids = JSON.parse(localStorage.getItem('savedDestinations') || '[]');
      setSavedCount(ids.length);
    };
    sync();
    window.addEventListener('savedUpdated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('savedUpdated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const goAnchor = (e, anchor) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 350);
    }
  };

  const linkColor = scrolled ? INK : 'rgba(255,255,255,0.88)';
  const linkHover = 'hover:opacity-100';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${scrolled
          ? 'bg-white/95 backdrop-blur-md'
          : 'bg-transparent'
        }`}
      style={scrolled ? { boxShadow: '0 1px 0 hsl(220,15%,92%)' } : {}}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: AMBER }}>
            <Compass size={15} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-[18px] font-bold tracking-[0.04em]"
            style={{ fontFamily: "'DM Serif Display', serif", color: scrolled ? INK : 'white' }}>
            ESCAPE
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-7">
          {[['discover', 'Discover'], ['destinations', 'Destinations'], ['how-it-works', 'How it works']].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => goAnchor(e, id)}
              className={`text-sm font-medium transition-opacity duration-200 opacity-75 ${linkHover}`}
              style={{ color: linkColor }}>
              {label}
            </a>
          ))}
          <NavLink to="/saved"
            className="flex items-center gap-1.5 text-sm font-medium transition-opacity duration-200 opacity-75 hover:opacity-100"
            style={{ color: linkColor }}>
            <Heart size={14} strokeWidth={2.5} />
            Saved
            {savedCount > 0 && (
              <span className="ml-0.5 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none"
                style={{ background: AMBER }}>
                {savedCount}
              </span>
            )}
          </NavLink>
          <a href="#discover" onClick={(e) => goAnchor(e, 'discover')}
            className="px-4 py-2 rounded-full text-[13px] font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: AMBER }}>
            Plan a Weekend
          </a>
        </nav>

        {/* ── Mobile controls ── */}
        <div className="flex md:hidden items-center gap-3">
          <NavLink to="/saved" className="relative p-1" aria-label="Saved destinations">
            <Heart size={21} style={{ color: scrolled ? INK : 'white' }} strokeWidth={2} />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                style={{ background: AMBER }}>
                {savedCount}
              </span>
            )}
          </NavLink>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1" aria-label="Open menu">
            {menuOpen
              ? <X size={22} style={{ color: scrolled ? INK : 'white' }} />
              : <Menu size={22} style={{ color: scrolled ? INK : 'white' }} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="md:hidden animate-fade-in"
          style={{ background: 'white', borderTop: '1px solid hsl(220,15%,92%)' }}>
          <div className="px-5 py-5 flex flex-col gap-1">
            {[['discover', 'Discover'], ['destinations', 'Destinations'], ['how-it-works', 'How it works']].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={(e) => goAnchor(e, id)}
                className="py-3 text-sm font-medium border-b"
                style={{ color: INK, borderColor: 'hsl(220,15%,94%)' }}>
                {label}
              </a>
            ))}
            <NavLink to="/saved" onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-medium border-b flex items-center gap-2"
              style={{ color: INK, borderColor: 'hsl(220,15%,94%)' }}>
              <Heart size={14} /> Saved {savedCount > 0 && `(${savedCount})`}
            </NavLink>
            <a href="#discover" onClick={(e) => goAnchor(e, 'discover')}
              className="mt-3 py-3.5 rounded-full text-sm font-semibold text-white text-center"
              style={{ background: AMBER }}>
              Plan a Weekend
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
