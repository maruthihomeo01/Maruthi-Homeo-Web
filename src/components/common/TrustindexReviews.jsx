import React, { useEffect, useRef, useState } from 'react';
import { CLINIC_INFO } from '../../data/clinicData';

export default function TrustindexReviews() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove any previous widget nodes if re-mounting
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?46d700f860b8154ae2668874f34';
    script.defer = true;
    script.async = true;

    script.onload = () => {
      setIsLoading(false);
    };

    containerRef.current.appendChild(script);

    // Fallback timer to hide loader if script already cached
    const timer = setTimeout(() => setIsLoading(false), 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const placeId = CLINIC_INFO.googlePlaceId;
  const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;
  const allReviewsUrl = CLINIC_INFO.googleMapsUrl;

  return (
    <section className="bg-white py-14 border-y border-sand overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header with Google Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-sage-700">Patient Feedback</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
              Verified Google Reviews
            </h2>
            <p className="text-sm text-muted">
              Live feedback directly from verified patients of {CLINIC_INFO.legalName}, Rajajinagar.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sage-700 hover:bg-sage-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a Review
            </a>
            <a
              href={allReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-sage-50 text-ink border border-sand text-xs font-medium transition-colors cursor-pointer"
            >
              View on Google Maps &rarr;
            </a>
          </div>
        </div>

        {/* Live Trustindex Auto-Syncing Google Review Widget */}
        <div className="relative min-h-[140px] w-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center p-8 text-xs text-muted">
              <span className="inline-block w-4 h-4 border-2 border-sage-600 border-t-transparent rounded-full animate-spin mr-2"></span>
              Loading verified Google reviews from Trustindex...
            </div>
          )}
          <div ref={containerRef} className="w-full" />
        </div>
      </div>
    </section>
  );
}
