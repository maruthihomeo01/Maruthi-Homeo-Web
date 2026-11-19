import React from 'react';
import { TRUST_BADGES } from '../../data/clinicData';

export default function MarqueeStrip() {
  return (
    <div
      aria-label="Clinic Highlights and Quality Standards"
      className="marquee-wrap relative w-full overflow-hidden bg-[#144882] py-3.5 sm:py-4 border-y border-white/20 shadow-md select-none"
    >
      <div className="marquee-track flex w-max items-center">
        {/* Set 1 */}
        <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
          {TRUST_BADGES.map((badge, idx) => (
            <div key={`set1-${idx}`} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-emerald-300 font-bold text-xs">✦</span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-xs">
                {badge}
              </span>
              <span className="text-blue-300/60 text-xs">●</span>
            </div>
          ))}
        </div>

        {/* Set 2 (Exact mirror copy to guarantee seamless infinite non-ending loop) */}
        <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8" aria-hidden="true">
          {TRUST_BADGES.map((badge, idx) => (
            <div key={`set2-${idx}`} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-emerald-300 font-bold text-xs">✦</span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-xs">
                {badge}
              </span>
              <span className="text-blue-300/60 text-xs">●</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
