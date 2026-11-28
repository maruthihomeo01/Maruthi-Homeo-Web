import React from 'react';
import { useNavigation } from '../../context';
import { CLINIC_INFO } from '../../data/clinicData';
import BrandLogo from '../common/BrandLogo';

const currentYear = 2026;

export default function Footer() {
  const { activePage, navigateTo } = useNavigation();

  return (
    <footer className={`bg-sage-900 text-sage-200 ${activePage === 'home' ? 'mt-0' : 'mt-16'} border-t-4 border-saffron-500`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

        {/* Main grid: 4 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Col 1: Logo + Tagline (lg: 4 cols) */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-center sm:items-start gap-3">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              aria-label="Maruthi Homoeo Home"
              className="inline-block cursor-pointer focus:outline-none"
            >
              <BrandLogo variant="light" size="lg" />
            </button>
            <p className="text-xs text-sage-400 leading-relaxed max-w-xs text-center sm:text-left">
              Licensed homoeopathic pharmacy &amp; clinic in Rajajinagar, Bengaluru.
              Authorised stockist for Germany and India's benchmark homeopathic laboratories.
            </p>
          </div>

          {/* Col 2: Quick Links (lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Quick Links</p>
            <ul className="space-y-2 text-sm text-sage-300">
              {[
                { label: 'Home', page: 'home' },
                { label: 'About Us', page: 'about' },
                { label: 'Treatments', page: 'treatments' },
                { label: 'FAQ', page: 'faq' },
                { label: 'Contact Us', page: 'contact' },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => navigateTo(page)}
                    className="hover:text-saffron-400 transition-colors cursor-pointer text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Timings + Address (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Pharmacy &amp; Clinic</p>
            <p className="text-sage-300 text-xs leading-relaxed">
              {CLINIC_INFO.address.shop}, {CLINIC_INFO.address.street},<br />
              {CLINIC_INFO.address.area}, Bengaluru – {CLINIC_INFO.address.pincode}
            </p>

            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron-400 shrink-0 animate-pulse" />
                <span className="text-sage-100 font-semibold">Mon – Sat: 10:00 AM – 8:30 PM</span>
              </div>
              <p className="text-[11px] text-saffron-400 pl-3.5">Sunday Closed</p>
            </div>
          </div>

          {/* Col 4: Contact (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Get in Touch</p>
            <div className="space-y-2">
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-sage-300 hover:text-white transition-colors text-xs"
              >
                <span className="text-base">📞</span>
                <span className="font-medium">{CLINIC_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sage-300 hover:text-white transition-colors text-xs"
              >
                <span className="text-base">💬</span>
                <span className="font-medium">WhatsApp Us</span>
              </a>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-saffron-400 hover:text-saffron-200 transition-colors text-xs"
              >
                <span className="text-base">📍</span>
                <span className="font-medium">Google Maps →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom legal bar */}
        <div className="mt-10 pt-5 border-t border-sage-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sage-400">
            {/* Copyright */}
            <p className="text-center sm:text-left">
              © {currentYear} {CLINIC_INFO.name} · {CLINIC_INFO.legalName}, {CLINIC_INFO.locality}.
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo('privacy-policy')}
                className="hover:text-white transition-colors cursor-pointer underline underline-offset-2"
              >
                Privacy Policy
              </button>
              <span className="text-sage-700">|</span>
              <button
                type="button"
                onClick={() => navigateTo('terms')}
                className="hover:text-white transition-colors cursor-pointer underline underline-offset-2"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
