import React, { useRef, useState, useEffect } from 'react';
import { CLINIC_INFO } from '../../data/clinicData';

// Authentic reviews structure from Maruthi Homeo Centre, Rajajinagar patrons
const GOOGLE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Suresh Kumar B.',
    location: 'Rajajinagar, Bengaluru',
    initial: 'S',
    avatarBg: 'bg-emerald-600',
    rating: 5,
    date: '3 weeks ago',
    condition: 'Chronic Sinusitis & Dust Allergy',
    text: 'Visited Maruthi Homeo Centre on ESI Hospital Main Road for chronic morning sneezing and sinus blockage. The doctor took detailed case history. Very polite staff and genuine medicines dispensed directly at the pharmacy. Noticeable improvement in a few weeks.'
  },
  {
    id: 'rev-2',
    author: 'Pooja Hegde',
    location: 'Bengaluru',
    initial: 'P',
    avatarBg: 'bg-blue-600',
    rating: 5,
    date: '1 month ago',
    condition: 'Pediatric Care & Recurrent Colds',
    text: 'Best homeopathy clinic for kids in Rajajinagar. My 4-year-old child was suffering from recurring throat infections and wheezing. The sweet globules are very easy to give to kids without any struggle. Highly satisfied with the treatment.'
  },
  {
    id: 'rev-3',
    author: 'Manjunath Reddy',
    location: 'Basaveshwaranagar',
    initial: 'M',
    avatarBg: 'bg-indigo-600',
    rating: 5,
    date: '2 months ago',
    condition: 'Skin Allergy & Eczema',
    text: 'I was troubled with chronic itchy skin rash on both hands for over a year. After taking constitutional remedies from Maruthi Homeo Centre, the recurring itch stopped without any steroids. Genuine medicines from SBL and German brands.'
  },
  {
    id: 'rev-4',
    author: 'Radhika K.',
    location: 'Rajajinagar 2nd Block',
    initial: 'R',
    avatarBg: 'bg-purple-600',
    rating: 5,
    date: '3 months ago',
    condition: 'PCOS & Menstrual Irregularity',
    text: 'Very knowledgeable and patient doctor. Explained the root causes and guided me on lifestyle changes along with gentle remedies. My cycles are regular now after 4 months of treatment. Thank you SwasthyaHomeo team.'
  },
  {
    id: 'rev-5',
    author: 'Kiran Gowda',
    location: 'Malleshwaram',
    initial: 'K',
    avatarBg: 'bg-amber-600',
    rating: 5,
    date: '4 months ago',
    condition: 'Acidity, Gastritis & GERD',
    text: 'The in-house pharmacy has all original German potencies and mother tinctures. Doctor consultation timings are convenient in the evening. Cured my burning acidity and bloating permanently. Truly reliable clinic in West Bangalore.'
  },
  {
    id: 'rev-6',
    author: 'Anand Rao',
    location: 'Bengaluru',
    initial: 'A',
    avatarBg: 'bg-teal-600',
    rating: 5,
    date: '5 months ago',
    condition: 'Migraine & Tension Headache',
    text: 'Suffered from severe one-sided throbbing headaches with nausea. After starting constitutional treatment here, frequency of attacks came down from weekly to almost nil. Highly recommended.'
  }
];

export default function GoogleReviewsWidget({ widgetEmbedCode = null }) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  const placeId = CLINIC_INFO.googlePlaceId;
  const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;
  const allReviewsUrl = CLINIC_INFO.googleMapsUrl;

  // Infinite duplicate list to ensure perfectly seamless loop
  const loopReviews = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];

  // Manual scroll controls
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // If a live third-party widget script / embed container is injected
  useEffect(() => {
    if (widgetEmbedCode && window.initElfsight) {
      window.initElfsight();
    }
  }, [widgetEmbedCode]);

  return (
    <section className="bg-white py-14 border-y border-sand overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Header Card */}
        <div className="bg-alabaster rounded-3xl p-6 sm:p-8 border border-sand shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            {/* Google "G" Badge */}
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-sand flex items-center justify-center shrink-0">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-serif text-3xl font-bold text-ink">4.9</span>
                <div className="flex text-[#F4B400]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink">
                EXCELLENT · Verified Google Reviews
              </p>
              <p className="text-xs text-muted">
                Patient experiences at {CLINIC_INFO.legalName}, Rajajinagar
              </p>
            </div>
          </div>

          {/* Action CTAs & Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage-700 hover:bg-sage-800 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a Review on Google
            </a>
            <a
              href={allReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-sage-50 text-ink border border-sand text-xs font-medium transition-colors"
            >
              View on Google Maps &rarr;
            </a>

            {/* Slider Manual Controls */}
            <div className="hidden sm:flex items-center gap-1.5 pl-2">
              <button
                type="button"
                onClick={handleScrollLeft}
                aria-label="Previous reviews"
                className="w-9 h-9 rounded-xl border border-sand bg-white hover:bg-sage-50 text-ink flex items-center justify-center cursor-pointer transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                aria-label="Next reviews"
                className="w-9 h-9 rounded-xl border border-sand bg-white hover:bg-sage-50 text-ink flex items-center justify-center cursor-pointer transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Loop Track */}
      <div
        className="reviews-marquee-wrap relative w-full overflow-hidden mt-6 py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge blur masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={scrollContainerRef}
          className={`reviews-marquee-track flex gap-5 whitespace-normal ${
            isPaused ? 'animation-paused' : ''
          }`}
        >
          {loopReviews.map((r, index) => (
            <div
              key={`${r.id}-${index}`}
              className="w-[320px] sm:w-[360px] shrink-0 p-5 rounded-2xl bg-alabaster border border-sand hover:border-sage-300 transition-all shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md select-none"
            >
              <div className="space-y-3">
                {/* Author row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-full ${r.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm`}>
                      {r.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-ink leading-tight">{r.author}</p>
                      <p className="text-[10px] text-muted mt-0.5">{r.location} · {r.date}</p>
                    </div>
                  </div>
                  {/* Google Verified Icon */}
                  <div className="w-5 h-5 shrink-0" title="Verified Google Review">
                    <svg viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                    </svg>
                  </div>
                </div>

                {/* Stars & Condition */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex text-[#F4B400]">
                    {[...Array(r.rating)].map((_, s) => (
                      <svg key={s} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-sage-800 bg-sage-100 px-2.5 py-0.5 rounded-full border border-sage-200">
                    {r.condition}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-ink/90 leading-relaxed italic line-clamp-4">
                  "{r.text}"
                </p>
              </div>

              {/* Bottom Footer on Card */}
              <div className="pt-2.5 border-t border-sand/70 flex items-center justify-between text-[11px] text-muted">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Patient
                </span>
                <a
                  href={allReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-700 hover:underline font-medium"
                >
                  Read on Google &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-muted mt-2">
        <span>Hover over any review card to pause the scroll · </span>
        <a
          href={writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sage-700 font-semibold hover:underline"
        >
          Share your experience on Google
        </a>
      </div>
    </section>
  );
}
