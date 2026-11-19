import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context';
import {
  FAQS,
  CLINIC_INFO
} from '../data/clinicData';
import MarqueeStrip from '../components/common/MarqueeStrip';
import TrustindexReviews from '../components/common/TrustindexReviews';

const HERO_SLIDES_FULL = [
  {
    badge: 'Maruthi Homeo Care · Rajajinagar',
    hasDot: true,
    title1: 'Gentle Healing.',
    title2: 'Root-Cause Care.',
    subtitle: 'PranaLeaf Homeopathy — personalized, non-toxic remedies for your whole family.',
    primaryBtn: { label: 'Enquire / Order Medicines', action: 'contact', color: 'whatsapp' },
    secondaryBtn: { label: 'Explore Treatments', action: 'treatments' },
    image: '/images/clinic-apothecary.jpeg',
    alt: 'PranaLeaf Homeopathy clinic apothecary',
    isDarkBg: true
  },
  {
    badge: '100% Natural & Safe',
    hasDot: false,
    title1: 'Made for Kids,',
    title2: 'Trusted by Families.',
    subtitle: 'Sweet globules & gentle dilutions with zero habit-forming side effects.',
    primaryBtn: { label: 'Meet Our Clinic', action: 'about', color: 'white' },
    secondaryBtn: null,
    image: '/images/homeopathy-globules.jpeg',
    alt: 'Classical homeopathic globules and botanicals',
    isDarkBg: false
  },
  {
    badge: 'In-Clinic & Video Consults',
    hasDot: false,
    title1: 'Skin, Allergy &',
    title2: 'Hormonal Balance.',
    subtitle: 'Structured constitutional care in Rajajinagar & online across Bengaluru.',
    primaryBtn: { label: 'Consultation Enquiry', action: 'contact', color: 'whatsapp' },
    secondaryBtn: null,
    image: '/images/botanicals-dropper.jpeg',
    alt: 'Botanical leaves and glass apothecary bottle',
    isDarkBg: false
  }
];

// 5 Specialized Care Tiles with refined typography & distinct palettes
const SPECIALTY_TILES = [
  {
    name: 'Skin & Hair',
    icon: '✨',
    tag: 'Eczema · Hair Fall · Psoriasis',
    desc: 'Constitutional balance calming recurring skin flare-ups and restoring scalp micro-nutrition without steroid reliance.',
    bg: 'bg-amber-50/90 hover:bg-amber-100/90 text-amber-950 border-amber-200/80',
    accent: 'text-amber-800'
  },
  {
    name: 'Respiratory & Allergies',
    icon: '🌿',
    tag: 'Sinusitis · Asthma · Dust Allergy',
    desc: 'Desensitizing respiratory mucosa to dust, cold weather & pollen. Stops morning sneezing and sinus pressure.',
    bg: 'bg-emerald-50/90 hover:bg-emerald-100/90 text-emerald-950 border-emerald-200/80',
    accent: 'text-emerald-800'
  },
  {
    name: 'Digestive & Metabolic',
    icon: '🍵',
    tag: 'Acidity · IBS · Thyroid Stagnation',
    desc: 'Healing mucosal lining, regulating gut-brain motility, and supporting sluggish metabolism and cellular vitality.',
    bg: 'bg-stone-100/90 hover:bg-stone-200/80 text-stone-900 border-stone-200',
    accent: 'text-stone-700'
  },
  {
    name: "Women's & Pediatric",
    icon: '🌸',
    tag: 'PCOS · Child Immunity · Teething',
    desc: 'Non-hormonal cycle regularity alongside sweet, tear-free globules children take willingly for recurrent colds.',
    bg: 'bg-rose-50/90 hover:bg-rose-100/90 text-rose-950 border-rose-200/80',
    accent: 'text-rose-800'
  },
  {
    name: 'Stress & Immunity',
    icon: '🌙',
    tag: 'Migraine · Sleep · Restless Mind',
    desc: 'Relieving neuro-vascular spasms and restoring restorative REM sleep cycles without next-day drowsiness.',
    bg: 'bg-indigo-50/90 hover:bg-indigo-100/90 text-indigo-950 border-indigo-200/80',
    accent: 'text-indigo-800'
  }
];

export default function HomePage({ onOpenWhatsApp }) {
  const { navigateTo } = useNavigation();

  // Full-bleed Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeSlide = HERO_SLIDES_FULL[currentSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES_FULL.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES_FULL.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES_FULL.length) % HERO_SLIDES_FULL.length);

  // FAQ Accordion Preview State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const homeFaqs = FAQS.slice(0, 3);

  const handleTileClick = (categoryName) => {
    navigateTo('treatments', { category: categoryName });
  };

  return (
    <div className="space-y-16">
      {/* 1. Full-Bleed Hero Carousel & Attached Highlights Strip */}
      <div>
        <div id="hero-carousel" className="relative w-full h-[78vh] min-h-[520px] max-h-[760px] overflow-hidden bg-sage-900">
          <div className="relative w-full h-full">
          {HERO_SLIDES_FULL.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
                  }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent flex items-center">
                  <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-16">
                    <div className="max-w-2xl space-y-5 text-white">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sage-100 text-xs font-semibold tracking-wide uppercase">
                        {slide.hasDot && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                        {slide.badge}
                      </span>
                      <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-[1.08] tracking-tight text-white">
                        {slide.title1}
                        <br />
                        {slide.title2}
                      </h1>
                      <p className="text-base sm:text-lg text-sage-100/90 max-w-lg leading-relaxed">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {slide.primaryBtn.color === 'whatsapp' ? (
                          <button
                            type="button"
                            onClick={() => navigateTo(slide.primaryBtn.action)}
                            className="px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                          >
                            {slide.primaryBtn.label}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => navigateTo(slide.primaryBtn.action)}
                            className="px-7 py-3.5 rounded-full bg-white text-ink hover:bg-sage-50 text-sm font-semibold shadow-lg transition-colors cursor-pointer"
                          >
                            {slide.primaryBtn.label}
                          </button>
                        )}
                        {slide.secondaryBtn && (
                          <button
                            type="button"
                            onClick={() => navigateTo(slide.secondaryBtn.action)}
                            className="px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-sm font-semibold transition-colors cursor-pointer"
                          >
                            {slide.secondaryBtn.label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Quick Stats Bar (Desktop) - Dynamic contrast adapting to slide background */}
        <div className="hidden md:flex absolute bottom-6 right-8 z-20 gap-3">
          {[
            { val: '1-on-1', label: 'Case-Taking' },
            { val: 'Zero', label: 'Steroids' },
            { val: 'All Ages', label: 'Gentle Care' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`px-4 py-2.5 rounded-2xl backdrop-blur-md shadow-lg transition-all duration-500 text-xs border ${
                activeSlide.isDarkBg
                  ? 'bg-ink/80 border-white/20 text-white'
                  : 'bg-white/95 border-sand/80 text-ink shadow-md'
              }`}
            >
              <span
                className={`font-serif text-lg font-semibold block leading-none transition-colors duration-500 ${
                  activeSlide.isDarkBg ? 'text-white' : 'text-sage-950'
                }`}
              >
                {stat.val}
              </span>
              <span
                className={`transition-colors duration-500 text-[11px] font-medium ${
                  activeSlide.isDarkBg ? 'text-emerald-300' : 'text-sage-700'
                }`}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-ink backdrop-blur-md flex items-center justify-center shadow transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-ink backdrop-blur-md flex items-center justify-center shadow transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-6 sm:left-12 lg:left-16 z-20 flex items-center gap-2">
          {HERO_SLIDES_FULL.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`transition-all cursor-pointer ${idx === currentSlide
                ? 'w-6 h-2 rounded-full bg-white'
                : 'w-2 h-2 rounded-full bg-white/50 hover:bg-white/80'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Marquee Strip Attached Directly Below Hero Carousel */}
      <MarqueeStrip />
    </div>

      {/* ============================================================== */}
      {/* SECTION 2: Available Services (Visual Bento Grid Layout)        */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sage-700">Services</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink mt-1">Care Designed Around You</h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('about')}
            className="text-sm font-semibold text-sage-700 hover:text-sage-800 cursor-pointer flex items-center gap-1"
          >
            <span>How we work</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid md:grid-cols-12 gap-5 items-stretch">
          {/* Featured Tall Photo Bento Card (No WhatsApp Button) */}
          <div className="md:col-span-5 relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[360px] group shadow-sm border border-sand bg-sage-900">
            <img
              src="/images/homeopathy-globules.jpeg"
              alt="Homeopathic remedies"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent p-7 flex flex-col justify-end text-white space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
                Signature Service
              </span>
              <h3 className="font-serif text-2xl font-semibold text-white leading-tight">
                1-on-1 Constitutional Case-Taking
              </h3>
              <p className="text-xs text-sage-100/90 leading-relaxed max-w-sm">
                30–45 minute deep-dive exploring physical complaints, thermal sensitivities, emotional stress, and family medical pedigree.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="px-4 py-2 rounded-xl bg-white text-ink text-xs font-semibold shadow hover:bg-sage-50 transition-colors cursor-pointer"
                >
                  Enquire Doctor Timings
                </button>
              </div>
            </div>
          </div>

          {/* Right 2x2 Bento Box Grid */}
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-5">
            {/* Bento Card 1: Navy Accent */}
            <div className="p-6 rounded-3xl bg-sage-800 text-white flex flex-col justify-between shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">Acute &amp; Chronic Care</h3>
                <p className="text-xs text-sage-200 mt-1.5 leading-relaxed">
                  From seasonal infections to long-standing skin, allergic, and respiratory conditions without steroid dependency.
                </p>
              </div>
            </div>

            {/* Bento Card 2: Sage Pastel */}
            <div className="p-6 rounded-3xl bg-sage-100 border border-sage-200 text-ink flex flex-col justify-between shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-white text-sage-700 flex items-center justify-center shadow-sm shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink">Online Video Consults</h3>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">
                  High-definition video consultations for patients across Bengaluru and India, with doorstep medicine dispatch.
                </p>
              </div>
            </div>

            {/* Bento Card 3: Crisp White */}
            <div className="p-6 rounded-3xl bg-white border border-sand text-ink flex flex-col justify-between shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink">In-House Dispensary</h3>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">
                  Authentic German mother tinctures and sterile micro-dilutions (Schwabe, Reckeweg) prepared fresh at our clinic counter.
                </p>
              </div>
            </div>

            {/* Bento Card 4: Warm Alabaster */}
            <div className="p-6 rounded-3xl bg-[#F3ECE1] border border-sand text-ink flex flex-col justify-between shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-white text-sage-700 flex items-center justify-center shadow-sm shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink">Child &amp; Family Care</h3>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">
                  Sweet globules children take willingly. Non-drowsy, zero habit-forming remedies safe for all age groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: Visual Interactive Specialty Tiles (Elevated Typography) */}
      {/* ============================================================== */}
      <section className="bg-white border-y border-sand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-sage-700">Specialties</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
                Explore by Category
              </h2>
              <p className="text-sm text-muted">
                Tap any specialty card to explore tailored homeopathic treatments, symptom profiles, and clinical protocols.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('treatments')}
              className="px-5 py-2.5 rounded-full bg-sage-100 hover:bg-sage-200 text-sage-800 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-end"
            >
              All Treatments &rarr;
            </button>
          </div>

          {/* 5 Specialty Tiles with Refined Typography and Distinct Pastel Accents */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SPECIALTY_TILES.map((tile, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleTileClick(tile.name)}
                className={`text-left p-6 rounded-3xl border ${tile.bg} hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer flex flex-col justify-between min-h-[220px]`}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {tile.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold leading-snug tracking-tight">
                      {tile.name}
                    </h3>
                    <p className={`text-[11px] font-semibold mt-1 tracking-wide ${tile.accent}`}>
                      {tile.tag}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 mt-3">
                  <p className="text-xs opacity-85 leading-relaxed line-clamp-3">
                    {tile.desc}
                  </p>
                  <p className="text-[11px] font-bold mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore care</span>
                    <span>&rarr;</span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: Live Verified Google Reviews via Trustindex          */}
      {/* ============================================================== */}
      <TrustindexReviews />

      {/* ============================================================== */}
      {/* SECTION 5: Quick Answers FAQ Preview                           */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-sage-700">FAQ</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Quick Answers</h2>
            <p className="text-sm text-muted">Common questions about homeopathic consultations and medicine dispensing.</p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('faq')}
            className="text-xs font-semibold text-sage-700 hover:text-sage-800 flex items-center gap-1 cursor-pointer"
          >
            View All FAQs →
          </button>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={faq.id} className="rounded-2xl border border-sand bg-white overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-ink">{faq.q}</span>
                  <span className="text-muted text-lg font-bold">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-muted leading-relaxed border-t border-sand/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: High-Conversion Booking CTA Banner                   */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <div className="bg-sage-800 text-white p-8 sm:p-12 rounded-3xl space-y-6 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white">
              Start Your Healing Journey Today
            </h2>
            <p className="text-sm sm:text-base text-sage-100 max-w-xl mx-auto leading-relaxed">
              Consult with our classical homeopath at {CLINIC_INFO.shortName}, {CLINIC_INFO.locality}, or schedule a video session from home.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="bg-white hover:bg-sage-50 text-sage-900 text-sm font-semibold px-6 py-3 rounded-xl shadow transition-colors cursor-pointer"
            >
              Enquire / Visit Store
            </button>
            <button
              type="button"
              onClick={onOpenWhatsApp}
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.51 0-9.99 4.478-9.99 9.99 0 1.761.459 3.48 1.332 5l-1.413 5.161 5.289-1.387a9.96 9.96 0 004.782 1.216h.004c5.509 0 9.99-4.479 9.99-9.99 0-2.668-1.039-5.177-2.925-7.064A9.923 9.923 0 0012.031 2z" />
              </svg>
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
