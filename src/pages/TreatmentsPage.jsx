import React, { useState, useMemo } from 'react';
import { useNavigation } from '../context';
import { CLINIC_INFO, TREATMENTS, TREATMENT_CATEGORIES } from '../data/clinicData';

export default function TreatmentsPage() {
  const { selectedCategory, setSelectedCategory, navigateTo } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleInquire = (treatment) => {
    navigateTo('contact', {
      bookingData: {
        careArea: treatment.category,
        notes: `I would like to consult regarding ${treatment.title}.`
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-in fade-in duration-300">
      {/* 1. Header & Hero Narrative */}
      <section className="grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Classical Care &amp; Certified Dispensary</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
            Targeted Treatments &amp; Tailored Remedies
          </h1>

          <p className="text-muted text-sm sm:text-base leading-relaxed">
            From chronic dermatological and respiratory allergies to pediatric immunity and hormonal balance, Maruthi Homeo Centre delivers constitutional homeopathic care without steroid suppression or habit formation.
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-sage-900 font-medium">
            <span className="px-3 py-1 rounded-lg bg-white border border-sand">🌿 100% Non-Steroidal</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-sand">🇩🇪 German Reckeweg &amp; Schwabe</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-sand">⏱️ 30–45m Detailed Case-Taking</span>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden border border-sand shadow-sm bg-white relative group">
            <img
              src="/images/botanicals-dropper.jpeg"
              alt="Fresh botanical leaves with authentic homeopathic dropper"
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-5">
              <span className="text-xs font-medium text-white/95">
                Authentic Mother Tinctures &amp; Classical Constitutional Simillimum
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Category Filter Controls */}
      <section className="bg-white p-5 rounded-2xl border border-sand space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
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
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conditions (e.g. eczema, sinusitis, migraine, PCOS, acidity)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-sand bg-alabaster text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs p-1 cursor-pointer"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-muted font-medium px-1">
            <span>
              Showing {filteredTreatments.length} of {TREATMENTS.length} conditions
            </span>
            {(selectedCategory !== 'All' || searchTerm) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchTerm('');
                }}
                className="text-sage-700 hover:text-sage-900 font-semibold underline underline-offset-2 ml-2 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-sand/50">
          {TREATMENT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
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
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((t) => (
            <div
              key={t.id}
              className="group rounded-2xl bg-white border border-sand hover:border-sage-400 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              {/* Contextual Image Header with Category Badge */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-sage-100">
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
                  <span className="inline-block text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-sage-900 shadow-xs border border-white/60">
                    {t.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-sage-800 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                    {t.summary}
                  </p>

                  {/* Clean Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {t.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-alabaster border border-sand text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Single Clean CTA Action */}
                <div className="pt-3 border-t border-sand/60">
                  <button
                    type="button"
                    onClick={() => handleInquire(t)}
                    className="w-full py-2.5 px-4 rounded-xl bg-sage-50 hover:bg-sage-800 text-sage-800 hover:text-white border border-sage-200 hover:border-sage-800 text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Enquire About This Care</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Bottom Advisory: Prescription & Medicine Ordering */}
      <section className="rounded-3xl bg-white border border-sand p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-700">
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
              'Hello Maruthi Homeo Centre! I have an inquiry about homeopathic treatments / medicine availability.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all inline-flex items-center gap-2"
          >
            <span>Ask on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => navigateTo('contact')}
            className="px-5 py-2.5 rounded-xl bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <span>Visit / Enquire &rarr;</span>
          </button>
        </div>
      </section>

      {/* 5. Clinical Disclaimer Note */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sage-100/70 border border-sage-200 text-xs text-sage-900 leading-relaxed text-center sm:text-left">
        <strong>Clinical Note:</strong> Homeopathic remedies are prescribed individually according to the totality of symptoms. If you are experiencing a medical emergency or severe acute distress, please contact an emergency medical service immediately.
      </div>
    </div>
  );
}
