import React from 'react';
import { useNavigation } from '../context';
import { CLINIC_INFO } from '../data/clinicData';

const ACCREDITATIONS = [
  {
    image: '/images/Ayush.avif',
    alt: 'Ministry of AYUSH Certification Logo',
    title: 'Ministry of AYUSH',
    badge: 'Government of India',
    sub: 'Statutory Body Compliance'
  },
  {
    image: '/images/GMP.avif',
    alt: 'GMP Certified Quality Standards Logo',
    title: 'GMP Certified Quality',
    badge: 'Manufacturing Standard',
    sub: 'Certified Sterile Laboratories'
  },
  {
    image: '/images/FSSAI.avif',
    alt: 'FSSAI Food & Health Standards Logo',
    title: 'FSSAI Compliant',
    badge: 'Safety Authority',
    sub: 'Health & Nutritive Standards'
  },
  {
    image: '/images/MadeinIndia.avif',
    alt: 'Made in India Initiative Logo',
    title: 'Made in India',
    badge: 'National Quality',
    sub: 'Indian & German Standards'
  }
];

export default function AboutPage() {
  const { navigateTo } = useNavigation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16 animate-in fade-in duration-300">
      {/* 1. HERO SECTION: Punchy Narrative & Visual Identity */}
      <section className="grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Serving Rajajinagar Since Inception</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-[1.15]">
            Classical Homeopathy. Genuine German Remedies.
          </h1>

          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Located on ESI Hospital Main Road in Rajajinagar 2nd Block, <strong className="text-ink font-semibold">{CLINIC_INFO.shortName}</strong> ({CLINIC_INFO.legalName}) is a dedicated homeopathic pharmacy and consultation centre.
          </p>

          <p className="text-muted text-sm sm:text-base leading-relaxed">
            We provide Bengaluru families with 100% genuine, unadulterated remedies directly imported from Germany (Dr. Reckeweg, Schwabe) alongside unhurried constitutional doctor consultations that treat root causes without steroid suppression.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Visit Store or Enquire &rarr;
            </button>
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Maruthi Homeo Centre! I would like to inquire about medicine availability / consultation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden border border-sand shadow-lg bg-sage-900 relative group">
            <img
              src="/images/clinic-apothecary.jpeg"
              alt="Maruthi Homeo Centre Apothecary"
              className="w-full h-80 sm:h-96 object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
                Dispensary &amp; Clinic
              </span>
              <p className="font-serif text-xl font-semibold text-white">
                {CLINIC_INFO.legalName}
              </p>
              <p className="text-xs text-sage-200">
                {CLINIC_INFO.address.street}, {CLINIC_INFO.locality}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY FAMILIES TRUST US: 3,000+ Metrics Section (Now 2nd Section) */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-sand shadow-xs space-y-2 text-center hover:border-sage-400 hover:shadow-sm transition-all">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-sage-800 block">3,000+</span>
          <h4 className="font-semibold text-sm text-ink">Remedies in Stock</h4>
          <p className="text-xs text-muted">Full catalog of German &amp; Indian potencies, dilutions &amp; bio-chemics.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-sand shadow-xs space-y-2 text-center hover:border-sage-400 hover:shadow-sm transition-all">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-sage-800 block">100%</span>
          <h4 className="font-semibold text-sm text-ink">Zero Steroids</h4>
          <p className="text-xs text-muted">Pure Hahnemannian healing without chemical suppression.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-sand shadow-xs space-y-2 text-center hover:border-sage-400 hover:shadow-sm transition-all">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-sage-800 block">Amber</span>
          <h4 className="font-semibold text-sm text-ink">Glass Packaging</h4>
          <p className="text-xs text-muted">UV protection against heat and zero plastic chemical leaching.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-sand shadow-xs space-y-2 text-center hover:border-sage-400 hover:shadow-sm transition-all">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-sage-800 block">Express</span>
          <h4 className="font-semibold text-sm text-ink">Bengaluru Courier</h4>
          <p className="text-xs text-muted">In-store pickup in Rajajinagar or doorstep delivery across India.</p>
        </div>
      </section>

      {/* 3. TWO CORE PILLARS: The Retail Pharmacy & The Consultation Clinic */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-700">Two Wings of Care</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Pharmacy First, Clinical Precision</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pillar 1: Full-Stock Dispensary */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-sand shadow-sm space-y-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-2xl shadow-xs">
                💊
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-900 border border-amber-200">
                Dispensary Wing
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                Authorized German &amp; Indian Pharmacy
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                Direct stockists of sealed Dr. Reckeweg (Germany) specialty drops R1–R89, Schwabe Germany dilutions, mother tinctures, and bio-chemic salts.
              </p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-sand text-xs text-ink">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>Complete potencies: 30CH, 200CH, 1M, 10M &amp; 180+ Mother Tinctures (Q)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>Freshly prepared inert cane sugar globules #30 in UV-blocking amber glass</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span><strong>Mon–Sat (10 AM – 8:30 PM):</strong> Walk in anytime; no appointment needed for medicines</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Clinical Consultation */}
          <div className="p-7 sm:p-8 rounded-3xl bg-sage-800 text-white shadow-sm space-y-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-white/15 text-emerald-300 flex items-center justify-center text-2xl shadow-xs">
                🩺
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/15 text-emerald-200 border border-white/20">
                Clinical Wing
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-semibold text-white">
                Classical 1-on-1 Constitutional Doctor Care
              </h3>
              <p className="text-xs sm:text-sm text-sage-200 mt-2 leading-relaxed">
                Thorough, individualized case evaluation designed to uncover the constitutional root cause of chronic skin, allergy, migraine, and child immunity issues.
              </p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-white/15 text-xs text-sage-100">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>30–45 Minute Case-Taking:</strong> Physical symptoms, thermal modalities &amp; stress factors</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>Zero steroids, zero drowsiness, zero chemical habit-formation</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span><strong>Doctor Timings (Mon–Sat):</strong> 10:00 AM – 1:30 PM &amp; 6:00 PM – 8:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 3-STEP HEALING JOURNEY: Clean Stepped Flow */}
      <section className="bg-white rounded-3xl border border-sand p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-700">Patient Care Protocol</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
            How Your Healing Journey Unfolds
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 rounded-2xl bg-alabaster border border-sand/70 space-y-2">
            <span className="w-8 h-8 rounded-full bg-sage-800 text-white font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="font-serif text-base font-semibold text-ink">Constitutional Discovery</h3>
            <p className="text-xs text-muted leading-relaxed">
              Detailed 30–45 min assessment examining past medical history, thermal modalities (chilly vs. warm), sleep patterns, and emotional stressors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-alabaster border border-sand/70 space-y-2">
            <span className="w-8 h-8 rounded-full bg-sage-800 text-white font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="font-serif text-base font-semibold text-ink">Fresh Precision Dispensing</h3>
            <p className="text-xs text-muted leading-relaxed">
              We determine your single constitutional simillimum and dispense it fresh at our Rajajinagar counter in sterile globules or amber dropper bottles.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-alabaster border border-sand/70 space-y-2">
            <span className="w-8 h-8 rounded-full bg-sage-800 text-white font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h3 className="font-serif text-base font-semibold text-ink">Milestone &amp; Tapering Review</h3>
            <p className="text-xs text-muted leading-relaxed">
              Check-in after 3–4 weeks to monitor reduction in symptom flare-ups, tapering doses as your body’s natural self-regulation takes hold.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROMINENT LICENCES & ACCREDITATIONS (Prominent Logos, No Text Clutter, Placed Last) */}
      <section className="bg-white rounded-3xl border border-sand p-6 sm:p-10 shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-700">
            Official Standards &amp; Approvals
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
            Licences, Certifications &amp; Compliance
          </h2>
          <p className="text-xs text-muted">
            Operating with complete regulatory compliance, certified laboratory sourcing, and verified quality standards.
          </p>
        </div>

        {/* 4 Prominent Logo Cards with Generous Breathing Space */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {ACCREDITATIONS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-alabaster border border-sand hover:border-sage-400 hover:shadow-md transition-all flex flex-col items-center justify-between text-center group"
            >
              {/* Prominent Logo Container */}
              <div className="w-full h-24 sm:h-28 flex items-center justify-center p-2 mb-3">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                />
              </div>

              {/* Clean, Non-Crowded Labels */}
              <div className="space-y-1 w-full pt-2 border-t border-sand/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-700 bg-white px-2.5 py-0.5 rounded-full border border-sand inline-block">
                  {item.badge}
                </span>
                <h3 className="font-serif text-sm sm:text-base font-semibold text-ink leading-tight pt-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-muted font-medium">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
