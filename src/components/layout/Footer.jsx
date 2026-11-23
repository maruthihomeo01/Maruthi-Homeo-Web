import React from 'react';
import { useNavigation } from '../../context';
import { CLINIC_INFO } from '../../data/clinicData';

const currentYear = 2026;

export default function Footer() {
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-sage-900 text-sage-200 mt-16 border-t border-sage-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Brand Logo - Centered on mobile, left-aligned on desktop */}
          <div className="md:col-span-5 flex justify-center md:justify-start items-center">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="inline-block cursor-pointer focus:outline-none"
            >
              <img
                src="/images/Logo-white.png"
                alt="SwasthyaHomoeo Logo"
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain"
              />
            </button>
          </div>

          {/* Quick Page Links - 2-column compact on mobile, single list on desktop */}
          <div className="md:col-span-3 space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Pages</p>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2 text-sm text-sage-300">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="w-full md:w-auto hover:text-white transition-colors cursor-pointer text-center md:text-left py-1"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="w-full md:w-auto hover:text-white transition-colors cursor-pointer text-center md:text-left py-1"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('treatments')}
                  className="w-full md:w-auto hover:text-white transition-colors cursor-pointer text-center md:text-left py-1"
                >
                  Treatments
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('faq')}
                  className="w-full md:w-auto hover:text-white transition-colors cursor-pointer text-center md:text-left py-1"
                >
                  FAQ
                </button>
              </li>
              <li className="col-span-2 md:col-span-1">
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="w-full md:w-auto hover:text-white transition-colors cursor-pointer text-center md:text-left py-1"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Colored Timings */}
          <div className="md:col-span-4 space-y-3 text-sm text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Pharmacy &amp; Clinic</p>
            <p className="text-sage-300 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              {CLINIC_INFO.address.shop}, {CLINIC_INFO.address.street},<br />
              {CLINIC_INFO.address.area}, Bengaluru - {CLINIC_INFO.address.pincode}
            </p>

            {/* Distinct Colored Timings */}
            <div className="space-y-1 pt-0.5 inline-block md:block">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span className="text-emerald-300 font-semibold tracking-wide">
                  Mon – Sat: 10:00 AM – 8:30 PM
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 md:pl-3.5">
                Sunday Closed
              </p>
            </div>

            <div className="pt-1 flex items-center justify-center md:justify-start gap-4 text-xs">
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="text-white hover:text-emerald-300 font-medium transition-colors py-1.5"
              >
                {CLINIC_INFO.phone}
              </a>
              <span className="text-sage-700">|</span>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-white underline transition-colors py-1.5"
              >
                Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Centered Copyright */}
        <div className="mt-8 pt-5 border-t border-sage-800/80 text-center text-xs text-sage-400">
          <p>
            &copy; {currentYear} {CLINIC_INFO.name} · {CLINIC_INFO.legalName}, {CLINIC_INFO.locality}.
          </p>
        </div>
      </div>
    </footer>
  );
}
