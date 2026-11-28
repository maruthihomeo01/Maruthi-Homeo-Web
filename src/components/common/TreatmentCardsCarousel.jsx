import React, { useState, useRef, useEffect } from 'react';

export default function TreatmentCardsCarousel({
  items = [],
  onSelectItem,
  ctaLabel = 'Enquire About Care'
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [stepX, setStepX] = useState(215);

  const stageRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0, lockedAxis: null });

  const total = items.length;

  // Responsive horizontal spacing for 3D Coverflow wings
  useEffect(() => {
    const updateSpacing = () => {
      const w = stageRef.current?.clientWidth || window.innerWidth;
      if (w < 520) setStepX(128);
      else if (w < 840) setStepX(175);
      else setStepX(225);
    };
    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);

  if (total === 0) return null;

  const safeIndex = activeIndex % total;

  const goNext = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    if (total <= 1) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, lockedAxis: null };
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || total <= 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;

    if (!touchStartRef.current.lockedAxis) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        touchStartRef.current.lockedAxis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
      }
    }

    if (touchStartRef.current.lockedAxis === 'x') {
      setDragX(Math.max(-220, Math.min(220, dx)));
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (touchStartRef.current.lockedAxis === 'x') {
      if (dragX < -42) {
        goNext();
      } else if (dragX > 42) {
        goPrev();
      }
    }
    setDragX(0);
    setIsDragging(false);
    touchStartRef.current.lockedAxis = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  };

  const getSignedOffset = (idx) => {
    let diff = idx - safeIndex;
    if (total > 2) {
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
    }
    return diff;
  };

  const dragOffset = dragX / Math.max(stepX, 160);
  const currentTreatment = items[safeIndex];

  return (
    <div
      className="space-y-5 focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-roledescription="carousel"
      aria-label="Treatment Coverflow Carousel"
    >
      {/* 3D Coverflow Stage with Desktop Flanking Buttons */}
      <div className="relative flex items-center justify-center">
        {/* Desktop Left Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous treatment"
            className="hidden md:flex absolute left-1 lg:left-4 z-40 w-12 h-12 rounded-full bg-white/95 hover:bg-saffron-500 text-ink hover:text-white border border-sand hover:border-saffron-500 shadow-lg backdrop-blur items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* 3D Perspective Stage */}
        <div
          ref={stageRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{ perspective: '1200px' }}
          className="relative w-full h-[430px] sm:h-[465px] overflow-hidden flex items-center justify-center select-none touch-pan-y"
        >
          <div
            className="relative w-[264px] sm:w-[310px] lg:w-[340px] h-[400px] sm:h-[435px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {items.map((t, idx) => {
              const rawDiff = getSignedOffset(idx);
              const eff = rawDiff + dragOffset;
              const absEff = Math.abs(eff);
              const isCenter = rawDiff === 0;
              const isOrangeAccent = idx % 2 === 0;

              // Coverflow 3D geometry
              const clampedAbs = Math.min(absEff, 3);
              const translateX = eff * stepX;
              const translateZ = -clampedAbs * 115;
              const rotateY = Math.max(-48, Math.min(48, -eff * 32));
              const scale = Math.max(0.68, 1 - clampedAbs * 0.13);
              const zIndex = Math.round(30 - clampedAbs * 10);

              let opacity = 0;
              if (absEff <= 1.2) opacity = 1 - absEff * 0.08;
              else if (absEff <= 2.3) opacity = stepX < 150 ? 0.45 : 0.78 - (absEff - 1.2) * 0.25;

              const isInteractive = absEff <= 2.2;

              return (
                <article
                  key={t.id}
                  onClick={!isCenter && isInteractive ? () => setActiveIndex(idx) : undefined}
                  style={{
                    zIndex,
                    opacity,
                    transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
                  }}
                  className={`absolute inset-0 rounded-3xl bg-white border overflow-hidden flex flex-col justify-between ${isCenter
                      ? 'border-saffron-400 shadow-2xl'
                      : 'border-sand shadow-lg brightness-[0.96] hover:brightness-100'
                    } ${isInteractive ? 'pointer-events-auto' : 'pointer-events-none'} ${!isCenter && isInteractive ? 'cursor-pointer' : ''
                    } ${isDragging
                      ? 'transition-none'
                      : 'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'
                    }`}
                >
                  {/* Card Photo Header */}
                  <div className="relative h-40 sm:h-44 w-full shrink-0 overflow-hidden bg-sage-100">
                    <img
                      src={t.image}
                      alt={t.title}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/botanicals-dropper.jpeg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span
                        className={`inline-block text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur shadow-xs border ${isOrangeAccent
                            ? 'bg-saffron-50/95 text-saffron-700 border-saffron-200'
                            : 'bg-sage-50/95 text-sage-800 border-sage-200'
                          }`}
                      >
                        {t.category}
                      </span>
                      {isCenter && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-ink/65 text-white backdrop-blur">
                          {String(idx + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 min-w-0">
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-base sm:text-lg font-semibold text-ink leading-snug line-clamp-2">
                        {t.title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed line-clamp-3">
                        {t.summary}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {t.tags.slice(0, 3).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-alabaster border border-sand text-muted"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-sand/60">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCenter) onSelectItem?.(t);
                          else setActiveIndex(idx);
                        }}
                        className={`w-full py-2 px-3.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1.5 group/btn active:scale-95 ${isOrangeAccent
                            ? 'bg-saffron-500 hover:bg-saffron-600 text-white shadow-xs'
                            : 'bg-sage-700 hover:bg-sage-800 text-white shadow-xs'
                          }`}
                      >
                        <span>{isCenter ? ctaLabel : 'Focus Card'}</span>
                        <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Desktop Right Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next treatment"
            className="hidden md:flex absolute right-1 lg:right-4 z-40 w-12 h-12 rounded-full bg-white/95 hover:bg-saffron-500 text-ink hover:text-white border border-sand hover:border-saffron-500 shadow-lg backdrop-blur items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Controls: Mobile Swipe Controls + Clickable Dots */}
      {total > 1 && (
        <div className="flex flex-col items-center gap-3">
          {/* Mobile Swipe Hint + Prev/Next Buttons */}
          <div className="flex md:hidden items-center justify-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous treatment"
              className="w-9 h-9 rounded-full bg-white border border-sand text-ink active:bg-saffron-500 active:text-white shadow-xs flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-[11px] font-medium text-muted px-2">
              &larr; Swipe left or right &rarr;
            </span>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next treatment"
              className="w-9 h-9 rounded-full bg-white border border-sand text-ink active:bg-saffron-500 active:text-white shadow-xs flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Clickable Dots */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 px-4">
            {items.map((item, idx) => {
              const isCurrent = idx === safeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View ${item.title}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${isCurrent
                      ? 'w-7 bg-saffron-500'
                      : 'w-2 bg-sand hover:bg-sage-400'
                    }`}
                />
              );
            })}
          </div>

          <p className="hidden md:block text-xs text-muted">
            <strong className="text-ink">{currentTreatment?.title}</strong> · Click arrows or any side card to rotate
          </p>
        </div>
      )}
    </div>
  );
}
