import React from 'react';
import { useNavigation } from '../../context';
import { CLINIC_INFO } from '../../data/clinicData';

const currentYear = 2026;

export default function Footer() {
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-sage-900 text-sage-200 mt-16 border-t border-sage-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Brand Logo - Centered Vertically */}
          <div className="md:col-span-5 flex items-center">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="inline-block text-left cursor-pointer focus:outline-none"
            >
              <img
                src="/images/Logo-white.png"
                alt="SwasthyaHomeo Logo"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              />
            </button>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Pages</p>
            <ul className="space-y-2 text-sm text-sage-300">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('treatments')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Treatments &amp; Remedies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Colored Timings */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Pharmacy &amp; Clinic</p>
            <p className="text-sage-300 text-xs sm:text-sm leading-relaxed">
              {CLINIC_INFO.address.shop}, {CLINIC_INFO.address.street},<br />
              {CLINIC_INFO.address.area}, Bengaluru - {CLINIC_INFO.address.pincode}
            </p>

            {/* Distinct Colored Timings */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span className="text-emerald-300 font-semibold tracking-wide">
                  Mon – Sat: 10:00 AM – 8:30 PM
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 pl-3.5">
                Sunday Closed
              </p>
            </div>

            <div className="pt-1 flex items-center gap-4 text-xs">
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="text-white hover:text-emerald-300 font-medium transition-colors"
              >
                {CLINIC_INFO.phone}
              </a>
              <span className="text-sage-700">|</span>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-white underline transition-colors"
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
