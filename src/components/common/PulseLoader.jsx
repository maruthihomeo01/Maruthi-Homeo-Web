import React from 'react';

export default function PulseLoader({ visible }) {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-50 bg-alabaster/80 backdrop-blur-xs flex items-center justify-center animate-in fade-in duration-150"
    >
      <svg
        viewBox="0 0 220 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 sm:w-56 h-16"
        aria-hidden="true"
      >
        {/* Subtle static baseline track */}
        <path
          d="M4 36 H58 L68 36 L76 22 L86 48 L98 10 L110 54 L120 26 L128 36 H216"
          stroke="#D8E3EE"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Animated glowing ECG pulse wave */}
        <path
          d="M4 36 H58 L68 36 L76 22 L86 48 L98 10 L110 54 L120 26 L128 36 H216"
          stroke="url(#ecgGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ecg-pulse-line"
        />
        <defs>
          <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A5FA8" />
            <stop offset="55%" stopColor="#1E9B4B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
