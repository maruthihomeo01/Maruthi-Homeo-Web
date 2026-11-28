import React from 'react';

export default function BrandLogo({ variant = 'dark', size = 'md' }) {
  const isLarge = size === 'lg';

  // Cropped logo (1838x543, ~3.38:1) sized proportionally for normal header & footer
  // md (Header) → h-9 sm:h-10 (~122px–135px wide inside h-16 header)
  // lg (Footer) → h-11 sm:h-12 (~150px–162px wide)
  const imgClass = isLarge
    ? 'h-11 sm:h-12 w-auto object-contain'
    : 'h-9 sm:h-10 w-auto object-contain';

  // Header (warm alabaster background) — transparent cropped logo directly, no white box
  if (variant === 'dark') {
    return (
      <img
        src="/images/maruthi-homoeo-logo-cropped.png"
        alt="Maruthi Homoeo"
        className={imgClass}
      />
    );
  }

  // Footer (dark sage-900 background) — clean alabaster pill so green & orange stay legible
  return (
    <span className="inline-flex items-center bg-alabaster px-3 py-1.5 rounded-xl shadow-xs">
      <img
        src="/images/maruthi-homoeo-logo-cropped.png"
        alt="Maruthi Homoeo"
        className={imgClass}
      />
    </span>
  );
}
