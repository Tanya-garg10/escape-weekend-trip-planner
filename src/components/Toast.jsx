import { useEffect } from 'react';
import { X, CheckCircle, Heart } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl animate-toast"
      style={{
        background: 'hsl(215,35%,12%)',
        border: '1px solid hsla(215,35%,35%,0.5)',
        maxWidth: '320px',
      }}
      role="alert"
    >
      <span className="shrink-0">
        {type === 'heart' ? (
          <Heart size={16} fill="hsl(0,72%,55%)" color="hsl(0,72%,55%)" />
        ) : (
          <CheckCircle size={16} style={{ color: 'hsl(142,72%,48%)' }} />
        )}
      </span>
      <p className="text-sm font-medium text-white flex-1">{message}</p>
      <button onClick={onClose} className="shrink-0 text-white/40 hover:text-white/80 transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}
