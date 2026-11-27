import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context';
import { CLINIC_INFO, BRAND_PARTNERS } from '../data/clinicData';

const CLINICAL_STEPS = [
  {
    num: '01',
    title: 'Constitutional Case-Taking',
    subtitle: '30–45 Min In-Depth Evaluation',
    tag: 'Root-Cause Discovery',
    description: 'Unhurried evaluation exploring physical symptoms, thermal modalities (chilly vs. warm sensitivities), sleep patterns, emotional stress, and hereditary traits.',
    highlights: ['Totality of symptoms assessment', 'Zero rushed 5-minute visits', 'Thermal & emotional profiling']
  },
  {
    num: '02',
    title: 'Precision Simillimum Dispensing',
    subtitle: 'Fresh In-House Preparation',
    tag: 'Pharmacopoeia Pure',
    description: 'Pinpoint selection of your single constitutional simillimum, compounded fresh at our Rajajinagar counter in UV-protected amber glass with pure cane sugar globules #30.',
    highlights: ['Pure cane sugar globules #30', 'UV pharmaceutical amber glass', 'Zero steroids or additives']
  },
  {
    num: '03',
    title: 'Recovery Review & Tapering',
    subtitle: '3–4 Week Follow-Up Cadence',
    tag: 'Natural Self-Regulation',
    description: 'Systematic review tracking milestone recovery, reducing symptom flare-ups, and safely tapering remedy potencies as innate self-regulation takes hold.',
    highlights: ['Measurable symptom tapering', 'Non-habit forming care', 'Long-term constitutional vitality']
  }
];

const ACCREDITATIONS = [
  {
    image: '/images/Ayush.avif',
    alt: 'Ministry of AYUSH Statutory Certification',
    title: 'Ministry of AYUSH',
    sub: 'Statutory Body · Govt. of India'
  },
  {
    image: '/images/GMP.avif',
    alt: 'GMP Certified Quality Standards',
    title: 'GMP Certified',
    sub: 'Sterile Cleanroom Standards'
  },
  {
    image: '/images/FSSAI.avif',
    alt: 'FSSAI Food Safety Standards Compliance',
    title: 'FSSAI Compliant',
    sub: 'Nutritional Purity Standard'
  },
  {
    image: '/images/MadeinIndia.avif',
    alt: 'National & German Pharmacopoeia Standards',
    title: 'National & German Standards',
    sub: 'HPI & European Pharmacopoeia'
  }
];

export default function AboutPage() {
  const { navigateTo } = useNavigation();

  // Interactive & Animated Clinical Methodology Stepper
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % CLINICAL_STEPS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-16 sm:space-y-20 animate-in fade-in duration-300">
      
      {/* ============================================================== */}
      {/* 1. HERO: Concise Introduction & Visual                         */}
      {/* ============================================================== */}
      <section className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-900 text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Est. 2004 · Dealers &amp; Distributors · Retail &amp; Clinic</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-tight tracking-tight">
              Purity in Potency. <br />
              <span className="italic font-normal text-sage-800">Precision in Practice.</span>
            </h1>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Established in <strong className="text-ink font-semibold">2004</strong> on ESI Hospital Main Road in Rajajinagar, Bengaluru, <strong className="text-ink font-semibold">{CLINIC_INFO.shortName}</strong> has served families, pharmacies, and medical practitioners for over two decades as authorized <strong className="text-ink font-semibold">dealers and wholesale distributors of homoeopathic medicines</strong>, alongside our retail dispensary and classical clinic.
            </p>
            <p className="text-muted text-xs sm:text-sm leading-relaxed border-l-2 border-sage-500 pl-3.5 py-0.5">
              Guided locally by <strong className="text-ink font-medium">Mr. Reddy</strong> alongside consulting physicians including <strong className="text-ink font-medium">Dr. Akshata</strong>, we supply 100% genuine German remedies (Dr. Reckeweg, Dr. Willmar Schwabe, ADEL) and verified Indian formulations paired with unhurried 1-on-1 consultations.
            </p>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
            >
              <span>Contact Clinic &amp; Dispensary</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* Real Storefront Photo */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden shadow-sm border border-sand bg-sage-950">
            <img
              src="/images/maruthi-homoeo-storefront.jpg"
              alt="Maruthi Homoeo Centre Pharmacy - Clinic storefront in Rajajinagar, Bengaluru"
              className="w-full aspect-[4/3] object-cover object-center"
            />
            <div className="bg-ink/95 px-4 py-3 text-white space-y-0.5 border-t border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block">
                Established 2004 · Pharmacy &amp; Clinic
              </span>
              <p className="font-serif text-sm font-semibold text-white">
                {CLINIC_INFO.legalName}
              </p>
              <p className="text-[11px] text-sage-200">
                {CLINIC_INFO.address.street}, {CLINIC_INFO.locality}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. STAT BAR: Clean Architectural Metric Strip (Minimal)        */}
      {/* ============================================================== */}
      <section className="border-y border-sand/70 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-sand/70">
          <div className="text-center sm:text-left sm:px-4 pt-2 sm:pt-0 space-y-0.5">
            <span className="font-serif text-2xl font-bold text-ink block">Est. 2004</span>
            <p className="text-xs text-muted">20+ years in Rajajinagar</p>
          </div>
          <div className="text-center sm:text-left sm:px-4 pt-2 sm:pt-0 space-y-0.5">
            <span className="font-serif text-2xl font-bold text-ink block">3,000+</span>
            <p className="text-xs text-muted">German &amp; Indian remedies</p>
          </div>
          <div className="text-center sm:text-left sm:px-4 pt-2 sm:pt-0 space-y-0.5">
            <span className="font-serif text-2xl font-bold text-ink block">100% Pure</span>
            <p className="text-xs text-muted">Zero steroids or suppressants</p>
          </div>
          <div className="text-center sm:text-left sm:px-4 pt-2 sm:pt-0 space-y-0.5">
            <span className="font-serif text-2xl font-bold text-ink block">Karnataka</span>
            <p className="text-xs text-muted">Statewide supply &amp; courier</p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. CLINICAL METHODOLOGY: Interactive Animated Experience       */}
      {/* ============================================================== */}
      <section
        className="space-y-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-sage-700">
              Clinical Methodology
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
              How Your Healing Pathway Unfolds
            </h2>
          </div>
          <span className="text-[11px] text-muted font-medium">
            Interactive protocol · Select stage to explore
          </span>
        </div>

        {/* Interactive Step Switcher Tabs with Animated Progress Line */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 relative">
          {CLINICAL_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-300 relative cursor-pointer border ${
                  isActive
                    ? 'bg-white border-sage-600 shadow-sm'
                    : 'bg-alabaster/80 border-sand hover:bg-white text-muted'
                }`}
              >
                {/* Animated progress indicator bar on active card */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-sage-600 rounded-t-xl" />
                )}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-sage-800' : 'text-muted/60'
                    }`}
                  >
                    {step.num}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>
                <p
                  className={`font-serif text-xs sm:text-sm font-semibold mt-1 leading-snug line-clamp-1 ${
                    isActive ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[10px] text-muted hidden sm:block mt-0.5">
                  {step.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown (Minimal & Focused) */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-sand shadow-xs space-y-4 transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand/50 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sage-100 text-sage-900 border border-sage-200">
                Stage {CLINICAL_STEPS[activeStep].num} · {CLINICAL_STEPS[activeStep].tag}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink mt-1.5">
                {CLINICAL_STEPS[activeStep].title}
              </h3>
            </div>
            <span className="text-xs font-medium text-sage-700 bg-sand/40 px-2.5 py-1 rounded-lg">
              {CLINICAL_STEPS[activeStep].subtitle}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            {CLINICAL_STEPS[activeStep].description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            {CLINICAL_STEPS[activeStep].highlights.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-alabaster border border-sand/60 text-ink/80 text-[11px] font-medium"
              >
                <span className="text-emerald-600 font-bold">&check;</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. THE THREE WINGS: Core Capabilities (Concise, NO BUTTONS)    */}
      {/* ============================================================== */}
      <section className="space-y-6">
        <div className="space-y-1 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-700">
            Operational Infrastructure
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
            The Three Wings
          </h2>
          <p className="text-xs text-muted">
            Seamlessly integrating wholesale distribution, walk-in pharmacy, and doctor care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 pt-1">
          {/* Wing 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-sand/80 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 block">
              WING 01 / B2B SUPPLY
            </span>
            <h3 className="font-serif text-base font-semibold text-ink">
              Wholesale Distributor
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Authorized state stockist supplying genuine German and Indian homoeopathic medicines to 100+ practicing doctors, dispensaries, and clinics across Karnataka with original factory-sealed cases.
            </p>
          </div>

          {/* Wing 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-sand/80 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-amber-700 block">
              WING 02 / DISPENSARY
            </span>
            <h3 className="font-serif text-base font-semibold text-ink">
              Retail Pharmacy
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Walk-in apothecary on ESI Hospital Main Road stocking over 3,000+ sealed remedies, Reckeweg drops R1–R89, and mother tinctures dispensed fresh in UV amber glass with pure cane sugar globules.
            </p>
          </div>

          {/* Wing 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-sand/80 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-sage-700 block">
              WING 03 / CLINICAL CARE
            </span>
            <h3 className="font-serif text-base font-semibold text-ink">
              Doctor Consultations
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              30–45 minute unhurried constitutional evaluations treating chronic metabolic, allergic, pediatric, and joint conditions at the root cause without chemical steroid suppression.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. OFFICIAL BRAND PARTNERS (SECOND LAST ON PAGE)                */}
      {/* Clean, open view: NO card borders, NO backgrounds, NO buttons  */}
      {/* ============================================================== */}
      <section className="space-y-8 pt-4 border-t border-sand/70">
        <div className="space-y-1 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-700">
            Direct Sourcing &amp; Distribution
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
            Official Brand Partners &amp; Laboratories
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            Authorized wholesale distributor and direct stockist for Germany and India's benchmark homoeopathic laboratories.
          </p>
        </div>

        {/* Brand Grid: Round white circle backgrounds, logo prominent, text below */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6 sm:gap-x-8 pt-2">
          {BRAND_PARTNERS.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-center text-center group transition-transform hover:-translate-y-1 duration-200"
            >
              {/* Round white circle with shadow — logo prominent inside */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-md border border-sand/70 flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow duration-200 shrink-0">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 max-w-[60px] sm:max-w-[72px] object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Typography below the circle */}
              <div className="space-y-0.5">
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-ink group-hover:text-sage-800 transition-colors leading-tight">
                  {brand.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-sage-700 font-medium">
                  {brand.origin}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. STATUTORY ACCREDITATIONS: AT THE BOTTOM OF THE PAGE          */}
      {/* Sleek & Compact Trust Strip (Minimal Text)                      */}
      {/* ============================================================== */}
      <section className="space-y-4 pt-4 border-t border-sand/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-700">
            Statutory Standards &amp; Accreditations
          </span>
          <span className="text-[11px] text-muted">
            Karnataka State Drugs Control Dept. Compliant
          </span>
        </div>

        {/* Sleek Compact Trust Strip: 4 logos with minimal labels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {ACCREDITATIONS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-sand/80 flex items-center gap-3.5"
            >
              <div className="h-10 w-12 shrink-0 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-xs font-semibold text-ink leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] text-muted leading-tight">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
