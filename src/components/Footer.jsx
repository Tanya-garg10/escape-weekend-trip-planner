import { Link } from 'react-router-dom';
import { Compass, ExternalLink } from 'lucide-react';

export default function Footer() {
  const handleAnchor = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'hsl(215,35%,8%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(34,78%,48%)' }}>
                <Compass size={16} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                ESCAPE
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'hsl(215,15%,55%)' }}>
              Your weekend. Your escape.
            </p>
            <p className="text-xs mt-4" style={{ color: 'hsl(215,15%,40%)' }}>
              Made for spontaneous weekends.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'hsl(34,90%,65%)' }}>
              Explore
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Discover', anchor: 'discover' },
                { label: 'Destinations', anchor: 'destinations' },
                { label: 'How it works', anchor: 'how-it-works' },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={`#${l.anchor}`}
                    onClick={(e) => handleAnchor(e, l.anchor)}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'hsl(215,15%,55%)' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/saved" className="text-sm transition-colors hover:text-white" style={{ color: 'hsl(215,15%,55%)' }}>
                  Saved
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'hsl(34,90%,65%)' }}>
              Follow
            </p>
            <div className="flex gap-3">
              {['Instagram', 'Twitter', 'GitHub'].map((name) => (
                <a
                  key={name}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="h-9 px-3 rounded-lg flex items-center gap-1.5 transition-all hover:scale-105 text-xs font-medium"
                  style={{ background: 'hsla(215,35%,20%,0.8)', color: 'hsl(215,15%,65%)' }}
                  aria-label={name}
                >
                  <ExternalLink size={12} />
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: '1px solid hsla(215,35%,25%,0.4)', color: 'hsl(215,15%,40%)' }}
        >
          <p>© {new Date().getFullYear()} ESCAPE. All rights reserved.</p>
          <p>Built with React + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
