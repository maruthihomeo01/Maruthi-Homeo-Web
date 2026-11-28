import React, { useState, useMemo } from 'react';
import { useNavigation } from '../context';
import { FAQS, FAQ_CATEGORIES, CLINIC_INFO } from '../data/clinicData';

export default function FaqPage({ onOpenWhatsApp }) {
  const { navigateTo } = useNavigation();
  const [activeFaqCategory, setActiveFaqCategory] = useState('All');
  const [faqSearchTerm, setFaqSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openFaqIds, setOpenFaqIds] = useState(() => new Set(['faq-pharmacy-counter']));

  // Pre-calculate category item counts
  const categoryCounts = useMemo(() => {
    const counts = { All: FAQS.length };
    FAQS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter FAQs by category and search query
  const q = faqSearchTerm.toLowerCase().trim();
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((item) => {
      const catMatch = activeFaqCategory === 'All' || item.category === activeFaqCategory;
      const textMatch = !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [activeFaqCategory, q]);

  const toggleFaq = (id) => {
    setOpenFaqIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setOpenFaqIds(new Set(filteredFaqs.map((f) => f.id)));
  };

  const handleCollapseAll = () => {
    setOpenFaqIds(new Set());
  };

  const allFilteredOpen = filteredFaqs.length > 0 && filteredFaqs.every((f) => openFaqIds.has(f.id));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-5 sm:space-y-10 animate-in fade-in duration-300">
      {/* 1. Header & Reassurance Badges */}
      <div className="text-center space-y-2 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse" />
          <span>Patient Guidance &amp; Pharmacy Answers</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
          Frequently Asked Questions
        </h1>

        <p className="text-muted text-xs sm:text-base max-w-2xl mx-auto leading-relaxed line-clamp-2 sm:line-clamp-none">
          Transparent answers on genuine German dilutions, zero-steroid safety, online courier orders, and 1-on-1 constitutional doctor care in Rajajinagar.
        </p>

        {/* Quick Value Pills (Desktop/Tablet) */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-sage-900 font-medium">
          <span className="px-3 py-1 rounded-lg bg-white border border-sand">🌿 100% Zero Steroids</span>
          <span className="px-3 py-1 rounded-lg bg-white border border-sand">🇩🇪 Genuine Reckeweg &amp; Schwabe</span>
          <span className="px-3 py-1 rounded-lg bg-white border border-sand">📦 Bengaluru &amp; Pan-India Delivery</span>
        </div>
      </div>

      {/* 2. Search & Category Filter Controls */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-sand space-y-3 sm:space-y-4 shadow-xs">
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
                value={faqSearchTerm}
                onChange={(e) => setFaqSearchTerm(e.target.value)}
                placeholder="Search (steroids, courier, timings...)"
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-sand bg-alabaster text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:bg-white transition-all"
              />
              {faqSearchTerm && (
                <button
                  type="button"
                  onClick={() => setFaqSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              aria-label="Filter FAQs by category"
              className={`sm:hidden relative inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shrink-0 active:scale-95 ${activeFaqCategory !== 'All'
                ? 'bg-sage-800 border-sage-800 text-white shadow-xs'
                : 'bg-alabaster border-sand text-ink hover:bg-sage-50'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter</span>
              {activeFaqCategory !== 'All' && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>
          </div>

          {/* Toggle Expand / Collapse All */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-muted font-medium px-0.5">
            <span>
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
            </span>
            {filteredFaqs.length > 0 && (
              <button
                type="button"
                onClick={allFilteredOpen ? handleCollapseAll : handleExpandAll}
                className="text-sage-700 hover:text-sage-900 font-semibold underline underline-offset-2 cursor-pointer"
              >
                {allFilteredOpen ? 'Collapse All' : 'Expand All'}
              </button>
            )}
          </div>
        </div>

        {/* Active Category Chip on Mobile */}
        {activeFaqCategory !== 'All' && (
          <div className="flex sm:hidden items-center gap-2 pt-0.5">
            <span className="text-[11px] text-muted">Topic:</span>
            <button
              type="button"
              onClick={() => setActiveFaqCategory('All')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-900 text-xs font-semibold cursor-pointer"
            >
              <span>{activeFaqCategory}</span>
              <span className="text-sage-700">✕</span>
            </button>
          </div>
        )}

        {/* Desktop & Tablet Category Pills */}
        <div className="hidden sm:flex flex-wrap gap-2 pt-2 border-t border-sand/50">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeFaqCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFaqCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${isActive
                  ? 'bg-sage-800 text-white shadow-xs'
                  : 'bg-alabaster text-muted border border-sand hover:bg-sage-100 hover:text-ink'
                  }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/25 text-white' : 'bg-sand text-muted'
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

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
            <div className="w-10 h-1 rounded-full bg-sand mx-auto" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink">Filter FAQs</h3>
                <p className="text-xs text-muted">Choose a topic</p>
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
              {FAQ_CATEGORIES.map((cat) => {
                const isActive = activeFaqCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveFaqCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-2xl text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${isActive
                      ? 'bg-sage-800 text-white shadow-xs'
                      : 'bg-alabaster text-ink hover:bg-sage-50 border border-sand/60'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <span>✓</span>}
                      <span>{cat}</span>
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white text-muted border border-sand'
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

      {/* 3. Modern Interactive Accordion List */}
      {filteredFaqs.length === 0 ? (
        <div className="p-8 sm:p-10 text-center rounded-2xl bg-white border border-sand text-muted text-sm shadow-xs space-y-3">
          <p className="text-base text-ink font-serif font-medium">No matching FAQ records found.</p>
          <p className="text-xs max-w-md mx-auto">
            Couldn&apos;t find what you&apos;re looking for? Chat online with our clinic desk on WhatsApp for an immediate personal reply.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
                faqSearchTerm.trim()
                  ? `Namaste Maruthi Homoeo Centre! I have a question:\n"${faqSearchTerm.trim()}"`
                  : 'Hello Maruthi Homoeo Centre! I have a question about medicines / consultations.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5"
            >
              <span>Chat Online on WhatsApp</span>
              <span>&rarr;</span>
            </a>
            {onOpenWhatsApp && (
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="px-4 py-2 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Open Q&amp;A Assistant
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setActiveFaqCategory('All');
                setFaqSearchTerm('');
              }}
              className="px-4 py-2 rounded-xl bg-sage-800 hover:bg-sage-900 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Show All Questions
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5 sm:space-y-3">
          {filteredFaqs.map((item) => {
            const isOpen = openFaqIds.has(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${isOpen ? 'border-saffron-400 shadow-sm' : 'border-sand hover:border-sand/80 shadow-xs'
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-6 flex items-start justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none group"
                >
                  <div className="space-y-1 sm:space-y-1.5 pr-1">
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-saffron-50 text-saffron-600 border border-saffron-200">
                      {item.category}
                    </span>
                    <h2 className="text-sm sm:text-lg font-serif font-semibold text-ink group-hover:text-sage-800 transition-colors leading-snug">
                      {item.q}
                    </h2>
                  </div>

                  <span
                    className={`w-7 h-7 rounded-full bg-alabaster border border-sand flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-saffron-50 text-saffron-600 border-saffron-200' : 'text-muted group-hover:bg-sage-50'
                      }`}
                  >
                    <svg className="w-3.5 h-3.5 fill-none stroke-currentColor stroke-width-2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-muted leading-relaxed border-t border-sand/50 pt-3 sm:pt-4 bg-alabaster/40 animate-in fade-in duration-150">
                    <p className="text-ink/90 font-sans">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 4. "Still Have Questions?" Direct Help Card */}
      <div className="rounded-3xl bg-white border border-sand p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-500">
            Have a Specific Query or Need a Remedy?
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
            Can't find the answer you need?
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-xl">
            Our clinic desk is active on WhatsApp. Send us your prescription photo, inquire about dilution availability, or check doctor timings.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
              'Hello Maruthi Homoeo Centre! I have a question about medicines / consultations.'
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
      </div>

      {/* 5. Clinical Safety Disclaimer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sage-100/70 border border-sage-200 text-xs text-sage-900 leading-relaxed text-center sm:text-left">
        <strong>Medical Note:</strong> The information provided here is for patient education and does not replace individualized clinical evaluation. Homoeopathic remedies are selected based on constitution and symptom totality. For emergency conditions, please contact an emergency medical centre immediately.
      </div>
    </div>
  );
}
