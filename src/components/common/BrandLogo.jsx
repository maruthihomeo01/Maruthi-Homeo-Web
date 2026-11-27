import React from 'react';

export default function BrandLogo({ variant = 'dark', size = 'md' }) {
  const isLight = variant === 'light';
  const isLarge = size === 'lg';

  const imgClass = isLarge
    ? 'h-11 sm:h-12 w-auto object-contain'
    : 'h-9 sm:h-10 w-auto object-contain';

  if (isLight) {
    return (
      <span className="inline-flex items-center bg-white/95 px-3.5 py-2 rounded-xl shadow-xs">
        <img
          src="/images/maruthi-homoeo-transparent.png"
          alt="Maruthi Homoeo"
          className={imgClass}
        />
      </span>
    );
  }

  return (
    <img
      src="/images/maruthi-homoeo-transparent.png"
      alt="Maruthi Homoeo"
      className={imgClass}
    />
  );
}
