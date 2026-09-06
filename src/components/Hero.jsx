import React from 'react';
import { Link } from 'react-router-dom';
import { SearchPanel } from './SearchPanel';

export function Hero({ onSearch }) {
  return (
    <section className="relative min-h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=60')" }}>
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        <span className="inline-block px-3 py-1 bg-accent text-sm rounded-full mb-4">WEEKEND GETAWAYS</span>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Escape the ordinary.</h1>
        <p className="text-xl mb-8">Find the perfect weekend trip based on your time, budget, and vibe.</p>
        <SearchPanel onSearch={onSearch} />
      </div>
    </section>
  );
}
