import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigation } from '../context';
import { CLINIC_INFO, TREATMENTS, TREATMENT_CATEGORIES } from '../data/clinicData';
import TreatmentCardsCarousel from '../components/common/TreatmentCardsCarousel';

const ITEMS_PER_PAGE = 6;

function RevealTreatmentCard({ index, children }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${(index % 6) * 70}ms` }}
      className={isVisible ? 'treatment-card-visible h-full' : 'treatment-card-hidden h-full'}
    >
      {children}
    </div>
  );
}

export default function TreatmentsPage() {
  const { selectedCategory, setSelectedCategory, navigateTo } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'
  const gridTopRef = useRef(null);

  // Pre-calculate category item counts for clear UX
  const categoryCounts = useMemo(() => {
    const counts = { All: TREATMENTS.length };
    TREATMENTS.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter treatments by category and search query
  const q = searchTerm.toLowerCase().trim();
  const filteredTreatments = TREATMENTS.filter((t) => {
    const catMatch = selectedCategory === 'All' || t.category === selectedCategory;
    const textMatch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q));
    return catMatch && textMatch;
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredTreatments.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedTreatments = filteredTreatments.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleInquire = (treatment) => {
    navigateTo('contact', {
      bookingData: {
        careArea: treatment.category,
        notes: `I would like to consult regarding ${treatment.title}.`
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10 animate-in fade-in duration-300">
      {/* 1. Header & Hero Narrative (Image first on mobile, Text first on desktop) */}
      <section className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-4 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse" />
            <span>Classical Care &amp; Certified Dispensary</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
            Targeted Treatments &amp; Tailored Remedies
          </h1>

          <p className="text-muted text-xs sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
            From diabetes support, kidney stones, and joint arthritis to dermatological allergies, pediatric immunity, and hormonal balance, Maruthi Homoeo Centre delivers constitutional homoeopathic care without steroid suppression or habit formation.
          </p>

          {/* Value Badges (Hidden on extra-small mobile to surface search/treatments faster) */}
          <div className="hidden sm:flex flex-wrap items-center gap-2 pt-1 text-xs text-sage-900 font-medium">
            <span className="px-3 py-1 rounded-lg bg-white border border-sand">🌿 100% Non-Steroidal</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-sand">🇩🇪 German Reckeweg &amp; Schwabe</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-sand">⏱️ 30–45m Case-Taking</span>
          </div>
        </div>

        {/* Hero Visual Card (First on mobile, compact height) */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-sand shadow-sm bg-white relative group">
            <img
              src="/images/botanicals-dropper.jpeg"
              alt="Fresh botanical leaves with authentic homoeopathic dropper"
              className="w-full h-36 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-3.5 sm:p-5">
              <span className="text-[11px] sm:text-xs font-medium text-white/95">
                Authentic Mother Tinctures &amp; Classical Constitutional Simillimum
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Category Filter Controls (App-like on mobile) */}
      <section ref={gridTopRef} className="bg-white p-3.5 sm:p-5 rounded-2xl border border-sand space-y-3 sm:space-y-4 shadow-xs scroll-mt-20">
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <svg
                className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search conditions (diabetes, skin, migraine...)"
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-sand bg-alabaster text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Filter Button with Icon */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              aria-label="Filter treatments by category"
              className={`sm:hidden relative inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shrink-0 active:scale-95 ${
                selectedCategory !== 'All'
                  ? 'bg-sage-800 border-sage-800 text-white shadow-xs'
                  : 'bg-alabaster border-sand text-ink hover:bg-sage-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter</span>
              {selectedCategory !== 'All' && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5 text-xs text-muted font-medium px-0.5">
            <span>
              {viewMode === 'carousel'
                ? `${filteredTreatments.length} ${filteredTreatments.length === 1 ? 'condition' : 'conditions'} in Coverflow`
                : `Showing ${filteredTreatments.length === 0 ? 0 : startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filteredTreatments.length)} of ${filteredTreatments.length} conditions`}
            </span>
            {(selectedCategory !== 'All' || searchTerm) && (
              <button
                type="button"
                onClick={() => {
                  handleCategorySelect('All');
                  handleSearchChange('');
                }}
                className="text-saffron-600 hover:text-saffron-700 font-semibold underline underline-offset-2 cursor-pointer"
              >
                Reset
              </button>
            )}
            <div className="inline-flex items-center p-0.5 rounded-xl bg-alabaster border border-sand shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-sage-800 text-white shadow-2xs'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-saffron-500 text-white shadow-2xs'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Coverflow
              </button>
            </div>
          </div>
        </div>

        {/* Active Category Chip on Mobile */}
        {selectedCategory !== 'All' && (
          <div className="flex sm:hidden items-center gap-2 pt-1">
            <span className="text-[11px] text-muted">Category:</span>
            <button
              type="button"
              onClick={() => handleCategorySelect('All')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-900 text-xs font-semibold cursor-pointer"
            >
              <span>{selectedCategory}</span>
              <span className="text-sage-700">✕</span>
            </button>
          </div>
        )}

        {/* Desktop & Tablet Category Filter Pills */}
        <div className="hidden sm:flex flex-wrap gap-2 pt-2 border-t border-sand/50">
          {TREATMENT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-sage-800 text-white shadow-xs'
                    : 'bg-alabaster text-muted border border-sand hover:bg-sage-100 hover:text-ink'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/25 text-white' : 'bg-sand text-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Mobile App-Style Filter Bottom Sheet */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-50 sm:hidden flex items-end justify-center bg-ink/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-t-3xl p-5 pb-7 space-y-4 shadow-2xl border-t border-sand"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <div className="w-10 h-1 rounded-full bg-sand mx-auto" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink">Filter by Specialty</h3>
                <p className="text-xs text-muted">Choose a treatment category</p>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-alabaster text-ink flex items-center justify-center text-sm font-semibold cursor-pointer"
                aria-label="Close filter"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 max-h-[55vh] overflow-y-auto pr-1">
              {TREATMENT_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      handleCategorySelect(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-2xl text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sage-800 text-white shadow-xs'
                        : 'bg-alabaster text-ink hover:bg-sage-50 border border-sand/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <span>✓</span>}
                      <span>{cat}</span>
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white text-muted border border-sand'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. Treatments Grid with Dedicated Images */}
      {filteredTreatments.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-sand text-muted text-sm shadow-xs space-y-3">
          <p className="text-base text-ink font-serif font-medium">No conditions found matching your search.</p>
          <p className="text-xs">Try adjusting your keywords or select "All" from the categories above.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            className="px-4 py-2 rounded-xl bg-sage-800 text-white text-xs font-semibold cursor-pointer"
          >
            Show All Treatments
          </button>
        </div>
      ) : viewMode === 'carousel' ? (
        <div className="rounded-3xl bg-white border border-sand py-6 px-4 sm:p-8 shadow-xs">
          <TreatmentCardsCarousel
            key={`${selectedCategory}-${q}`}
            items={filteredTreatments}
            onSelectItem={handleInquire}
            ctaLabel="Enquire About This Care"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {paginatedTreatments.map((t, idx) => (
              <RevealTreatmentCard key={`${t.id}-${safePage}`} index={idx}>
                <article className="h-full group rounded-2xl sm:rounded-3xl bg-white border border-sand hover:border-saffron-400 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  {/* Contextual Image Banner on both Mobile & Desktop */}
                  <div className="relative h-44 sm:h-48 w-full shrink-0 overflow-hidden bg-sage-100">
                    <img
                      src={t.image}
                      alt={t.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = '/images/botanicals-dropper.jpeg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur shadow-xs border ${
                          idx % 2 === 0
                            ? 'bg-saffron-50/95 text-saffron-700 border-saffron-200'
                            : 'bg-white/95 text-sage-900 border-white/60'
                        }`}
                      >
                        {t.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4 min-w-0">
                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="font-serif text-base sm:text-lg font-semibold text-ink group-hover:text-sage-800 transition-colors leading-snug">
                        {t.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                        {t.summary}
                      </p>

                      {/* Clean Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {t.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-alabaster border border-sand text-muted"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Single Clean CTA Action */}
                    <div className="pt-2.5 sm:pt-3 border-t border-sand/60">
                      <button
                        type="button"
                        onClick={() => handleInquire(t)}
                        className="w-full py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl bg-saffron-50 hover:bg-saffron-500 text-saffron-600 hover:text-white border border-saffron-200 hover:border-saffron-500 text-xs font-semibold transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1.5 group/btn active:scale-95"
                      >
                        <span>Enquire About This Care</span>
                        <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </article>
              </RevealTreatmentCard>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav
              aria-label="Treatments Pagination"
              className="flex flex-wrap items-center justify-between gap-4 pt-2"
            >
              <p className="text-xs text-muted font-medium">
                Page <span className="font-semibold text-ink">{safePage}</span> of{' '}
                <span className="font-semibold text-ink">{totalPages}</span>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage === 1}
                  className="px-3.5 py-2 rounded-xl border border-sand bg-white text-xs font-semibold text-ink hover:bg-sage-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  &larr; Prev
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                  const isCurrent = pageNum === safePage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-sage-800 text-white shadow-xs'
                          : 'bg-white border border-sand text-ink hover:bg-sage-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="px-3.5 py-2 rounded-xl border border-sand bg-white text-xs font-semibold text-ink hover:bg-sage-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next &rarr;
                </button>
              </div>
            </nav>
          )}
        </>
      )}

      {/* 4. Bottom Advisory: Prescription & Medicine Ordering */}
      <section className="rounded-3xl bg-white border border-sand p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-500">
            Have a Specific Remedy or Prescription?
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
            Unsure Which Treatment Fits Your Symptoms?
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-xl">
            You can send your doctor's prescription or describe your symptoms directly over WhatsApp. We will verify remedy potencies and advise on clinic consultation timings.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
              'Hello Maruthi Homoeo Centre! I have an inquiry about homoeopathic treatments / medicine availability.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all inline-flex items-center gap-2"
          >
            <span>Ask on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => navigateTo('contact')}
            className="px-5 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <span>Visit / Enquire &rarr;</span>
          </button>
        </div>
      </section>

      {/* 5. Clinical Disclaimer Note */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sage-100/70 border border-sage-200 text-xs text-sage-900 leading-relaxed text-center sm:text-left">
        <strong>Clinical Note:</strong> Homoeopathic remedies are prescribed individually according to the totality of symptoms. If you are experiencing a medical emergency or severe acute distress, please contact an emergency medical service immediately.
      </div>
    </div>
  );
}
