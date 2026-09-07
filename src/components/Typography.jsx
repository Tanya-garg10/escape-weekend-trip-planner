import React from 'react';

export const H1 = ({ children, className = '' }) => (
  <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-snug ${className}`}>{children}</h1>
);

export const H2 = ({ children, className = '' }) => (
  <h2 className={`text-3xl sm:text-4xl font-semibold tracking-wide leading-snug ${className}`}>{children}</h2>
);

export const H3 = ({ children, className = '' }) => (
  <h3 className={`text-2xl font-medium tracking-wide leading-snug ${className}`}>{children}</h3>
);

export const Lead = ({ children, className = '' }) => (
  <p className={`text-lg sm:text-xl text-ink-soft ${className}`}>{children}</p>
);

export const Body = ({ children, className = '' }) => (
  <p className={`text-base text-ink ${className}`}>{children}</p>
);

export const Label = ({ children, className = '' }) => (
  <span className={`text-xs font-medium uppercase tracking-wider ${className}`}>{children}</span>
);
